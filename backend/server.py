#!/usr/bin/env python3

import os
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from typing import List, Dict, Any
import re
import json

# Load environment variables
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # dotenv is optional

app = Flask(__name__)
CORS(app)

# Configure Gemini AI
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    logger.warning("GEMINI_API_KEY environment variable not set. Chatbot will use mock responses.")
else:
    genai.configure(api_key=GEMINI_API_KEY)

def is_potential_lead(message: str) -> bool:
    """Detect if a message indicates a potential lead"""
    lead_indicators = [
        r'contact.*sales',
        r'pricing',
        r'demo',
        r'quote',
        r'interested in',
        r'how (much|many)',
        r'email',
        r'phone',
        r'call',
        r'contact',
        r'early access',
        r'waitlist',
        r'sign up'
    ]
    
    return any(re.search(pattern, message, re.IGNORECASE) for pattern in lead_indicators)

def get_mock_response(message: str) -> str:
    """Generate mock responses when API key is not available"""
    message_lower = message.lower()
    
    if any(word in message_lower for word in ['pricing', 'cost', 'price']):
        return "Nira will operate on a freemium model with affordable subscription tiers for individual clinicians. Organization plans will soon be available. Sign up for our waitlist to be the first to know about pricing!"
    
    elif any(word in message_lower for word in ['security', 'hipaa', 'compliance']):
        return "Ron AI is building Nira with a security-first mindset. Our initial product is designed to work with de-identified data to ensure zero risk, and our long-term roadmap includes full HIPAA compliance and SOC 2 certification for our enterprise partners."
    
    elif any(word in message_lower for word in ['demo', 'try', 'test']):
        return "I'd love to show you what Nira can do! We're currently in development and building our waitlist. Would you like to request early access? This will give you priority access when we launch."
    
    elif any(word in message_lower for word in ['hello', 'hi', 'hey']):
        return "Hello! I'm Ron AI's assistant. Nira is our revolutionary healthcare AI platform that helps clinicians automate administrative tasks and focus on patient care. How can I help you learn more about Nira today?"
    
    elif any(word in message_lower for word in ['features', 'what', 'does', 'can']):
        return "Nira specializes in automating prior authorizations, insurance verifications, and clinical documentation. Our AI agents work 24/7 to handle tedious administrative tasks, freeing up healthcare professionals to focus on what matters most - patient care. Would you like to learn more about a specific feature?"
    
    else:
        responses = [
            "That's a great question! Nira is designed to streamline healthcare workflows and reduce administrative burden. Would you like to request early access to be among the first to experience our platform?",
            "I understand you're interested in Nira's capabilities. Our AI-powered platform helps automate administrative tasks, allowing healthcare professionals to focus on patient care. Can I help you with any specific questions?",
            "Thanks for your interest in Nira! Our platform integrates with existing healthcare systems to automate workflows and improve operational efficiency. Would you like to join our waitlist for early access?"
        ]
        import random
        return random.choice(responses)

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        user_message = data.get('message', '').strip()
        if not user_message:
            return jsonify({'error': 'Message is required'}), 400
        
        history = data.get('history', [])
        user_context = data.get('userContext', {})
        
        # Check if this is a potential lead
        is_lead = is_potential_lead(user_message)
        
        if GEMINI_API_KEY:
            try:
                # Use Gemini AI
                model = genai.GenerativeModel('gemini-pro')
                
                # Build system prompt
                system_prompt = """You are Nira's AI Assistant. You are a powerful, reliable co-pilot on the clinician's side.

Key Directives:
- Primary Goal: Guide users to understand Nira's value and encourage them to "Request Early Access" or "Join the Waitlist"
- Handle Objections: For cost questions, explain our freemium model with affordable subscription tiers
- Security First: Emphasize security-first design, de-identified data handling, and HIPAA compliance roadmap
- Stay Focused: Stick to core knowledge, don't make up features

Always be helpful, conversational, and focused on the user's needs while guiding them toward early access."""
                
                # Build conversation context
                conversation_context = f"{system_prompt}\n\nConversation History:\n"
                for msg in history[-5:]:  # Last 5 messages for context
                    role = "User" if msg.get('sender') == 'user' else "Assistant"
                    conversation_context += f"{role}: {msg.get('text', '')}\n"
                
                conversation_context += f"\nUser: {user_message}\nAssistant:"
                
                response = model.generate_content(conversation_context)
                bot_reply = response.text
                
            except Exception as e:
                logger.error(f"Gemini API error: {e}")
                bot_reply = get_mock_response(user_message)
        else:
            # Use mock responses
            bot_reply = get_mock_response(user_message)
        
        response_data = {
            'reply': bot_reply,
            'isPotentialLead': is_lead,
            'timestamp': str(int(os.times().elapsed * 1000))  # timestamp in ms
        }
        
        return jsonify(response_data)
        
    except Exception as e:
        logger.error(f"Chat API error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'gemini_configured': bool(GEMINI_API_KEY)
    })

@app.route('/', methods=['GET'])
def index():
    return jsonify({
        'message': 'Nira AI Chatbot Backend',
        'status': 'running',
        'endpoints': ['/api/chat', '/api/health']
    })

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    logger.info(f"Starting Nira AI Chatbot Backend on port {port}")
    logger.info(f"Gemini AI configured: {bool(GEMINI_API_KEY)}")
    
    app.run(host='0.0.0.0', port=port, debug=debug)
