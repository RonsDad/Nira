'use client'

import { useState, useEffect, useRef } from "react";
import { Brain, Shield, MessageSquare, ChevronRight, Sparkles, Network, Compass, Star, Phone, DollarSign, FileText, Calendar, Search, Bot, User, Send, Mic, MicOff, Clock, CheckCircle, XCircle, Pill, Heart, CreditCard, AlertCircle, Activity, Zap, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/ui/Header";
import dynamic from 'next/dynamic';
import { toast } from "sonner";
import { motion } from "framer-motion";

// Add this at the top of the file after imports to fix TS2339
declare global {
  interface Window {
    
  }
}

const ProductFeaturesSection = dynamic(() => import('./product-features').then(mod => mod.ProductFeaturesSection), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] flex items-center justify-center text-white"><p>Loading 3D Features...</p></div>,
});

export default function OurProducts() {
  // State for interactive demos
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { type: 'ai', content: "Hi! I'm Ron, your healthcare assistant. How can I help you today?", timestamp: "" }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");

  // Enhanced JSON-LD Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Ron AI Healthcare Products - AI Healthcare Operating System",
    "description": "AI-powered healthcare operating system featuring automated insurance verification, voice appointment booking, medication price comparison, and unified health management.",
    "numberOfItems": 4,
    "itemListElement": [
      {
        "@type": "Product",
        "@id": "#ron-search",
        "position": 1,
        "name": "Ron Search - AI Healthcare Assistant for Finding Doctors",
        "description": "Find doctor who takes my insurance near me with AI-powered provider search and real-time insurance verification.",
        "brand": { "@type": "Brand", "name": "Ron AI" }
      },
      {
        "@type": "Product",
        "@id": "#ron-scheduler",
        "position": 2,
        "name": "Ron Scheduler - Voice Healthcare Technology",
        "description": "Automated appointment booking with AI voice assistant that calls offices and books appointments.",
        "brand": { "@type": "Brand", "name": "Ron AI" }
      },
      {
        "@type": "Product",
        "@id": "#ron-meds",
        "position": 3,
        "name": "Ron Meds - Medication Management",
        "description": "Compare medication prices, find discounts, and manage prescriptions with AI.",
        "brand": { "@type": "Brand", "name": "Ron AI" }
      },
      {
        "@type": "Product",
        "@id": "#ron-health",
        "position": 4,
        "name": "Ron Health - Medical Records & Health Insights",
        "description": "Comprehensive health management with medical records organization and health insights.",
        "brand": { "@type": "Brand", "name": "Ron AI" }
      }
    ]
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does Ron find doctors who take my insurance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ron uses AI to search multiple databases and verify insurance acceptance in real-time, solving the problem where 68% of users abandon healthcare searches due to insurance uncertainty."
        }
      }
    ]
  };

  // Call timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatCallTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      setChatMessages(prev => [...prev, 
        { type: 'user', content: currentMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      setCurrentMessage("");
      
      // Simulate AI response
      setTimeout(() => {
        setChatMessages(prev => [...prev, 
          { type: 'ai', content: "I'll help you find a doctor. Let me search for providers in your area who accept your insurance...", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
      }, 1000);
    }
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    anythingElse: '',
    attachment: null as File | null
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
          message: `Early Access Request from ${formData.firstName} ${formData.lastName}${formData.company ? ` at ${formData.company}` : ''}. Additional info: ${formData.anythingElse || 'None provided'}`
        }),
      });

      if (response.ok) {
        toast.success("Welcome to Ron AI! We'll be in touch within 24 hours.");
        setFormData({
          firstName: '',
          lastName: '',
          company: '',
          email: '',
          phone: '',
          anythingElse: '',
          attachment: null
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

  // Set timestamp on client only
  useEffect(() => {
    if (chatMessages[0].timestamp === "") {
      setChatMessages([{ ...chatMessages[0], timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }
  }, []);

  return (
    <>
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      {/* Enhanced Luxury CSS */}
      <style jsx global>{`
        /* Premium Luxury Glass Effects */
        .glass-effect {
          backdrop-filter: blur(24px) saturate(130%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(25, 25, 35, 0.65);
          position: relative;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .glass-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.2) 0%, 
            transparent 25%, 
            transparent 75%, 
            rgba(255, 255, 255, 0.1) 100%);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          pointer-events: none;
        }

        .glass-effect-elevated {
          backdrop-filter: blur(32px) saturate(140%);
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(30, 30, 40, 0.85);
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.08),
            0 16px 64px rgba(0, 0, 0, 0.4),
            0 8px 32px rgba(0, 0, 0, 0.3),
            0 0 32px rgba(0, 140, 255, 0.08);
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .glass-effect-elevated:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.12),
            0 24px 80px rgba(0, 0, 0, 0.5),
            0 12px 48px rgba(0, 0, 0, 0.4),
            0 0 48px rgba(0, 140, 255, 0.12);
        }

        .ice-glass {
          backdrop-filter: blur(40px) saturate(150%) brightness(115%);
          background: linear-gradient(135deg, 
            rgba(240, 248, 255, 0.08) 0%,
            rgba(240, 248, 255, 0.04) 50%,
            rgba(0, 140, 255, 0.06) 100%);
          border: 1px solid rgba(240, 248, 255, 0.2);
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .ice-glass::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(145deg, 
            rgba(255, 255, 255, 0.15) 0%,
            transparent 30%,
            transparent 70%,
            rgba(255, 255, 255, 0.1) 100%);
          border-radius: inherit;
          pointer-events: none;
        }

        .premium-glass {
          backdrop-filter: blur(32px) saturate(140%);
          background: linear-gradient(135deg, 
            rgba(0, 140, 255, 0.05) 0%,
            rgba(0, 140, 255, 0.02) 50%,
            rgba(0, 140, 255, 0.08) 100%);
          border: 1px solid rgba(0, 140, 255, 0.15);
          position: relative;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .premium-glass::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(145deg, 
            rgba(0, 140, 255, 0.1) 0%,
            transparent 25%,
            transparent 75%,
            rgba(0, 140, 255, 0.05) 100%);
          border-radius: inherit;
          pointer-events: none;
        }

        .premium-glass:hover {
          transform: translateY(-1px);
          border-color: rgba(0, 140, 255, 0.25);
          box-shadow: 
            0 0 40px rgba(0, 140, 255, 0.1),
            0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .glass-accent {
          backdrop-filter: blur(24px) saturate(125%);
          border: 1px solid rgba(0, 140, 255, 0.08);
          background: rgba(0, 140, 255, 0.012);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .glass-accent:hover {
          background: rgba(0, 140, 255, 0.025);
          border-color: rgba(0, 140, 255, 0.15);
          transform: translateY(-1px);
          box-shadow: 
            0 0 24px rgba(0, 140, 255, 0.08),
            0 8px 32px rgba(0, 0, 0, 0.15);
        }

        .luxury-glow {
          text-shadow: 
            0 0 8px rgba(0, 140, 255, 0.3),
            0 0 16px rgba(0, 140, 255, 0.2),
            0 0 24px rgba(0, 140, 255, 0.1);
          transition: all 0.3s ease;
        }

        .luxury-glow:hover {
          text-shadow: 
            0 0 12px rgba(0, 140, 255, 0.4),
            0 0 24px rgba(0, 140, 255, 0.3),
            0 0 36px rgba(0, 140, 255, 0.2);
        }

        .premium-border {
          border: 2px solid;
          border-image: linear-gradient(45deg, 
            rgba(0, 140, 255, 0.3) 0%, 
            rgba(0, 140, 255, 0.1) 50%, 
            rgba(0, 140, 255, 0.3) 100%) 1;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .premium-border:hover {
          border-image: linear-gradient(45deg, 
            rgba(0, 140, 255, 0.5) 0%, 
            rgba(0, 140, 255, 0.2) 50%, 
            rgba(0, 140, 255, 0.5) 100%) 1;
        }

        /* Enhanced Animations */
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 8px rgba(0, 140, 255, 0.2);
            opacity: 0.8;
          }
          50% { 
            box-shadow: 0 0 20px rgba(0, 140, 255, 0.4);
            opacity: 1;
          }
        }

        @keyframes shimmer-luxury {
          0% { 
            transform: translateX(-100%) rotate(45deg);
            opacity: 0;
          }
          50% { 
            opacity: 0.6;
          }
          100% { 
            transform: translateX(200%) rotate(45deg);
            opacity: 0;
          }
        }

        @keyframes breathe-glow {
          0%, 100% { 
            background: rgba(0, 140, 255, 0.03);
            transform: scale(1);
          }
          50% { 
            background: rgba(0, 140, 255, 0.08);
            transform: scale(1.02);
          }
        }

        .float-animation {
          animation: float-gentle 6s ease-in-out infinite;
        }

        .pulse-glow-animation {
          animation: pulse-glow 4s ease-in-out infinite;
        }

        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }

        .shimmer-effect::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg,
            transparent 0%,
            rgba(255, 255, 255, 0.03) 45%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.03) 55%,
            transparent 100%);
          animation: shimmer-luxury 8s ease-in-out infinite;
          pointer-events: none;
        }

        .breathe-animation {
          animation: breathe-glow 8s ease-in-out infinite;
        }

        .chat-bubble-ai {
          background: rgba(25, 25, 35, 0.85);
          border: 1px solid rgba(0, 140, 255, 0.08);
          backdrop-filter: blur(20px);
        }

        .chat-bubble-user {
          background: rgba(0, 140, 255, 0.02);
          border: 1px solid rgba(0, 140, 255, 0.12);
          backdrop-filter: blur(20px);
        }

        /* Premium Typography */
        .premium-heading {
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .premium-subheading {
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 600;
          letter-spacing: -0.01em;
          line-height: 1.3;
        }

        .premium-body {
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 400;
          letter-spacing: 0.01em;
          line-height: 1.6;
        }

        /* Enhanced Background Effects */
        .luxury-bg-gradient {
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.9) 0%,
            rgba(15, 15, 25, 0.95) 25%,
            rgba(5, 5, 15, 0.98) 50%,
            rgba(15, 15, 25, 0.95) 75%,
            rgba(0, 0, 0, 0.9) 100%);
        }

        .ambient-glow {
          background: radial-gradient(ellipse at center,
            rgba(0, 140, 255, 0.08) 0%,
            rgba(0, 140, 255, 0.04) 40%,
            transparent 70%);
        }

        .luxury-particle {
          position: fixed;
          pointer-events: none;
          z-index: 1;
        }

        .luxury-particle:nth-child(1) { animation: float-gentle 12s ease-in-out infinite; }
        .luxury-particle:nth-child(2) { animation: float-gentle 15s ease-in-out infinite 2s; }
        .luxury-particle:nth-child(3) { animation: float-gentle 18s ease-in-out infinite 4s; }
        .luxury-particle:nth-child(4) { animation: float-gentle 20s ease-in-out infinite 6s; }
        .luxury-particle:nth-child(5) { animation: float-gentle 14s ease-in-out infinite 8s; }

        /* SVG Animations */
        .svg-morph {
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .svg-morph:hover {
          transform: scale(1.1) rotate(5deg);
          filter: drop-shadow(0 0 8px rgba(0, 140, 255, 0.4));
        }

        /* Progress Ring Animation */
        .progress-ring {
          transition: stroke-dashoffset 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        /* Enhanced Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, 
            rgba(0, 140, 255, 0.3), 
            rgba(0, 140, 255, 0.6));
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, 
            rgba(0, 140, 255, 0.5), 
            rgba(0, 140, 255, 0.8));
        }

      `}</style>
      
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Enhanced Luxury Background */}
        <div className="fixed inset-0 luxury-bg-gradient" />
        
        {/* Multiple Layer Blue Glow Background */}
        <div className="fixed inset-0 ambient-glow" />
        <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/5 via-transparent to-blue-800/5" />
        <div className="fixed bottom-0 right-0 w-full h-full bg-gradient-to-tl from-blue-900/3 via-transparent to-blue-800/3" />
        
        {/* Animated Blue Light Beams */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/8 rounded-full filter blur-3xl breathe-animation" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/6 rounded-full filter blur-3xl breathe-animation" style={{animationDelay: '4s'}} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-blue-600/4 rounded-full filter blur-3xl breathe-animation" style={{animationDelay: '2s'}} />
        </div>

        {/* Floating Luxury Particles */}
        <div className="fixed inset-0 pointer-events-none z-1">
          <div className="luxury-particle absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full blur-sm" />
          <div className="luxury-particle absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300/30 rounded-full blur-sm" />
          <div className="luxury-particle absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-500/15 rounded-full blur-sm" />
          <div className="luxury-particle absolute bottom-1/3 right-1/4 w-1 h-1 bg-blue-400/25 rounded-full blur-sm" />
          <div className="luxury-particle absolute top-2/3 left-2/3 w-2 h-2 bg-blue-300/20 rounded-full blur-sm" />
        </div>

        {/* Floating Healthcare SVG Icons */}
        <div className="fixed inset-0 pointer-events-none z-1">
          <div className="absolute top-1/4 left-1/6 opacity-10 float-animation">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" className="text-blue-400"/>
            </svg>
          </div>
          <div className="absolute top-1/3 right-1/6 opacity-10 float-animation" style={{animationDelay: '2s'}}>
            <Heart className="w-6 h-6 text-blue-400" />
          </div>
          <div className="absolute bottom-1/4 left-1/8 opacity-10 float-animation" style={{animationDelay: '4s'}}>
            <Activity className="w-5 h-5 text-blue-400" />
          </div>
          <div className="absolute bottom-1/3 right-1/8 opacity-10 float-animation" style={{animationDelay: '6s'}}>
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
        </div>

        {/* Hidden SEO Text */}
        <div className="absolute top-0 left-0 w-full overflow-hidden" style={{ fontSize: '1px', color: '#000000', height: '1px' }}>
          find doctor who takes my insurance near me AI healthcare assistant appointment booking automated insurance eligibility verification 
          voice activated medical appointment scheduling personal health record organization digital voice healthcare technology
        </div>
        
        {/* Enhanced Hero Section */}
        <section className="relative pt-32 pb-16 px-4 z-10">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="premium-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight px-4 sm:px-6">
              Healthcare is really hard.
              <br />
              <span className="luxury-glow text-blue-400">We're making it easy.</span>
            </h1>
            <p className="premium-body text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6 sm:mb-8 md:mb-12 max-w-5xl mx-auto leading-relaxed px-2">
              Ron is your AI-powered healthcare operating system that handles everything frustrating about healthcare - 
              finding doctors, booking appointments, managing medications, and organizing health records.
            </p>
            <Button 
              size="lg" 
              className="premium-glass text-white premium-body font-semibold px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 text-base sm:text-lg md:text-xl transition-all duration-500 hover:scale-105 shimmer-effect w-full sm:w-auto max-w-xs sm:max-w-none mx-auto"
              onClick={() => document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Early Access to Ron
            </Button>
          </div>
          
        </section>

        {/* Platform Overview Section */}
        <section className="relative py-12 sm:py-16 md:py-20 px-4 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="premium-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                Our platform includes:
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              {/* Provider Search */}
              <div className="premium-glass rounded-2xl p-6 sm:p-8 shimmer-effect">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <Search className="w-8 h-8 sm:w-10 sm:h-10 luxury-glow text-blue-400 flex-shrink-0" />
                </div>
                <p className="premium-body text-base sm:text-lg text-gray-300 leading-relaxed">
                  AI-powered provider search that actually verifies insurance coverage in real-time, solving the problem where 68% of users abandon healthcare searches due to insurance uncertainty
                </p>
              </div>

              {/* Appointment Booking */}
              <div className="premium-glass rounded-2xl p-6 sm:p-8 shimmer-effect">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <Phone className="w-8 h-8 sm:w-10 sm:h-10 luxury-glow text-green-400 flex-shrink-0" />
                </div>
                <p className="premium-body text-base sm:text-lg text-gray-300 leading-relaxed">
                  Voice AI that calls doctor offices for you, navigates phone trees, and books appointments - saving 45+ minutes per booking
                </p>
              </div>

              {/* Medication Management */}
              <div className="premium-glass rounded-2xl p-6 sm:p-8 shimmer-effect">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <Pill className="w-8 h-8 sm:w-10 sm:h-10 luxury-glow text-teal-400 flex-shrink-0" />
                </div>
                <p className="premium-body text-base sm:text-lg text-gray-300 leading-relaxed">
                  Medication price comparison across all pharmacies, finding discounts and copay assistance programs - users save an average of $1,704 annually
                </p>
              </div>

              {/* Health Records */}
              <div className="premium-glass rounded-2xl p-6 sm:p-8 shimmer-effect">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <Heart className="w-8 h-8 sm:w-10 sm:h-10 luxury-glow text-red-400 flex-shrink-0" />
                </div>
                <p className="premium-body text-base sm:text-lg text-gray-300 leading-relaxed">
                  Unified health records management with AI insights to help patients understand and organize their medical information
                </p>
              </div>
            </div>
          </div>
        </section>

        <ProductFeaturesSection />

        {/* Product Innovations Headline and Features */}
        <section className="relative pb-8 px-4 z-10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="premium-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 luxury-glow">
              This is only the <span className="text-blue-400">beginning...</span>
            </h2>
            <p className="premium-body text-lg sm:text-xl md:text-2xl text-blue-200 mb-2 luxury-glow px-2">
              Experience the next generation of healthcare technology with Computer Use Agents and Voice Agents.
            </p>
            <p className="premium-body text-base sm:text-lg text-blue-300 mb-2 luxury-glow px-2">
              Our Computer Use Agents automate complex web tasks, insurance verification, and provider discovery in real time.
            </p>
            <p className="premium-body text-base sm:text-lg text-blue-300 mb-2 luxury-glow px-2">
              Voice Agents handle appointment booking, phone navigation, and patient communication, making healthcare seamless and accessible.
            </p>
            <p className="premium-body text-base sm:text-lg text-blue-300 luxury-glow px-2">
              All innovations are designed for transparency, accuracy, and user empowerment.
            </p>
          </div>
        </section>

        {/* All Products Grid Section */}
        <section className="relative py-12 sm:py-16 md:py-24 px-4 z-10">
          <div className="max-w-7xl mx-auto">
            {/* Ron Meds and Med Pricing Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-12 lg:mb-16">
                {/* Ron Meds */}
                <div id="ron-meds" className="ice-glass rounded-2xl p-6 sm:p-8 shimmer-effect">
                  <h2 className="premium-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                    Ron <span className="luxury-glow text-blue-400">Meds</span>
                  </h2>
                  <p className="premium-subheading text-lg sm:text-xl md:text-2xl text-blue-300 mb-3 sm:mb-4">
                    Save Up to 400% on Prescriptions
                  </p>
                  <p className="premium-body text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                    Stop overpaying for medications. Ron compares prices across all pharmacies,
                    finds discounts and copay assistance programs, and tracks your refills.
                  </p>
                  
                  {/* Savings Calculator */}
                  <div className="premium-glass rounded-xl p-4 sm:p-6 shimmer-effect">
                    <h4 className="premium-subheading font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Average User Savings</h4>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm sm:text-base">Per prescription</span>
                        <span className="font-bold text-lg sm:text-xl luxury-glow text-blue-400">$47</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm sm:text-base">Monthly savings</span>
                        <span className="font-bold text-lg sm:text-xl luxury-glow text-blue-400">$142</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm sm:text-base">Annual savings</span>
                        <span className="font-bold text-xl sm:text-2xl luxury-glow text-blue-400">$1,704</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Med Pricing Component */}
                <div className="ice-glass rounded-2xl p-6 sm:p-8 shimmer-effect">
                  <h3 className="text-white font-semibold mb-4 sm:mb-6 text-lg sm:text-xl">Medication Price Comparison</h3>
                  
                  <div className="premium-glass rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 premium-glass rounded-full flex items-center justify-center pulse-glow-animation">
                        <Pill className="w-6 h-6 text-blue-400 svg-morph" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Atorvastatin 20mg</h4>
                        <p className="text-gray-400 text-sm">30-day supply</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { pharmacy: 'CVS Pharmacy', price: '$142.00', discount: null, color: 'border-gray-500/20' },
                      { pharmacy: 'Walgreens', price: '$138.00', discount: null, color: 'border-gray-500/20' },
                      { pharmacy: 'Costco', price: '$18.00', discount: 'Best Price!', color: 'border-yellow-400/50' },
                      { pharmacy: 'GoodRx Coupon', price: '$14.99', discount: 'Save $127!', color: 'border-green-400/50' }
                    ].map((item, idx) => (
                      <div key={idx} className={`premium-glass rounded-lg p-4 border-2 ${item.color} float-animation`} style={{animationDelay: `${idx * 0.1}s`}}>
                        <div className="flex items-center justify-between">
                          <span className="text-white">{item.pharmacy}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-bold">{item.price}</span>
                            {item.discount && (
                              <span className="text-green-400 text-sm font-medium">{item.discount}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full premium-glass text-white mt-6 shimmer-effect">
                    <DollarSign className="w-4 h-4 mr-2 svg-morph" />
                    Find My Medication Prices
                  </Button>
                </div>
            </div>

            {/* Voice Component and Ron Scheduler Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
                {/* Voice Component */}
                <div className="ice-glass rounded-2xl p-6 sm:p-8 shimmer-effect">
                  <h3 className="text-white font-semibold mb-4 sm:mb-6 text-lg sm:text-xl">AI Voice Assistant Demo</h3>
                  
                  <div className="premium-glass rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-white font-medium">Calling: Dr. Chen's Office</p>
                        <p className="text-gray-400 text-sm">AI Assistant Active</p>
                      </div>
                      <div className="text-2xl font-mono luxury-glow text-blue-400">
                        {formatCallTime(callDuration)}
                      </div>
                    </div>
                    
                    <div className="h-24 bg-black/50 rounded-lg mb-4 flex items-center justify-center">
                      {isCallActive && (
                        <div className="flex items-center gap-1">
                          {[...Array(7)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-gradient-to-t from-blue-400 to-blue-300 rounded-full pulse-glow-animation"
                              style={{
                                height: `${20 + Math.random() * 40}px`,
                                animationDelay: `${i * 0.1}s`
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Button
                        className={`flex-1 ${isCallActive ? 'bg-red-500 hover:bg-red-600' : 'premium-glass'} text-white shimmer-effect`}
                        onClick={() => {
                          setIsCallActive(!isCallActive);
                          if (!isCallActive) setCallDuration(0);
                        }}
                      >
                        <Phone className="w-4 h-4 mr-2 svg-morph" />
                        {isCallActive ? 'End Call' : 'Start Demo Call'}
                      </Button>
                      <Button className="premium-glass" size="icon">
                        {isCallActive ? <Mic className="w-4 h-4 text-white svg-morph" /> : <MicOff className="w-4 h-4 text-gray-400 svg-morph" />}
                      </Button>
                    </div>
                  </div>
                  
                  {isCallActive && (
                    <div className="premium-glass rounded-lg p-4 space-y-2 float-animation">
                      <p className="text-gray-400 text-sm">Live Transcript:</p>
                      <p className="text-white text-sm">"Hi, I'm calling to schedule an appointment for John Smith..."</p>
                      <p className="text-blue-400 text-sm italic">"Sure! We have openings tomorrow at 2 PM and Thursday at 10 AM."</p>
                    </div>
                  )}
                </div>
                
                {/* Ron Scheduler */}
                <div id="ron-scheduler" className="ice-glass rounded-2xl p-6 sm:p-8 shimmer-effect">
                  <h2 className="premium-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4" style={{ display: 'block', opacity: 1, visibility: 'visible' }}>
                    Ron <span className="luxury-glow text-blue-400">Scheduler</span>
                  </h2>
                  <p className="premium-subheading text-lg sm:text-xl md:text-2xl text-blue-300 mb-3 sm:mb-4" style={{ display: 'block', opacity: 1, visibility: 'visible' }}>
                    Voice AI Books Your Appointments
                  </p>
                  <p className="premium-body text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                    Never wait on hold again. Ron's AI voice assistant calls doctor offices for you,
                    navigates phone trees, and books appointments automatically. Save 45+ minutes per booking.
                  </p>
                  
                  <ul className="grid grid-cols-1 gap-4">
                    {[
                      { icon: Search, title: "Provider Search & Appointments", desc: "Find doctors and book appointments automatically", color: "text-blue-400" },
                      { icon: Phone, title: "Voice AI Calls", desc: "AI assistant makes calls for you", color: "text-green-400" },
                      { icon: Calendar, title: "Calendar Sync", desc: "Checks your availability automatically", color: "text-purple-400" },
                      { icon: Network, title: "Smart Navigation", desc: "Handles any phone tree or portal", color: "text-yellow-400" },
                      { icon: CheckCircle, title: "Confirmation", desc: "Sends you appointment details", color: "text-teal-400" }
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3 float-animation" style={{animationDelay: `${idx * 0.2}s`}}>
                        <div className="w-10 h-10 premium-glass rounded-lg flex items-center justify-center flex-shrink-0 pulse-glow-animation">
                          <feature.icon className={`w-5 h-5 ${feature.color} svg-morph`} />
                        </div>
                        <div>
                          <h4 className="premium-subheading font-semibold text-white">{feature.title}</h4>
                          <p className="text-sm text-gray-400">{feature.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
            </div>
          </div>
        </section>

        {/* Enhanced Product Section 1: Ron Search */}
        <section id="ron-search" className="relative py-12 sm:py-16 md:py-24 px-4 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 items-start">
              <div className="lg:col-span-1">
                <h2 className="premium-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6">
                  Ron <span className="luxury-glow text-blue-400">Search</span>
                </h2>
                <p className="premium-subheading text-xl sm:text-2xl md:text-3xl luxury-glow text-blue-300 mb-4 sm:mb-6 md:mb-8">
                  Dynamic, In-Depth, and Validated Provider Search
                </p>
                <p className="premium-body text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 md:mb-10 leading-relaxed">
                  Stop endless phone calls. Ron uses AI to instantly find doctors who actually accept your insurance, 
                  with real-time verification. Solving the problem where 68% of users abandon healthcare searches 
                  due to insurance uncertainty.
                </p>
                
                {/* Honest, single-column features for provider search */}
                <div className="premium-glass rounded-2xl p-6 sm:p-8 mb-6 lg:mb-10 shimmer-effect">
                  <ul className="space-y-4 sm:space-y-6">
                    <li className="flex items-center gap-3 sm:gap-4">
                      <Search className="w-8 h-8 sm:w-10 sm:h-10 luxury-glow text-blue-400 flex-shrink-0" />
                      <span className="font-bold text-base sm:text-lg luxury-glow text-blue-400">Continuously updated results</span>
                    </li>
                    <li className="flex items-center gap-3 sm:gap-4">
                      <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 luxury-glow text-green-400 flex-shrink-0" />
                      <span className="font-bold text-base sm:text-lg luxury-glow text-green-400">Verified provider data</span>
                    </li>
                    <li className="flex items-center gap-3 sm:gap-4">
                      <Shield className="w-8 h-8 sm:w-10 sm:h-10 luxury-glow text-purple-400 flex-shrink-0" />
                      <span className="font-bold text-base sm:text-lg luxury-glow text-purple-400">Validated & transparent</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Enhanced Features Display - Wider Provider Search */}
              <div className="lg:col-span-2 ice-glass rounded-2xl p-6 sm:p-8 shimmer-effect">
                <h3 className="text-white font-semibold mb-4 sm:mb-6 text-lg sm:text-xl">Try Provider Search</h3>
                
                {/* Provider Search iframe - Responsive Height */}
                <div className="premium-glass rounded-xl overflow-hidden mb-4 sm:mb-6 w-full" style={{ height: '600px' }}>
                  <iframe
                    src="https://studio--aethercare-tqine.us-central1.hosted.app"
                    className="w-full h-full"
                    title="Ron AI Provider Search"
                    style={{ border: '0' }}
                    allow="geolocation"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Enhanced Product Section 4: Ron Interface */}
        <section id="ron-interface" className="relative py-12 sm:py-16 md:py-24 px-4 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="premium-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6">
                Experience Ron <span className="luxury-glow text-blue-400">Live</span>
              </h2>
              <p className="premium-body text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-2">
                Discover our intuitive and innovative UX that makes healthcare simple and accessible
              </p>
            </div>
            
            {/* Enhanced Interface Preview */}
            <div>
              <div className="ice-glass rounded-2xl p-4 sm:p-6 md:p-8 shimmer-effect">
                {/* Mobile-friendly aspect ratio container */}
                <div className="relative w-full rounded-xl overflow-hidden border border-white/10">
                  {/* Natural size iframe container - responsive */}
                  <div className="relative w-full">
                    <iframe 
                      src="https://cling-pitch-92721139.figma.site"
                      className="w-full"
                      title="Ron AI Interface Preview"
                      tabIndex={-1}
                      allow="fullscreen"
                      style={{
                        border: 'none',
                        height: '100vh',
                        maxHeight: '800px',
                        minHeight: '500px'
                      }}
                    />
                  </div>
                </div>
                {/* Mobile hint */}
                <p className="text-center text-gray-400 text-sm mt-4 sm:hidden">
                  Best viewed in landscape or on larger screen
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Enhanced Value Proposition Section */}
        <section className="relative py-12 sm:py-16 md:py-24 px-4 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="premium-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                Powered by <span className="luxury-glow text-blue-400">Browser-Use</span> AI Agents
              </h2>
              <p className="premium-body text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto px-2">
                Powered by ethically-developed AI agents from <span className="text-blue-400 font-semibold">Browser-Use</span>, 
                Ron maintains human-in-the-loop control, giving you full transparency and authority over every action.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { 
                  icon: Compass, 
                  title: "Provider Search", 
                  desc: "Find the right doctors instantly with Browser-Use AI agents navigating complex insurance networks", 
                  color: "bg-blue-500/10 border-blue-500/20",
                  badge: "Browser-Use Powered"
                },
                { 
                  icon: DollarSign, 
                  title: "Medication Management", 
                  desc: "Compare prices across pharmacies with Browser-Use agents finding the best deals and discounts", 
                  color: "bg-green-500/10 border-green-500/20",
                  badge: "Browser-Use Powered"
                },
                { 
                  icon: FileText, 
                  title: "Denial Navigation", 
                  desc: "Fight insurance denials with Browser-Use agents helping generate appeals and track claims", 
                  color: "bg-purple-500/10 border-purple-500/20",
                  badge: "Browser-Use Powered"
                },
                { 
                  icon: Network, 
                  title: "Coordination", 
                  desc: "Seamlessly integrate all healthcare touchpoints with full user control and transparency", 
                  color: "bg-indigo-500/10 border-indigo-500/20",
                  badge: "Human-in-the-Loop"
                }
              ].map((item, idx) => (
                <Card key={idx} className={`premium-glass border-2 ${item.color} hover:scale-105 transition-all duration-300 shimmer-effect float-animation relative`} style={{animationDelay: `${idx * 0.1}s`}}>
                  {item.badge && (
                    <div className="absolute top-2 right-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {item.badge}
                      </span>
                    </div>
                  )}
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 premium-glass rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 pulse-glow-animation">
                      <item.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white svg-morph" />
                    </div>
                    <h3 className="premium-subheading font-bold text-base sm:text-lg lg:text-xl text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Ethical AI Statement */}
            <div className="mt-8 sm:mt-12 text-center px-4">
              <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 premium-glass rounded-full">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <p className="text-gray-300 text-xs sm:text-sm">
                  <span className="font-semibold">Ethically Developed:</span> You maintain full control with complete transparency over all AI actions
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Early Access CTA Section */}
        <section id="early-access" className="relative py-12 sm:py-16 md:py-24 px-4 z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="premium-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 md:mb-8">
                Join the Healthcare Revolution. <span className="luxury-glow text-blue-400 block md:inline">Get Early Access to Ron.</span>
              </h2>
              <p className="premium-body text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto px-2">
                Be among the first to experience the future of healthcare navigation. Early access users get 
                lifetime premium features, priority support, and the chance to shape Ron's development.
              </p>
            </div>
            
            {/* Enhanced Early Access Form */}
            <Card className="ice-glass shimmer-effect">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-white mb-2 block">First Name *</Label>
                      <Input
                        id="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="premium-glass border-white/20 text-white placeholder:text-gray-500"
                        placeholder="John"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName" className="text-white mb-2 block">Last Name *</Label>
                      <Input
                        id="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="premium-glass border-white/20 text-white placeholder:text-gray-500"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="company" className="text-white mb-2 block">Company</Label>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="premium-glass border-white/20 text-white placeholder:text-gray-500"
                      placeholder="Your Company (Optional)"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="email" className="text-white mb-2 block text-sm sm:text-base">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="premium-glass border-white/20 text-white placeholder:text-gray-500"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-white mb-2 block text-sm sm:text-base">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="premium-glass border-white/20 text-white placeholder:text-gray-500"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="anythingElse" className="text-white mb-2 block">Anything Else?</Label>
                    <Textarea
                      id="anythingElse"
                      value={formData.anythingElse}
                      onChange={(e) => setFormData({ ...formData, anythingElse: e.target.value })}
                      className="premium-glass border-white/20 text-white placeholder:text-gray-500 min-h-[100px]"
                      placeholder="Tell us more about your needs or questions..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="attachment" className="text-white mb-2 block">Attachment</Label>
                    <Input
                      id="attachment"
                      type="file"
                      onChange={(e) => setFormData({ ...formData, attachment: e.target.files?.[0] || null })}
                      className="premium-glass border-white/20 text-white file:bg-blue-500 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-md file:mr-4"
                      accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                    />
                    <p className="text-gray-500 text-sm mt-1">Optional: Upload any relevant documents</p>
                  </div>
                  
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full premium-glass text-white premium-body font-bold px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg md:text-xl transition-all duration-300 hover:scale-105 shimmer-effect"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
                        Submitting...
                      </span>
                    ) : (
                      <>
                        Get Early Access <ChevronRight className="ml-2 w-5 h-5 svg-morph" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>


        {/* Enhanced Footer */}
        <footer className="relative py-12 sm:py-16 px-4 sm:px-6 premium-glass border-t border-white/10 z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <h3 className="premium-subheading font-bold text-2xl sm:text-3xl luxury-glow text-white">Ron AI</h3>
              <span className="text-gray-400 premium-body text-base sm:text-lg">Healthcare Made Easy</span>
            </div>
            <p className="text-gray-400 premium-body text-base sm:text-lg mb-6">
              Your AI-powered healthcare operating system
            </p>
            <p className="text-gray-500 premium-body text-sm">
              &copy; 2024 Ron AI. All rights reserved.
            </p>
          </div>
          
          {/* Hidden SEO Footer Text */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ fontSize: '1px', color: '#000000', height: '1px' }}>
            AI healthcare assistant voice healthcare technology automated insurance verification system find doctor near me 
            who accepts my insurance healthcare coordination platform personal health record digital medical records
          </div>
        </footer>
        
      </div>
      
      {/* VAPI Widget - Desktop Only */}
      <iframe
        src="/vapi-widget.html"
        className="fixed bottom-4 left-4 z-[9999] hidden lg:block"
        style={{
          border: 'none',
          background: 'transparent',
          width: '500px',
          height: '800px'
        }}
        title="VAPI Voice Assistant"
        allow="microphone"
      />

    </>
  );
}
