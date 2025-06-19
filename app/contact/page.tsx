'use client'

import React from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { ContactUsForm } from '@/components/forms/ContactUsForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <section className="text-center mb-20 animate-fade-in">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-slate-900 mb-6">
              Let's Build the Future <span className="text-blue-700">Together.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
              Whether you're interested in joining our team, partnering with us, or learning more about our products, we'd love to hear from you.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-800 p-12 rounded-2xl text-white animate-fade-in-delay-1 shadow-2xl">
              <h2 className="font-serif text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-lg mb-8 opacity-90">
                Nira is actively building the future of healthcare technology. We're looking for passionate individuals who share our vision of revolutionizing clinical work through AI.
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

      <Footer />
    </div>
  );
}
