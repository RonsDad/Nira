import { useState, useRef, useEffect, type ReactNode } from "react";
import { Send, Zap, ArrowUp } from "lucide-react";
import { MacroMenu } from "./MacroMenu";

interface ChatInputProps {
  onSendMessage: (message: string, deepResearch: boolean, onMessageProcessed?: (response: string | ReactNode) => void) => Promise<void>;
  disabled?: boolean;
  onShowBrowser?: () => void;
  onShowPreview?: (content: any) => void;
  onShowPhone?: () => void;
}

export function ChatInput({ onSendMessage, disabled = false, onShowBrowser, onShowPreview, onShowPhone }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [deepResearch, setDeepResearch] = useState(false);
  const [showMacroMenu, setShowMacroMenu] = useState(false);
  const [macroMenuPosition, setMacroMenuPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const cursor = e.target.selectionStart;
    
    setMessage(value);
    setCursorPosition(cursor);

    // Check if "/" was just typed
    if (value[cursor - 1] === "/" && (cursor === 1 || value[cursor - 2] === " ")) {
      // Position macro menu
      if (containerRef.current && textareaRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMacroMenuPosition({
          x: rect.left + 20,
          y: rect.top
        });
        setShowMacroMenu(true);
      }
    } else if (showMacroMenu && !value.includes("/")) {
      setShowMacroMenu(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Don't handle these keys if macro menu is open - let MacroMenu handle them
    if (showMacroMenu && ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Enter', 'Escape', 'Backspace'].includes(e.key)) {
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim(), deepResearch);
      setMessage("");
      setDeepResearch(false);
      setShowMacroMenu(false);
    }
  };

  const handleMacroSelect = (value: string) => {
    // Find the last "/" in the message and replace everything after it
    const lastSlashIndex = message.lastIndexOf("/");
    if (lastSlashIndex !== -1) {
      const beforeSlash = message.substring(0, lastSlashIndex);
      const newMessage = beforeSlash + value;
      setMessage(newMessage);
      
      // Focus back to textarea and set cursor position
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(newMessage.length, newMessage.length);
        }
      }, 0);
    }
    setShowMacroMenu(false);
  };

  const handleMacroClose = () => {
    setShowMacroMenu(false);
    // Focus back to textarea
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  return (
    <>
      <div 
        ref={containerRef}
        className="relative ice-glass-elevated rounded-2xl p-4 transition-all duration-300 hover:shadow-lg"
        style={{
          background: `linear-gradient(135deg, 
            var(--ice-surface) 0%,
            var(--ice-base) 50%,
            var(--ice-crystalline) 100%)`
        }}
      >
        {/* Enhanced ice/glass overlay */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg, 
              var(--ice-highlight) 0%,
              transparent 30%,
              transparent 70%,
              var(--ice-reflection) 100%)`,
            opacity: 0.3
          }}
        />

        {/* Deep Research Toggle */}
        <div className="flex items-center justify-between mb-3 relative z-10">
          <button
            onClick={() => setDeepResearch(!deepResearch)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300 interactive-scale ${
              deepResearch ? 'ice-glass' : 'hover:ice-glass'
            }`}
            style={{
              background: deepResearch 
                ? `linear-gradient(135deg, 
                    var(--ice-surface) 0%,
                    var(--ice-base) 100%)`
                : 'transparent',
              color: deepResearch 
                ? 'var(--accent-blue)' 
                : 'var(--text-secondary)'
            }}
          >
            <Zap 
              size={14} 
              className={deepResearch ? 'animate-pulse-gentle' : ''}
            />
            Deep Research
          </button>

          <div className="flex items-center gap-2">
            <div 
              className="text-xs opacity-60"
              style={{ color: 'var(--text-secondary)' }}
            >
              Type / for macros
            </div>
            <div 
              className="w-6 h-6 rounded-lg ice-glass flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, 
                  var(--ice-highlight) 0%, 
                  var(--ice-crystalline) 100%)`
              }}
            >
              <span 
                className="text-xs font-semibold"
                style={{ color: 'var(--accent-blue)' }}
              >
                /
              </span>
            </div>
          </div>
        </div>

        {/* Input Container */}
        <div className="flex items-end gap-3 relative z-10">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Message Nira... (try typing / for quick info)"
              disabled={disabled}
              className="w-full resize-none rounded-xl px-4 py-3 text-sm leading-relaxed transition-all duration-300 focus:outline-none focus:ring-2 min-h-[48px] max-h-[120px]"
              style={{
                backgroundColor: 'var(--ice-base)',
                border: '1px solid var(--ice-border)',
                color: 'var(--text-primary)',
                backdropFilter: 'blur(20px)'
              }}
              rows={1}
            />
            
            {/* Placeholder enhancement */}
            <div 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none opacity-40"
              style={{
                display: message ? 'none' : 'block'
              }}
            >
              <div className="flex items-center gap-1 text-xs">
                <span style={{ color: 'var(--text-secondary)' }}>
                  Press
                </span>
                <kbd 
                  className="px-1.5 py-0.5 rounded text-xs ice-glass"
                  style={{ 
                    color: 'var(--accent-blue)',
                    fontSize: '10px'
                  }}
                >
                  /
                </kbd>
              </div>
            </div>
          </div>

          {/* Enhanced Send Button */}
          <button
            onClick={handleSubmit}
            disabled={!message.trim() || disabled}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 interactive-scale group relative overflow-hidden ${
              message.trim() && !disabled
                ? 'ice-glass-elevated shadow-lg' 
                : 'ice-glass opacity-50 cursor-not-allowed'
            }`}
            style={{
              background: message.trim() && !disabled
                ? `linear-gradient(135deg, 
                    var(--accent-blue) 0%, 
                    var(--accent-blue-bright) 100%)`
                : `linear-gradient(135deg, 
                    var(--ice-surface) 0%,
                    var(--ice-base) 100%)`
            }}
          >
            {/* Crystalline shine effect */}
            <div 
              className="absolute inset-0 rounded-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"
              style={{
                background: `linear-gradient(45deg, 
                  transparent 30%, 
                  var(--ice-highlight) 50%, 
                  transparent 70%)`
              }}
            />
            
            <div className="relative">
              {disabled ? (
                <div className="flex space-x-0.5">
                  {[0, 1, 2].map((i) => (
                    <div 
                      key={i}
                      className="w-1 h-1 rounded-full animate-bounce"
                      style={{ 
                        backgroundColor: 'var(--accent-blue)',
                        animationDelay: `${i * 150}ms`
                      }}
                    />
                  ))}
                </div>
              ) : (
                <ArrowUp 
                  size={18} 
                  className="transition-transform duration-200 group-hover:scale-110"
                  style={{ 
                    color: message.trim() ? 'white' : 'var(--text-secondary)'
                  }}
                />
              )}
            </div>
          </button>
        </div>

        {/* Enhanced bottom border glow */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-px rounded-full"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              var(--accent-blue) 20%, 
              var(--accent-blue-bright) 50%, 
              var(--accent-blue) 80%, 
              transparent 100%)`,
            opacity: 0.3
          }}
        />
      </div>

      {/* Macro Menu */}
      <MacroMenu
        isVisible={showMacroMenu}
        onSelect={handleMacroSelect}
        onClose={handleMacroClose}
        position={macroMenuPosition}
      />
    </>
  );
}