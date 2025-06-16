import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Bot, Users } from "lucide-react";
import OurTeam from "@/components/ui/OurTeam";

const AboutUs = () => {
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
              <h1 className="font-heading font-bold text-2xl text-slate-900">Nira</h1>
              <span className="text-sm text-slate-600 font-body">by Ron AI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex space-x-6">
                <Link to="/" className="text-slate-700 hover:text-slate-900 font-body transition-colors">Home</Link>
                <Link to="/security-compliance" className="text-slate-700 hover:text-slate-900 font-body transition-colors">Security & Compliance</Link>
                <a href="#" className="text-slate-700 hover:text-slate-900 font-body transition-colors">Blog</a>
                <Link to="/about-us" className="text-slate-900 font-body font-semibold transition-colors">About Us</Link>
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
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-inter font-medium text-5xl md:text-6xl lg:text-7xl text-slate-900 mb-6">
            We Believe Clinicians Deserve Better.
          </h1>
          <p className="font-body text-xl md:text-2xl text-slate-700 leading-relaxed">
            We're here to end the era of administrative burnout and empower the people who power healthcare.
          </p>
        </div>
      </section>

      {/* Our "Why" Section */}
      <section className="py-20 px-6 fade-in-section">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Founder Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/tim.png" 
                  alt="Tim Hunter, CEO & Founder of Ron AI"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
            </div>
            
            {/* Narrative */}
            <div>
              <h2 className="font-inter font-medium text-4xl text-slate-900 mb-6">
                A System Built on Wasted Potential.
              </h2>
              <div className="prose prose-lg text-slate-700">
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
      <section className="py-20 px-6 bg-slate-50 fade-in-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-inter font-medium text-4xl text-center text-slate-900 mb-16">
            Intelligent Agents for an Impossible System.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 mb-4">Deep Research First</h3>
                <p className="font-body text-slate-700 leading-relaxed">
                  Our philosophy is simple: understand before you act. Nira's agents perform deep, evidence-based research on every task to ensure all actions are context-aware and intelligent.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                  <Bot className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 mb-4">Autonomous Execution</h3>
                <p className="font-body text-slate-700 leading-relaxed">
                  We build powerful agents that don't just find information—they get things done. From making phone calls to drafting documents, our agents execute complex workflows from start to finish.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 mb-4">Human-in-the-Loop Control</h3>
                <p className="font-body text-slate-700 leading-relaxed">
                  Ultimate control always remains with the clinician. Our platform provides complete transparency and only requests human approval for critical decisions, respecting the expertise of our users.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Team Section */}
      <section className="fade-in-section">
        <OurTeam />
      </section>

      {/* Our Vision Section */}
      <section className="py-20 px-6 fade-in-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-inter font-medium text-4xl text-slate-900 mb-8">
            A Future Where Clinicians are Free to Care.
          </h2>
          <div className="prose prose-xl text-slate-700 mx-auto">
            <p>
              Our vision extends beyond simply building tools. We aim to fundamentally restructure clinical work by creating an ecosystem where technology serves clinicians, not the other way around. A future where every administrative task is automated, every decision is informed by the best evidence, and every clinician has the time and energy to focus on what they do best: healing.
            </p>
          </div>
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

export default AboutUs;
