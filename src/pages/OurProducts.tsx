import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, Phone, FileText, Sparkles } from "lucide-react";

const OurProducts = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="font-heading font-bold text-2xl text-slate-900">Ron AI</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex space-x-6">
                <Link to="/" className="text-slate-700 hover:text-slate-900 font-body transition-colors">Home</Link>
                <Link to="/security-compliance" className="text-slate-700 hover:text-slate-900 font-body transition-colors">Security & Compliance</Link>
                <Link to="/our-products" className="text-slate-900 font-body font-semibold transition-colors">Our Products</Link>
                <a href="#" className="text-slate-700 hover:text-slate-900 font-body transition-colors">Blog</a>
                <Link to="/about-us" className="text-slate-700 hover:text-slate-900 font-body transition-colors">About Us</Link>
                <Link to="/contact" className="text-slate-700 hover:text-slate-900 font-body transition-colors">Contact</Link>
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
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-slate-900 mb-6">
            The Future of Clinical Work, Under Construction.
          </h1>
          <p className="font-body text-xl md:text-2xl text-slate-700 mb-10 max-w-4xl mx-auto leading-relaxed">
            Ron AI is in a phase of rapid development, building a suite of intelligent agents poised to redefine healthcare. 
            We are actively building our founding team of passionate technologists and healthcare experts.
          </p>
          <Link to="/contact">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-body font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Interested in Joining Our Mission? Contact Us.
            </Button>
          </Link>
        </div>
      </section>

      {/* Ron AI's flagship product, Nira.Section */}
      <section className="py-20 px-6 fade-in-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-4xl text-center text-slate-900 mb-16">
            Nira: The AI Operating System for Care Coordination.
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - UI Mockup */}
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              {/* Browser Frame */}
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
              
              {/* Dashboard Preview */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-teal-50">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-body font-semibold text-slate-800 mb-2">Prior Authorization Queue</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                        <span className="text-sm font-body">PA #1234 - MRI Scan</span>
                        <Badge className="bg-green-500 text-white">Auto-Approved</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                        <span className="text-sm font-body">PA #1235 - Specialist Referral</span>
                        <Badge className="bg-yellow-500 text-white">Processing</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-body font-semibold text-slate-800 mb-2">Clinical Research Assistant</h4>
                    <div className="bg-gradient-to-r from-blue-100 to-teal-100 p-3 rounded">
                      <p className="text-sm font-body text-slate-700">Latest evidence summary for Type 2 Diabetes management ready...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div>
              <h3 className="font-body font-semibold text-xl text-blue-600 mb-4">
                For Healthcare Providers & Organizations.
              </h3>
              <p className="font-body text-lg text-slate-700 mb-6 leading-relaxed">
                Ron AI's flagship product, Nira.is our flagship platform designed to eliminate the administrative burden that leads to clinician burnout. 
                By automating prior authorizations, streamlining documentation, and providing deep, evidence-based research, 
                Ron AI's flagship product, Nira.empowers clinical teams to operate at the peak of their license and focus on patient care.
              </p>
              <Badge className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 text-sm">
                Coming Soon
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Gaia Section */}
      <section className="py-20 px-6 bg-slate-50 fade-in-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-4xl text-center text-slate-900 mb-16">
            Gaia: Your Personal AI Career Agent.
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <h3 className="font-body font-semibold text-xl text-teal-600 mb-4">
                For Students & Career-Minded Clinicians.
              </h3>
              <p className="font-body text-lg text-slate-700 mb-6 leading-relaxed">
                Gaia is the indispensable tool for navigating the modern clinical career. 
                It proactively scans job boards for your perfect role, optimizes your resume for each application, 
                and automates submissions, giving you an unparalleled advantage in a competitive market.
              </p>
              <Badge className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 text-sm">
                In Development
              </Badge>
            </div>

            {/* Right Column - UI Mockup */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-br from-teal-500 to-blue-600 p-6 text-white">
                <h4 className="font-heading font-bold text-2xl mb-2">Set Your Goal</h4>
                <p className="font-body text-white/90">Tell Gaia what you're looking for in your next role</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="font-body font-semibold text-slate-700">Specialty</label>
                  <div className="p-3 border-2 border-slate-200 rounded-lg bg-slate-50">
                    <span className="font-body text-slate-600">Emergency Medicine</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="font-body font-semibold text-slate-700">Location Preference</label>
                  <div className="p-3 border-2 border-slate-200 rounded-lg bg-slate-50">
                    <span className="font-body text-slate-600">San Francisco Bay Area</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="font-body font-semibold text-slate-700">Ideal Compensation</label>
                  <div className="p-3 border-2 border-slate-200 rounded-lg bg-slate-50">
                    <span className="font-body text-slate-600">$350,000 - $450,000</span>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-body font-semibold">
                  Start Searching <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Foundational Technology Section */}
      <section className="py-20 px-6 fade-in-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-bold text-4xl text-center text-slate-900 mb-16">
            Powered by Ron AI.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ron CoT Models */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Brain className="w-12 h-12 text-purple-600 mr-4" />
                  <div>
                    <h3 className="font-heading font-bold text-2xl text-slate-900">Ron CoT & Ron CoT mini</h3>
                    <p className="font-body font-semibold text-purple-600">Our Foundational Models.</p>
                  </div>
                </div>
                <p className="font-body text-slate-700 leading-relaxed">
                  At the heart of our products are Ron CoT and Ron CoT mini, our proprietary large language models. 
                  Fine-tuned on vast datasets of clinical and administrative information, they provide the specialized 
                  reasoning capabilities required for the complexities of healthcare.
                </p>
              </CardContent>
            </Card>

            {/* Ron Agent Framework */}
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Sparkles className="w-12 h-12 text-orange-600 mr-4" />
                  <div>
                    <h3 className="font-heading font-bold text-2xl text-slate-900">The Ron Agent Framework</h3>
                    <p className="font-body font-semibold text-orange-600">The Core Intelligence.</p>
                  </div>
                </div>
                <p className="font-body text-slate-700 leading-relaxed">
                  Our product, Ron, is an advanced agentic framework that allows us to deploy specialized AI agents—like 
                  voice agents that can make phone calls or clinical agents that can draft care plans—to execute complex, 
                  real-world tasks autonomously.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Technology Icons Row */}
          <div className="mt-12 flex justify-center items-center space-x-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <p className="font-body text-sm text-slate-600">Voice Agents</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <p className="font-body text-sm text-slate-600">Documentation AI</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <p className="font-body text-sm text-slate-600">Clinical Reasoning</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-800 to-slate-900 fade-in-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-5xl text-white mb-6">
            Be the First to Know.
          </h2>
          <p className="font-body text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Our products are launching soon. Join the waitlist to get early access and updates on our progress.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-body font-bold px-8 py-4 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              Request Early Access to Nira
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-body font-bold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
            >
              Join the Gaia Waitlist
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <h3 className="font-heading font-bold text-2xl text-white">Ron AI</h3>
          </div>
          <p className="text-slate-400 font-body">
            © 2024 Ron AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default OurProducts;
