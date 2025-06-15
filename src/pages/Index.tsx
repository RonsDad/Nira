
import { useEffect, useState } from "react";
import { Settings, Brain, Compass, Rocket, BookOpen, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDemo, setActiveDemo] = useState(false);

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
                <a href="#" className="text-slate-700 hover:text-slate-900 font-body transition-colors">Home</a>
                <a href="#" className="text-slate-700 hover:text-slate-900 font-body transition-colors">Security & Compliance</a>
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
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-inter font-medium text-6xl md:text-7xl text-black mb-6 leading-tight">
            The End of <span className="text-blue-600">Administrative Work</span>
          </h1>
          <p className="font-body text-xl md:text-2xl text-slate-700 mb-10 max-w-3xl mx-auto leading-relaxed">
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
            
            <Tabs defaultValue="dispatch" className="w-full">
              <TabsList className="w-full bg-slate-50 rounded-none border-b border-slate-200 p-0">
                <TabsTrigger value="dispatch" className="flex-1 font-body font-medium">Dispatch Dashboard</TabsTrigger>
                <TabsTrigger value="workspace" className="flex-1 font-body font-medium">Workspace Kanban</TabsTrigger>
                <TabsTrigger value="demo" className="flex-1 font-body font-medium" onClick={startDemo}>Live Agent Demo</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dispatch" className="p-8 min-h-96">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
                    <CardContent className="p-6">
                      <h3 className="font-body font-semibold text-lg mb-2">Prior Authorizations</h3>
                      <div className="text-3xl font-bold text-orange-600 mb-2">12</div>
                      <p className="text-sm text-slate-600">Pending approval</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardContent className="p-6">
                      <h3 className="font-body font-semibold text-lg mb-2">Insurance Verifications</h3>
                      <div className="text-3xl font-bold text-blue-600 mb-2">8</div>
                      <p className="text-sm text-slate-600">In progress</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
                    <CardContent className="p-6">
                      <h3 className="font-body font-semibold text-lg mb-2">Completed Today</h3>
                      <div className="text-3xl font-bold text-green-600 mb-2">24</div>
                      <p className="text-sm text-slate-600">Tasks automated</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="workspace" className="p-8 min-h-96">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-body font-semibold text-lg mb-4 text-slate-700">To Do</h3>
                    <div className="space-y-3">
                      <Card className="bg-slate-50">
                        <CardContent className="p-4">
                          <p className="font-body text-sm">Review patient charts</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-slate-50">
                        <CardContent className="p-4">
                          <p className="font-body text-sm">Update treatment plans</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-body font-semibold text-lg mb-4 text-orange-600">In Progress</h3>
                    <div className="space-y-3">
                      <Card className="bg-orange-50 border-orange-200">
                        <CardContent className="p-4">
                          <p className="font-body text-sm">Prior auth for MRI</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-body font-semibold text-lg mb-4 text-green-600">Done</h3>
                    <div className="space-y-3">
                      <Card className="bg-green-50 border-green-200">
                        <CardContent className="p-4 flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <p className="font-body text-sm">Insurance verification</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="demo" className="p-8 min-h-96">
                <div className="max-w-2xl mx-auto">
                  <h3 className="font-body font-semibold text-xl mb-6 text-center">Watch Nira in Action</h3>
                  
                  <div className="space-y-4">
                    <Card className={`transition-all duration-500 ${activeDemo ? 'border-blue-300 bg-blue-50' : 'bg-white'}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${activeDemo ? 'bg-blue-500 animate-pulse' : 'bg-slate-300'}`}></div>
                            <span className="font-body">Verify Mr. Smith's Cigna Coverage</span>
                          </div>
                          {activeDemo && (
                            <div className="w-32 bg-slate-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full animate-progress-fill"></div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {activeDemo && (
                      <div className="text-center">
                        <Card className="bg-green-50 border-green-200 animate-fade-in">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <span className="font-body text-green-800">Task completed successfully!</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                    
                    {!activeDemo && (
                      <div className="text-center">
                        <Button 
                          onClick={startDemo}
                          className="bg-slate-800 hover:bg-slate-900 text-white font-body transition-colors"
                        >
                          Start Demo
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
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
                Nira is designed to solve this systemic failure.
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
