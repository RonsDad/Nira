// Chrome Scroll Debug Component
// Add this to your client-layout.tsx temporarily to debug Chrome scrolling

'use client'

import { useEffect } from 'react';

export function ChromeScrollDebugger() {
  useEffect(() => {
    console.log('Chrome Scroll Debugger Active');
    
    // Log all scroll-related information
    const logScrollInfo = () => {
      console.log('=== Scroll Debug Info ===');
      console.log('User Agent:', navigator.userAgent);
      console.log('Is Chrome:', /Chrome/.test(navigator.userAgent) && !/Edge/.test(navigator.userAgent));
      console.log('Scroll Position:', {
        x: window.scrollX,
        y: window.scrollY
      });
      console.log('Document Height:', document.documentElement.scrollHeight);
      console.log('Viewport Height:', window.innerHeight);
      console.log('Active Element:', document.activeElement);
      console.log('Location Hash:', window.location.hash);
      console.log('History ScrollRestoration:', (history as any).scrollRestoration);
    };
    
    // Initial log
    logScrollInfo();
    
    // Monitor scroll events
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = (e: Event) => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        console.log('Scroll Event Detected:', {
          target: e.target === document ? 'document' : e.target,
          timeStamp: e.timeStamp,
          scrollY: window.scrollY,
          type: e.type
        });
      }, 100);
    };
    
    // Monitor focus events (Chrome often scrolls on focus)
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      console.log('Focus Event:', {
        target: e.target,
        tagName: target.tagName,
        id: target.id,
        className: target.className,
        scrollY: window.scrollY
      });
    };
    
    // Override methods to detect programmatic scrolling
    const originalScrollTo = window.scrollTo.bind(window);
    const originalScrollBy = window.scrollBy.bind(window);
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    
    (window as any).scrollTo = (...args: any[]) => {
      console.trace('window.scrollTo called with:', args);
      return originalScrollTo(...args);
    };
    
    (window as any).scrollBy = (...args: any[]) => {
      console.trace('window.scrollBy called with:', args);
      return originalScrollBy(...args);
    };
    
    (Element.prototype as any).scrollIntoView = function(this: Element, arg?: boolean | ScrollIntoViewOptions) {
      console.trace('scrollIntoView called on:', this, 'args:', arg);
      return originalScrollIntoView.call(this, arg);
    };
    
    // Chrome-specific: Check for scroll restoration
    if ('scrollRestoration' in history) {
      console.log('Current scrollRestoration:', (history as any).scrollRestoration);
      (history as any).scrollRestoration = 'manual';
      console.log('Set scrollRestoration to manual');
    }
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('focus', handleFocus, true);
    window.addEventListener('hashchange', () => {
      console.log('Hash changed to:', window.location.hash);
    });
    
    // Chrome-specific: Check for any pending scroll after load
    window.addEventListener('load', () => {
      console.log('Window loaded, scroll position:', window.scrollY);
      if (window.scrollY > 0) {
        console.warn('Page scrolled after load! Investigating...');
        logScrollInfo();
      }
    });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('focus', handleFocus, true);
      (window as any).scrollTo = originalScrollTo;
      (window as any).scrollBy = originalScrollBy;
      (Element.prototype as any).scrollIntoView = originalScrollIntoView;
    };
  }, []);
  
  return null;
}
