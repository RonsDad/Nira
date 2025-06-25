'use client'

import { useEffect } from 'react';

export function AggressiveScrollPrevention() {
  useEffect(() => {
    // Nuclear option: prevent ALL scrolling for 3 seconds after load
    let preventScroll = true;
    
    const blockScroll = (e: Event) => {
      if (preventScroll) {
        window.scrollTo(0, 0);
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };
    
    // Block all scroll attempts
    window.addEventListener('scroll', blockScroll, { passive: false, capture: true });
    window.addEventListener('wheel', blockScroll, { passive: false });
    window.addEventListener('touchmove', blockScroll, { passive: false });
    
    // Force position
    const forceTop = setInterval(() => {
      if (preventScroll && window.scrollY !== 0) {
        console.log('Forcing scroll to top, was at:', window.scrollY);
        window.scrollTo(0, 0);
      }
    }, 10);
    
    // Allow scrolling after 3 seconds
    setTimeout(() => {
      preventScroll = false;
      clearInterval(forceTop);
      console.log('Scroll prevention disabled, normal scrolling restored');
    }, 3000);
    
    return () => {
      clearInterval(forceTop);
      window.removeEventListener('scroll', blockScroll);
      window.removeEventListener('wheel', blockScroll);
      window.removeEventListener('touchmove', blockScroll);
    };
  }, []);
  
  return null;
}
