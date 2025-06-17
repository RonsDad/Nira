import React, { useState } from 'react';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

export const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    reasonForOutreach: '',
    anythingElse: '',
    newsletter: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowSuccess(false);
    setShowError(false);

    try {
      const response = await fetch('https://hooks.zapier.com/hooks/catch/18921559/uo3ych7/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          reasonForOutreach: '',
          anythingElse: '',
          newsletter: false
        });
        // Scroll to success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <section className="text-center mb-20 animate-fade-in">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-slate-900 mb-6">
              Let's Build the Future Together.
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
              Whether you're interested in joining our team, partnering with us, or learning more about our products, 
              we'd love to hear from you.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-12 rounded-2xl text-white animate-fade-in-delay-1">
              <h2 className="font-serif text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-lg mb-8 opacity-90">
                Ron AI is actively building the future of healthcare technology. 
                We're looking for passionate individuals who share our vision of 
                revolutionizing clinical work through AI.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">👤</span>
                  </div>
                  <div>
                    <strong className="block">Tim Hunter, MS RN CCM CSPO</strong>
                    <span>Salt Lake City, UT, 84101</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">📧</span>
                  </div>
                  <div>
                    <strong className="block">Email</strong>
                    <span>tim@ron-ai.io</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">📱</span>
                  </div>
                  <div>
                    <strong className="block">Phone</strong>
                    <span>(747) 249-5071</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-12 rounded-2xl shadow-xl animate-fade-in-delay-2">
              {showSuccess && (
                <div className="bg-green-500 text-white p-4 rounded-lg mb-6 text-center">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              
              {showError && (
                <div className="bg-red-500 text-white p-4 rounded-lg mb-6 text-center">
                  Something went wrong. Please try again.
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="reasonForOutreach" className="block text-sm font-semibold text-slate-700 mb-2">
                    Reason for Outreach *
                  </label>
                  <select
                    id="reasonForOutreach"
                    name="reasonForOutreach"
                    value={formData.reasonForOutreach}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select an option</option>
                    <option value="Early Access List">Early Access List</option>
                    <option value="Product Focus Group List">Product Focus Group List</option>
                    <option value="I want to invest">I want to invest</option>
                    <option value="I'm Interested in your Products">I'm Interested in your Products</option>
                    <option value="I have feedback">I have feedback</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="anythingElse" className="block text-sm font-semibold text-slate-700 mb-2">
                    Anything Else?
                  </label>
                  <textarea
                    id="anythingElse"
                    name="anythingElse"
                    value={formData.anythingElse}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us more about your interest in Ron AI..."
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-vertical"
                  />
                </div>
                
                <div className="mb-8">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                    />
                    <span className="text-slate-700">I want to hear more about Ron AI</span>
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                    isSubmitting 
                      ? 'bg-slate-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white transform hover:-translate-y-0.5 hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};
