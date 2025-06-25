# Chrome-Specific Autoscrolling Fixes

## Applied Fixes

### 1. **Disabled Chrome's Scroll Restoration**
Added to `client-layout.tsx`:
```javascript
history.scrollRestoration = 'manual';
```

### 2. **CSS Chrome-Specific Fixes**
Added to `index.css`:
```css
html {
  overflow-anchor: none; /* Disable Chrome's scroll anchoring */
}
```

### 3. **Iframe Scroll Prevention**
- Added `scrolling="no"` attribute
- Added `onLoad` handler to prevent focus stealing
- Blurs iframe immediately after loading

### 4. **Debug Steps**

To identify the exact cause in Chrome:

1. **Open Chrome DevTools Console**
2. **Add this temporary debug code to your client-layout.tsx:**

```javascript
import { ChromeScrollDebugger } from '@/components/ChromeScrollDebugger';

// In your component:
return (
  <QueryClientProvider client={queryClient}>
    <ChromeScrollDebugger />
    {/* rest of your code */}
  </QueryClientProvider>
);
```

3. **Look for these common Chrome-specific issues:**
   - "scrollIntoView called" messages
   - Focus events triggering scrolls
   - Hash changes
   - Scroll restoration messages

## Common Chrome-Specific Causes

1. **Chrome Extensions**
   - Disable all extensions and test
   - Common culprits: Password managers, ad blockers, developer tools

2. **Chrome's Scroll Anchoring**
   - Chrome tries to maintain scroll position when content changes
   - Already disabled with `overflow-anchor: none`

3. **Chrome's Focus Behavior**
   - Chrome scrolls to focused elements more aggressively than Safari
   - iframes often steal focus in Chrome

4. **Chrome DevTools**
   - Having DevTools open can sometimes affect scrolling
   - Test with DevTools closed

## Quick Test

1. Open in Chrome Incognito mode (no extensions)
2. If issue persists, it's code-related
3. If issue disappears, it's an extension

## Nuclear Option

If nothing else works, add this to your page.tsx:

```javascript
useEffect(() => {
  // Force scroll to top after everything loads
  const timer = setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
  
  return () => clearTimeout(timer);
}, []);
```
