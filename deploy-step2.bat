@echo off
echo ========================================
echo Pushing to GitHub
echo ========================================
echo.

cd /d "e:\smart_government_scheme-main (1)\smart_government_scheme-main"

set /p username="Enter your GitHub username: "

echo.
echo Connecting to GitHub repository...
git remote add origin https://github.com/%username%/namma-schemes.git
git branch -M main

echo.
echo Pushing code to GitHub...
git push -u origin main

echo.
echo ========================================
echo Code pushed to GitHub successfully!
echo ========================================
echo.
echo Your repository: https://github.com/%username%/namma-schemes
echo.
echo Next Steps:
echo 1. Go to: https://render.com
echo 2. Sign up with GitHub
echo 3. Create New Web Service
echo 4. Select namma-schemes repository
echo 5. Use these settings:
echo    - Build Command: pip install -r backend/requirements.txt
echo    - Start Command: cd backend ^&^& gunicorn app:app --bind 0.0.0.0:$PORT
echo 6. Click Deploy
echo.
pause
