#!/bin/bash

# Kill any existing dev servers
echo "🧹 Cleaning up existing processes..."

# Kill processes by port (common dev ports)
ports=(3000 5173 5174 8080 8000)

for port in "${ports[@]}"; do
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "📦 Killing process on port $port"
        lsof -ti :$port | xargs kill -9 2>/dev/null || true
    fi
done

# Kill processes by name pattern
patterns=("vite" "node" "npm" "next")

for pattern in "${patterns[@]}"; do
    if pgrep -f "$pattern" >/dev/null 2>&1; then
        echo "🔄 Stopping $pattern processes"
        pkill -f "$pattern" 2>/dev/null || true
    fi
done

echo "✅ Cleanup complete!"

# Wait a moment for ports to be released
sleep 2
