import { useState } from "react";
import { Code, FileText, Search, Mail, ChevronDown, Play, RefreshCw, Star, MapPin, Clock, Calendar, CreditCard, Shield } from "lucide-react";

interface PreviewContent {
  type: "educational" | "search" | "communication" | "code";
  title: string;
  content: any;
  isLoading?: boolean;
}

interface PreviewPanelProps {
  isActive: boolean;
  content?: PreviewContent;
  onRefresh?: () => void;
}

export function PreviewPanel({ isActive, content, onRefresh }: PreviewPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!isActive) return null;

  const getIcon = () => {
    switch (content?.type) {
      case "educational": return FileText;
      case "search": return Search;
      case "communication": return Mail;
      case "code": return Code;
      default: return FileText;
    }
  };

  const IconComponent = getIcon();

  const renderContent = () => {
    if (!content) {
      return (
        <div className="h-64 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div 
              className="w-16 h-16 rounded-xl ice-glass flex items-center justify-center mx-auto"
              style={{
                background: `linear-gradient(135deg, 
                  var(--ice-highlight) 0%, 
                  var(--ice-crystalline) 100%)`
              }}
            >
              <Code 
                size={28} 
                style={{ color: 'var(--accent-blue)' }}
              />
            </div>
            <div>
              <p 
                className="font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                Ready for Preview
              </p>
              <p 
                className="text-sm opacity-70"
                style={{ color: 'var(--text-secondary)' }}
              >
                Content will appear here when generated
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (content.isLoading) {
      return (
        <div className="h-64 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div 
              className="w-12 h-12 rounded-xl ice-glass flex items-center justify-center mx-auto animate-pulse-gentle"
              style={{
                background: `linear-gradient(135deg, 
                  var(--ice-highlight) 0%, 
                  var(--ice-crystalline) 100%)`
              }}
            >
              <RefreshCw 
                size={24} 
                style={{ color: 'var(--accent-blue)' }}
                className="animate-spin"
              />
            </div>
            <div>
              <p 
                className="font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                Generating Content...
              </p>
              <p 
                className="text-xs opacity-70"
                style={{ color: 'var(--text-secondary)' }}
              >
                AI is creating {content.type} content
              </p>
            </div>
          </div>
        </div>
      );
    }

    switch (content.type) {
      case "educational":
        return (
          <div className="p-6 space-y-4">
            <div className="ice-glass-elevated p-4 rounded-lg">
              <h4 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                Understanding Your Condition
              </h4>
              <div className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <p>Dermatological conditions can vary widely in their presentation and treatment requirements...</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="ice-glass p-3 rounded-lg">
                    <h5 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Symptoms</h5>
                    <p className="text-xs">• Persistent rash or irritation</p>
                    <p className="text-xs">• Changes in skin texture</p>
                  </div>
                  <div className="ice-glass p-3 rounded-lg">
                    <h5 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Treatment</h5>
                    <p className="text-xs">• Topical medications</p>
                    <p className="text-xs">• Lifestyle modifications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "search":
        return (
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              {[
                { name: "Dr. Sarah Kim, MD", specialty: "Dermatology & Cosmetic Surgery", rating: 4.9, reviews: 127, distance: "2.3 miles", time: "Tomorrow 2:30 PM" },
                { name: "Dr. Michael Lee, MD", specialty: "General & Pediatric Dermatology", rating: 4.8, reviews: 89, distance: "3.1 miles", time: "Tuesday 10:00 AM" },
                { name: "Dr. Lisa Rodriguez, MD", specialty: "Dermatopathology & Mohs Surgery", rating: 4.9, reviews: 156, distance: "4.2 miles", time: "Wednesday 1:15 PM" }
              ].map((provider, i) => (
                <div key={i} className="ice-glass-elevated p-4 rounded-lg interactive-lift cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium mb-1 truncate" style={{ color: 'var(--text-primary)' }}>
                        {provider.name}
                      </h4>
                      <p className="text-sm mb-2 truncate" style={{ color: 'var(--text-secondary)' }}>
                        {provider.specialty}
                      </p>
                    </div>
                    <div className="ice-glass px-2 py-1 rounded text-xs font-medium ml-2 flex-shrink-0" style={{ color: 'var(--accent-blue)' }}>
                      Open
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    <div className="flex items-center gap-1">
                      <Star 
                        size={12} 
                        style={{ color: 'var(--accent-blue)' }}
                        fill="var(--accent-blue)"
                      />
                      <span>{provider.rating} ({provider.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin 
                        size={12} 
                        style={{ color: 'var(--accent-blue)' }}
                      />
                      <span>{provider.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock 
                        size={12} 
                        style={{ color: 'var(--accent-blue)' }}
                      />
                      <span>Next: {provider.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "communication":
        return (
          <div className="p-6 space-y-4">
            <div className="ice-glass-elevated rounded-lg overflow-hidden">
              <div className="p-4 border-b" style={{ borderColor: 'var(--ice-border)' }}>
                <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  Appointment Confirmation
                </h4>
                <p className="text-sm opacity-70" style={{ color: 'var(--text-secondary)' }}>
                  Dr. Michael Lee - Tuesday, 2:30 PM
                </p>
              </div>
              <div className="p-4 space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <p>Dear Patient,</p>
                <p>Your appointment has been successfully scheduled with Dr. Michael Lee for Tuesday at 2:30 PM.</p>
                <div className="ice-glass p-3 rounded-lg">
                  <p className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Appointment Details:</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar size={12} style={{ color: 'var(--accent-blue)' }} />
                      <span>Tuesday, January 9th, 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={12} style={{ color: 'var(--accent-blue)' }} />
                      <span>2:30 PM - 3:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={12} style={{ color: 'var(--accent-blue)' }} />
                      <span>890 Health Center Blvd</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield size={12} style={{ color: 'var(--accent-blue)' }} />
                      <span>Insurance: Aetna accepted</span>
                    </div>
                  </div>
                </div>
                <p>Please arrive 15 minutes early for check-in.</p>
              </div>
            </div>
          </div>
        );

      case "code":
        return (
          <div className="p-6">
            <div className="ice-glass-elevated rounded-lg overflow-hidden">
              <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--ice-border)' }}>
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  Generated Code
                </span>
                <button className="ice-glass px-2 py-1 rounded text-xs interactive-scale">
                  <Play size={12} className="inline mr-1" />
                  Run
                </button>
              </div>
              <div className="p-4 font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                <div className="space-y-1">
                  <div><span style={{ color: '#9CA3AF' }}>// Healthcare provider search</span></div>
                  <div><span style={{ color: 'var(--accent-blue)' }}>const</span> <span style={{ color: 'var(--text-primary)' }}>providers</span> = <span style={{ color: 'var(--accent-blue-bright)' }}>searchProviders</span>({`{`}</div>
                  <div className="ml-4"><span style={{ color: 'var(--text-primary)' }}>specialty:</span> <span style={{ color: 'var(--accent-blue)' }}>'dermatology'</span>,</div>
                  <div className="ml-4"><span style={{ color: 'var(--text-primary)' }}>insurance:</span> <span style={{ color: 'var(--accent-blue)' }}>'aetna'</span>,</div>
                  <div className="ml-4"><span style={{ color: 'var(--text-primary)' }}>radius:</span> <span style={{ color: 'var(--accent-blue-bright)' }}>10</span></div>
                  <div>{`});`}</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="ice-glass-elevated rounded-xl overflow-hidden animate-slide-up">
      {/* Panel Header */}
      <div className="p-4 border-b border-ice-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div 
                className="w-8 h-8 rounded-lg ice-glass flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, 
                    var(--ice-highlight) 0%, 
                    var(--ice-crystalline) 100%)`
                }}
              >
                <IconComponent 
                  size={16} 
                  style={{ color: 'var(--accent-blue)' }}
                />
              </div>
              {content?.isLoading && (
                <div 
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse-gentle"
                  style={{ backgroundColor: 'var(--accent-blue)' }}
                />
              )}
            </div>
            <div>
              <h3 
                className="font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                Preview
              </h3>
              <p 
                className="text-xs opacity-70"
                style={{ color: 'var(--text-secondary)' }}
              >
                {content ? `${content.type} • ${content.title}` : 'Ready for content'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Refresh Button */}
            {content && onRefresh && (
              <button
                onClick={onRefresh}
                className="ice-glass p-2 rounded-lg interactive-scale transition-all duration-200"
              >
                <RefreshCw 
                  size={14} 
                  style={{ color: 'var(--text-secondary)' }}
                />
              </button>
            )}
            
            {/* Expand/Collapse */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ice-glass p-2 rounded-lg interactive-scale transition-all duration-200"
            >
              <ChevronDown 
                size={14} 
                style={{ color: 'var(--text-secondary)' }}
                className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      {isExpanded && (
        <div className="max-h-96 overflow-y-auto">
          {renderContent()}
        </div>
      )}
    </div>
  );
}