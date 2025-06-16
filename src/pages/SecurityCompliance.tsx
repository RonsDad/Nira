import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SecurityCompliance = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="font-heading font-bold text-2xl text-slate-900">Nira</h1>
              <span className="text-sm text-slate-600 font-body">by Ron AI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex space-x-6">
                <Link to="/" className="text-slate-700 hover:text-slate-900 font-body transition-colors">Home</Link>
                <Link to="/security-compliance" className="text-slate-900 font-body font-semibold transition-colors">Security & Compliance</Link>
                <a href="#" className="text-slate-700 hover:text-slate-900 font-body transition-colors">Blog</a>
                <a href="#" className="text-slate-700 hover:text-slate-900 font-body transition-colors">About Us</a>
                <a href="#" className="text-slate-700 hover:text-slate-900 font-body transition-colors">Contact</a>
              </nav>
              
              <Button className="bg-slate-800 hover:bg-slate-900 text-white font-body font-medium px-6 transition-colors">
                Request Early Access
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Large SVG */}
            <div className="flex justify-center lg:justify-start">
              <svg width="400" height="400" viewBox="0 0 400 400" className="w-full max-w-md">
                <defs>
                  <linearGradient id="blueToTeal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#1e40af' }} />
                    <stop offset="100%" style={{ stopColor: '#0ea5e9' }} />
                  </linearGradient>
                  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="3" dy="3" stdDeviation="3" floodOpacity="0.2"/>
                  </filter>
                </defs>
                
                {/* Shield Background */}
                <path
                  d="M200 50 L120 90 L120 200 Q120 280, 200 330 Q280 280, 280 200 L280 90 Z"
                  fill="url(#blueToTeal)"
                  filter="url(#shadow)"
                />
                
                {/* Lock Icon */}
                <g transform="translate(200, 180)">
                  <rect x="-30" y="-20" width="60" height="45" rx="8" fill="white" opacity="0.9" />
                  <path
                    d="M-20,-35 Q-20,-50 0,-50 Q20,-50 20,-35 L20,-20 L-20,-20 Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="8"
                  />
                  <circle cx="0" cy="0" r="8" fill="#2563EB" />
                </g>
                
                {/* Data Nodes */}
                <circle cx="150" cy="120" r="8" fill="white" opacity="0.8" />
                <circle cx="250" cy="120" r="8" fill="white" opacity="0.8" />
                <circle cx="200" cy="250" r="8" fill="white" opacity="0.8" />
                <line x1="150" y1="120" x2="200" y2="180" stroke="white" strokeWidth="2" opacity="0.5" />
                <line x1="250" y1="120" x2="200" y2="180" stroke="white" strokeWidth="2" opacity="0.5" />
                <line x1="200" y1="180" x2="200" y2="250" stroke="white" strokeWidth="2" opacity="0.5" />
              </svg>
            </div>
            
            {/* Right: Text Content */}
            <div>
              <h1 className="font-inter font-medium text-5xl md:text-6xl text-black mb-6 leading-tight">
                Navigate the New Era of Healthcare Interoperability
              </h1>
              <p className="font-body text-xl md:text-2xl text-slate-700 leading-relaxed">
                The CMS Final Rule (CMS-0057-F) is here. Ron AI's flagship product, Nira.is the secure, intelligent platform built to master it, turning complex mandates into your competitive advantage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding the Mandate Section */}
      <section className="py-20 px-6 bg-slate-50 fade-in-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-inter font-medium text-4xl text-center text-black mb-16">
            What the Final Rule Demands
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Accelerated Decisions */}
            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <defs>
                      <filter id="iconShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.15"/>
                      </filter>
                    </defs>
                    <circle cx="40" cy="40" r="35" fill="#F97316" filter="url(#iconShadow)" />
                    <path
                      d="M40 20 L40 40 L55 40"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <circle cx="40" cy="40" r="3" fill="white" />
                    <path
                      d="M25 15 L30 10 M55 15 L50 10"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 mb-4">
                  Accelerated Decisions (2026)
                </h3>
                <p className="font-body text-slate-700">
                  By January 1, 2026, payers must accelerate prior authorization decisions and provide specific reasons for denials, demanding unprecedented efficiency.
                </p>
              </CardContent>
            </Card>
            
            {/* Column 2: API Mandates */}
            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <defs>
                      <linearGradient id="apiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#2563EB' }} />
                        <stop offset="100%" style={{ stopColor: '#14B8A6' }} />
                      </linearGradient>
                    </defs>
                    <g filter="url(#iconShadow)">
                      {/* Central node */}
                      <circle cx="40" cy="40" r="12" fill="url(#apiGradient)" />
                      {/* Connected nodes */}
                      <circle cx="20" cy="20" r="8" fill="#2563EB" />
                      <circle cx="60" cy="20" r="8" fill="#2563EB" />
                      <circle cx="20" cy="60" r="8" fill="#14B8A6" />
                      <circle cx="60" cy="60" r="8" fill="#14B8A6" />
                      {/* Connections */}
                      <line x1="40" y1="40" x2="20" y2="20" stroke="#2563EB" strokeWidth="2" opacity="0.5" />
                      <line x1="40" y1="40" x2="60" y2="20" stroke="#2563EB" strokeWidth="2" opacity="0.5" />
                      <line x1="40" y1="40" x2="20" y2="60" stroke="#14B8A6" strokeWidth="2" opacity="0.5" />
                      <line x1="40" y1="40" x2="60" y2="60" stroke="#14B8A6" strokeWidth="2" opacity="0.5" />
                    </g>
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 mb-4">
                  API Mandates (2027)
                </h3>
                <p className="font-body text-slate-700">
                  By January 1, 2027, payers are mandated to launch new APIs for Provider Access, Payer-to-Payer data exchange, and seamless Prior Authorization, redefining data flow.
                </p>
              </CardContent>
            </Card>
            
            {/* Column 3: Clinician Accountability */}
            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <g filter="url(#iconShadow)">
                      {/* Score card background */}
                      <rect x="15" y="20" width="50" height="40" rx="8" fill="#F97316" />
                      {/* Progress bars */}
                      <rect x="25" y="30" width="30" height="4" rx="2" fill="white" opacity="0.5" />
                      <rect x="25" y="30" width="24" height="4" rx="2" fill="white" />
                      <rect x="25" y="38" width="30" height="4" rx="2" fill="white" opacity="0.5" />
                      <rect x="25" y="38" width="20" height="4" rx="2" fill="white" />
                      <rect x="25" y="46" width="30" height="4" rx="2" fill="white" opacity="0.5" />
                      <rect x="25" y="46" width="28" height="4" rx="2" fill="white" />
                    </g>
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 mb-4">
                  Clinician Accountability (2027 onwards)
                </h3>
                <p className="font-body text-slate-700">
                  Starting in 2027, clinicians will be measured on their use of electronic prior authorization, directly impacting their MIPS score and reimbursement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Ron AI's flagship product, Nira.Solution Section */}
      <section className="py-20 px-6 fade-in-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-inter font-medium text-4xl text-center text-black mb-16">
            Turn Mandates into Momentum with Nira
          </h2>
          
          <div className="space-y-12">
            {/* Part 1: Master Prior Authorization */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="flex justify-center">
                    <svg width="200" height="200" viewBox="0 0 200 200">
                      <defs>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      {/* Document flowing through gate */}
                      <rect x="20" y="60" width="60" height="80" rx="4" fill="white" filter="url(#glow)" />
                      <line x1="30" y1="80" x2="70" y2="80" stroke="#2563EB" strokeWidth="2" />
                      <line x1="30" y1="90" x2="70" y2="90" stroke="#2563EB" strokeWidth="2" />
                      <line x1="30" y1="100" x2="70" y2="100" stroke="#2563EB" strokeWidth="2" />
                      {/* Digital gate */}
                      <path d="M100 50 L100 150 M100 50 L120 50 L120 80 M100 150 L120 150 L120 120" 
                            stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" />
                      {/* Approved document */}
                      <rect x="140" y="60" width="60" height="80" rx="4" fill="white" opacity="0.9" filter="url(#glow)" />
                      <circle cx="170" cy="100" r="15" fill="#10B981" />
                      <path d="M160 100 L165 105 L180 90" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Flow arrow */}
                      <path d="M85 100 L115 100 M110 95 L115 100 L110 105" 
                            stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="text-white">
                    <h3 className="font-heading font-bold text-2xl mb-4">Master Prior Authorization</h3>
                    <p className="font-body text-lg">
                      Nira's AI agents connect directly to the new Prior Authorization APIs. We automate documentation discovery, smart submission, and real-time status tracking, ensuring you meet the critical 7-day and 72-hour decision timeframes, eliminating delays and denials.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Part 2: Streamline Data Exchange */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-sky-600 to-blue-600 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="text-white order-2 md:order-1">
                    <h3 className="font-heading font-bold text-2xl mb-4">Streamline Data Exchange</h3>
                    <p className="font-body text-lg">
                      Nira's core architecture is built for next-generation interoperability. Our platform is designed to interact seamlessly with the new Provider Access and Payer-to-Payer APIs, giving you a unified, comprehensive view of patient data when and where you need it most.
                    </p>
                  </div>
                  <div className="flex justify-center order-1 md:order-2">
                    <svg width="200" height="200" viewBox="0 0 200 200">
                      {/* Central hub */}
                      <circle cx="100" cy="100" r="20" fill="white" filter="url(#glow)" />
                      {/* Data streams */}
                      <g opacity="0.8">
                        <path d="M50 50 Q100 50, 100 80" stroke="white" strokeWidth="3" fill="none" strokeDasharray="5,5">
                          <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
                        </path>
                        <path d="M150 50 Q100 50, 100 80" stroke="white" strokeWidth="3" fill="none" strokeDasharray="5,5">
                          <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
                        </path>
                        <path d="M50 150 Q100 150, 100 120" stroke="white" strokeWidth="3" fill="none" strokeDasharray="5,5">
                          <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
                        </path>
                        <path d="M150 150 Q100 150, 100 120" stroke="white" strokeWidth="3" fill="none" strokeDasharray="5,5">
                          <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
                        </path>
                      </g>
                      {/* Data sources */}
                      <circle cx="50" cy="50" r="15" fill="white" opacity="0.7" />
                      <circle cx="150" cy="50" r="15" fill="white" opacity="0.7" />
                      <circle cx="50" cy="150" r="15" fill="white" opacity="0.7" />
                      <circle cx="150" cy="150" r="15" fill="white" opacity="0.7" />
                      {/* User interface */}
                      <rect x="85" y="85" width="30" height="30" rx="4" fill="#2563EB" />
                      <circle cx="100" cy="95" r="3" fill="white" />
                      <path d="M92 105 Q100 100, 108 105" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                </div>
              </div>
            </Card>

            {/* Part 3: Empower Clinicians & Organizations */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="flex justify-center">
                    <svg width="200" height="200" viewBox="0 0 200 200">
                      {/* Rising figures */}
                      <g filter="url(#glow)">
                        {/* Central figure */}
                        <circle cx="100" cy="80" r="15" fill="white" />
                        <path d="M100 95 L100 130 M100 110 L80 120 M100 110 L120 120 M100 130 L85 150 M100 130 L115 150" 
                              stroke="white" strokeWidth="4" strokeLinecap="round" />
                        {/* Left figure */}
                        <circle cx="60" cy="90" r="12" fill="white" opacity="0.8" />
                        <path d="M60 102 L60 125 M60 112 L48 118 M60 112 L72 118 M60 125 L50 140 M60 125 L70 140" 
                              stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
                        {/* Right figure */}
                        <circle cx="140" cy="90" r="12" fill="white" opacity="0.8" />
                        <path d="M140 102 L140 125 M140 112 L128 118 M140 112 L152 118 M140 125 L130 140 M140 125 L150 140" 
                              stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
                        {/* Upward arrows */}
                        <path d="M100 160 L100 170 M95 165 L100 160 L105 165" 
                              stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
                        <path d="M60 150 L60 158 M56 154 L60 150 L64 154" 
                              stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
                        <path d="M140 150 L140 158 M136 154 L140 150 L144 154" 
                              stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
                      </g>
                    </svg>
                  </div>
                  <div className="text-white">
                    <h3 className="font-heading font-bold text-2xl mb-4">Empower Clinicians & Organizations</h3>
                    <p className="font-body text-lg">
                      For individual clinicians, Ron AI's flagship product, Nira.is the essential tool for satisfying the new MIPS electronic prior authorization measure, safeguarding your incentives. For organizations, Ron AI's flagship product, Nira.provides the clear path to system-wide compliance, unparalleled efficiency, and significantly reduced administrative overhead across your entire network.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Commitment to Security Section */}
      <section className="py-20 px-6 bg-slate-50 fade-in-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-inter font-medium text-4xl text-center text-black mb-16">
            Security Isn't a Feature. It's Our Foundation
          </h2>
          
          <div className="space-y-8">
            {/* HIPAA Compliant by Design */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      <defs>
                        <linearGradient id="lockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#2563EB' }} />
                          <stop offset="100%" style={{ stopColor: '#14B8A6' }} />
                        </linearGradient>
                      </defs>
                      <g filter="url(#iconShadow)">
                        {/* Lock body */}
                        <rect x="20" y="35" width="40" height="30" rx="6" fill="url(#lockGradient)" />
                        {/* Lock shackle */}
                        <path d="M30 35 L30 25 Q30 15, 40 15 Q50 15, 50 25 L50 35" 
                              fill="none" stroke="url(#lockGradient)" strokeWidth="6" strokeLinecap="round" />
                        {/* HIPAA text */}
                        <text x="40" y="53" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">HIPAA</text>
                      </g>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-2xl text-slate-900 mb-3">
                      HIPAA Compliant by Design
                    </h3>
                    <p className="font-body text-lg text-slate-700">
                      At Ron AI, security is baked into Nira's DNA. We are building our platform to meet and exceed all administrative, physical, and technical safeguards required by the HIPAA Security Rule, ensuring the privacy and integrity of all data.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* A Phased Approach to Trust */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      <g filter="url(#iconShadow)">
                        {/* Growing plant */}
                        <rect x="30" y="50" width="20" height="20" rx="4" fill="#F97316" />
                        <path d="M40 50 L40 35" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
                        <path d="M40 40 Q30 35, 30 25 Q30 20, 35 20 Q40 20, 40 25" 
                              fill="#10B981" stroke="#10B981" strokeWidth="2" />
                        <path d="M40 35 Q50 30, 50 20 Q50 15, 45 15 Q40 15, 40 20" 
                              fill="#10B981" stroke="#10B981" strokeWidth="2" />
                        {/* Growth stages */}
                        <circle cx="25" cy="65" r="2" fill="#F97316" opacity="0.5" />
                        <circle cx="40" cy="65" r="3" fill="#F97316" opacity="0.7" />
                        <circle cx="55" cy="65" r="4" fill="#F97316" />
                      </g>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-2xl text-slate-900 mb-3">
                      A Phased Approach to Trust
                    </h3>
                    <p className="font-body text-lg text-slate-700">
                      Our initial MVP is strategically designed to operate without handling Protected Health Information (PHI), focusing on de-identified workflows to prove our immense value while ensuring zero risk. As we scale, our enterprise solutions will be fully PHI-enabled under robust Business Associate Agreements (BAAs), with transparent and auditable processes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* The Future is Zero-Trust */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      <g filter="url(#iconShadow)">
                        {/* Fortress layers */}
                        <rect x="15" y="45" width="50" height="20" rx="2" fill="#2563EB" />
                        <rect x="20" y="35" width="40" height="15" rx="2" fill="#14B8A6" />
                        <rect x="25" y="25" width="30" height="15" rx="2" fill="#2563EB" />
                        {/* Gates */}
                        <rect x="35" y="50" width="10" height="15" fill="white" opacity="0.8" />
                        <rect x="30" y="40" width="8" height="10" fill="white" opacity="0.6" />
                        <rect x="42" y="40" width="8" height="10" fill="white" opacity="0.6" />
                        <rect x="36" y="30" width="8" height="10" fill="white" opacity="0.4" />
                        {/* Flag */}
                        <line x1="40" y1="25" x2="40" y2="15" stroke="#F97316" strokeWidth="2" />
                        <path d="M40 15 L50 18 L40 21 Z" fill="#F97316" />
                      </g>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-2xl text-slate-900 mb-3">
                      The Future is Zero-Trust
                    </h3>
                    <p className="font-body text-lg text-slate-700">
                      Our long-term security roadmap is built on a cutting-edge Zero-Trust Architecture. We are engineering Ron AI's flagship product, Nira.for enterprise-grade, proactive security, with the explicit goal of achieving SOC 2 Type II compliance to give our partners absolute, unshakeable confidence in our platform.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 fade-in-section">
        <div className="max-w-6xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-2xl">
            <CardContent className="p-12">
              <h2 className="font-inter font-medium text-4xl text-white mb-6">
                Ready to Master the New Rules and Reclaim Your Time?
              </h2>
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white font-body font-bold px-12 py-6 text-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Download Our Final Rule Executive Brief
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <h3 className="font-heading font-bold text-2xl text-white">Nira</h3>
            <span className="text-slate-400 font-body">by Ron AI</span>
          </div>
          <p className="text-slate-400 font-body">
            © 2024 Ron AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SecurityCompliance;
