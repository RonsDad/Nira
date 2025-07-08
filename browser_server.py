"""Enhanced FastAPI backend for browser-use integration with Ron.
Run with: uvicorn browser_server:app --reload
"""
import asyncio
import base64
import json
import logging
import os
import sys
from typing import Dict, List, Optional
from datetime import datetime
from pydantic import BaseModel

# Ensure the `browser_use` package (located under the `browser-use` folder) is importable
PROJECT_ROOT = os.path.dirname(__file__)
BROWSER_USE_DIR = os.path.join(PROJECT_ROOT, "browser-use")
if BROWSER_USE_DIR not in sys.path:
    sys.path.append(BROWSER_USE_DIR)

from fastapi import FastAPI, Body, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.responses import Response
from langchain_openai import ChatOpenAI

from browser_use.agent import Agent
from browser_use.browser.session import BrowserSession

app = FastAPI(title="Ron Browser Backend")
logger = logging.getLogger(__name__)

# Data models
class AgentTask(BaseModel):
    task: str
    max_steps: int = 10
    
class AgentStep(BaseModel):
    id: str
    description: str
    status: str  # "pending", "in_progress", "completed", "failed"
    timestamp: Optional[datetime] = None
    error: Optional[str] = None

class EnhancedBrowserSession:
    def __init__(self, browser_session: BrowserSession):
        self.session = browser_session
        self.agent: Optional[Agent] = None
        self.agent_steps: List[AgentStep] = []
        self.agent_task: Optional[str] = None
        self.is_agent_running: bool = False
        
# In-memory session registry (id -> EnhancedBrowserSession)
SESSIONS: Dict[int, EnhancedBrowserSession] = {}


@app.post("/browser", summary="Create a new browser session")
async def create_browser():
    bs = BrowserSession(headless=False)
    await bs.start()
    enhanced_session = EnhancedBrowserSession(bs)
    SESSIONS[bs.id] = enhanced_session
    return {"id": bs.id}


@app.delete("/browser/{session_id}", summary="Close and delete a browser session")
async def delete_browser(session_id: int):
    enhanced_session = SESSIONS.pop(session_id, None)
    if not enhanced_session:
        raise HTTPException(status_code=404, detail="Session not found")
    await enhanced_session.session.close()
    return {"id": session_id, "status": "closed"}


@app.get("/browser/{session_id}/shot", response_class=Response, summary="Return latest screenshot")
async def screenshot(session_id: int):
    enhanced_session = SESSIONS.get(session_id)
    if not enhanced_session:
        raise HTTPException(status_code=404, detail="Session not found")
    page = await enhanced_session.session.get_current_page()
    png_bytes = await page.screenshot(type="png")
    return Response(content=png_bytes, media_type="image/png")


@app.put("/browser/{session_id}/agent_controlled", summary="Toggle agent control")
async def toggle_agent(session_id: int, value: bool = Body(...)):
    enhanced_session = SESSIONS.get(session_id)
    if not enhanced_session:
        raise HTTPException(status_code=404, detail="Session not found")
    # Attach a simple flag to the browser session
    setattr(enhanced_session.session, "agent_controlled", value)
    return {"agent_controlled": value}

@app.websocket("/browser/{session_id}/stream")
async def browser_stream(session_id: int, websocket: WebSocket):
    """Stream browser screenshots and agent status via WebSocket.
    
    Sends data in format:
    {
        "type": "screenshot",
        "data": base64_encoded_png,
        "agent_status": {
            "is_running": bool,
            "is_paused": bool,
            "current_url": str
        }
    }
    """
    await websocket.accept()
    enhanced_session = SESSIONS.get(session_id)
    if not enhanced_session:
        await websocket.close(code=1008)
        return
    try:
        while True:
            page = await enhanced_session.session.get_current_page()
            png_bytes = await page.screenshot(type="png")
            
            # Prepare status data
            agent_status = {
                "is_running": enhanced_session.is_agent_running,
                "is_paused": enhanced_session.agent.state.paused if enhanced_session.agent else False,
                "current_url": page.url
            }
            
            # Send as JSON with base64 encoded image
            message = {
                "type": "screenshot",
                "data": base64.b64encode(png_bytes).decode('utf-8'),
                "agent_status": agent_status
            }
            
            await websocket.send_json(message)
            await asyncio.sleep(0.1)  # ~10 FPS
    except WebSocketDisconnect:
        pass
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        await websocket.close(code=1011)

@app.get("/browser/{session_id}/agent/steps", summary="Get agent execution steps")
async def get_agent_steps(session_id: int):
    enhanced_session = SESSIONS.get(session_id)
    if not enhanced_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return {
        "steps": [step.dict() for step in enhanced_session.agent_steps],
        "is_running": enhanced_session.is_agent_running,
        "current_task": enhanced_session.agent_task
    }

