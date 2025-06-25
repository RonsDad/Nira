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
      florence: false,
      records: false
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
          interestedIn: { nira: false, cura: false, florence: false, records: false }
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
            Nira: <span className="text-blue-700">The Future of Clinical Intelligence</span>
          </h1>
          <p className="font-body text-lg sm:text-xl md:text-2xl text-slate-700 mb-6 sm:mb-10 max-w-4xl mx-auto leading-relaxed">
            One unified platform. Four powerful solutions. Transform how you work, manage tasks, 
            and make decisions with AI-powered clinical intelligence designed for modern healthcare.
          </p>
          <Button 
            size="lg" 
            className="bg-slate-800 hover:bg-slate-900 text-white font-body font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto max-w-sm mx-auto sm:mx-0"
            onClick={() => document.getElementById('early-adopter')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join the Nira Early Access Program
          </Button>
        </div>
        
        {/* Abstract Hero SVG */}
        <div className="absolute inset-0 overflow-hidden">
          <svg viewBox="0 0 1440 800" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1"/>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-8">
            <div className="order-2 lg:order-1 lg:col-span-3">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                Nira <span className="text-blue-600">Insights</span>
              </h2>
              <p className="font-body text-xl sm:text-2xl text-blue-700 mb-4 sm:mb-6">
                Real-Time Reporting & Analytics That Matter
              </p>
              <p className="font-body text-lg text-slate-700 mb-8 leading-relaxed">
                Transform raw clinical data into actionable intelligence. Nira Insights provides 
                intuitive dashboards, automated reporting, and predictive analytics that help you 
                make data-driven decisions, track KPIs, and optimize clinical outcomes in real-time.
              </p>
              
              {/* Stunning SVG for Analytics */}
              <div className="relative h-48 sm:h-56 mb-8">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  <g transform="scale(1.3) translate(-40, -20)">
                    <defs>
                      <linearGradient id="analyticsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.3"/>
                      </linearGradient>
                      <pattern id="gridPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    
                    {/* Background Grid */}
                    <rect width="400" height="200" fill="url(#gridPattern)"/>
                    
                    {/* Bar Chart */}
                    <g className="chart-bars">
                      <rect x="50" y="120" width="40" height="60" fill="url(#analyticsGrad)" rx="4" className="animate-grow-up"/>
                      <rect x="110" y="80" width="40" height="100" fill="url(#analyticsGrad)" rx="4" className="animate-grow-up animation-delay-200"/>
                      <rect x="170" y="100" width="40" height="80" fill="url(#analyticsGrad)" rx="4" className="animate-grow-up animation-delay-400"/>
                      <rect x="230" y="60" width="40" height="120" fill="url(#analyticsGrad)" rx="4" className="animate-grow-up animation-delay-600"/>
                      <rect x="290" y="90" width="40" height="90" fill="url(#analyticsGrad)" rx="4" className="animate-grow-up animation-delay-800"/>
                    </g>
                    
                    {/* Trend Line */}
                    <path d="M 70 140 Q 130 120, 190 110 T 310 80" stroke="#3B82F6" strokeWidth="3" fill="none" strokeLinecap="round" className="animate-draw-line"/>
                    
                    {/* Data Points */}
                    <circle cx="70" cy="140" r="6" fill="#fff" stroke="#3B82F6" strokeWidth="2" className="animate-scale-in animation-delay-1000"/>
                    <circle cx="130" cy="120" r="6" fill="#fff" stroke="#3B82F6" strokeWidth="2" className="animate-scale-in animation-delay-1200"/>
                    <circle cx="190" cy="110" r="6" fill="#fff" stroke="#3B82F6" strokeWidth="2" className="animate-scale-in animation-delay-1400"/>
                    <circle cx="250" cy="95" r="6" fill="#fff" stroke="#3B82F6" strokeWidth="2" className="animate-scale-in animation-delay-1600"/>
                    <circle cx="310" cy="80" r="6" fill="#fff" stroke="#3B82F6" strokeWidth="2" className="animate-scale-in animation-delay-1800"/>
                    
                    {/* Axis Lines */}
                    <line x1="40" y1="180" x2="360" y2="180" stroke="#64748B" strokeWidth="2"/>
                    <line x1="40" y1="20" x2="40" y2="180" stroke="#64748B" strokeWidth="2"/>
                    
                    {/* Labels */}
                    <text x="200" y="25" textAnchor="middle" fill="#1E293B" fontSize="16" fontWeight="600">Real-Time Analytics</text>
                  </g>
                </svg>
              </div>
            </div>
            
            {/* Nira UI Preview */}
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden order-1 lg:order-2 lg:col-span-9">
              <div className="bg-slate-100 px-6 py-4 flex items-center space-x-2 border-b border-slate-200">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 bg-slate-200 rounded-lg px-4 py-1 mx-4">
                  <span className="text-slate-600 text-sm font-body">nira.ronai.com/insights</span>
                </div>
              </div>
              
              <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 h-[600px]">
                <iframe
                  src="https://set-pride-34770011.figma.site"
                  className="w-full h-full"
                  title="Nira Insights Demo"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section 2: Nira Flow */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-teal-50 to-teal-100 fade-in-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Figma iframe - 9 columns */}
            <div className="order-2 lg:order-1 lg:col-span-9">
              <Card className="bg-white/80 backdrop-blur border-teal-200 shadow-2xl overflow-hidden">
                <div className="bg-slate-800 p-3 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-slate-200 rounded-lg px-4 py-1 mx-4">
                    <span className="text-slate-600 text-sm font-body">nira.ronai.com/flow</span>
                  </div>
                </div>
                
                <div className="relative aspect-video bg-gradient-to-br from-teal-50 to-teal-100 h-[600px]">
                  <iframe
                    src="https://pine-pin-28044084.figma.site"
                    className="w-full h-full"
                    title="Nira Flow Interactive Demo"
                    allowFullScreen
                  />
                </div>
              </Card>
            </div>
            
            {/* Typography - 3 columns */}
            <div className="order-1 lg:order-2 lg:col-span-3">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                Nira <span className="text-teal-600">Flow</span>
              </h2>
              <p className="font-body text-xl sm:text-2xl text-teal-700 mb-4 sm:mb-6">
                Bringing Agile Excellence to Healthcare Teams
              </p>
              <p className="font-body text-lg text-slate-700 mb-8 leading-relaxed">
                Revolutionize clinical task management with Nira Flow. Built on proven Agile methodologies, 
                Flow helps healthcare teams prioritize tasks, track progress, and collaborate seamlessly. 
                Transform chaos into clarity with smart workflows designed for the pace of modern medicine.
              </p>
              
              {/* Key Features Grid */}
              <div className="grid grid-cols-1 gap-4 mb-6 sm:mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-teal-600"/>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-base sm:text-lg text-slate-900">Sprint Planning</h4>
                    <p className="text-sm text-slate-600">Organize work into manageable sprints</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-teal-600"/>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-base sm:text-lg text-slate-900">Priority Management</h4>
                    <p className="text-sm text-slate-600">Focus on what matters most</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Network className="w-5 h-5 text-teal-600"/>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-base sm:text-lg text-slate-900">Team Collaboration</h4>
                    <p className="text-sm text-slate-600">Stay aligned across departments</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-teal-600"/>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-base sm:text-lg text-slate-900">Performance Metrics</h4>
                    <p className="text-sm text-slate-600">Track team velocity and burndown</p>
                  </div>
                </div>
              </div>
              
              {/* Stunning Kanban Board SVG */}
              <div className="relative h-48 sm:h-56">
                <svg viewBox="0 0 400 250" className="w-full h-full">
                  <g transform="scale(1.3) translate(-40, -25)">
                    <defs>
                      <linearGradient id="kanbanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0.1"/>
                      </linearGradient>
                    </defs>
                    
                    {/* Kanban Board Background */}
                    <rect x="10" y="10" width="380" height="230" fill="url(#kanbanGrad)" rx="8" className="animate-pulse-subtle"/>
                    
                    {/* Column Headers */}
                    <text x="70" y="35" fill="#0F766E" fontSize="14" fontWeight="600">To Do</text>
                    <text x="160" y="35" fill="#0F766E" fontSize="14" fontWeight="600">In Progress</text>
                    <text x="280" y="35" fill="#0F766E" fontSize="14" fontWeight="600">Done</text>
                    
                    {/* Column Dividers */}
                    <line x1="125" y1="45" x2="125" y2="230" stroke="#14B8A6" strokeWidth="1" opacity="0.3"/>
                    <line x1="250" y1="45" x2="250" y2="230" stroke="#14B8A6" strokeWidth="1" opacity="0.3"/>
                    
                    {/* Task Cards - To Do */}
                    <g className="task-slide-down">
                      <rect x="20" y="55" width="90" height="40" fill="white" rx="4" filter="url(#shadow)"/>
                      <text x="30" y="75" fill="#0F766E" fontSize="11" fontWeight="500">Patient Rounds</text>
                      <circle cx="95" cy="75" r="10" fill="#14B8A6" opacity="0.2"/>
                      <text x="91" y="79" fill="#0F766E" fontSize="10" fontWeight="600">3</text>
                    </g>
                    
                    <g className="task-slide-down animation-delay-500">
                      <rect x="20" y="105" width="90" height="40" fill="white" rx="4" filter="url(#shadow)"/>
                      <text x="30" y="125" fill="#0F766E" fontSize="11" fontWeight="500">Lab Reviews</text>
                      <circle cx="95" cy="125" r="10" fill="#F59E0B" opacity="0.2"/>
                      <text x="91" y="129" fill="#92400E" fontSize="10" fontWeight="600">5</text>
                    </g>
                    
                    {/* Task Cards - In Progress */}
                    <g className="task-move">
                      <rect x="145" y="55" width="90" height="40" fill="white" rx="4" filter="url(#shadow)"/>
                      <text x="155" y="75" fill="#0F766E" fontSize="11" fontWeight="500">Med Reconcile</text>
                      <circle cx="220" cy="75" r="10" fill="#14B8A6" opacity="0.2"/>
                      <text x="216" y="79" fill="#0F766E" fontSize="10" fontWeight="600">2</text>
                    </g>
                    
                    <g className="task-move animation-delay-1000">
                      <rect x="145" y="105" width="90" height="40" fill="white" rx="4" filter="url(#shadow)"/>
                      <text x="155" y="125" fill="#0F766E" fontSize="11" fontWeight="500">Discharge Plan</text>
                      <circle cx="220" cy="125" r="10" fill="#EF4444" opacity="0.2"/>
                      <text x="216" y="129" fill="#991B1B" fontSize="10" fontWeight="600">!</text>
                    </g>
                    
                    {/* Task Cards - Done */}
                    <g className="opacity-70">
                      <rect x="270" y="55" width="90" height="40" fill="white" rx="4" filter="url(#shadow)"/>
                      <text x="280" y="75" fill="#6B7280" fontSize="11" fontWeight="500">Consults</text>
                      <path d="M340 75 L345 80 L355 70" stroke="#10B981" strokeWidth="2" fill="none"/>
                    </g>
                    
                    <g className="opacity-70">
                      <rect x="270" y="105" width="90" height="40" fill="white" rx="4" filter="url(#shadow)"/>
                      <text x="280" y="125" fill="#6B7280" fontSize="11" fontWeight="500">Orders Review</text>
                      <path d="M340 125 L345 130 L355 120" stroke="#10B981" strokeWidth="2" fill="none"/>
                    </g>
                    
                    {/* Shadow Filter */}
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1"/>
                    </filter>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                Nira <span className="text-purple-600">Command</span>
              </h2>
              <p className="font-body text-xl sm:text-2xl text-purple-700 mb-4 sm:mb-6">
                Your AI-Powered Clinical Command Center
              </p>
              <p className="font-body text-lg text-slate-700 mb-8 leading-relaxed">
                Take control with Nira Command - an intelligent chat interface that serves as your 
                clinical command center. Get instant answers, coordinate care, manage protocols, 
                and make informed decisions with AI that understands the nuances of healthcare.
              </p>
              
              {/* Key Features as Chat Bubbles */}
              <div className="space-y-4 mb-6 sm:mb-8">
                <div className="bg-purple-100 rounded-2xl rounded-tl-sm p-4 max-w-[90%]">
                  <p className="text-purple-900 font-body text-sm sm:text-base">
                    <span className="font-semibold">Clinical Decision Support:</span> Real-time evidence-based recommendations
                  </p>
                </div>
                
                <div className="bg-purple-100 rounded-2xl rounded-tr-sm p-4 max-w-[90%] ml-auto">
                  <p className="text-purple-900 font-body text-sm sm:text-base">
                    <span className="font-semibold">Care Coordination:</span> Seamlessly connect with your care team
                  </p>
                </div>
                
                <div className="bg-purple-100 rounded-2xl rounded-tl-sm p-4 max-w-[90%]">
                  <p className="text-purple-900 font-body text-sm sm:text-base">
                    <span className="font-semibold">Protocol Management:</span> Access and update clinical protocols instantly
                  </p>
                </div>
              </div>
              
              {/* Stunning Command Center SVG */}
              <div className="relative h-40 sm:h-48">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  <g transform="scale(1.3) translate(-40, -20)">
                    <defs>
                      <linearGradient id="commandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#9333EA" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#C084FC" stopOpacity="0.1"/>
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Central Command Hub */}
                    <circle cx="200" cy="100" r="50" fill="url(#commandGrad)" stroke="#9333EA" strokeWidth="2"/>
                    <circle cx="200" cy="100" r="35" fill="none" stroke="#C084FC" strokeWidth="1" strokeDasharray="5,5">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 200 100"
                        to="360 200 100"
                        dur="20s"
                        repeatCount="indefinite"/>
                    </circle>
                    
                    {/* Connected Nodes */}
                    <g filter="url(#glow)">
                      <circle cx="100" cy="50" r="20" fill="#C084FC" opacity="0.8"/>
                      <circle cx="300" cy="50" r="20" fill="#C084FC" opacity="0.8"/>
                      <circle cx="100" cy="150" r="20" fill="#C084FC" opacity="0.8"/>
                      <circle cx="300" cy="150" r="20" fill="#C084FC" opacity="0.8"/>
                    </g>
                    
                    {/* Connection Lines */}
                    <path d="M180,90 L120,60" stroke="#9333EA" strokeWidth="2" opacity="0.5"/>
                    <path d="M220,90 L280,60" stroke="#9333EA" strokeWidth="2" opacity="0.5"/>
                    <path d="M180,110 L120,140" stroke="#9333EA" strokeWidth="2" opacity="0.5"/>
                    <path d="M220,110 L280,140" stroke="#9333EA" strokeWidth="2" opacity="0.5"/>
                    
                    {/* Pulse Effect */}
                    <circle cx="200" cy="100" r="50" fill="none" stroke="#9333EA" strokeWidth="2" opacity="0.5">
                      <animate attributeName="r" values="50;65;50" dur="2s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite"/>
                    </circle>
                  </g>
                </svg>
              </div>
            </div>
            
            {/* Florence UI Preview */}
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden lg:col-span-9">
              <div className="bg-slate-100 px-6 py-4 flex items-center space-x-2 border-b border-slate-200">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 bg-slate-200 rounded-lg px-4 py-1 mx-4">
                  <span className="text-slate-600 text-sm font-body">nira.ronai.com/command</span>
                </div>
              </div>
              
              <div className="relative aspect-video bg-gradient-to-br from-purple-50 to-purple-100 h-[600px]">
                <iframe
                  src="https://aloha-satin-23191317.figma.site"
                  className="w-full h-full"
                  title="Florence Chat Interface"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section 4: Nira Records */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 fade-in-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Records UI Preview */}
            <div className="order-1 lg:order-1 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden lg:col-span-9">
              <div className="bg-slate-100 px-6 py-4 flex items-center space-x-2 border-b border-slate-200">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 bg-slate-200 rounded-lg px-4 py-1 mx-4">
                  <span className="text-slate-600 text-sm font-body">nira.ronai.com/records</span>
                </div>
              </div>
              
              <div className="relative aspect-video bg-gradient-to-br from-indigo-50 to-indigo-100 h-[600px]">
                <iframe
                  src="https://yam-purse-81259719.figma.site"
                  className="w-full h-full"
                  title="Nira Records Interface"
                  allowFullScreen
                />
              </div>
            </div>
            
            <div className="order-2 lg:order-2 lg:col-span-3">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                Nira <span className="text-indigo-600">Records</span>
              </h2>
              <p className="font-body text-xl sm:text-2xl text-indigo-700 mb-4 sm:mb-6">
                Intelligent Patient Records & Management
              </p>
              <p className="font-body text-lg text-slate-700 mb-8 leading-relaxed">
                Experience the future of patient record management with Nira Records. Our AI-powered system 
                ensures HIPAA compliance while providing intelligent search, automated documentation, 
                and seamless interoperability across all your healthcare systems.
              </p>
              
              {/* Key Features Grid */}
              <div className="grid grid-cols-1 gap-4 mb-6 sm:mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-indigo-600"/>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-base sm:text-lg text-slate-900">HIPAA Compliant</h4>
                    <p className="text-sm text-slate-600">Secure, encrypted patient data</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-indigo-600"/>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-base sm:text-lg text-slate-900">AI-Powered Search</h4>
                    <p className="text-sm text-slate-600">Find any record instantly</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Network className="w-5 h-5 text-indigo-600"/>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-base sm:text-lg text-slate-900">Interoperability</h4>
                    <p className="text-sm text-slate-600">Seamless EHR integration</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-indigo-600"/>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-base sm:text-lg text-slate-900">Smart Templates</h4>
                    <p className="text-sm text-slate-600">Automated clinical documentation</p>
                  </div>
                </div>
              </div>
              
              {/* Stunning Patient Records SVG */}
              <div className="relative h-48 sm:h-56">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  <g transform="scale(1.3) translate(-40, -20)">
                    <defs>
                      <linearGradient id="recordsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366F1" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.1"/>
                      </linearGradient>
                      <filter id="recordShadow">
                        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1"/>
                      </filter>
                    </defs>
                    
                    {/* Background Pattern */}
                    <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1" fill="#E0E7FF"/>
                    </pattern>
                    <rect width="400" height="200" fill="url(#dotPattern)"/>
                    
                    {/* Central Record Card */}
                    <g transform="translate(150, 50)">
                      <rect width="100" height="120" fill="white" rx="8" filter="url(#recordShadow)"/>
                      <rect x="10" y="10" width="80" height="10" fill="#E0E7FF" rx="2"/>
                      <rect x="10" y="25" width="60" height="6" fill="#E0E7FF" rx="1"/>
                      <rect x="10" y="35" width="70" height="6" fill="#E0E7FF" rx="1"/>
                      <rect x="10" y="45" width="50" height="6" fill="#E0E7FF" rx="1"/>
                      <circle cx="50" cy="85" r="20" fill="url(#recordsGrad)"/>
                      <text x="50" y="90" textAnchor="middle" className="text-xs fill-indigo-700 font-semibold">ID</text>
                    </g>
                    
                    {/* Floating Record Cards */}
                    <g transform="translate(50, 30)" opacity="0.7">
                      <rect width="80" height="100" fill="white" rx="6" filter="url(#recordShadow)"/>
                      <rect x="8" y="8" width="64" height="8" fill="#E0E7FF" rx="1"/>
                      <rect x="8" y="20" width="48" height="4" fill="#E0E7FF" rx="1"/>
                    </g>
                    
                    <g transform="translate(270, 40)" opacity="0.7">
                      <rect width="80" height="100" fill="white" rx="6" filter="url(#recordShadow)"/>
                      <rect x="8" y="8" width="64" height="8" fill="#E0E7FF" rx="1"/>
                      <rect x="8" y="20" width="48" height="4" fill="#E0E7FF" rx="1"/>
                    </g>
                    
                    {/* Data Flow Lines */}
                    <path d="M130,80 L150,80" stroke="#6366F1" strokeWidth="2" opacity="0.5">
                      <animate attributeName="stroke-dasharray" values="0,10;10,0" dur="1s" repeatCount="indefinite"/>
                    </path>
                    <path d="M250,80 L270,80" stroke="#6366F1" strokeWidth="2" opacity="0.5">
                      <animate attributeName="stroke-dasharray" values="0,10;10,0" dur="1s" repeatCount="indefinite"/>
                    </path>
                    
                    {/* Security Shield */}
                    <g transform="translate(320, 140)">
                      <path d="M0,0 L20,0 L20,15 L10,25 L0,15 Z" fill="#6366F1" opacity="0.8"/>
                      <text x="10" y="12" textAnchor="middle" className="text-xs fill-white font-bold">✓</text>
                    </g>
                  </g>
                </svg>
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
              Join the Nira Revolution. <span className="text-blue-300">Shape Healthcare's Future.</span>
            </h2>
            <p className="font-body text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
              Be among the first to experience Nira's unified clinical intelligence platform. 
              As an early adopter, you'll get exclusive access to all four powerful solutions - 
              Insights, Flow, Command, and Records - while helping us build the future of healthcare technology.
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
                  <Label htmlFor="specialty" className="text-white mb-2 block">Your Specialty</Label>
                  <Select value={formData.specialty} onValueChange={(value) => setFormData({ ...formData, specialty: value })}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="Select your specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="physician">Physician</SelectItem>
                      <SelectItem value="nurse">Nurse</SelectItem>
                      <SelectItem value="administrator">Administrator</SelectItem>
                      <SelectItem value="other">Other Healthcare Professional</SelectItem>
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
                        Nira Insights - Real-time analytics and reporting dashboards
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
                        Nira Flow - Agile task management for healthcare teams
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
                        Nira Command - AI-powered clinical command center
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="records"
                        checked={formData.interestedIn.records}
                        onCheckedChange={(checked) => 
                          setFormData({ 
                            ...formData, 
                            interestedIn: { ...formData.interestedIn, records: checked as boolean }
                          })
                        }
                        className="border-white/30"
                      />
                      <Label htmlFor="records" className="text-white cursor-pointer">
                        Nira Records - Intelligent patient records & management
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
                    <>Join Nira Early Access <ChevronRight className="ml-2 w-5 h-5"/></>
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
            &copy; 2024 Ron AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
