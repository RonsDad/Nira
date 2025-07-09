'use client'

import { useState } from "react";
import { Settings, Brain, Compass, Rocket, BookOpen, Zap, CheckCircle, ChevronLeft, ChevronRight, Search, Phone, Calendar, DollarSign } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InteractiveScene } from "@/components/ui/interactive-scene";
import HealthcareSectorsShowcase from "@/components/ui/healthcare-sectors-showcase";
import Header from "@/components/ui/Header";
import { SimpleFlipCardCarousel, CardData } from "@/components/ui/flip-card-carousel";
import Script from 'next/script';
import { generateFAQSchema } from '@/lib/seo';

export default function Home() {
  const [activeDemo, setActiveDemo] = useState(false);
  // Single prototype URL as requested
  const prototypeUrl = "https://aloha-satin-23191317.figma.site";

  // FAQ data for schema markup
  const faqData = [
    {
      question: "How do I find a doctor who takes my insurance near me?",
      answer: "Simply search with Ron by entering your insurance provider and location. Our AI healthcare assistant instantly searches thousands of doctors near you, verifies they accept your insurance in real-time, and shows available appointments. No more calling offices or checking websites."
    },
    {
      question: "How does automated appointment booking work?",
      answer: "Ron's computer use agent and voice AI agent wrapper handles everything. When you request an appointment, our AI agents call offices, navigate phone systems, and confirm appointments automatically - saving you time and hassle."
    },
    {
      question: "Can Ron help me save money on medications?",
      answer: "Absolutely! Ron compares medication prices across all pharmacies in your area, finds available discounts and coupons, and can save you up to 400% on prescriptions. You'll see the exact price before you go to the pharmacy."
    },
    {
      question: "Can Ron help with insurance denials?",
      answer: "Yes! Ron helps you fight claim denials and navigate prior authorization processes with automated letter generation, submission tracking, and appeal assistance. We handle the paperwork so you can focus on getting the care you need."
    },
    {
      question: "What is the Value Add Ron AI could add to my company's wellness package?",
      answer: "Ron AI transforms your employee wellness benefits by reducing healthcare friction. Employees save 45+ minutes per appointment booking, find in-network providers instantly, and save significantly on medications. This leads to higher benefits utilization, reduced sick days, improved employee satisfaction, and lower overall healthcare costs for your organization."
    }
  ];

  // Challenge cards data - patient-focused
  const healthcareChallengeCards: CardData[] = [
    {
      id: "system-complexity",
      frontTitle: "System Complexity",
      backContent: "78% of patients abandon care due to system complexity. Americans waste countless hours navigating a $4.5 trillion maze, with 65% saying managing care is overwhelming and families spending 8+ hours monthly on logistics."
    },
    {
      id: "insurance-confusion",
      frontTitle: "Insurance Confusion",
      backContent: "30% of appointments are canceled due to insurance confusion. Patients struggle with understanding coverage, finding in-network providers, and navigating prior authorization requirements, leading to delayed or abandoned care."
    },
    {
      id: "cost-transparency",
      frontTitle: "Hidden Costs",
      backContent: "Medication costs remain opaque until checkout, with patients often surprised by bills. Without price transparency, families can't make informed decisions about their spending and often face unexpected financial burden."
    },
    {
      id: "care-coordination",
      frontTitle: "Fragmented Care",
      backContent: "Patients juggle multiple providers, appointments, and health records across different systems. This fragmentation leads to missed care, duplicate tests, and poor health outcomes as information doesn't follow patients seamlessly."
    }
  ];

  const startDemo = () => {
    setActiveDemo(true);
    setTimeout(() => {
      setActiveDemo(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqData)) }}
      />
      <Header />

      {/* Hero Section with Spline Robot */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Hero Text */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                Ron is Healthcare's
                <br />
                <span className="text-blue-700">Care Advocacy Co-Pilot</span>
              </h1>
              <p className="font-body text-lg sm:text-xl md:text-2xl text-slate-700 mb-6 sm:mb-10 leading-relaxed">
                Ron is your personal AI healthcare coordinator. He finds doctors who take your insurance, books appointments with a simple voice command, compares medication prices across pharmacies, and even helps fight insurance denials. Let Ron handle the healthcare maze while you focus on getting better.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/our-products#early-adopter">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 text-white hover:bg-blue-700 font-body font-bold px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                    onClick={startDemo}
                  >
                    Get Early Access
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Spline Robot Scene */}
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 shadow-xl order-1 lg:order-2">
              <InteractiveScene 
                className="w-full h-full"
                onLoad={() => console.log("Spline robot scene loaded successfully")}
              />
              {/* This is Ron text */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
                <span 
                  className="text-slate-900 text-xl sm:text-2xl md:text-3xl whitespace-nowrap font-bold"
                  style={{ 
                    fontFamily: 'Kalam, cursive',
                    transform: 'rotate(-5deg)',
                    letterSpacing: '0.05em',
                    display: 'inline-block',
                    textShadow: '2px 2px 4px rgba(255,255,255,0.8)'
                  }}
                >
                  This is Ron!
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive UI Showcase */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4 sm:mb-6">
            Watch Ron <span className="text-blue-700">Find Your Doctor & Book Your Appointment</span>
          </h2>
          <p className="font-body text-lg sm:text-xl text-slate-700 text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
            See how Ron's AI healthcare assistant finds doctors who take your insurance near you and uses voice technology to call offices and book appointments automatically - saving you 45+ minutes per booking.
          </p>
          
          <div className="rounded-xl shadow-2xl overflow-hidden border-4 border-slate-200">
            {/* Browser Frame Header */}
            <div className="bg-slate-100 px-3 sm:px-6 py-2 sm:py-4 flex items-center space-x-2 border-b border-slate-200">
              <div className="flex space-x-1 sm:space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex-1 bg-slate-200 rounded-lg px-2 sm:px-4 py-0.5 sm:py-1 mx-2 sm:mx-4">
                <span className="text-slate-600 text-xs sm:text-sm font-body">ron-ai.com/demo</span>
              </div>
            </div>
            
            {/* Ron Video Demo */}
            <div className="relative bg-slate-800" style={{ paddingBottom: '56.25%' }}>
              <video 
                src="/videos/Ron.mov"
                title="Ron AI healthcare assistant demonstration - Find doctors and book appointments"
                className="absolute inset-0 w-full h-full object-contain bg-black"
                autoPlay
                loop
                muted
                playsInline
                controls
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          {/* SEO-friendly demo description */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-700 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">Smart Provider Search</h3>
              <p className="text-slate-700">Ron instantly verifies insurance coverage and finds available doctors near you</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-700 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">AI Voice Calling</h3>
              <p className="text-slate-700">Watch Ron's AI assistant call the doctor's office and navigate phone systems</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-700 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">Automatic Booking</h3>
              <p className="text-slate-700">Ron confirms your appointment and adds it to your calendar automatically</p>
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare Sectors Showcase */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <HealthcareSectorsShowcase />
      </section>

      {/* Problem Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">
                <span className="text-red-600">68%</span> of Patients Give Up Finding <span className="text-blue-700">the Right Doctor</span>
              </h2>
              <p className="font-body text-lg sm:text-xl text-slate-700 leading-relaxed mb-6">
                Americans waste countless hours navigating healthcare:
              </p>
              <ul className="font-body text-lg sm:text-xl text-slate-700 leading-relaxed space-y-2">
                <li>• 45+ minutes per appointment booking</li>
                <li>• 30% of appointments canceled due to insurance confusion</li>
                <li>• Medication costs vary by up to 400% between pharmacies</li>
                <li>• 60% of insurance denials never get appealed</li>
              </ul>
              <p className="font-body text-lg sm:text-xl text-slate-900 font-semibold mt-6">
                Ron changes everything.
              </p>
            </div>
            
            {/* 3D Flip Card Carousel */}
            <div className="col-span-1 lg:col-span-1 order-1 lg:order-2 w-full sm:max-w-md mx-auto lg:max-w-none">
              <SimpleFlipCardCarousel
                cards={healthcareChallengeCards}
                autoPlayInterval={10000}
                className="shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-900 mb-8 sm:mb-16">
            How Ron Transforms <span className="text-blue-700">Your Healthcare Experience</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-700 rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Search className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 mb-3 sm:mb-4">Find Doctors Who Take Your Insurance</h3>
                <p className="font-body text-base sm:text-lg text-slate-700 leading-relaxed">
                  Ron instantly searches thousands of doctors near you, verifies they accept your insurance in real-time, and shows available appointments. No more calling offices or checking websites.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-700 rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 mb-3 sm:mb-4">Voice-Activated Appointment Booking</h3>
                <p className="font-body text-base sm:text-lg text-slate-700 leading-relaxed">
                  Just say "Book me an appointment with a cardiologist" and Ron handles everything. His AI voice assistant calls offices, navigates phone trees, and confirms appointments automatically.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-700 rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 mb-3 sm:mb-4">Medication Price Comparison</h3>
                <p className="font-body text-base sm:text-lg text-slate-700 leading-relaxed">
                  Save up to 400% on prescriptions. Ron compares prices across all pharmacies, finds discounts and coupons, and tracks refills. See the real cost before you go.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section for Voice Search Optimization */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-900 mb-8 sm:mb-12">
            Frequently Asked <span className="text-blue-700">Questions</span>
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 mb-3">
                How do I find a doctor who takes my insurance near me?
              </h3>
              <p className="font-body text-base sm:text-lg text-slate-700">
                Simply tell Ron your insurance provider and location. Our AI healthcare assistant instantly searches thousands of doctors near you, verifies they accept your insurance in real-time, and shows available appointments. No more calling offices or checking websites.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 mb-3">
                How does voice-activated appointment booking work?
              </h3>
              <p className="font-body text-base sm:text-lg text-slate-700">
                Just say "Book me an appointment with a cardiologist" and Ron handles everything. Our voice-activated medical appointment scheduling system calls offices, navigates phone systems, and confirms appointments - all through simple voice commands.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 mb-3">
                Can Ron help me save money on medications?
              </h3>
              <p className="font-body text-base sm:text-lg text-slate-700">
                Absolutely! Ron compares medication prices across all pharmacies in your area, finds available discounts and coupons, and can save you up to 400% on prescriptions. You'll see the exact price before you go to the pharmacy.
              </p>
            </div>


            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 mb-3">
                Can Ron help with insurance denials?
              </h3>
              <p className="font-body text-base sm:text-lg text-slate-700">
                Yes! Ron helps you fight claim denials and navigate prior authorization processes with automated letter generation, submission tracking, and appeal assistance. We handle the paperwork so you can focus on getting the care you need.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 mb-3">
                What is the Value Add Ron AI could add to my company's wellness package?
              </h3>
              <p className="font-body text-base sm:text-lg text-slate-700">
                Ron AI transforms your employee wellness benefits by reducing healthcare friction. Employees save 45+ minutes per appointment booking, find in-network providers instantly, and save significantly on medications. This leads to higher benefits utilization, reduced sick days, improved employee satisfaction, and lower overall healthcare costs for your organization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Healthcare Made <span className="text-blue-300">Human Again</span>
          </h2>
          <p className="font-body text-lg sm:text-xl text-slate-300 mb-6 sm:mb-10 max-w-2xl mx-auto">
            Join thousands of families who are taking back control of their healthcare journey. Get early access to Ron and experience healthcare the way it should be - simple, coordinated, and affordable.
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
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">Ron</h3>
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
