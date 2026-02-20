@echo off
echo ========================================
echo Initializing Git Repository
echo ========================================
echo.

cd /d "e:\smart_government_scheme-main (1)\smart_government_scheme-main"

echo Step 1: Initializing Git...
git init

echo.
echo Step 2: Adding all files...
git add .

echo.
echo Step 3: Creating initial commit...
git commit -m "Initial commit - Namma Schemes"

echo.
echo ========================================
echo Git repository initialized successfully!
echo ========================================
echo.
echo Next Steps:
echo 1. Create GitHub repository at: https://github.com/new
echo 2. Repository name: namma-schemes
echo 3. Make it Public
echo 4. Click Create repository
echo.
echo Then run: deploy-step2.bat
echo.
pause
