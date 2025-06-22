'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Zap, CheckCircle2, ArrowRight, FileCheck, Users, Building, Globe, Server, Award } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/ui/Header";

export default function SecurityCompliancePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-section').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />

      {/* Hero Section with Enhanced Animation */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Background Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-64 sm:w-96 h-64 sm:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-64 sm:w-96 h-64 sm:h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Enhanced Interactive Shield Animation */}
            <motion.div 
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative">
                <svg width="450" height="450" viewBox="0 0 450 450" className="w-full max-w-sm sm:max-w-md">
                  <defs>
                    <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#3b82f6' }}>
                        <animate attributeName="stop-color" values="#3b82f6;#8b5cf6;#3b82f6" dur="4s" repeatCount="indefinite" />
                      </stop>
                      <stop offset="100%" style={{ stopColor: '#8b5cf6' }}>
                        <animate attributeName="stop-color" values="#8b5cf6;#3b82f6;#8b5cf6" dur="4s" repeatCount="indefinite" />
                      </stop>
                    </linearGradient>
                    <filter id="heroGlow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <filter id="heroShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.15"/>
                    </filter>
                  </defs>
                  
                  {/* Animated Shield */}
                  <g transform="translate(225, 225)">
                    <motion.path
                      d="M0 -125 L-80 -85 L-80 25 Q-80 105, 0 155 Q80 105, 80 25 L80 -85 Z"
                      fill="url(#heroGradient)"
                      filter="url(#heroShadow)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    
                    {/* Central Lock with Pulse */}
                    <g filter="url(#heroGlow)">
                      <rect x="-35" y="-25" width="70" height="50" rx="10" fill="white" opacity="0.95" />
                      <path
                        d="M-25,-40 Q-25,-60 0,-60 Q25,-60 25,-40 L25,-25 L-25,-25 Z"
                        fill="none"
                        stroke="white"
                        strokeWidth="10"
                      />
                      <circle cx="0" cy="0" r="10" fill="#2563EB">
                        <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
                      </circle>
                    </g>
                    
                    {/* Orbiting Security Nodes */}
                    <g>
                      <circle r="120" fill="none" stroke="white" strokeWidth="1" opacity="0.2" />
                      <g>
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="0 0 0"
                          to="360 0 0"
                          dur="20s"
                          repeatCount="indefinite"
                        />
                        <circle cx="120" cy="0" r="12" fill="white" opacity="0.8" />
                        <circle cx="-120" cy="0" r="12" fill="white" opacity="0.8" />
                        <circle cx="0" cy="120" r="12" fill="white" opacity="0.8" />
                        <circle cx="0" cy="-120" r="12" fill="white" opacity="0.8" />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </motion.div>
            
            {/* Hero Text with Enhanced Typography */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                Navigate the New Era of Healthcare{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Interoperability
                </span>
              </h1>
              <p className="font-body text-lg sm:text-xl md:text-2xl text-slate-700 mb-6 sm:mb-10 leading-relaxed">
                The CMS Final Rule (CMS-0057-F) is here. Nira is the secure, intelligent platform built to master it, 
                turning complex mandates into your competitive advantage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-body font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                >
                  Explore Compliance Solutions
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-slate-300 hover:border-slate-400 font-body font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 w-full sm:w-auto"
                >
                  View Security Whitepaper
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Understanding the Mandate Section with Enhanced Cards */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-slate-50 fade-in-section">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-slate-900 mb-4 sm:mb-6">
              What the Final Rule <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Demands</span>
            </h2>
            <p className="font-body text-lg sm:text-xl text-slate-600 text-center mb-8 sm:mb-16 max-w-3xl mx-auto">
              Stay ahead of the curve with our comprehensive compliance roadmap
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Accelerated Decisions Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
              viewport={{ once: true }}
            >
              <Card 
                className="h-full bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden group"
                onMouseEnter={() => setHoveredCard('accelerated')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-orange-600/0 group-hover:from-orange-400/10 group-hover:to-orange-600/20 transition-all duration-500"></div>
                <CardContent className="p-6 sm:p-8 relative z-10">
                  <motion.div 
                    className="mb-6 flex justify-center"
                    animate={{ 
                      rotate: hoveredCard === 'accelerated' ? 360 : 0,
                      scale: hoveredCard === 'accelerated' ? 1.1 : 1
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Zap className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 mb-4">
                    Accelerated Decisions
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="px-3 py-1 bg-orange-600 text-white rounded-full text-sm font-semibold">
                      2026 Deadline
                    </div>
                  </div>
                  <p className="font-body text-slate-700 leading-relaxed">
                    By January 1, 2026, payers must accelerate prior authorization decisions and provide specific 
                    reasons for denials, demanding unprecedented efficiency.
                  </p>
                  <div className="mt-6 pt-6 border-t border-orange-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-orange-700 font-semibold">Impact Level</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map((i) => (
                          <div key={i} className={`w-2 h-8 rounded-full ${i <= 4 ? 'bg-orange-500' : 'bg-orange-200'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* API Mandates Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className="h-full bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden group"
                onMouseEnter={() => setHoveredCard('api')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-blue-600/0 group-hover:from-blue-400/10 group-hover:to-blue-600/20 transition-all duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <motion.div 
                    className="mb-6 flex justify-center"
                    animate={{ 
                      scale: hoveredCard === 'api' ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 0.6, repeat: hoveredCard === 'api' ? Infinity : 0, repeatDelay: 1 }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg relative">
                      <div className="absolute inset-0 bg-blue-400 rounded-2xl animate-ping opacity-20"></div>
                      <Globe className="w-10 h-10 text-white relative z-10" />
                    </div>
                  </motion.div>
                  <h3 className="font-heading font-bold text-2xl text-slate-900 mb-4">
                    API Mandates
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
                      2027 Deadline
                    </div>
                  </div>
                  <p className="font-body text-slate-700 leading-relaxed">
                    By January 1, 2027, payers are mandated to launch new APIs for Provider Access, 
                    Payer-to-Payer data exchange, and seamless Prior Authorization.
                  </p>
                  <div className="mt-6 pt-6 border-t border-blue-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-700 font-semibold">Impact Level</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map((i) => (
                          <div key={i} className={`w-2 h-8 rounded-full ${i <= 5 ? 'bg-blue-500' : 'bg-blue-200'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Clinician Accountability Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card 
                className="h-full bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden group"
                onMouseEnter={() => setHoveredCard('clinician')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-purple-600/0 group-hover:from-purple-400/10 group-hover:to-purple-600/20 transition-all duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <motion.div 
                    className="mb-6 flex justify-center"
                    animate={{ 
                      y: hoveredCard === 'clinician' ? [-5, 5, -5] : 0
                    }}
                    transition={{ duration: 2, repeat: hoveredCard === 'clinician' ? Infinity : 0 }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="font-heading font-bold text-2xl text-slate-900 mb-4">
                    Clinician Accountability
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-semibold">
                      2027+ Ongoing
                    </div>
                  </div>
                  <p className="font-body text-slate-700 leading-relaxed">
                    Starting in 2027, clinicians will be measured on their use of electronic prior 
                    authorization, directly impacting MIPS scores and reimbursement.
                  </p>
                  <div className="mt-6 pt-6 border-t border-purple-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-purple-700 font-semibold">Impact Level</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map((i) => (
                          <div key={i} className={`w-2 h-8 rounded-full ${i <= 4 ? 'bg-purple-500' : 'bg-purple-200'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Nira Solution Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 fade-in-section">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-slate-900 mb-4 sm:mb-6">
              Turn Mandates into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Momentum with Nira
              </span>
            </h2>
            <p className="font-body text-lg sm:text-xl text-slate-600 text-center mb-8 sm:mb-16 max-w-3xl mx-auto">
              Our AI-powered platform transforms compliance challenges into competitive advantages
            </p>
          </motion.div>
          
          <div className="space-y-8">
            {/* Master Prior Authorization */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 sm:p-8 lg:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
                    <div className="text-white">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                          <FileCheck className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-heading font-bold text-2xl sm:text-3xl">Master Prior Authorization</h3>
                      </div>
                      <p className="font-body text-base sm:text-lg leading-relaxed mb-6 text-white/90">
                        Nira's AI agents connect directly to the new Prior Authorization APIs. We automate 
                        documentation discovery, smart submission, and real-time status tracking, ensuring 
                        you meet the critical 7-day and 72-hour decision timeframes.
                      </p>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span className="text-white/80">Eliminate delays and denials</span>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="relative w-48 h-48 sm:w-64 sm:h-64"
                      >
                        <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" />
                        <div className="absolute inset-4 bg-white/20 rounded-full animate-pulse animation-delay-500" />
                        <div className="absolute inset-8 bg-white/30 rounded-full flex items-center justify-center">
                          <FileCheck className="w-24 h-24 text-white" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Streamline Data Exchange */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="bg-gradient-to-r from-teal-600 via-cyan-700 to-blue-700 p-6 sm:p-8 lg:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
                    <div className="flex justify-center order-2 md:order-1">
                      <motion.div
                        animate={{ 
                          rotate: 360
                        }}
                        transition={{ 
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="relative w-64 h-64"
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Globe className="w-32 h-32 text-white/20" />
                        </div>
                        <div className="absolute inset-0">
                          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                            <div
                              key={i}
                              className="absolute w-4 h-4 bg-white rounded-full"
                              style={{
                                top: '50%',
                                left: '50%',
                                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-100px)`
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    </div>
                    <div className="text-white order-1 md:order-2">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                          <Globe className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-heading font-bold text-2xl sm:text-3xl">Streamline Data Exchange</h3>
                      </div>
                      <p className="font-body text-lg leading-relaxed mb-6 text-white/90">
                        Nira's core architecture is built for next-generation interoperability. Our platform 
                        seamlessly integrates with new Provider Access and Payer-to-Payer APIs, giving you 
                        a unified view of patient data when you need it most.
                      </p>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span className="text-white/80">Real-time data synchronization</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Empower Clinicians & Organizations */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="bg-gradient-to-r from-indigo-600 via-purple-700 to-blue-700 p-6 sm:p-8 lg:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
                    <div className="text-white">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                          <Building className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-heading font-bold text-2xl sm:text-3xl">Empower Your Organization</h3>
                      </div>
                      <p className="font-body text-lg leading-relaxed mb-6 text-white/90">
                        For clinicians, Nira is essential for MIPS compliance. For organizations, we provide 
                        system-wide efficiency and reduced administrative overhead across your entire network.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                          <span className="text-white/80">Safeguard MIPS incentives</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                          <span className="text-white/80">Enterprise-wide compliance</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <motion.div className="relative w-64 h-64">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <Building className="w-32 h-32 text-white/30" />
                        </motion.div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="grid grid-cols-3 gap-2">
                            {[...Array(9)].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{ 
                                  opacity: [0.5, 1, 0.5]
                                }}
                                transition={{ 
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.1
                                }}
                                className="w-6 h-6 bg-white/40 rounded"
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Commitment to Security Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-slate-50 fade-in-section">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-slate-900 mb-4 sm:mb-6">
              Security Isn't a Feature. It's Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Foundation
              </span>
            </h2>
            <p className="font-body text-lg sm:text-xl text-slate-600 text-center mb-8 sm:mb-16 max-w-3xl mx-auto">
              Built with enterprise-grade security from day one
            </p>
          </motion.div>
          
          <div className="space-y-8">
            {/* HIPAA Compliant by Design */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-6 sm:p-8 lg:p-12">
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                      >
                        <Lock className="w-10 h-10 text-white" />
                      </motion.div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 mb-4">
                        HIPAA Compliant by Design
                      </h3>
                      <p className="font-body text-base sm:text-lg text-slate-700 leading-relaxed">
                        At Ron AI, security is baked into Nira's DNA. We are building our platform to meet 
                        and exceed all administrative, physical, and technical safeguards required by the 
                        HIPAA Security Rule, ensuring the privacy and integrity of all data.
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        {['Administrative Safeguards', 'Physical Safeguards', 'Technical Safeguards'].map((item) => (
                          <div key={item} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* A Phased Approach to Trust */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-8 lg:p-12">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg"
                      >
                        <Award className="w-10 h-10 text-white" />
                      </motion.div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-3xl text-slate-900 mb-4">
                        A Phased Approach to Trust
                      </h3>
                      <p className="font-body text-lg text-slate-700 leading-relaxed mb-6">
                        Our initial MVP is strategically designed to operate without handling Protected 
                        Health Information (PHI), focusing on de-identified workflows to prove our immense 
                        value while ensuring zero risk.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg">
                          <h4 className="font-semibold text-teal-900 mb-2">Phase 1: MVP</h4>
                          <p className="text-sm text-teal-700">De-identified workflows, zero PHI risk</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Phase 2: Enterprise</h4>
                          <p className="text-sm text-blue-700">Full PHI-enabled with robust BAAs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* The Future is Zero-Trust */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-8 lg:p-12">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                      >
                        <Shield className="w-10 h-10 text-white" />
                      </motion.div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-3xl text-slate-900 mb-4">
                        The Future is Zero-Trust
                      </h3>
                      <p className="font-body text-lg text-slate-700 leading-relaxed mb-6">
                        Our long-term security roadmap is built on a cutting-edge Zero-Trust Architecture. 
                        We are engineering Nira for enterprise-grade, proactive security, with the explicit 
                        goal of achieving SOC 2 Type II compliance.
                      </p>
                      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-6">
                        <h4 className="font-semibold text-indigo-900 mb-3">Security Roadmap</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                            <span className="text-indigo-800">Zero-Trust Architecture</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                            <span className="text-indigo-800">SOC 2 Type II Compliance</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                            <span className="text-indigo-800">Enterprise-Grade Security</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 fade-in-section">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-r from-slate-800 via-blue-900 to-purple-900 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse" />
              <CardContent className="relative p-6 sm:p-8 lg:p-12 text-center">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                  Ready to Master the New Rules and{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                    Reclaim Your Time?
                  </span>
                </h2>
                <p className="font-body text-lg sm:text-xl text-white/80 mb-6 sm:mb-10 max-w-2xl mx-auto">
                  Join forward-thinking healthcare organizations already preparing for the future 
                  with Nira's intelligent compliance platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-slate-900 hover:bg-gray-100 font-body font-bold px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                  >
                    Request Early Access
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 font-body font-bold px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl transition-all duration-300 w-full sm:w-auto"
                  >
                    Download Executive Brief
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">Nira</h3>
            <span className="text-slate-400 font-body text-sm sm:text-base">by Ron AI</span>
          </div>
          <p className="text-slate-400 font-body text-sm sm:text-base">
            © 2024 Ron AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
