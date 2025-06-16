
import { useEffect, useState } from "react";
import { Settings, Brain, Compass, Rocket, BookOpen, Zap, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InteractiveScene } from "@/components/ui/interactive-scene";
import HealthcareSectorsShowcase from "@/components/ui/healthcare-sectors-showcase";

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDemo, setActiveDemo] = useState(false);
  const [currentPrototype, setCurrentPrototype] = useState(0);

  const prototypes = [
    { url: "https://bamboo-wok-45475246.figma.site", name: "Prototype 1" },
    { url: "https://pine-pin-28044084.figma.site", name: "Prototype 2" }
  ];

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

  const startDemo = () => {
    setActiveDemo(true);
    setTimeout(() => {
      setActiveDemo(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
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
                <Link to="/" className="text-slate-900 font-body font-semibold transition-colors">Home</Link>
                <Link to="/security-compliance" className="text-slate-700 hover:text-slate-900 font-body transition-colors">Security & Compliance</Link>
                <a href="#" className="text-slate-700 hover:text-slate-900 font-body transition-colors">Blog</a>
                <Link to="/about-us" className="text-slate-700 hover:text-slate-900 font-body transition-colors">About Us</Link>
                <a href="#" className="text-slate-700 hover:text-slate-900 font-body transition-colors">Contact</a>
              </nav>
              
              <Button className="bg-slate-800 hover:bg-slate-900 text-white font-body font-medium px-6 transition-colors">
                Request Early Access
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Spline Robot */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="text-center lg:text-left">
              <h1 className="font-inter font-medium text-5xl md:text-6xl lg:text-7xl text-black mb-6 leading-tight">
                The End of <span className="text-blue-600">Administrative Work</span>
              </h1>
              <p className="font-body text-xl md:text-2xl text-slate-700 mb-10 leading-relaxed">
                Meet Nira, the AI-powered clinician's co-pilot from Ron AI. We automate your tedious tasks, 
                accelerate your research, and manage your career, freeing you to practice medicine.
              </p>
              <Button 
                size="lg" 
                className="bg-slate-800 hover:bg-slate-900 text-white font-body font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Join the Waitlist
              </Button>
            </div>
            
            {/* Spline Robot Scene */}
            <div className="h-96 md:h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 shadow-xl">
              <InteractiveScene 
                className="w-full h-full"
                onLoad={() => console.log("Spline robot scene loaded successfully")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive UI Showcase */}
      <section className="py-20 px-6 fade-in-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-inter font-medium text-4xl text-center text-black mb-16">
            This Isn't Another App. It's Your <span className="text-blue-600">Command Center</span>.
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
            
            {/* Figma Prototype Embed with Navigation */}
            <div className="relative">
              <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                <iframe 
                  src={prototypes[currentPrototype].url}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  title={prototypes[currentPrototype].name}
                />
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentPrototype(currentPrototype === 0 ? 1 : 0)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Previous prototype"
              >
                <ChevronLeft className="w-6 h-6 text-slate-700" />
              </button>
              
              <button
                onClick={() => setCurrentPrototype(currentPrototype === 0 ? 1 : 0)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Next prototype"
              >
                <ChevronRight className="w-6 h-6 text-slate-700" />
              </button>
              
              {/* Prototype Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 rounded-full px-4 py-2 shadow-lg">
                <div className="flex items-center space-x-2">
                  {prototypes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPrototype(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        currentPrototype === index ? 'bg-slate-800 w-6' : 'bg-slate-400 hover:bg-slate-600'
                      }`}
                      aria-label={`Go to prototype ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare Sectors Showcase */}
      <section className="py-20 px-6">
        <HealthcareSectorsShowcase />
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-slate-50 fade-in-section">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-inter font-medium text-4xl text-black mb-6">
                You Became a Clinician to Care for <span className="text-blue-600">Patients, Not Paperwork</span>.
              </h2>
              <p className="font-body text-xl text-slate-700 leading-relaxed">
                Clinicians spend up to 28 hours a week on administrative tasks, leading to burnout in over 50% of the workforce. 
                Ron AI's flagship product, Nira.is designed to solve this systemic failure.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white border-orange-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-orange-600 font-bold text-xl">PA</span>
                  </div>
                  <h3 className="font-body font-semibold text-orange-700">Prior Authorizations</h3>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-orange-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-body font-semibold text-orange-700">Clinical Documentation</h3>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-orange-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-orange-600 font-bold text-xl">C</span>
                  </div>
                  <h3 className="font-body font-semibold text-orange-700">Credentialing</h3>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-orange-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-orange-600 font-bold text-xl">∞</span>
                  </div>
                  <h3 className="font-body font-semibold text-orange-700">Endless Clicks</h3>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="py-20 px-6 fade-in-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-inter font-medium text-4xl text-center text-black mb-16">
            A Unified Platform for Your <span className="text-blue-600">Entire Workflow</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-slate-900 mb-4">Automate Administration</h3>
                <p className="font-body text-slate-700 leading-relaxed">
                  Prior Authorizations, Insurance Verification, Credentialing, Form Processing
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-slate-900 mb-4">Enhance Clinical Work</h3>
                <p className="font-body text-slate-700 leading-relaxed">
                  Literature Reviews, Care Plan Drafting, Drug & Trial Research
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-slate-900 mb-4">Manage Your Career</h3>
                <p className="font-body text-slate-700 leading-relaxed">
                  Automated Job Search, Resume Optimization, CME Tracking
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-800 to-slate-900 fade-in-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-inter font-medium text-5xl text-white mb-6">
            The Future of Clinical Work is Here.
          </h2>
          <p className="font-body text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Stop the burnout. Reclaim your time. Be the first to experience Nira.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-slate-800 hover:bg-slate-200 font-body font-bold px-12 py-6 text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            Request Early Access Now
          </Button>
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

export default Index;
