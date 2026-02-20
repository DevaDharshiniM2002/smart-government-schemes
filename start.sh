#!/bin/bash

echo "🚀 Smart Government Scheme Platform"
echo "===================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "Creating from template..."
    cp .env.server .env
    echo "✓ Created .env file"
    echo ""
    echo "⚡ Generate admin token:"
    echo "   pnpm run generate:token"
    echo ""
    echo "Then edit .env and add the token"
    exit 1
fi

# Check if ADMIN_TOKEN is set
if ! grep -q "ADMIN_TOKEN=." .env; then
    echo "⚠️  ADMIN_TOKEN not configured!"
    echo ""
    echo "Generate token with:"
    echo "   pnpm run generate:token"
    echo ""
    echo "Then add it to .env file"
    exit 1
fi

echo "✓ Environment configured"
echo ""

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    pnpm install
    echo ""
fi

# Check if dist exists
if [ ! -d dist ]; then
    echo "🔨 Building application..."
    pnpm run build
    echo ""
fi

echo "🌐 Starting server..."
echo ""
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:3000/api"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Start both servers
pnpm run dev:server &
SERVER_PID=$!

pnpm run dev &
CLIENT_PID=$!

# Wait for both processes
wait $SERVER_PID $CLIENT_PID
