'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingCTA() {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating CTA after scrolling 30% of the page
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercent = scrolled / (documentHeight - windowHeight);
      
      setShowFloatingCTA(scrollPercent > 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showFloatingCTA) return null;

  return (
    <>
      <style jsx global>{`
        .floating-cta {
          max-width: calc(100vw - 2rem);
        }

        .cta-pulse {
          animation: pulse-glow 2s ease-in-out infinite alternate;
        }

        @keyframes pulse-glow {
          from {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          to {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.3);
          }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto z-50 floating-cta"
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-filter backdrop-blur-lg border border-white/10 cta-pulse">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <div className="text-center sm:text-left flex-1">
              <h4 className="text-white font-bold text-sm sm:text-base">Ready for Ron AI?</h4>
              <p className="text-blue-100 text-xs sm:text-sm">Join the healthcare revolution today</p>
            </div>
            <Link 
              href="/our-products#early-access"
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base whitespace-nowrap"
            >
              Get Early Access
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}
