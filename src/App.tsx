import { useState } from "react";
import { Login } from "./components/Login";
import { Onboarding } from "./components/Onboarding";
import { Sidebar } from "./components/Sidebar";
import { ChatBubble } from "./components/ChatBubble";
import { BrowserViewPanel } from "./components/BrowserViewPanel";
import { ChatInput } from "./components/ChatInput";
import { PreviewPanel } from "./components/PreviewPanel";
import { TelephoneUI } from "./components/TelephoneUI";
import { Sparkles, Activity, Zap, Layout, Bot, Code } from "lucide-react";

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
  const [messages, setMessages] = useState<Message[]>([]);
  
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

  // Developer bypass state
  const [showDevBypass, setShowDevBypass] = useState(true);

  // Define addMessage function early to avoid hoisting issues
  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleLogin = () => {
    setAuthState("onboarding");
  };

  const handleOnboardingComplete = () => {
    setAuthState("authenticated");
    setShowDevBypass(false);
    // Add welcome message after onboarding
    addMessage({
      type: "ai",
      content: "Welcome to your healthcare command center. I'm here to help you manage your healthcare needs with ease and precision. How can I assist you today?"
    });
  };

  const handleDevBypass = () => {
    setAuthState("authenticated");
    setShowDevBypass(false);
    // Add developer bypass message
    addMessage({
      type: "ai",
      content: (
        <div className="space-y-2">
          <p>🔧 <strong>Developer Mode Activated</strong></p>
          <p>Welcome to Nira's healthcare management interface. This is a development environment ready for backend integration.</p>
        </div>
      )
    });
  };

  // Developer Bypass Button (only shown in login/onboarding)
  const DevBypassButton = () => {
    if (!showDevBypass || authState === "authenticated") return null;

    return (
      <button
        onClick={handleDevBypass}
        className="fixed top-4 right-4 z-50 ice-glass-elevated px-4 py-2 rounded-xl interactive-scale transition-all duration-300 border"
        style={{
          borderColor: 'var(--ice-border)',
          background: `linear-gradient(135deg, 
            var(--ice-surface) 0%,
            var(--ice-base) 100%)`,
          color: 'var(--accent-blue)'
        }}
      >
        <div className="flex items-center gap-2">
          <Code size={16} />
          <span className="text-sm font-medium">Dev Bypass</span>
        </div>
      </button>
    );
  };

  // Show Login screen
  if (authState === "login") {
    return (
      <>
        <Login onLogin={handleLogin} />
        <DevBypassButton />
      </>
    );
  }

  // Show Onboarding screen
  if (authState === "onboarding") {
    return (
      <>
        <Onboarding onComplete={handleOnboardingComplete} />
        <DevBypassButton />
      </>
    );
  }

  // Main application (authenticated state)
  const handleSendMessage = async (
    content: string, 
    deepResearch: boolean,
    onMessageProcessed?: (response: string | React.ReactNode) => void
  ) => {
    // Add user message
    addMessage({
      type: "user",
      content
    });

    setIsProcessing(true);

    try {
      // This is where you would integrate with your AI backend
      // For now, we'll just acknowledge the message
      
      // Placeholder for AI response handling
      if (onMessageProcessed) {
        // This would be replaced with actual AI processing
        const response = "I'm ready to help with your healthcare needs. Please connect me to your AI backend service.";
        onMessageProcessed(response);
        
        addMessage({
          type: "ai",
          content: response
        });
      }
    } catch (error) {
      addMessage({
        type: "ai",
        content: "I apologize, but I'm having trouble connecting to the AI service. Please check your connection and try again."
      });
    } finally {
      setIsProcessing(false);
    }
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
  };

  const handleHangup = () => {
    setIsOnCall(false);
  };

  const handleCloseBrowser = () => {
    setBrowserPanelActive(false);
    setIsAutomating(false);
  };

  const handleClosePhone = () => {
    setPhonePanelActive(false);
    setPhoneMinimized(false);
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

  // Panel control functions
  const showBrowserPanel = () => {
    setBrowserPanelActive(true);
    setPreviewPanelActive(false);
    setPhonePanelActive(false);
  };

  const showPreviewPanel = (content: any) => {
    setPreviewContent(content);
    setPreviewPanelActive(true);
    setBrowserPanelActive(false);
    setPhonePanelActive(false);
  };

  const showPhonePanel = () => {
    setPhonePanelActive(true);
    setBrowserPanelActive(false);
    setPreviewPanelActive(false);
  };

  const anyPanelActive = browserPanelActive || previewPanelActive || phonePanelActive;

  return (
    <div 
      className="h-screen w-screen flex relative overflow-hidden"
      style={{ background: 'var(--background-void-gradient)' }}
    >
      {/* Sidebar */}
      <Sidebar activeSection="command-center" />

      {/* Draggable Phone Panel */}
      {phonePanelActive && (
        <TelephoneUI
          isActive={phonePanelActive}
          isConnected={isOnCall}
          contactName="Healthcare Office"
          contactNumber=""
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
                  var(--ice-border-bright) 20%, 
                  var(--ice-highlight) 50%, 
                  var(--ice-border-bright) 80%, 
                  transparent 100%)`
              }}
            />

            {/* Ice crystal background pattern */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 15% 25%, var(--ice-crystalline) 0%, transparent 40%),
                                 radial-gradient(circle at 85% 75%, var(--ice-frost) 0%, transparent 40%),
                                 radial-gradient(circle at 50% 50%, var(--ice-highlight) 0%, transparent 30%)`
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
                        var(--ice-highlight) 0%, 
                        var(--ice-crystalline) 100%)`
                    }}
                  >
                    <Activity 
                      size={20} 
                      className="animate-pulse-gentle transition-transform duration-300 group-hover:scale-110"
                      style={{ color: 'var(--accent-blue)' }}
                    />
                    <div 
                      className="absolute inset-0 rounded-xl blur-lg animate-glow-pulse opacity-10"
                      style={{ backgroundColor: 'var(--accent-blue)' }}
                    />
                  </div>
                </div>
                <div>
                  <h2 
                    className="text-xl font-semibold text-gradient tracking-tight"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Nira Healthcare
                  </h2>
                  <p 
                    className="text-sm opacity-80 font-medium"
                    style={{ color: 'var(--text-secondary)' }}
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
                      style={{ color: 'var(--accent-blue)' }}
                    />
                    <span 
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-secondary)' }}
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
                      style={{ color: 'var(--accent-blue)' }}
                    />
                    <span 
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Agent Active
                    </span>
                  </div>
                )}

                {/* AI Ready indicator */}
                <div className="flex items-center gap-2 ice-glass px-4 py-2 rounded-xl relative overflow-hidden">
                  <Zap 
                    size={14} 
                    style={{ color: 'var(--accent-blue)' }}
                  />
                  <span 
                    className="text-sm font-medium"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Ready
                  </span>
                </div>
                
                {/* Online Status */}
                <div className="flex items-center gap-2 ice-glass px-4 py-2 rounded-xl relative overflow-hidden">
                  <div className="relative">
                    <div 
                      className="w-2 h-2 rounded-full animate-pulse-gentle"
                      style={{ backgroundColor: 'var(--accent-blue)' }}
                    />
                    <div 
                      className="absolute inset-0 rounded-full blur-sm opacity-40"
                      style={{ backgroundColor: 'var(--accent-blue)' }}
                    />
                  </div>
                  <span 
                    className="text-sm font-medium"
                    style={{ color: 'var(--text-secondary)' }}
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
                    backgroundColor: 'var(--accent-blue)',
                    opacity: 0.00005,
                    filter: 'blur(140px)',
                    animation: 'pulse-gentle 8s ease-in-out infinite'
                  }}
                />
                <div 
                  className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
                  style={{ 
                    backgroundColor: 'var(--accent-blue)', 
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
                                backgroundColor: 'var(--accent-blue)',
                                animationDelay: `${i * 150}ms`
                              }}
                            />
                          ))}
                        </div>
                        <span 
                          className="font-medium"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          Processing your request...
                        </span>
                        <Sparkles 
                          size={16} 
                          className="animate-pulse-gentle"
                          style={{ color: 'var(--accent-blue)' }}
                        />
                      </div>
                    </ChatBubble>
                  )}
                </div>
              </div>
            </div>

            {/* Fixed Chat Input */}
            <div className="flex-shrink-0 p-8 border-t" style={{
              background: `linear-gradient(to top, var(--background-void) 80%, transparent 100%)`,
              borderColor: 'var(--ice-border)'
            }}>
              <ChatInput 
                onSendMessage={handleSendMessage} 
                disabled={isProcessing}
                onShowBrowser={showBrowserPanel}
                onShowPreview={showPreviewPanel}
                onShowPhone={showPhonePanel}
              />
            </div>
          </div>
        </div>

        {/* Browser Panel - Full Height when active */}
        {browserPanelActive && !panelsCollapsed && (
          <div className="w-1/2 p-4 flex-shrink-0">
            <BrowserViewPanel
              isActive={browserPanelActive}
              currentUrl=""
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
