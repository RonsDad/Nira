// Add this to your page.tsx or create a custom hook
import { useEffect } from 'react';

export function usePreventChromeScroll() {
  useEffect(() => {
    // Only run in Chrome
    const isChrome = /Chrome/.test(navigator.userAgent) && !/Edge/.test(navigator.userAgent);
    
    if (!isChrome) return;
    
    // Create a MutationObserver to catch any DOM changes that might trigger scroll
    const observer = new MutationObserver(() => {
      if (window.scrollY > 0) {
        window.scrollTo(0, 0);
      }
    });
    
    // Start observing after a delay to let initial render complete
    setTimeout(() => {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    }, 100);
    
    // Stop observing after page settles (2 seconds)
    setTimeout(() => {
      observer.disconnect();
    }, 2000);
    
    return () => {
      observer.disconnect();
    };
  }, []);
}
