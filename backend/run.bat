@echo off
REM Namma Schemes Backend - Setup and Run Script for Windows

echo.
echo 🚀 Namma Schemes Backend Setup
echo ======================================

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python 3.8 or higher from https://www.python.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
echo ✅ Python found: %PYTHON_VERSION%

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo 📦 Creating virtual environment...
    python -m venv venv
) else (
    echo ✅ Virtual environment already exists
)

REM Activate virtual environment
echo 🔌 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo 📥 Installing dependencies...
pip install -q -r requirements.txt

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo ⚙️  Creating .env file...
    copy .env.example .env
)

REM Create data directory if it doesn't exist
if not exist "data" (
    mkdir data
)

echo.
echo ======================================
echo 🎉 Setup complete!
echo ======================================
echo.
echo Starting backend server...
echo 🌐 Server will run on: http://127.0.0.1:8000
echo.
echo API Endpoints:
echo   • GET  /api/health
echo   • GET  /api/categories
echo   • GET  /api/schemes?category=education
echo   • POST /api/eligibility-check
echo.
echo Press Ctrl+C to stop the server
echo ======================================
echo.

REM Run the Flask app
python app.py

pause
