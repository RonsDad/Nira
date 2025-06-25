'use client'

import { useEffect, useState } from "react";
import { Settings, Brain, Compass, Rocket, BookOpen, Zap, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InteractiveScene } from "@/components/ui/interactive-scene";
import HealthcareSectorsShowcase from "@/components/ui/healthcare-sectors-showcase";
import Header from "@/components/ui/Header";
import { FlipCardCarousel, CardData } from "@/components/ui/flip-card-carousel";

export default function Home() {
  const [activeDemo, setActiveDemo] = useState(false);
  // Single prototype URL as requested
  const prototypeUrl = "https://aloha-satin-23191317.figma.site";

  // Healthcare challenge cards data
  const healthcareChallengeCards: CardData[] = [
    {
      id: "prior-auth",
      frontTitle: "Prior Authorizations",
      backContent: "Automates prior authorizations with AI agents—extracts and verifies data, submits forms, tracks status, and handles exceptions, reducing manual work, denials, and delays so clinicians can focus on care instead of paperwork, all while ensuring compliance and security."
    },
    {
      id: "care-planning",
      frontTitle: "Care Planning",
      backContent: "AI-driven care planning personalizes and automates workflows, updates care plans in real time, reduces errors, and streamlines collaboration, empowering clinicians to deliver better outcomes with less administrative burden and more time for patient engagement and support."
    },
    {
      id: "clinician-burnout",
      frontTitle: "Clinician Burnout",
      backContent: "Reduces clinician burnout by automating repetitive administrative tasks, minimizing paperwork, and providing intelligent support, so clinicians spend more time with patients and less on documentation, improving job satisfaction and care quality across the organization."
    },
    {
      id: "ai-automation",
      frontTitle: "AI Automation in Healthcare",
      backContent: "Modular AI agents streamline healthcare administration, adapt to evolving clinical and regulatory needs, boost compliance, and enable scalable, future-proof solutions that transform operations, reduce costs, and enhance patient and provider experiences in a dynamic healthcare landscape."
    }
  ];

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

  const startDemo = () => {
    setActiveDemo(true);
    setTimeout(() => {
      setActiveDemo(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />

      {/* Hero Section with Spline Robot */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Hero Text */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                The End of <span className="text-blue-700">Administrative Work</span>
              </h1>
              <p className="font-body text-lg sm:text-xl md:text-2xl text-slate-700 mb-6 sm:mb-10 leading-relaxed">
                Meet Nira, the AI-powered clinician's co-pilot from Ron AI. We automate your tedious tasks, 
                accelerate your research, and manage your career, freeing you to practice medicine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/our-products#early-adopter">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 text-white hover:bg-blue-700 font-body font-bold px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                    onClick={startDemo}
                  >
                    Join the Revolution
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Spline Robot Scene */}
            <div className="h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 shadow-xl order-1 lg:order-2">
              <InteractiveScene 
                className="w-full h-full"
                onLoad={() => console.log("Spline robot scene loaded successfully")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive UI Showcase */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 fade-in-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-900 mb-8 sm:mb-16">
            This Isn't Another App. It's Your <span className="text-blue-700">Command Center</span>.
          </h2>
          
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Browser Frame Header */}
            <div className="bg-slate-100 px-6 py-4 flex items-center space-x-2 border-b border-slate-200">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex-1 bg-slate-200 rounded-lg px-4 py-1 mx-4">
                <span className="text-slate-600 text-sm font-body">nira.ronai.com</span>
              </div>
            </div>
            
            {/* Figma Prototype Embed */}
            <div className="relative w-full" style={{ paddingBottom: '75%' }}>
              <iframe 
                src={prototypeUrl}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allowFullScreen
                title="Nira Interface Prototype"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare Sectors Showcase */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <HealthcareSectorsShowcase />
      </section>

      {/* Problem Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-50 fade-in-section">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">
                You Became a Clinician to Care for <span className="text-blue-700">Patients, Not Paperwork</span>.
              </h2>
              <p className="font-body text-lg sm:text-xl text-slate-700 leading-relaxed">
                Clinicians spend up to 28 hours a week on administrative tasks, leading to burnout in over 50% of the workforce. 
                Ron AI's flagship product, Nira, is designed to solve this systemic failure.
              </p>
            </div>
            
            {/* 3D Flip Card Carousel */}
            <div className="col-span-1 lg:col-span-1 order-1 lg:order-2">
              <FlipCardCarousel
                cards={healthcareChallengeCards}
                autoPlayInterval={10000}
                className="shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 fade-in-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-900 mb-8 sm:mb-16">
            A Unified Platform for Your <span className="text-blue-700">Entire Workflow</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 mb-3 sm:mb-4">Automate Administration</h3>
                <p className="font-body text-base sm:text-lg text-slate-700 leading-relaxed">
                  Prior Authorizations, Insurance Verification, Credentialing, Form Processing
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 mb-3 sm:mb-4">Enhance Clinical Work</h3>
                <p className="font-body text-base sm:text-lg text-slate-700 leading-relaxed">
                  Literature Reviews, Care Plan Drafting, Drug & Trial Research
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 mb-3 sm:mb-4">Manage Your Career</h3>
                <p className="font-body text-base sm:text-lg text-slate-700 leading-relaxed">
                  Automated Job Search, Resume Optimization, CME Tracking
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-slate-800 to-slate-900 fade-in-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            The Future of Clinical Work is <span className="text-blue-300">Here.</span>
          </h2>
          <p className="font-body text-lg sm:text-xl text-slate-300 mb-6 sm:mb-10 max-w-2xl mx-auto">
            Stop the burnout. Reclaim your time. Be the first to experience Nira.
          </p>
          <Link href="/our-products#early-adopter">
            <Button 
              size="lg" 
              className="bg-white text-slate-800 hover:bg-slate-200 font-body font-bold px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              Request Early Access Now
            </Button>
          </Link>
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
            &copy; 2024 Ron AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
