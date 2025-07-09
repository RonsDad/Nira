'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Bot, Users, Mic, Phone, MessageSquare } from "lucide-react";
import OurTeam from "@/components/ui/OurTeam";
import Header from "@/components/ui/Header";

export default function AboutUsPage() {
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

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-4 sm:mb-6">
            We Think Healthcare Can <span className="text-blue-700">Do Better.</span>
          </h1>
          <p className="font-body text-lg sm:text-xl md:text-2xl text-slate-700 leading-relaxed">
            We're here to bring transparency, simplicity, and advocacy to healthcare. And we're just getting started...
          </p>
        </div>
      </section>

      {/* Our "Why" Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 fade-in-section">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Founder Image */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto lg:max-w-none">
                <img 
                  src="/images/tim.png" 
                  alt="Tim Hunter, CEO & Founder of Ron AI"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 sm:w-32 h-24 sm:h-32 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
            </div>
            
            {/* Narrative */}
            <div className="order-1 lg:order-2">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">
                A System Built on <span className="text-blue-700">Wasted Potential.</span>
              </h2>
              <div className="prose prose-base sm:prose-lg text-slate-700">
                <p className="mb-4">
                  I've seen it firsthand: brilliant clinicians spending more time fighting with portals and paperwork than they do with patients. We're losing a generation of talent to a problem that technology can, and must, solve.
                </p>
                <p className="mb-4">
                  Ron AI was founded out of a deep sense of frustration and a profound belief that we can fix this. Every day, healthcare's most valuable professionals are drowning in administrative tasks that steal their time, energy, and joy.
                </p>
                <p className="font-semibold text-slate-900">
                  This isn't just inefficient—it's a moral failing of our healthcare system. And we're here to change it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-50 fade-in-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-slate-900 mb-8 sm:mb-16">
            Intelligent Agents for an <span className="text-blue-700">Impossible System.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                  <Search className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 mb-3 sm:mb-4">Deep Research First</h3>
                <p className="font-body text-slate-700 leading-relaxed">
                  Our philosophy is simple: understand before you act. Ron's agents perform deep, evidence-based research on every task to ensure all actions are context-aware and intelligent.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                  <Bot className="w-7 h-7 sm:w-8 sm:h-8 text-teal-600" />
                </div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 mb-3 sm:mb-4">Autonomous Execution</h3>
                <p className="font-body text-slate-700 leading-relaxed">
                  We build powerful agents that don't just find information—they get things done. From making phone calls to drafting documents, our agents execute complex workflows from start to finish.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                  <Users className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />
                </div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 mb-3 sm:mb-4">Human-in-the-Loop Control</h3>
                <p className="font-body text-slate-700 leading-relaxed">
                  Ultimate control always remains with the clinician. Our platform provides complete transparency and only requests human approval for critical decisions, respecting the expertise of our users.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Voice Agents Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 fade-in-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">
              Experience Ron's <span className="text-blue-700">Voice Agents</span>
            </h2>
            <p className="font-body text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto">
              Our AI voice agents handle complex healthcare conversations naturally. Try talking to Ron directly and see how voice technology is transforming healthcare interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Voice Capabilities */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mic className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">Natural Voice Interaction</h3>
                  <p className="font-body text-slate-700">Speak naturally to Ron about your healthcare needs. Our voice AI understands context and responds intelligently.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">Automated Phone Calls</h3>
                  <p className="font-body text-slate-700">Ron's voice agents make calls to doctor offices, navigate phone systems, and book appointments automatically.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">Real-time Transcription</h3>
                  <p className="font-body text-slate-700">All voice interactions are transcribed in real-time, creating a complete record of your healthcare conversations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Team Section */}
      <section className="fade-in-section">
        <OurTeam />
      </section>

      {/* Our Vision Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 fade-in-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-6 sm:mb-8">
            A Future Where Healthcare is <span className="text-blue-700">Seamless, Accessible, and Transparent.</span>
          </h2>
          <div className="prose prose-base sm:prose-lg lg:prose-xl text-slate-700 mx-auto">
            <p>
              Our vision extends beyond simply building tools. We aim to fundamentally restructure clinical work by creating an ecosystem where technology serves clinicians, not the other way around. A future where every administrative task is automated, every decision is informed by the best evidence, and every clinician has the time and energy to focus on what they do best: healing.
            </p>
          </div>
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
            © 2024 Ron AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
