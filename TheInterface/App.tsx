import { useState } from "react";
import { Login } from "../src/components/Login";
import { Onboarding } from "../src/components/Onboarding";
import { Sidebar } from "../src/components/Sidebar";
import { ChatBubble } from "../src/components/ChatBubble";
import { BrowserViewPanel } from "../src/components/BrowserViewPanel";
import { ChatInput } from "../src/components/ChatInput";
import { PreviewPanel } from "../src/components/PreviewPanel";
import { TelephoneUI } from "../src/components/TelephoneUI";
import { Sparkles, Activity, Zap, Layout, Bot, Target } from "lucide-react";

interface Message {
  id: string;
  type: "ai" | "user";
  content: string | React.ReactNode;
  timestamp: string;
  component?: "providers" | "automation" | "browser" | "preview" | "phone";
  componentData?: any;
}

type AuthState = "login" | "onboarding" | "authenticated";

export default function App() {
  const [authState, setAuthState] = useState<AuthState>("login");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "ai",
      content: "Welcome to your Calm Command Center. I'm here to help you manage your healthcare needs with ease and precision. How can I assist you today?",
      timestamp: "2:30 PM"
    }
  ]);
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Panel states
  const [browserPanelActive, setBrowserPanelActive] = useState(false);
  const [previewPanelActive, setPreviewPanelActive] = useState(false);
  const [phonePanelActive, setPhonePanelActive] = useState(false);
  const [hasUserControl, setHasUserControl] = useState(false);
  const [isAutomating, setIsAutomating] = useState(false);
  const [previewContent, setPreviewContent] = useState<any>(null);
  const [isOnCall, setIsOnCall] = useState(false);
  const [panelsCollapsed, setPanelsCollapsed] = useState(false);

  // Phone window state
  const [phonePosition, setPhonePosition] = useState({ x: 100, y: 100 });
  const [phoneMinimized, setPhoneMinimized] = useState(false);

  const handleLogin = () => {
    setAuthState("onboarding");
  };

  const handleOnboardingComplete = () => {
    setAuthState("authenticated");
  };

  // Show Login screen
  if (authState === "login") {
    return <Login onLogin={handleLogin} />;
  }

  // Show Onboarding screen
  if (authState === "onboarding") {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Main application (authenticated state)
  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async (content: string, deepResearch: boolean) => {
    // Add user message
    addMessage({
      type: "user",
      content
    });

    setIsProcessing(true);

    // Check if this is a macro-generated prompt
    const isMacroPrompt = (content: string): boolean => {
      const macroIndicators = [
        "PRIMARY OBJECTIVE:",
        "SEARCH STRATEGY:",
        "NAVIGATION GUIDELINES:",
        "BEFORE ENDING THE SESSION:",
        "BEFORE ENDING:",
        "Please act as an expert browser automation agent"
      ];
      return macroIndicators.some(indicator => content.includes(indicator));
    };

    if (isMacroPrompt(content)) {
      const extractTaskType = (content: string): string => {
        if (content.includes("co-pay assistance") || content.includes("Co-Pay Assistance")) return "Co-Pay Assistance";
        if (content.includes("Book Appointment") || content.includes("schedule an appointment")) return "Appointment Booking";
        if (content.includes("insurance coverage") || content.includes("Insurance Coverage")) return "Insurance Verification";
        if (content.includes("Find Specialists") || content.includes("find qualified")) return "Provider Search";
        if (content.includes("urgent care") || content.includes("Urgent Care")) return "Urgent Care Search";
        if (content.includes("medical records") || content.includes("Medical Records")) return "Records Access";
        return "Healthcare Automation";
      };

      const extractSearchTerm = (content: string): string => {
        const medicationMatch = content.match(/co-pay assistance.*?for ([^.]+)/i);
        if (medicationMatch) return medicationMatch[1];
        
        const inputMatch = content.match(/\[INPUT\]|for ([A-Za-z]+)/);
        if (inputMatch) return inputMatch[1] || "healthcare service";
        
        return "healthcare service";
      };

      const taskType = extractTaskType(content);
      const searchTerm = extractSearchTerm(content);
      
      // Show browser panel for automation
      setBrowserPanelActive(true);
      setPreviewPanelActive(false);
      setPhonePanelActive(false);
      setIsAutomating(true);
      
      addMessage({
        type: "ai",
        content: (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Bot size={16} style={{ color: 'var(--color-accent-blue)' }} />
              <span className="font-medium">Expert Browser Agent Activated</span>
              <Sparkles size={14} className="animate-pulse-gentle" style={{ color: 'var(--color-accent-blue)' }} />
            </div>
            <p>
              Perfect! I'm launching the browser automation panel with your expert-crafted prompt for <strong>{taskType}</strong>. 
              The agent will systematically search for <strong>{searchTerm}</strong> information following the detailed 
              navigation and problem-solving guidelines you provided.
            </p>
            <div className="flex items-center gap-2 text-sm opacity-80">
              <Target size={14} />
              <span>The agent will ask for guidance before ending and provide comprehensive results.</span>
            </div>
          </div>
        )
      });
    } else {
      // Simple acknowledgment for regular messages
      addMessage({
        type: "ai",
        content: (
          <div className="space-y-3">
            <p>I understand. I'm here to assist with any healthcare management needs you might have.</p>
            <div className="flex items-center gap-2 text-sm opacity-80">
              <Sparkles size={14} style={{ color: 'var(--color-accent-blue)' }} />
              <span>Try typing <kbd className="px-2 py-1 rounded ice-glass text-xs">/</kbd> to access expert automation prompts for tasks like co-pay assistance, appointment booking, and provider searches.</span>
            </div>
          </div>
        )
      });
    }

    setIsProcessing(false);
  };

  const handleTakeControl = () => {
    setHasUserControl(true);
    setIsAutomating(false);
  };

  const handleReleaseControl = () => {
    setHasUserControl(false);
    setIsAutomating(true);
  };

  const handleCall = () => {
    setIsOnCall(true);
    addMessage({
      type: "ai",
      content: "Connecting to office... The AI assistant will handle the call and confirm details."
    });
  };

  const handleHangup = () => {
    setIsOnCall(false);
    addMessage({
      type: "ai",
      content: "Call completed."
    });
  };

  const handleCloseBrowser = () => {
    setBrowserPanelActive(false);
    setIsAutomating(false);
    addMessage({
      type: "ai",
      content: "Browser automation completed. I'm here if you need any additional assistance with your healthcare needs."
    });
  };

  const handleClosePhone = () => {
    setPhonePanelActive(false);
    setPhoneMinimized(false);
    addMessage({
      type: "ai",
      content: "Phone call session ended. I'm here if you need to make another call or need any other assistance."
    });
  };

  const handleMinimizePhone = () => {
    setPhoneMinimized(true);
  };

  const handleMaximizePhone = () => {
    setPhoneMinimized(false);
  };

  const handlePhoneDrag = (newPosition: { x: number; y: number }) => {
    setPhonePosition(newPosition);
  };

  const anyPanelActive = browserPanelActive || previewPanelActive || phonePanelActive;

  return (
    <div 
      className="h-screen w-screen flex relative overflow-hidden"
      style={{ background: 'var(--color-background-void-gradient)' }}
    >
      {/* Sidebar */}
      <Sidebar activeSection="command-center" />

      {/* Draggable Phone Panel */}
      {phonePanelActive && (
        <TelephoneUI
          isActive={phonePanelActive}
          isConnected={isOnCall}
          contactName="Healthcare Office"
          contactNumber="+1 (555) 123-4567"
          onCall={handleCall}
          onHangup={handleHangup}
          onClose={handleClosePhone}
          onMinimize={handleMinimizePhone}
          onMaximize={handleMaximizePhone}
          onDrag={handlePhoneDrag}
          position={phonePosition}
          isMinimized={phoneMinimized}
        />
      )}

      {/* Main Content Container */}
      <div className={`flex-1 flex relative z-10 transition-all duration-300 min-w-0 ${
        browserPanelActive && !panelsCollapsed 
          ? 'flex-row' 
          : (previewPanelActive && !phonePanelActive && !panelsCollapsed)
            ? 'flex-col pr-96' 
            : 'flex-col'
      }`}>
        
        {/* Chat Section - Properly Contained */}
        <div className={`flex flex-col transition-all duration-300 relative min-w-0 min-h-0 ${
          browserPanelActive && !panelsCollapsed ? 'w-1/2' : 'flex-1'
        }`}>
          
          {/* Header - Fixed */}
          <header className="px-8 py-6 border-b ice-glass-elevated animate-fade-in relative overflow-hidden flex-shrink-0">
            {/* Crystalline border */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  var(--color-ice-border-bright) 20%, 
                  var(--color-ice-highlight) 50%, 
                  var(--color-ice-border-bright) 80%, 
                  transparent 100%)`
              }}
            />

            {/* Ice crystal background pattern */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 15% 25%, var(--color-ice-crystalline) 0%, transparent 40%),
                                 radial-gradient(circle at 85% 75%, var(--color-ice-frost) 0%, transparent 40%),
                                 radial-gradient(circle at 50% 50%, var(--color-ice-highlight) 0%, transparent 30%)`
              }}
            />
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  {/* Ice crystal activity indicator */}
                  <div 
                    className="w-10 h-10 rounded-xl ice-glass flex items-center justify-center group"
                    style={{
                      background: `linear-gradient(135deg, 
                        var(--color-ice-highlight) 0%, 
                        var(--color-ice-crystalline) 100%)`
                    }}
                  >
                    <Activity 
                      size={20} 
                      className="animate-pulse-gentle transition-transform duration-300 group-hover:scale-110"
                      style={{ color: 'var(--color-accent-blue)' }}
                    />
                    <div 
                      className="absolute inset-0 rounded-xl blur-lg animate-glow-pulse opacity-10"
                      style={{ backgroundColor: 'var(--color-accent-blue)' }}
                    />
                  </div>
                </div>
                <div>
                  <h2 
                    className="text-xl font-semibold text-gradient tracking-tight"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Calm Command Center
                  </h2>
                  <p 
                    className="text-sm opacity-80 font-medium"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    AI-Powered Healthcare Management
                  </p>
                </div>
              </div>
              
              {/* Status indicators */}
              <div className="flex items-center gap-3">
                {/* Panel Toggle */}
                {anyPanelActive && (
                  <button
                    onClick={() => setPanelsCollapsed(!panelsCollapsed)}
                    className="flex items-center gap-2 ice-glass px-4 py-2 rounded-xl relative overflow-hidden interactive-scale"
                  >
                    <Layout 
                      size={14} 
                      style={{ color: 'var(--color-accent-blue)' }}
                    />
                    <span 
                      className="text-sm font-medium"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {panelsCollapsed ? 'Show Panels' : 'Hide Panels'}
                    </span>
                  </button>
                )}

                {/* Browser Automation Status */}
                {isAutomating && (
                  <div className="flex items-center gap-2 ice-glass px-4 py-2 rounded-xl relative overflow-hidden">
                    <Bot 
                      size={14} 
                      className="animate-pulse-gentle"
                      style={{ color: 'var(--color-accent-blue)' }}
                    />
                    <span 
                      className="text-sm font-medium"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      Agent Active
                    </span>
                  </div>
                )}

                {/* AI Ready indicator */}
                <div className="flex items-center gap-2 ice-glass px-4 py-2 rounded-xl relative overflow-hidden">
                  <Zap 
                    size={14} 
                    style={{ color: 'var(--color-accent-blue)' }}
                  />
                  <span 
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    AI Ready
                  </span>
                </div>
                
                {/* Online Status */}
                <div className="flex items-center gap-2 ice-glass px-4 py-2 rounded-xl relative overflow-hidden">
                  <div className="relative">
                    <div 
                      className="w-2 h-2 rounded-full animate-pulse-gentle"
                      style={{ backgroundColor: 'var(--color-accent-blue)' }}
                    />
                    <div 
                      className="absolute inset-0 rounded-full blur-sm opacity-40"
                      style={{ backgroundColor: 'var(--color-accent-blue)' }}
                    />
                  </div>
                  <span 
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Online
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Chat Content Area - Properly Contained */}
          <div className="flex-1 flex flex-col min-h-0 relative">
            
            {/* Messages Container - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-8 relative">
                {/* Background ambient elements */}
                <div 
                  className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
                  style={{ 
                    backgroundColor: 'var(--color-accent-blue)',
                    opacity: 0.00005,
                    filter: 'blur(140px)',
                    animation: 'pulse-gentle 8s ease-in-out infinite'
                  }}
                />
                <div 
                  className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
                  style={{ 
                    backgroundColor: 'var(--color-accent-blue)', 
                    opacity: 0.00002,
                    filter: 'blur(120px)',
                    animation: 'pulse-gentle 12s ease-in-out infinite',
                    animationDelay: '4s'
                  }}
                />

                <div className="max-w-4xl mx-auto space-y-6 relative z-10 pb-8">
                  {messages.map((message, index) => (
                    <div key={message.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                      <ChatBubble type={message.type} timestamp={message.timestamp}>
                        {typeof message.content === 'string' ? (
                          <p className="leading-relaxed">{message.content}</p>
                        ) : (
                          <div className="leading-relaxed">{message.content}</div>
                        )}
                      </ChatBubble>
                    </div>
                  ))}

                  {/* Processing indicator */}
                  {isProcessing && (
                    <ChatBubble type="ai">
                      <div className="flex items-center gap-3">
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <div 
                              key={i}
                              className="w-2.5 h-2.5 rounded-full animate-bounce"
                              style={{ 
                                backgroundColor: 'var(--color-accent-blue)',
                                animationDelay: `${i * 150}ms`
                              }}
                            />
                          ))}
                        </div>
                        <span 
                          className="font-medium"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          Nira is analyzing your request...
                        </span>
                        <Sparkles 
                          size={16} 
                          className="animate-pulse-gentle"
                          style={{ color: 'var(--color-accent-blue)' }}
                        />
                      </div>
                    </ChatBubble>
                  )}
                </div>
              </div>
            </div>

            {/* Fixed Chat Input */}
            <div className="flex-shrink-0 p-8 border-t" style={{
              background: `linear-gradient(to top, var(--color-background-void) 80%, transparent 100%)`,
              borderColor: 'var(--color-ice-border)'
            }}>
              <ChatInput onSendMessage={handleSendMessage} disabled={isProcessing} />
            </div>
          </div>
        </div>

        {/* Browser Panel - Full Height when active */}
        {browserPanelActive && !panelsCollapsed && (
          <div className="w-1/2 p-4 flex-shrink-0">
            <BrowserViewPanel
              isActive={browserPanelActive}
              currentUrl="healthgrades.com"
              isAutomating={isAutomating}
              hasUserControl={hasUserControl}
              onTakeControl={handleTakeControl}
              onReleaseControl={handleReleaseControl}
              onConfirmAppointment={() => {}}
              onClose={handleCloseBrowser}
            />
          </div>
        )}
      </div>

      {/* Preview Panel - Right Column */}
      {!browserPanelActive && previewPanelActive && !phonePanelActive && !panelsCollapsed && (
        <div className="fixed right-0 top-0 w-96 h-full p-4 overflow-y-auto z-20 animate-slide-up">
          <PreviewPanel
            isActive={previewPanelActive}
            content={previewContent}
          />
        </div>
      )}
    </div>
  );
}