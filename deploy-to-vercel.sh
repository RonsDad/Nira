#!/bin/bash

echo "🚀 Starting Vercel deployment..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Please install it with: npm install -g vercel"
    exit 1
fi

# Read the API key from backend/.env
if [ -f "backend/.env" ]; then
    export GEMINI_API_KEY=$(grep GEMINI_API_KEY backend/.env | cut -d '=' -f2)
    echo "✅ Found GEMINI_API_KEY"
else
    echo "❌ backend/.env file not found"
    exit 1
fi

# Deploy to Vercel with environment variable
echo "📦 Deploying to Vercel..."
vercel --prod --yes \
  --env GEMINI_API_KEY="$GEMINI_API_KEY" \
  --build-env GEMINI_API_KEY="$GEMINI_API_KEY"

echo "✨ Deployment complete!"
echo "📝 Note: If this is your first deployment, Vercel will ask you to log in and link your project."