@app.post("/browser/{session_id}/agent/run", summary="Run an agent task in the session")
async def agent_run(session_id: int, agent_task: AgentTask):
    enhanced_session = SESSIONS.get(session_id)
    if not enhanced_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    if enhanced_session.is_agent_running:
        raise HTTPException(status_code=400, detail="Agent is already running")

    # Configure LLM
    llm = ChatOpenAI(model="gpt-4o")
    
    # Create agent
    agent = Agent(
        task=agent_task.task,
        llm=llm,
        browser_session=enhanced_session.session,
    )
    
    enhanced_session.agent = agent
    enhanced_session.agent_task = agent_task.task
    enhanced_session.is_agent_running = True
    enhanced_session.agent_steps = [
        AgentStep(
            id="1",
            description=f"Starting task: {agent_task.task}",
            status="in_progress",
            timestamp=datetime.now()
        )
    ]

    # Run agent with step tracking
    async def run_with_tracking():
        try:
            # Track agent execution
            step_count = 1
            async for result in agent.run(max_steps=agent_task.max_steps):
                step_count += 1
                enhanced_session.agent_steps.append(
                    AgentStep(
                        id=str(step_count),
                        description=f"Executed action: {result.action if hasattr(result, 'action') else 'Processing'}",
                        status="completed",
                        timestamp=datetime.now()
                    )
                )
            
            # Mark completion
            enhanced_session.agent_steps.append(
                AgentStep(
                    id=str(step_count + 1),
                    description="Task completed successfully",
                    status="completed",
                    timestamp=datetime.now()
                )
            )
        except Exception as e:
            enhanced_session.agent_steps.append(
                AgentStep(
                    id=str(len(enhanced_session.agent_steps) + 1),
                    description="Task failed",
                    status="failed",
                    timestamp=datetime.now(),
                    error=str(e)
                )
            )
        finally:
            enhanced_session.is_agent_running = False

    # Run the agent asynchronously
    asyncio.create_task(run_with_tracking())

    return {"id": session_id, "task": agent_task.task, "status": "running"}

@app.post("/browser/{session_id}/agent/stop", summary="Stop running agent")
async def stop_agent(session_id: int):
    enhanced_session = SESSIONS.get(session_id)
    if not enhanced_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    if not enhanced_session.is_agent_running or not enhanced_session.agent:
        return {"status": "no agent running"}
    
    # Stop the agent
    enhanced_session.agent.stop()
    enhanced_session.is_agent_running = False
    enhanced_session.agent_steps.append(
        AgentStep(
            id=str(len(enhanced_session.agent_steps) + 1),
            description="Agent stopped by user",
            status="stopped",
            timestamp=datetime.now()
        )
    )
    
    return {"status": "agent stopped"}

@app.post("/browser/{session_id}/agent/pause", summary="Pause agent execution")
async def pause_agent(session_id: int):
    enhanced_session = SESSIONS.get(session_id)
    if not enhanced_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    if not enhanced_session.is_agent_running or not enhanced_session.agent:
        return {"status": "no agent running"}
    
    # Pause the agent
    enhanced_session.agent.pause()
    enhanced_session.agent_steps.append(
        AgentStep(
            id=str(len(enhanced_session.agent_steps) + 1),
            description="Agent paused - user taking control",
            status="paused",
            timestamp=datetime.now()
        )
    )
    
    return {"status": "agent paused", "message": "You now have control of the browser"}

@app.post("/browser/{session_id}/agent/resume", summary="Resume agent execution")
async def resume_agent(session_id: int):
    enhanced_session = SESSIONS.get(session_id)
    if not enhanced_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    if not enhanced_session.agent or not enhanced_session.agent.state.paused:
        return {"status": "agent not paused"}
    
    # Resume the agent
    enhanced_session.agent.resume()
    enhanced_session.agent_steps.append(
        AgentStep(
            id=str(len(enhanced_session.agent_steps) + 1),
            description="Agent resumed - control returned to AI",
            status="in_progress",
            timestamp=datetime.now()
        )
    )
    
    return {"status": "agent resumed", "message": "Agent has control again"}

@app.get("/browser/{session_id}/agent/request-help", summary="Check if agent needs help")
async def check_agent_needs_help(session_id: int):
    """Check if the agent is requesting user assistance.
    
    The agent can pause itself when it encounters difficulties.
    This endpoint allows the frontend to detect when help is needed.
    """
    enhanced_session = SESSIONS.get(session_id)
    if not enhanced_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Check if agent is paused (indicating it needs help)
    needs_help = (
        enhanced_session.agent and 
        enhanced_session.agent.state.paused and 
        enhanced_session.is_agent_running
    )
    
    # Get the last few steps to understand context
    recent_steps = enhanced_session.agent_steps[-3:] if enhanced_session.agent_steps else []
    
    return {
        "needs_help": needs_help,
        "is_paused": enhanced_session.agent.state.paused if enhanced_session.agent else False,
        "recent_steps": [step.dict() for step in recent_steps],
        "current_task": enhanced_session.agent_task
    }
