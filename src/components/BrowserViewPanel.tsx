import { useState } from "react";
import { Monitor, Play, Pause, RotateCcw, ExternalLink, Hand, Eye, Star, MapPin, Clock, Calendar, User, CheckCircle, Loader2, Phone, Mail, GraduationCap, Award, Building, Shield, CreditCard, Timer, ChevronRight, X } from "lucide-react";

interface BrowserViewPanelProps {
  isActive: boolean;
  currentUrl?: string;
  isAutomating?: boolean;
  onTakeControl?: () => void;
  onReleaseControl?: () => void;
  hasUserControl?: boolean;
  onConfirmAppointment?: () => void;
  onClose?: () => void;
  content?: React.ReactNode;
  providerData?: any;
  appointmentData?: any;
}

export function BrowserViewPanel({ 
  isActive, 
  currentUrl = "", 
  isAutomating = false,
  onTakeControl,
  onReleaseControl,
  hasUserControl = false,
  onConfirmAppointment,
  onClose,
  content,
  providerData,
  appointmentData
}: BrowserViewPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!isActive) return null;

  const defaultContent = (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div 
          className="w-16 h-16 rounded-xl ice-glass flex items-center justify-center mx-auto"
          style={{
            background: `linear-gradient(135deg, 
              var(--ice-highlight) 0%, 
              var(--ice-crystalline) 100%)`
          }}
        >
          <Monitor 
            size={28} 
            style={{ color: 'var(--accent-blue)' }}
          />
        </div>
        <div>
          <p 
            className="font-medium mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Browser Ready
          </p>
          <p 
            className="text-sm opacity-70"
            style={{ color: 'var(--text-secondary)' }}
          >
            Waiting for navigation instructions
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Browser Header */}
      <div 
        className="flex items-center justify-between p-4 border-b ice-glass-elevated"
        style={{ borderColor: 'var(--ice-border)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: '#ef4444' }}
            />
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: '#f59e0b' }}
            />
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: '#22c55e' }}
            />
          </div>
          <div 
            className="flex-1 px-3 py-2 rounded-lg ice-glass text-sm"
            style={{ 
              background: 'var(--ice-base)',
              color: 'var(--text-secondary)'
            }}
          >
            {currentUrl || "Ready to navigate"}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Control Buttons */}
          {isAutomating && !hasUserControl && (
            <button
              onClick={onTakeControl}
              className="ice-glass px-3 py-2 rounded-lg text-sm font-medium interactive-scale transition-colors"
              style={{ color: 'var(--accent-blue)' }}
            >
              <Hand size={14} className="mr-1" />
              Take Control
            </button>
          )}

          {hasUserControl && (
            <button
              onClick={onReleaseControl}
              className="ice-glass px-3 py-2 rounded-lg text-sm font-medium interactive-scale transition-colors"
              style={{ color: 'var(--accent-blue)' }}
            >
              <Play size={14} className="mr-1" />
              Resume AI
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ice-glass p-2 rounded-lg interactive-scale"
            style={{ color: 'var(--text-secondary)' }}
          >
            <Eye size={16} />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="ice-glass p-2 rounded-lg interactive-scale hover:bg-red-500/20"
              style={{ color: 'var(--text-secondary)' }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Browser Content */}
      {isExpanded && (
        <div 
          className="flex-1 ice-glass"
          style={{ 
            background: `linear-gradient(135deg, 
              var(--ice-surface) 0%,
              var(--ice-base) 100%)`
          }}
        >
          {content || defaultContent}
        </div>
      )}

      {/* Status Bar */}
      <div 
        className="flex items-center justify-between p-3 border-t text-sm"
        style={{ 
          borderColor: 'var(--ice-border)',
          color: 'var(--text-secondary)',
          background: 'var(--ice-base)'
        }}
      >
        <div className="flex items-center gap-2">
          {isAutomating ? (
            <>
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <div 
                    key={i}
                    className="w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{ 
                      backgroundColor: 'var(--accent-blue)',
                      animationDelay: `${i * 150}ms`
                    }}
                  />
                ))}
              </div>
              <span>AI Agent Active</span>
            </>
          ) : hasUserControl ? (
            <>
              <Hand size={12} style={{ color: 'var(--accent-blue)' }} />
              <span>Manual Control</span>
            </>
          ) : (
            <>
              <Monitor size={12} />
              <span>Ready</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs opacity-60">
            {hasUserControl ? "User Mode" : isAutomating ? "AI Mode" : "Standby"}
          </span>
        </div>
      </div>
    </div>
  );
}