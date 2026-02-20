#!/bin/bash

# Namma Schemes Backend - Setup and Run Script
# This script sets up the backend and starts the Flask server

set -e

echo "🚀 Namma Schemes Backend Setup"
echo "======================================"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✅ Python found: $(python3 --version)"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
else
    echo "✅ Virtual environment already exists"
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -q -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file..."
    cp .env.example .env
fi

# Create data directory if it doesn't exist
mkdir -p data

echo ""
echo "======================================"
echo "🎉 Setup complete!"
echo "======================================"
echo ""
echo "Starting backend server..."
echo "🌐 Server will run on: http://127.0.0.1:8000"
echo ""
echo "API Endpoints:"
echo "  • GET  /api/health"
echo "  • GET  /api/categories"
echo "  • GET  /api/schemes?category=education&q=scholarship"
echo "  • POST /api/eligibility-check"
echo ""
echo "Press Ctrl+C to stop the server"
echo "======================================"
echo ""

# Run the Flask app
python app.py
