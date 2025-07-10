'use client'

import { useState } from "react";
import { ChevronRight, Shield, Brain, Clock, DollarSign, FileText, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/ui/Header";
import { toast } from "sonner";

export default function OurProducts() {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    anythingElse: "",
    attachment: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert attachment to base64 if present
      let attachmentData = null;
      if (formData.attachment) {
        const reader = new FileReader();
        attachmentData = await new Promise((resolve) => {
          reader.onloadend = () => resolve({
            name: formData.attachment!.name,
            type: formData.attachment!.type,
            data: reader.result
          });
          reader.readAsDataURL(formData.attachment!);
        });
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: `Early Access Request - ${formData.anythingElse || 'No additional information provided'}`,
          attachment: attachmentData
        }),
      });

      if (response.ok) {
        toast.success("Thank you! We'll be in touch soon.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          anythingElse: "",
          attachment: null,
        });
        // Reset file input
        const fileInput = document.getElementById('attachment') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Ron AI Healthcare Assistant",
    "description": "AI assistant that handles appointment scheduling, insurance navigation, medical records, and medication management for healthcare patients.",
    "brand": { "@type": "Brand", "name": "Ron AI" },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/PreOrder",
      "priceCurrency": "USD",
      "price": "0",
      "description": "Free tier with premium options available"
    }
  };

  return (
    <>
      <Header />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        .gradient-text {
          background: linear-gradient(135deg, #008CFF 0%, #8B5CF6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
        }
      `}</style>

      <div className="min-h-screen bg-black text-white">
        {/* Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="fixed inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10" />

        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-32 pb-16 px-4 z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Your <span className="gradient-text">AI Healthcare Assistant</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              Ron handles the phone calls, paperwork, and scheduling that consume hours of your time.
            </p>
            
            {/* Development Preview */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="glass-card rounded-2xl p-8 border-2 border-blue-500/20">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Development Preview</h3>
                  <span className="text-sm text-gray-400 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30">
                    In Development
                  </span>
                </div>
                <div className="bg-gray-800 rounded-lg p-6 text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Brain className="w-6 h-6" />
                    </div>
                    <span className="font-semibold">Ron AI</span>
                  </div>
                  <p className="text-gray-300 mb-3">
                    "I found 3 neurologists who take Blue Cross and have availability this week. 
                    Let me verify your insurance coverage and present your options."
                  </p>
                  <div className="text-sm text-blue-400">
                    → Currently building this capability<br/>
                    → Target launch: July 18, 2025
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Framework */}
        <section className="relative py-16 px-4 z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
              The Ron AI Architecture
            </h2>
            <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
              We're building Ron on three core principles:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="glass-card rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Universal Integration Layer</h3>
                <p className="text-gray-300">
                  Ron will connect to healthcare systems through secure browser automation. 
                  One assistant to navigate multiple patient portals without juggling passwords.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Intelligent Task Execution</h3>
                <p className="text-gray-300">
                  Using language models trained on healthcare workflows, Ron will understand medical requests 
                  and execute multi-step processes. Complex requests become completed tasks.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Human-Verified Actions</h3>
                <p className="text-gray-300">
                  Every action Ron takes will require your explicit approval. 
                  Full transparency and control over every automated step.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Philosophy */}
        <section className="relative py-16 px-4 z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Built for Patients, Not Portals
            </h2>
            
            <div className="glass-card rounded-2xl p-8 mb-12">
              <p className="text-lg text-gray-300 mb-6">
                Healthcare technology has failed patients by prioritizing providers over people. 
                Every "solution" adds another login, another app, another complexity layer.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                Ron flips this model. Instead of you adapting to healthcare's complexity, Ron adapts to you. 
                One conversation interface for multiple systems. Natural language instead of medical codes.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-center mb-8">Our Development Principles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="glass-card rounded-xl p-6 text-center">
                <h4 className="font-bold text-blue-400 mb-2">Transparent</h4>
                <p className="text-sm text-gray-300">See every action before it happens</p>
              </div>
              <div className="glass-card rounded-xl p-6 text-center">
                <h4 className="font-bold text-purple-400 mb-2">Efficient</h4>
                <p className="text-sm text-gray-300">Target significant time savings per medical task</p>
              </div>
              <div className="glass-card rounded-xl p-6 text-center">
                <h4 className="font-bold text-green-400 mb-2">Accessible</h4>
                <p className="text-sm text-gray-300">Designed to work with existing providers and insurance</p>
              </div>
              <div className="glass-card rounded-xl p-6 text-center">
                <h4 className="font-bold text-orange-400 mb-2">Secure</h4>
                <p className="text-sm text-gray-300">Building with HIPAA compliance from day one</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ron's Features */}
        <section className="relative py-16 px-4 z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
              Ron's Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Intelligent Appointment Booking */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Intelligent Appointment Booking</h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-blue-400 mb-3">The Vision:</h4>
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border-l-4 border-blue-500">
                    <p className="text-gray-300 italic">
                      "I need a dermatologist who takes Aetna and has appointments before 3pm on weekdays."
                    </p>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Ron will search insurance directories, check provider availability, and present options for your confirmation.
                  </p>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <p className="text-blue-400 font-semibold">Target Integration: Major scheduling systems including Epic MyChart, Cerner, and others</p>
                  </div>
                </div>
              </div>

              {/* Insurance Navigation */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Insurance Navigation</h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">The Vision:</h4>
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border-l-4 border-purple-500">
                    <p className="text-gray-300 italic">
                      "Will my insurance cover this procedure?"
                    </p>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Ron will access your insurance information, interpret policy documents, and provide clear answers about coverage and estimated costs.
                  </p>
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <p className="text-purple-400 font-semibold">Development Focus: Accurate policy interpretation and cost transparency</p>
                  </div>
                </div>
              </div>

              {/* Medical Records Aggregation */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Medical Records Aggregation</h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-green-400 mb-3">The Vision:</h4>
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border-l-4 border-green-500">
                    <p className="text-gray-300 italic">
                      Empowering  you with your own health data.
                    </p>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Ron will gather records from multiple provider portals and organize them into a unified view.
                  </p>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <p className="text-green-400 font-semibold">Goal: Single interface for fragmented health records</p>
                  </div>
                </div>
              </div>

              {/* Prescription Optimization */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Prescription Optimization</h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-orange-400 mb-3">The Vision:</h4>
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border-l-4 border-orange-500">
                    <p className="text-gray-300 italic">
                      You shouuld never have to worry about affoding your prescription.
                    </p>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Ron will check multiple sources including insurance formularies, discount programs, and pharmacy prices.
                  </p>
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                    <p className="text-orange-400 font-semibold">Planned Sources: Major pharmacy chains, discount programs, insurance formularies</p>
                  </div>
                </div>
              </div>

              {/* Care Coordination */}
              <div className="glass-card rounded-2xl p-8 md:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-pink-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Care Coordination</h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-pink-400 mb-3">The Vision:</h4>
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border-l-4 border-pink-500">
                    <p className="text-gray-300 italic">
                      A Provider Search that's centered around you.
                    </p>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Ron will match you with an in-network doctor that meets your needs and values.
                  </p>
                  <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                    <p className="text-pink-400 font-semibold">Target Workflow: No more suprise bills!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Partnership */}
        <section className="relative py-16 px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12">
              Technology Partnership
            </h2>
            <div className="glass-card rounded-2xl p-12">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Powered by Browser-Use</h3>
              <p className="text-lg text-gray-300">
                We're building on Browser-Use's ethical AI agent technology. 
                Every action will be transparent and user-controlled.
              </p>
            </div>
          </div>
        </section>

        {/* Early Access Program */}
        <section className="relative py-16 px-4 z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Early Access Program
              </h2>
              <div className="inline-flex items-center gap-3 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-6 py-3 mb-8">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold text-yellow-400">MVP Launch Target: July 18, 2025</span>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Be among the first to shape healthcare navigation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-blue-400">What Early Access Includes:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>First access to Ron AI when we launch</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Direct feedback channel to our development team</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Discounted pricing for early supporters</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Opportunity to influence feature priorities</span>
                  </li>
                </ul>
              </div>

              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-purple-400">Current Status:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3 flex-shrink-0"></div>
                    <span>Actively developing core functionality</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3 flex-shrink-0"></div>
                    <span>Building healthcare system integrations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3 flex-shrink-0"></div>
                    <span>Establishing security and compliance framework</span>
                  </li>
                </ul>
                
                <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">Our Commitment:</h4>
                  <p className="text-gray-300">We're building this right, not fast. Every feature will be thoroughly tested before release.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join the Waitlist */}
        <section id="early-access" className="relative py-16 px-4 z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Join the Waitlist
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Help us build better healthcare navigation. We're looking for early users who are frustrated with healthcare complexity and want to be part of the solution.
              </p>
              
              <div className="glass-card rounded-2xl p-8 mb-12">
                <h3 className="text-2xl font-bold mb-6 text-blue-400">What Happens Next:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-400 font-bold">1</span>
                    </div>
                    <p className="text-gray-300">You'll receive development updates</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-purple-400 font-bold">2</span>
                    </div>
                    <p className="text-gray-300">Get early access to beta testing</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-green-400 font-bold">3</span>
                    </div>
                    <p className="text-gray-300">Help prioritize features that matter most</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="glass-card">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-white mb-2 block text-sm sm:text-base font-medium">First Name *</Label>
                      <Input
                        id="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-12 sm:h-14 px-4 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base"
                        placeholder="John"
                        autoComplete="given-name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName" className="text-white mb-2 block text-sm sm:text-base font-medium">Last Name *</Label>
                      <Input
                        id="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-12 sm:h-14 px-4 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base"
                        placeholder="Doe"
                        autoComplete="family-name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="company" className="text-white mb-2 block text-sm sm:text-base font-medium">Company</Label>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-12 sm:h-14 px-4 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base w-full"
                      placeholder="Your Company (Optional)"
                      autoComplete="organization"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="email" className="text-white mb-2 block text-sm sm:text-base font-medium">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-12 sm:h-14 px-4 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base"
                        placeholder="john@example.com"
                        autoComplete="email"
                        inputMode="email"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-white mb-2 block text-sm sm:text-base font-medium">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-12 sm:h-14 px-4 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base"
                        placeholder="(555) 123-4567"
                        autoComplete="tel"
                        inputMode="tel"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="anythingElse" className="text-white mb-2 block text-sm sm:text-base font-medium">What healthcare frustrations do you face?</Label>
                    <Textarea
                      id="anythingElse"
                      value={formData.anythingElse}
                      onChange={(e) => setFormData({ ...formData, anythingElse: e.target.value })}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 min-h-[120px] sm:min-h-[140px] px-4 py-3 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base resize-y"
                      placeholder="Tell us about your healthcare navigation challenges..."
                      maxLength={500}
                    />
                    <p className="text-gray-400 text-xs sm:text-sm mt-1">{formData.anythingElse.length}/500 characters</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="attachment" className="text-white mb-2 block text-sm sm:text-base font-medium">Attachment</Label>
                    <div className="relative">
                      <Input
                        id="attachment"
                        type="file"
                        onChange={(e) => setFormData({ ...formData, attachment: e.target.files?.[0] || null })}
                        className="bg-white/5 border-white/20 text-white file:bg-blue-500 file:text-white file:border-0 file:px-6 file:py-3 file:rounded-md file:mr-4 file:cursor-pointer file:text-sm file:font-medium file:hover:bg-blue-600 file:transition-colors h-12 sm:h-14 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 w-full cursor-pointer flex items-center"
                        accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                      />
                      {formData.attachment && (
                        <p className="text-blue-400 text-sm mt-2 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Selected: {formData.attachment.name}
                        </p>
                      )}
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1">Optional: Upload any relevant documents (PDF, DOC, TXT, Images)</p>
                  </div>
                  
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
                        Submitting...
                      </span>
                    ) : (
                      <>
                        Request Early Access <ChevronRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-12 px-4 border-t border-white/10 z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <h3 className="font-bold text-2xl text-white">Ron AI</h3>
              <span className="text-gray-400">Healthcare Made Easy</span>
            </div>
            <p className="text-gray-400 mb-6">
              Your AI healthcare assistant
            </p>
            <p className="text-gray-500 text-sm">
              &copy; 2024 Ron AI. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
