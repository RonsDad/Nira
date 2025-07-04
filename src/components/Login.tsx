import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Eye, EyeOff, Shield, Sparkles, ArrowRight, Activity } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
  onLoginRequest?: (email: string, password: string) => Promise<boolean>;
}

export function Login({ onLogin, onLoginRequest }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (onLoginRequest) {
        const success = await onLoginRequest(email, password);
        if (success) {
          onLogin();
        } else {
          setError("Invalid email or password. Please try again.");
        }
      } else {
        // For demo purposes, proceed directly
        onLogin();
      }
    } catch (err) {
      setError("Unable to connect to login service. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
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
                <Activity 
                  size={32} 
                  style={{ color: 'var(--accent-blue)' }}
                />
              </div>
            </div>
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Welcome to Nira
            </h1>
            <p 
              className="text-lg opacity-80"
              style={{ color: 'var(--text-secondary)' }}
            >
              Your AI-powered healthcare companion
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label 
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-12 ice-glass-elevated border-0 text-white placeholder-gray-400"
                  style={{
                    background: 'var(--ice-base)',
                    color: 'var(--text-primary)'
                  }}
                  required
                />
              </div>

              <div>
                <Label 
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-12 ice-glass-elevated border-0 text-white placeholder-gray-400 pr-12"
                    style={{
                      background: 'var(--ice-base)',
                      color: 'var(--text-primary)'
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div 
                className="ice-glass p-4 rounded-xl text-center"
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

            {/* Security Notice */}
            <div 
              className="ice-glass p-4 rounded-xl flex items-center gap-3"
              style={{ background: 'var(--ice-base)' }}
            >
              <Shield 
                size={16} 
                style={{ color: 'var(--accent-blue)' }}
              />
              <div>
                <p 
                  className="text-sm font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  HIPAA Compliant & Secure
                </p>
                <p 
                  className="text-xs opacity-80"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Your healthcare data is protected with enterprise-grade encryption
                </p>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full h-12 text-white font-semibold text-base interactive-scale"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                border: 'none'
              }}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
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
                  <span>Signing you in...</span>
                </div>
              ) : (
                <span className="flex items-center gap-3">
                  Sign In to Nira
                  <ArrowRight size={20} />
                </span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p 
              className="text-sm opacity-70"
              style={{ color: 'var(--text-secondary)' }}
            >
              New to Nira? You'll be guided through setup after signing in.
            </p>
          </div>
        </div>

        {/* Branding */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-2 opacity-60">
            <Sparkles 
              size={16} 
              style={{ color: 'var(--accent-blue)' }}
            />
            <span 
              className="text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              Powered by Advanced AI Healthcare Intelligence
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
