#!/bin/bash

# Ron AI's flagship product, Nira.AI Chatbot - Development Server Startup Script

echo "🚀 Starting Ron AI's flagship product, Nira.AI Development Environment..."

# Check if Python virtual environment exists
if [ ! -d "backend/venv" ]; then
    echo "📦 Creating Python virtual environment..."
    cd backend
    python3 -m venv venv
    cd ..
fi

# Activate virtual environment and install dependencies
echo "📋 Installing Python dependencies..."
cd backend
source venv/bin/activate
pip install -r requirements.txt

# Copy environment file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env and add your GEMINI_API_KEY"
fi

# Start backend in background
echo "🔧 Starting backend server..."
python server.py &
BACKEND_PID=$!

cd ..

# Install frontend dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Start frontend
echo "🎨 Starting frontend development server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Ron AI's flagship product, Nira.AI Development Environment is running!"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:5000"
echo "   Backend Health: http://localhost:5000/api/health"
echo ""
echo "📖 To stop both servers, press Ctrl+C"
echo ""

# Wait for Ctrl+C
trap "echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
