'use client'

import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Chatbot } from "@/components/ui/chatbot";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  
  // Chrome-specific scroll fix
  useEffect(() => {
    // Disable Chrome's scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top immediately and after a short delay
    window.scrollTo(0, 0);
    
    // Chrome sometimes needs multiple attempts
    const scrollToTop = () => window.scrollTo(0, 0);
    
    // Try multiple times to ensure we catch Chrome's restore
    setTimeout(scrollToTop, 0);
    setTimeout(scrollToTop, 10);
    setTimeout(scrollToTop, 50);
    setTimeout(scrollToTop, 100);
    
    // Enable scrolling after 1 second
    setTimeout(() => {
      document.body.classList.add('scroll-enabled');
    }, 1000);
    
    // Also handle when DOM is fully ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', scrollToTop);
    } else {
      scrollToTop();
    }
    
    // Chrome-specific: prevent anchor scrolling
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    // Prevent Chrome's automatic scroll on refresh
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('DOMContentLoaded', scrollToTop);
    };
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Toaster />
        <Sonner />
        <Chatbot />
      </TooltipProvider>
    </QueryClientProvider>
  );
}