# Fix for Our Products Page Auto-scrolling

## The Issue
The home page has links to `/our-products#early-adopter` which causes automatic scrolling to the form when the page loads.

## Solutions Applied

### 1. Hash Prevention on Our Products Page
Added code to intercept the hash navigation and delay the scroll until after the page loads.

### 2. Alternative: Update Home Page Links
Instead of linking to `/our-products#early-adopter`, you could:

```jsx
// In app/page.tsx, change:
<Link href="/our-products#early-adopter">

// To:
<Link href="/our-products">

// Or add a query parameter instead:
<Link href="/our-products?action=early-adopter">
```

Then handle the scrolling in the our-products page based on the query parameter.

### 3. Chrome-Specific CSS Fix
You can also add this CSS to prevent scroll-on-load for anchors:

```css
/* Add to your CSS */
html:not(.scroll-ready) {
  scroll-behavior: auto !important;
}

/* Then add class after page loads */
setTimeout(() => {
  document.documentElement.classList.add('scroll-ready');
}, 1000);
```

## Current Implementation
The page now:
1. Detects if accessed with #early-adopter hash
2. Removes the hash from the URL immediately
3. Waits 500ms for the page to load
4. Then smoothly scrolls to the form

This provides a better user experience without the jarring immediate scroll.
