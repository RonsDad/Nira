#!/bin/bash

# Nira AI - One-time setup script

echo "🚀 Setting up Nira AI development environment..."

# Create Python virtual environment if it doesn't exist
if [ ! -d "backend/venv" ]; then
    echo "📦 Creating Python virtual environment..."
    cd backend
    python3 -m venv venv
    echo "✅ Virtual environment created"
    cd ..
else
    echo "✅ Python virtual environment already exists"
fi

# Create .env file if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating environment configuration..."
    cp backend/.env.example backend/.env
    echo "⚠️  Please edit backend/.env and add your GEMINI_API_KEY if you want AI responses"
    echo "   (The chatbot will work with mock responses without the API key)"
else
    echo "✅ Environment configuration already exists"
fi

# Make scripts executable
chmod +x scripts/*.sh

echo ""
echo "🎉 Setup complete! Now you can run:"
echo "   npm run dev          - Start both frontend and backend"
echo "   npm run frontend     - Start only frontend"
echo "   npm run backend      - Start only backend"
echo ""
echo "💡 The chatbot will work with mock responses even without a Gemini API key!"
echo "
