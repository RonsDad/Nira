import { Check, Clock, Globe } from "lucide-react";
import { useState, useEffect } from "react";

interface AutomationStep {
  id: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
}

interface BrowserAutomationViewerProps {
  url: string;
  steps: AutomationStep[];
  onComplete?: () => void;
}

export function BrowserAutomationViewer({ 
  url, 
  steps: initialSteps, 
  onComplete 
}: BrowserAutomationViewerProps) {
  const [steps, setSteps] = useState(initialSteps);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSteps(prevSteps => {
        const newSteps = [...prevSteps];
        const currentStep = newSteps[currentStepIndex];
        
        if (currentStep && currentStep.status === "in-progress") {
          newSteps[currentStepIndex] = { ...currentStep, status: "completed" };
          
          if (currentStepIndex < newSteps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
            newSteps[currentStepIndex + 1] = { 
              ...newSteps[currentStepIndex + 1], 
              status: "in-progress" 
            };
          } else {
            onComplete?.();
          }
        } else if (currentStep && currentStep.status === "pending") {
          newSteps[currentStepIndex] = { ...currentStep, status: "in-progress" };
        }
        
        return newSteps;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [currentStepIndex, onComplete]);

  return (
    <div 
      className="rounded-xl glass-effect p-4 my-4"
      style={{ backgroundColor: 'var(--color-glass-dark)' }}
    >
      {/* Browser Header */}
      <div 
        className="flex items-center gap-3 p-3 rounded-lg mb-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      >
        <Globe size={16} style={{ color: 'var(--color-text-secondary)' }} />
        <span 
          className="font-mono text-sm"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {url}
        </span>
      </div>

      {/* Mock Browser View */}
      <div 
        className="rounded-lg p-4 mb-4 min-h-[120px] flex items-center justify-center"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        <div className="text-center">
          <div 
            className="w-12 h-12 rounded-full border-2 mx-auto mb-2 flex items-center justify-center"
            style={{ borderColor: 'var(--color-accent-blue)' }}
          >
            <div 
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: 'var(--color-accent-blue)' }}
            />
          </div>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Interacting with appointment portal...
          </p>
        </div>
      </div>

      {/* Step Progress */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {step.status === "completed" ? (
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-accent-blue)' }}
                >
                  <Check size={12} color="white" />
                </div>
              ) : step.status === "in-progress" ? (
                <div 
                  className="w-5 h-5 rounded-full border-2 border-dashed animate-spin flex items-center justify-center"
                  style={{ borderColor: 'var(--color-accent-blue)' }}
                >
                  <Clock size={10} style={{ color: 'var(--color-accent-blue)' }} />
                </div>
              ) : (
                <div 
                  className="w-5 h-5 rounded-full border-2"
                  style={{ borderColor: 'var(--color-text-secondary)' }}
                />
              )}
            </div>
            <span 
              className={step.status === "completed" ? "opacity-60" : ""}
              style={{ color: 'var(--color-text-primary)' }}
            >
              {step.description}
              {step.status === "in-progress" && (
                <span style={{ color: 'var(--color-accent-blue)' }}> (In Progress)</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}