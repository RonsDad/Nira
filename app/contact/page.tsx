'use client'

import React from 'react';
import Header from '@/components/ui/Header';
import { ContactUsForm } from '@/components/forms/ContactUsForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />

      <main className="pt-24 sm:pt-32 pb-12 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Hero Section */}
          <section className="text-center mb-12 sm:mb-20 animate-fade-in">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-4 sm:mb-6">
              Let's Build the Future <span className="text-blue-700">Together.</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
              Whether you're interested in joining our team, partnering with us, or learning more about our products, we'd love to hear from you.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-800 p-6 sm:p-8 lg:p-12 rounded-2xl text-white animate-fade-in-delay-1 shadow-2xl">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Get in Touch</h2>
              <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90">
                Ron is actively building the future of healthcare technology. We're looking for passionate individuals who share our vision of revolutionizing clinical work through AI.
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
                    <span className="text-sm">📞</span>
                  </div>
                  <div>
                    <strong className="block">Phone</strong>
                    <span>(747) 249-5071</span>
                  </div>
                </div>
              </div>
            </div>

            {/* React Form */}
            <ContactUsForm />
          </div>
        </div>
      </main>

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
