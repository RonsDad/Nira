#!/bin/bash

echo "🔄 Deploying new favicon to Vercel..."

# Check if favicon.ico exists
if [ ! -f "public/favicon.ico" ]; then
    echo "❌ Error: public/favicon.ico not found!"
    exit 1
fi

# Add and commit
git add public/favicon.ico
git add public/favicon-*.png 2>/dev/null
git add public/apple-touch-icon.png 2>/dev/null
git add app/layout.tsx

# Commit with timestamp
git commit -m "Replace Lovable favicon with Ron AI blue icon - $(date '+%Y-%m-%d %H:%M:%S')"

# Push to deploy
echo "🚀 Pushing to deploy..."
git push

echo "✅ Favicon deployed! Your site will update in ~30 seconds"
echo "💡 Remember to hard refresh (Cmd+Shift+R) to see the new favicon"
