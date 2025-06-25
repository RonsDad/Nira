'use client'

import { useEffect } from 'react';

export function ScrollKiller() {
  useEffect(() => {
    console.log('ScrollKiller activated!');
    
    // Nuclear option - prevent ALL scrolling for 2 seconds
    let blockAllScrolling = true;
    
    // Store the original methods
    const originalScrollTo = window.scrollTo.bind(window);
    const originalScrollBy = window.scrollBy.bind(window);
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    
    // Override ALL scroll methods with type-safe approach
    (window as any).scrollTo = (...args: any[]) => {
      if (blockAllScrolling) {
        console.log('BLOCKED scrollTo attempt');
        return;
      }
      return originalScrollTo(...args);
    };
    
    (window as any).scrollBy = (...args: any[]) => {
      if (blockAllScrolling) {
        console.log('BLOCKED scrollBy attempt');
        return;
      }
      return originalScrollBy(...args);
    };
    
    (Element.prototype as any).scrollIntoView = function(this: Element, arg?: boolean | ScrollIntoViewOptions) {
      if (blockAllScrolling) {
        console.log('BLOCKED scrollIntoView attempt on:', this);
        return;
      }
      return originalScrollIntoView.call(this, arg);
    };
    
    // Force position to 0,0 every frame
    const forceTopInterval = setInterval(() => {
      if (window.scrollY !== 0 || window.scrollX !== 0) {
        console.log('Forcing back to top from:', window.scrollY);
        originalScrollTo(0, 0);
      }
    }, 1);
    
    // Block scroll events
    const blockScroll = (e: Event) => {
      if (blockAllScrolling) {
        e.preventDefault();
        e.stopPropagation();
        originalScrollTo(0, 0);
        return false;
      }
    };
    
    // Add listeners to everything
    window.addEventListener('scroll', blockScroll, { capture: true, passive: false });
    window.addEventListener('wheel', blockScroll, { capture: true, passive: false });
    window.addEventListener('touchmove', blockScroll, { capture: true, passive: false });
    document.addEventListener('scroll', blockScroll, { capture: true, passive: false });
    
    // After 2 seconds, restore normal scrolling
    setTimeout(() => {
      blockAllScrolling = false;
      clearInterval(forceTopInterval);
      (window as any).scrollTo = originalScrollTo;
      (window as any).scrollBy = originalScrollBy;
      (Element.prototype as any).scrollIntoView = originalScrollIntoView;
      console.log('ScrollKiller deactivated - normal scrolling restored');
    }, 2000);
    
    // Cleanup
    return () => {
      blockAllScrolling = false;
      clearInterval(forceTopInterval);
      window.removeEventListener('scroll', blockScroll, true);
      window.removeEventListener('wheel', blockScroll, true);
      window.removeEventListener('touchmove', blockScroll, true);
      document.removeEventListener('scroll', blockScroll, true);
      (window as any).scrollTo = originalScrollTo;
      (window as any).scrollBy = originalScrollBy;
      (Element.prototype as any).scrollIntoView = originalScrollIntoView;
    };
  }, []);
  
  return null;
}
