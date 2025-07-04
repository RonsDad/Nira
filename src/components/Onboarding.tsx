import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { InsuranceCardCapture } from "./InsuranceCardCapture";
import { 
  User, 
  Shield, 
  Heart, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Activity,
  Calendar,
  Phone,
  MapPin,
  CreditCard
} from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
  onSubmitData?: (data: any) => Promise<boolean>;
}

export function Onboarding({ onComplete, onSubmitData }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [useInsuranceCapture, setUseInsuranceCapture] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    insuranceProvider: "",
    policyNumber: "",
    memberId: "",
    groupNumber: "",
    healthGoals: [] as string[],
    notifications: true
  });

  const steps = [
    {
      id: "welcome",
      title: "Welcome to Nira",
      subtitle: "Let's get you set up with your AI healthcare assistant",
      icon: Sparkles
    },
    {
      id: "personal",
      title: "Personal Information",
      subtitle: "Help us personalize your healthcare experience",
      icon: User
    },
    {
      id: "insurance",
      title: "Insurance Information",
      subtitle: "Connect your insurance for seamless care coordination",
      icon: Shield
    },
    {
      id: "preferences",
      title: "Healthcare Preferences",
      subtitle: "Customize your care priorities and goals",
      icon: Heart
    },
    {
      id: "complete",
      title: "You're All Set!",
      subtitle: "Welcome to your personalized healthcare command center",
      icon: CheckCircle
    }
  ];

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsLoading(true);
      setError(null);
      
      try {
        if (onSubmitData) {
          const success = await onSubmitData(formData);
          if (success) {
            onComplete();
          } else {
            setError("Failed to save your information. Please try again.");
            setIsLoading(false);
          }
        } else {
          // For demo purposes, proceed directly
          onComplete();
        }
      } catch (err) {
        setError("Unable to connect to our servers. Please check your connection and try again.");
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleHealthGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      healthGoals: prev.healthGoals.includes(goal)
        ? prev.healthGoals.filter(g => g !== goal)
        : [...prev.healthGoals, goal]
    }));
  };

  const handleInsuranceDataExtracted = (data: any) => {
    setFormData(prev => ({
      ...prev,
      insuranceProvider: data.provider,
      policyNumber: data.policyNumber,
      memberId: data.memberId,
      groupNumber: data.groupNumber
    }));
    setUseInsuranceCapture(false);
  };

  const handleSkipInsuranceCapture = () => {
    setUseInsuranceCapture(false);
  };

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-8 relative overflow-hidden"
      style={{ background: 'var(--background-void-gradient)' }}
    >
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

      {/* Onboarding Card */}
      <div className="w-full max-w-2xl relative z-10">
        <div 
          className="ice-glass-elevated rounded-2xl p-8 border animate-fade-in"
          style={{
            borderColor: 'var(--ice-border)',
            background: `linear-gradient(135deg, 
              var(--ice-surface) 0%,
              var(--ice-base) 30%,
              var(--ice-crystalline) 100%)`
          }}
        >
          {/* Progress Bar */}
          <div className="mb-8">
            <div 
              className="flex justify-between items-center mb-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span className="text-sm font-medium">Step {currentStep + 1} of {steps.length}</span>
              <span className="text-sm font-medium">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div 
              className="w-full h-2 rounded-full ice-glass"
              style={{ background: 'var(--ice-base)' }}
            >
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                  background: 'linear-gradient(90deg, #3B82F6 0%, #2563EB 100%)'
                }}
              />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div 
                className="w-16 h-16 rounded-2xl ice-glass-elevated flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, 
                    var(--ice-highlight) 0%, 
                    var(--ice-crystalline) 100%)`
                }}
              >
                <IconComponent 
                  size={32} 
                  style={{ color: 'var(--accent-blue)' }}
                />
              </div>
            </div>
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              {currentStepData.title}
            </h1>
            <p 
              className="text-lg opacity-80"
              style={{ color: 'var(--text-secondary)' }}
            >
              {currentStepData.subtitle}
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div 
              className="mb-6 ice-glass p-4 rounded-xl text-center"
              style={{ 
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}
            >
              <p 
                className="text-sm font-medium"
                style={{ color: '#EF4444' }}
              >
                {error}
              </p>
            </div>
          )}

          {/* Step Content */}
          <div className="mb-8">
            {currentStep === 0 && (
              <div className="space-y-6">
                <div 
                  className="ice-glass p-6 rounded-xl text-center"
                  style={{ background: 'var(--ice-base)' }}
                >
                  <Activity 
                    size={48} 
                    className="mx-auto mb-4"
                    style={{ color: 'var(--accent-blue)' }}
                  />
                  <h3 
                    className="text-xl font-semibold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    AI-Powered Healthcare Management
                  </h3>
                  <p 
                    className="opacity-80"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Nira uses advanced AI to help you manage appointments, insurance, prescriptions, and more - all in one secure platform.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div 
                    className="ice-glass p-4 rounded-xl text-center"
                    style={{ background: 'var(--ice-base)' }}
                  >
                    <Calendar 
                      size={24} 
                      className="mx-auto mb-2"
                      style={{ color: 'var(--accent-blue)' }}
                    />
                    <h4 
                      className="font-semibold mb-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Smart Scheduling
                    </h4>
                    <p 
                      className="text-sm opacity-80"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      AI finds the best appointment times
                    </p>
                  </div>
                  
                  <div 
                    className="ice-glass p-4 rounded-xl text-center"
                    style={{ background: 'var(--ice-base)' }}
                  >
                    <Shield 
                      size={24} 
                      className="mx-auto mb-2"
                      style={{ color: 'var(--accent-blue)' }}
                    />
                    <h4 
                      className="font-semibold mb-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Insurance Help
                    </h4>
                    <p 
                      className="text-sm opacity-80"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Automated coverage verification
                    </p>
                  </div>
                  
                  <div 
                    className="ice-glass p-4 rounded-xl text-center"
                    style={{ background: 'var(--ice-base)' }}
                  >
                    <Phone 
                      size={24} 
                      className="mx-auto mb-2"
                      style={{ color: 'var(--accent-blue)' }}
                    />
                    <h4 
                      className="font-semibold mb-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      AI Assistant
                    </h4>
                    <p 
                      className="text-sm opacity-80"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      24/7 healthcare support
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label 
                      htmlFor="firstName"
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      placeholder="Enter your first name"
                      className="w-full h-12 ice-glass-elevated border-0 text-white placeholder-gray-400"
                      style={{
                        background: 'var(--ice-base)',
                        color: 'var(--text-primary)'
                      }}
                    />
                  </div>
                  
                  <div>
                    <Label 
                      htmlFor="lastName"
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      placeholder="Enter your last name"
                      className="w-full h-12 ice-glass-elevated border-0 text-white placeholder-gray-400"
                      style={{
                        background: 'var(--ice-base)',
                        color: 'var(--text-primary)'
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <Label 
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Date of Birth
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                    className="w-full h-12 ice-glass-elevated border-0 text-white"
                    style={{
                      background: 'var(--ice-base)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
                
                <div>
                  <Label 
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    className="w-full h-12 ice-glass-elevated border-0 text-white placeholder-gray-400"
                    style={{
                      background: 'var(--ice-base)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                {useInsuranceCapture ? (
                  <InsuranceCardCapture 
                    onDataExtracted={handleInsuranceDataExtracted}
                    onSkip={handleSkipInsuranceCapture}
                  />
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label 
                          htmlFor="insuranceProvider"
                          className="block text-sm font-medium mb-2"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          Insurance Provider
                        </Label>
                        <Input
                          id="insuranceProvider"
                          type="text"
                          value={formData.insuranceProvider}
                          onChange={(e) => updateFormData("insuranceProvider", e.target.value)}
                          placeholder="e.g., Aetna, Blue Cross Blue Shield"
                          className="w-full h-12 ice-glass-elevated border-0 text-white placeholder-gray-400"
                          style={{
                            background: 'var(--ice-base)',
                            color: 'var(--text-primary)'
                          }}
                        />
                      </div>
                      
                      <div>
                        <Label 
                          htmlFor="policyNumber"
                          className="block text-sm font-medium mb-2"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          Policy Number
                        </Label>
                        <Input
                          id="policyNumber"
                          type="text"
                          value={formData.policyNumber}
                          onChange={(e) => updateFormData("policyNumber", e.target.value)}
                          placeholder="Enter your policy number"
                          className="w-full h-12 ice-glass-elevated border-0 text-white placeholder-gray-400"
                          style={{
                            background: 'var(--ice-base)',
                            color: 'var(--text-primary)'
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label 
                          htmlFor="memberId"
                          className="block text-sm font-medium mb-2"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          Member ID
                        </Label>
                        <Input
                          id="memberId"
                          type="text"
                          value={formData.memberId}
                          onChange={(e) => updateFormData("memberId", e.target.value)}
                          placeholder="Enter your member ID"
                          className="w-full h-12 ice-glass-elevated border-0 text-white placeholder-gray-400"
                          style={{
                            background: 'var(--ice-base)',
                            color: 'var(--text-primary)'
                          }}
                        />
                      </div>
                      
                      <div>
                        <Label 
                          htmlFor="groupNumber"
                          className="block text-sm font-medium mb-2"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          Group Number
                        </Label>
                        <Input
                          id="groupNumber"
                          type="text"
                          value={formData.groupNumber}
                          onChange={(e) => updateFormData("groupNumber", e.target.value)}
                          placeholder="Enter your group number"
                          className="w-full h-12 ice-glass-elevated border-0 text-white placeholder-gray-400"
                          style={{
                            background: 'var(--ice-base)',
                            color: 'var(--text-primary)'
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Button
                        onClick={() => setUseInsuranceCapture(true)}
                        variant="outline"
                        className="ice-glass border-0"
                        style={{
                          background: 'var(--ice-base)',
                          color: 'var(--accent-blue)'
                        }}
                      >
                        <CreditCard size={16} className="mr-2" />
                        Use Insurance Card Scanner Instead
                      </Button>
                    </div>
                    
                    <div 
                      className="ice-glass p-4 rounded-xl flex items-center gap-3"
                      style={{ background: 'var(--ice-base)' }}
                    >
                      <Shield 
                        size={20} 
                        style={{ color: 'var(--accent-blue)' }}
                      />
                      <div>
                        <p 
                          className="text-sm font-medium"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          We'll verify your coverage automatically
                        </p>
                        <p 
                          className="text-xs opacity-80"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          Your information is encrypted and HIPAA compliant
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 
                    className="text-lg font-semibold mb-4"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    What are your primary healthcare goals?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Preventive Care",
                      "Chronic Condition Management",
                      "Mental Health Support",
                      "Fitness & Wellness",
                      "Specialist Consultations",
                      "Medication Management"
                    ].map((goal) => (
                      <button
                        key={goal}
                        onClick={() => toggleHealthGoal(goal)}
                        className={`p-4 rounded-xl text-left transition-all duration-200 interactive-scale ${
                          formData.healthGoals.includes(goal)
                            ? 'border-2'
                            : 'border-0'
                        }`}
                        style={{
                          background: formData.healthGoals.includes(goal)
                            ? 'rgba(59, 130, 246, 0.1)'
                            : 'var(--ice-base)',
                          borderColor: formData.healthGoals.includes(goal)
                            ? 'var(--accent-blue)'
                            : 'transparent'
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className={`w-4 h-4 rounded-full transition-all duration-200 ${
                              formData.healthGoals.includes(goal)
                                ? 'bg-blue-500'
                                : 'bg-gray-600'
                            }`}
                          />
                          <span 
                            className="font-medium"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {goal}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6 text-center">
                <div 
                  className="ice-glass p-8 rounded-xl"
                  style={{ background: 'var(--ice-base)' }}
                >
                  <CheckCircle 
                    size={64} 
                    className="mx-auto mb-4"
                    style={{ color: '#22C55E' }}
                  />
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Profile Complete!
                  </h3>
                  <p 
                    className="opacity-80 mb-4"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Your AI healthcare assistant is now personalized and ready to help you manage your health with ease.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <div 
                        className="w-12 h-12 mx-auto mb-2 rounded-xl ice-glass-elevated flex items-center justify-center"
                        style={{ background: 'var(--ice-highlight)' }}
                      >
                        <Calendar 
                          size={20} 
                          style={{ color: 'var(--accent-blue)' }}
                        />
                      </div>
                      <p 
                        className="text-sm font-medium"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Smart Scheduling
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div 
                        className="w-12 h-12 mx-auto mb-2 rounded-xl ice-glass-elevated flex items-center justify-center"
                        style={{ background: 'var(--ice-highlight)' }}
                      >
                        <Shield 
                          size={20} 
                          style={{ color: 'var(--accent-blue)' }}
                        />
                      </div>
                      <p 
                        className="text-sm font-medium"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Insurance Ready
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div 
                        className="w-12 h-12 mx-auto mb-2 rounded-xl ice-glass-elevated flex items-center justify-center"
                        style={{ background: 'var(--ice-highlight)' }}
                      >
                        <Heart 
                          size={20} 
                          style={{ color: 'var(--accent-blue)' }}
                        />
                      </div>
                      <p 
                        className="text-sm font-medium"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Personalized Care
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              onClick={handleBack}
              disabled={currentStep === 0}
              variant="outline"
              className="flex items-center gap-2 ice-glass-elevated border-0"
              style={{
                background: currentStep === 0 ? 'var(--ice-base)' : 'var(--ice-highlight)',
                color: currentStep === 0 ? 'var(--text-tertiary)' : 'var(--text-primary)',
                opacity: currentStep === 0 ? 0.5 : 1
              }}
            >
              <ArrowLeft size={16} />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={isLoading || (currentStep === 2 && useInsuranceCapture)}
              className="flex items-center gap-2 interactive-scale"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                color: 'white',
                border: 'none',
                opacity: (currentStep === 2 && useInsuranceCapture) ? 0.5 : 1
              }}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <div 
                        key={i}
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{ 
                          backgroundColor: 'white',
                          animationDelay: `${i * 150}ms`
                        }}
                      />
                    ))}
                  </div>
                  <span>Setting up...</span>
                </div>
              ) : (
                <>
                  {currentStep === steps.length - 1 ? "Enter Nira" : "Continue"}
                  <ArrowRight size={16} />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}