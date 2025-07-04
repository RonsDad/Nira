import { ReactNode, useEffect, useState } from "react";
import { Bot, User } from "lucide-react";

interface ChatBubbleProps {
  type: "ai" | "user";
  children: ReactNode;
  timestamp?: string;
}

export function ChatBubble({ type, children, timestamp }: ChatBubbleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isAI = type === "ai";
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-8 animate-slide-up ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className={`flex items-start gap-3 max-w-2xl ${isAI ? 'mr-16' : 'ml-16 flex-row-reverse'}`}>
        {/* Avatar */}
        <div 
          className={`flex-shrink-0 w-10 h-10 rounded-xl glass-effect-elevated flex items-center justify-center animate-scale-in group ${
            isAI ? 'animate-glow-pulse' : ''
          }`}
          style={{
            backgroundColor: isAI ? 'var(--glass-accent)' : 'var(--glass-dark)',
            animationDelay: '200ms'
          }}
        >
          {isAI ? (
            <Bot 
              size={18} 
              style={{ color: 'var(--accent-blue)' }}
              className="transition-transform duration-200 group-hover:scale-110"
            />
          ) : (
            <User 
              size={18} 
              style={{ color: 'var(--text-primary)' }}
              className="transition-transform duration-200 group-hover:scale-110"
            />
          )}
        </div>

        {/* Message Container */}
        <div 
          className={`rounded-2xl p-5 glass-effect-elevated interactive-lift relative overflow-hidden group ${
            isAI ? '' : 'glass-accent'
          }`}
          style={{
            backgroundColor: isAI ? 'var(--glass-dark-elevated)' : 'var(--glass-accent)',
            color: 'var(--text-primary)',
            animationDelay: '300ms'
          }}
        >
          {/* Message content shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500 pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-10">
            {children}
            
            {/* Enhanced timestamp */}
            {timestamp && (
              <div 
                className="flex items-center gap-2 mt-3 pt-2 border-t border-white/10"
                style={{ color: 'var(--text-tertiary)' }}
              >
                <div 
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: isAI ? 'var(--accent-blue)' : 'var(--text-tertiary)' }}
                />
                <span className="text-xs font-medium">
                  {timestamp}
                </span>
              </div>
            )}
          </div>

          {/* Message type indicator */}
          <div 
            className={`absolute top-3 ${isAI ? 'right-3' : 'left-3'} w-2 h-2 rounded-full opacity-60`}
            style={{ 
              backgroundColor: isAI ? 'var(--accent-blue)' : 'var(--text-primary)'
            }}
          />

          {/* Subtle border glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}