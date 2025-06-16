#!/bin/bash

# Kill any existing dev servers
echo "🧹 Cleaning up existing processes..."

# Kill processes by port (common dev ports)
ports=(3000 5173 5174 8080 8000 5001)

for port in "${ports[@]}"; do
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "📦 Killing process on port $port"
        lsof -ti :$port | xargs kill -9 2>/dev/null || true
    fi
done

# Kill processes by name pattern (more selective to avoid killing VS Code)
# Only kill processes that are actually dev servers
if pgrep -f "vite" >/dev/null 2>&1; then
    echo "🔄 Stopping vite processes"
    pkill -f "vite" 2>/dev/null || true
fi

# Kill specific backend processes
if pgrep -f "tsx.*server.ts" >/dev/null 2>&1; then
    echo "🔄 Stopping TypeScript backend server"
    pkill -f "tsx.*server.ts" 2>/dev/null || true
fi

if pgrep -f "python.*server.py" >/dev/null 2>&1; then
    echo "🔄 Stopping Python backend server"
    pkill -f "python.*server.py" 2>/dev/null || true
fi

echo "✅ Cleanup complete!"

# Wait a moment for ports to be released
sleep 2
