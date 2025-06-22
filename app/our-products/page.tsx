'use client'

import { useState } from "react";
import { Brain, Shield, MessageSquare, ChevronRight, Sparkles, Network, Compass, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/ui/Header";
import { toast } from "sonner";

export default function OurProducts() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    specialty: '',
    interestedIn: {
      nira: false,
      cura: false,
      florence: false
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          message: `Early Adopter Request - Interested in: ${Object.entries(formData.interestedIn)
            .filter(([_, value]) => value)
            .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
            .join(', ')}`
        }),
      });

      if (response.ok) {
        toast.success("Welcome to the early adopter program! We'll be in touch soon.");
        setFormData({
          fullName: '',
          email: '',
          specialty: '',
          interestedIn: { nira: false, cura: false, florence: false }
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to submit. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
            Smarter Tools for <span className="text-blue-700">Modern Clinicians</span>.
          </h1>
          <p className="font-body text-lg sm:text-xl md:text-2xl text-slate-700 mb-6 sm:mb-10 max-w-4xl mx-auto leading-relaxed">
            Meet your new AI-powered partners. We handle the complexities of your career and practice, 
            so you can focus on what matters most: patient care.
          </p>
          <Button 
            size="lg" 
            className="bg-slate-800 hover:bg-slate-900 text-white font-body font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto max-w-sm mx-auto sm:mx-0"
            onClick={() => document.getElementById('early-adopter')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join the Early Adopter Program
          </Button>
        </div>
        
        {/* Abstract Hero SVG */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg viewBox="0 0 1440 800" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
            <path d="M0,400 Q360,200 720,400 T1440,400 L1440,800 L0,800 Z" fill="url(#heroGradient)"/>
            <circle cx="200" cy="200" r="100" fill="#3B82F6" opacity="0.1" className="animate-pulse"/>
            <circle cx="1240" cy="600" r="150" fill="#1E40AF" opacity="0.1" className="animate-pulse animation-delay-2000"/>
          </svg>
        </div>
      </section>

      {/* Product Section 1: Nira */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 fade-in-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                Nira
              </h2>
              <p className="font-body text-xl sm:text-2xl text-blue-700 mb-4 sm:mb-6">
                The Command Center for Clinical Operations
              </p>
              <p className="font-body text-lg text-slate-700 mb-8 leading-relaxed">
                Nira streamlines your workflow by consolidating administrative tasks, clinical documentation, 
                and patient management into one intelligent platform. Reduce administrative overhead by up to 
                70% and gain back valuable hours in your day.
              </p>
              
              {/* Nira SVG Illustration */}
              <div className="relative h-48 sm:h-64 mb-6 sm:mb-8">
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  <defs>
                    <radialGradient id="niraGlow">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.2"/>
                    </radialGradient>
                  </defs>
                  {/* Central Orb */}
                  <circle cx="200" cy="150" r="40" fill="url(#niraGlow)" className="animate-pulse"/>
                  <circle cx="200" cy="150" r="30" fill="#3B82F6" opacity="0.9"/>
                  
                  {/* Data Streams */}
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <g key={i} transform={`rotate(${angle} 200 150)`}>
                      <line x1="200" y1="110" x2="200" y2="50" stroke="#3B82F6" strokeWidth="2" opacity="0.6"/>
                      <circle cx="200" cy="50" r="4" fill="#3B82F6"/>
                      <rect x="190" y="40" width="20" height="2" fill="#3B82F6" opacity="0.4"/>
                    </g>
                  ))}
                  
                  <text x="200" y="240" textAnchor="middle" className="font-heading font-bold text-xl fill-slate-700">
                    Control & Innovation
                  </text>
                </svg>
              </div>
            </div>
            
            {/* Nira UI Preview */}
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden order-1 lg:order-2">
              <div className="bg-slate-100 px-6 py-4 flex items-center space-x-2 border-b border-slate-200">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 bg-slate-200 rounded-lg px-4 py-1 mx-4">
                  <span className="text-slate-600 text-sm font-body">nira.ronai.com/dashboard</span>
                </div>
              </div>
              
              <div className="relative aspect-video bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4"/>
                  <p className="text-slate-600 font-body">Nira Dashboard Preview</p>
                  <p className="text-sm text-slate-500 mt-2">Interactive demo coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section 2: Cura */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-50 fade-in-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Cura UI Preview */}
            <div className="order-2 lg:order-1 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-6 py-4 flex items-center space-x-2 border-b border-slate-200">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 bg-slate-200 rounded-lg px-4 py-1 mx-4">
                  <span className="text-slate-600 text-sm font-body">cura.ronai.com/career</span>
                </div>
              </div>
              
              <div className="relative aspect-video bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <Compass className="w-16 h-16 text-teal-600 mx-auto mb-4"/>
                  <p className="text-slate-600 font-body">Cura Interface Preview</p>
                  <p className="text-sm text-slate-500 mt-2">Career management reimagined</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                Cura - Your AI Career Agent
              </h2>
              <p className="font-body text-xl sm:text-2xl text-teal-700 mb-4 sm:mb-6">
                Maps Your Clinical Career with Confidence.
              </p>
              <p className="font-body text-lg text-slate-700 mb-8 leading-relaxed">
                Cura is your personal AI agent dedicated to your professional growth. From finding the perfect 
                travel assignment to managing your credentials and preparing for your next big step, Cura has you covered.
              </p>
              
              {/* Key Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-teal-600"/>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-base sm:text-lg text-slate-900">Job Matching</h4>
                    <p className="text-sm text-slate-600">Find assignments tailored to your skills</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-teal-600"/>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-base sm:text-lg text-slate-900">License Management</h4>
                    <p className="text-sm text-slate-600">Never miss a renewal</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Network className="w-5 h-5 text-teal-600"/>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-base sm:text-lg text-slate-900">Assignment Logistics</h4>
                    <p className="text-sm text-slate-600">Manage everything in one place</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-teal-600"/>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-base sm:text-lg text-slate-900">Career Development</h4>
                    <p className="text-sm text-slate-600">Grow with AI-powered guidance</p>
                  </div>
                </div>
              </div>
              
              {/* Cura SVG Illustration */}
              <div className="relative h-40 sm:h-48">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="curaPath" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#0D9488" stopOpacity="0.8"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Career Path */}
                  <path d="M50,150 Q100,100 200,100 T350,50" 
                        stroke="url(#curaPath)" 
                        strokeWidth="4" 
                        fill="none"/>
                  
                  {/* Milestones */}
                  <circle cx="50" cy="150" r="8" fill="#14B8A6"/>
                  <circle cx="200" cy="100" r="10" fill="#14B8A6"/>
                  <circle cx="350" cy="50" r="12" fill="#0D9488"/>
                  
                  {/* Icons */}
                  <text x="50" y="180" textAnchor="middle" className="text-xs fill-slate-600">Start</text>
                  <text x="200" y="130" textAnchor="middle" className="text-xs fill-slate-600">Growth</text>
                  <text x="350" y="80" textAnchor="middle" className="text-xs fill-slate-600">Success</text>
                  
                  {/* Compass */}
                  <g transform="translate(200, 50)">
                    <circle r="20" fill="none" stroke="#14B8A6" strokeWidth="2"/>
                    <path d="M0,-20 L5,-5 L0,0 L-5,-5 Z" fill="#14B8A6"/>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section 3: Florence */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 fade-in-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                Florence - Clinical Chat, Reimagined
              </h2>
              <p className="font-body text-xl sm:text-2xl text-purple-700 mb-4 sm:mb-6">
                Your On-Demand Clinical Co-pilot.
              </p>
              <p className="font-body text-lg text-slate-700 mb-8 leading-relaxed">
                Meet Florence, your secure, conversational AI partner. Ask complex clinical questions, 
                get evidence-based answers in seconds, and draft documentation with ease. It's like having 
                a clinical expert in your pocket.
              </p>
              
              {/* Florence SVG Illustration */}
              <div className="relative h-48 sm:h-64 mb-6 sm:mb-8">
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  <defs>
                    <linearGradient id="florenceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9333EA" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.1"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Brain Outline */}
                  <path d="M200,80 Q160,80 150,110 T160,150 Q170,170 200,170 Q230,170 240,150 T250,110 Q240,80 200,80"
                        fill="url(#florenceGradient)"
                        stroke="#9333EA"
                        strokeWidth="2"/>
                  
                  {/* Neural connections */}
                  <circle cx="180" cy="100" r="4" fill="#9333EA"/>
                  <circle cx="220" cy="100" r="4" fill="#9333EA"/>
                  <circle cx="200" cy="130" r="4" fill="#9333EA"/>
                  <line x1="180" y1="100" x2="200" y2="130" stroke="#9333EA" strokeWidth="1" opacity="0.5"/>
                  <line x1="220" y1="100" x2="200" y2="130" stroke="#9333EA" strokeWidth="1" opacity="0.5"/>
                  
                  {/* Chat Bubbles */}
                  <rect x="100" y="190" width="80" height="40" rx="20" fill="#E9D5FF" stroke="#9333EA" strokeWidth="1"/>
                  <rect x="220" y="210" width="80" height="40" rx="20" fill="#E9D5FF" stroke="#9333EA" strokeWidth="1"/>
                  
                  <text x="140" y="215" textAnchor="middle" className="text-xs fill-slate-700">Question</text>
                  <text x="260" y="235" textAnchor="middle" className="text-xs fill-slate-700">Answer</text>
                  
                  <text x="200" y="280" textAnchor="middle" className="font-heading font-bold text-xl fill-slate-700">
                    Intelligence & Conversation
                  </text>
                </svg>
              </div>
            </div>
            
            {/* Florence UI Preview */}
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden order-1 lg:order-2">
              <div className="bg-slate-100 px-6 py-4 flex items-center space-x-2 border-b border-slate-200">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 bg-slate-200 rounded-lg px-4 py-1 mx-4">
                  <span className="text-slate-600 text-sm font-body">florence.ronai.com/chat</span>
                </div>
              </div>
              
              <div className="relative aspect-square bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <MessageSquare className="w-16 h-16 text-purple-600 mx-auto mb-4"/>
                  <p className="text-slate-600 font-body">Florence Chat Interface</p>
                  <p className="text-sm text-slate-500 mt-2">Secure clinical conversations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Early Adopter CTA Section */}
      <section id="early-adopter" className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-slate-800 to-slate-900 fade-in-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Become an Insider. <span className="text-blue-300">Shape What's Next.</span>
            </h2>
            <p className="font-body text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
              Join our exclusive Early Adoption and Product Feedback Group. You'll get first access to Nira, 
              Cura, and Florence, and your feedback will directly influence the future of clinical technology. 
              Help us build the tools you've always wanted.
            </p>
          </div>
          
          {/* Early Adopter Form */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="fullName" className="text-white mb-2 block">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                      placeholder="Dr. Jane Smith"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                      placeholder="jane.smith@clinic.com"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="specialty" className="text-white mb-2 block">Clinical Specialty</Label>
                  <Select
                    value={formData.specialty}
                    onValueChange={(value) => setFormData({ ...formData, specialty: value })}
                  >
                    <SelectTrigger className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="Select your specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary-care">Primary Care</SelectItem>
                      <SelectItem value="emergency">Emergency Medicine</SelectItem>
                      <SelectItem value="internal">Internal Medicine</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="surgery">Surgery</SelectItem>
                      <SelectItem value="psychiatry">Psychiatry</SelectItem>
                      <SelectItem value="nursing">Nursing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-white mb-3 block">I'm most interested in:</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="nira"
                        checked={formData.interestedIn.nira}
                        onCheckedChange={(checked) => 
                          setFormData({ 
                            ...formData, 
                            interestedIn: { ...formData.interestedIn, nira: checked as boolean }
                          })
                        }
                        className="border-white/30"
                      />
                      <Label htmlFor="nira" className="text-white cursor-pointer">
                        Nira - Clinical Operations Command Center
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="cura"
                        checked={formData.interestedIn.cura}
                        onCheckedChange={(checked) => 
                          setFormData({ 
                            ...formData, 
                            interestedIn: { ...formData.interestedIn, cura: checked as boolean }
                          })
                        }
                        className="border-white/30"
                      />
                      <Label htmlFor="cura" className="text-white cursor-pointer">
                        Cura - AI Career Agent
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="florence"
                        checked={formData.interestedIn.florence}
                        onCheckedChange={(checked) => 
                          setFormData({ 
                            ...formData, 
                            interestedIn: { ...formData.interestedIn, florence: checked as boolean }
                          })
                        }
                        className="border-white/30"
                      />
                      <Label htmlFor="florence" className="text-white cursor-pointer">
                        Florence - Clinical Chat AI
                      </Label>
                    </div>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-white text-slate-800 hover:bg-slate-200 font-body font-bold px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-800 mr-3"></span>
                      Submitting...
                    </span>
                  ) : (
                    <>Request My Invitation <ChevronRight className="ml-2 w-5 h-5"/></>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">Ron AI</h3>
            <span className="text-slate-400 font-body text-sm sm:text-base">Reimagining Clinical Work</span>
          </div>
          <p className="text-slate-400 font-body text-sm sm:text-base">
            © 2024 Ron AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
