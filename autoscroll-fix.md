# Autoscrolling Fix Guide

## Issue Analysis
The autoscrolling on your website appears to be coming from the chatbot component that automatically scrolls when new messages appear.

## Quick Fixes

### 1. Disable Chatbot Auto-scroll
Edit `/src/components/ui/chatbot.tsx` and comment out or modify the scrolling behavior:

```typescript
// Around line 44-51
const scrollToBottom = () => {
  // Comment this out to disable auto-scrolling
  // if (isOpen && !isMinimized && messagesEndRef.current) {
  //   messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
  // }
}
```

### 2. Add Global Scroll Prevention
Add this to your `/src/index.css` file:

```css
/* Prevent any unwanted scroll on page load */
html, body {
  overflow-x: hidden;
  scroll-behavior: auto !important;
}

/* Prevent focus-based scrolling */
*:focus {
  scroll-margin-top: 0;
}

/* Disable smooth scrolling globally */
* {
  scroll-behavior: auto !important;
}
```

### 3. Check for Hash-based Navigation
If the issue occurs on page load, check if there's a URL hash causing it:

```javascript
// Add to your main layout or app component
useEffect(() => {
  // Clear any hash on mount
  if (window.location.hash) {
    window.history.pushState("", document.title, window.location.pathname);
  }
}, []);
```

### 4. Debug Script
Add this temporary debug script to identify what's causing scrolling:

```javascript
// Add to your layout.tsx or client-layout.tsx
useEffect(() => {
  // Log any scroll events
  const logScroll = (e) => {
    console.log('Scroll event:', {
      target: e.target,
      scrollTop: window.scrollY,
      timestamp: new Date().toISOString()
    });
  };
  
  window.addEventListener('scroll', logScroll, true);
  
  // Override scrollIntoView to log calls
  const originalScrollIntoView = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = function(...args) {
    console.log('scrollIntoView called on:', this, 'with args:', args);
    console.trace(); // This will show you the call stack
    return originalScrollIntoView.apply(this, args);
  };
  
  return () => {
    window.removeEventListener('scroll', logScroll, true);
    Element.prototype.scrollIntoView = originalScrollIntoView;
  };
}, []);
```

## Testing Steps

1. Open your browser's console
2. Load the page and watch for scroll events
3. Check if the chatbot is triggering scrolls
4. Look for any scrollIntoView calls in the console

## Most Likely Culprit
Based on the code analysis, the chatbot component is the most likely source of unwanted scrolling, especially if it's loading messages or changing state on page load.
