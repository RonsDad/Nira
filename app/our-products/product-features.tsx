
'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Shield, MessageSquare, Zap, Heart, FileText, DollarSign, Compass, Network, Search, Phone, Calendar, Pill } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Data for product features
const productFeatures = [
  {
    title: "Ron Search",
    description: "AI-Powered Provider Discovery with real-time insurance verification.",
    icon: Search,
    color: "#2694FF",
    details: "Find doctors who take your insurance instantly. Ron searches multiple databases and verifies acceptance in real-time, solving the 68% abandonment rate problem."
  },
  {
    title: "Ron Scheduler",
    description: "Voice AI books your appointments, navigating phone trees automatically.",
    icon: Phone,
    color: "#FF5A5F",
    details: "Never wait on hold again. Ron's AI calls doctor offices, navigates phone trees, and books appointments while you do other things."
  },
  {
    title: "Ron Meds",
    description: "Save up to 400% on prescriptions by comparing prices and finding discounts.",
    icon: Pill,
    color: "#00A676",
    details: "Stop overpaying for medications. Ron compares prices across pharmacies, finds coupons, and tracks your refills automatically."
  },
  {
    title: "Denial Support",
    description: "Fight insurance denials with AI-generated letters and support.",
    icon: FileText,
    color: "#8E44AD",
    details: "Don't let insurance companies deny your care. Ron generates appeal letters and guides you through the process."
  },
];


// Product Features Section Component
export const ProductFeaturesSection = () => {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            className="premium-heading text-4xl sm:text-5xl font-bold text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Discover Ron's Core <span className="luxury-glow text-blue-400">Features</span>
          </motion.h2>
          <motion.p 
            className="premium-body text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore how Ron transforms your healthcare experience with these powerful features.
          </motion.p>
        </div>

        <Accordion 
          type="single" 
          collapsible 
          className="w-full max-w-4xl mx-auto space-y-4"
          defaultValue="item-0"
        >
          {productFeatures.map((feature, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="ice-glass border border-blue-500/20 rounded-xl overflow-hidden hover:border-blue-500/40 transition-all duration-300"
            >
              <AccordionTrigger className="px-6 py-6 hover:no-underline group">
                <div className="flex items-center gap-4 text-left w-full">
                  <motion.div
                    className="relative flex-shrink-0"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  >
                    <div 
                      className="absolute inset-0 rounded-full blur-xl opacity-50 w-16 h-16"
                      style={{ 
                        background: `radial-gradient(circle, ${feature.color}66 0%, transparent 70%)` 
                      }}
                    />
                    <div className="relative w-16 h-16 premium-glass rounded-full flex items-center justify-center">
                      <feature.icon 
                        className="w-8 h-8 text-white" 
                        style={{ 
                          filter: `drop-shadow(0 0 6px ${feature.color})` 
                        }} 
                      />
                    </div>
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-6 pb-6">
                <div className="premium-glass rounded-lg p-6 ml-20">
                  <p className="text-gray-200 text-lg leading-relaxed mb-4">
                    {feature.details}
                  </p>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full animate-pulse"
                      style={{ backgroundColor: feature.color }}
                    />
                    <span className="text-sm text-gray-400">
                      Powered by advanced AI technology
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default ProductFeaturesSection;
