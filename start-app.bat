@echo off
echo ========================================
echo Smart Government Scheme Platform
echo ========================================
echo.
echo Starting integrated application...
echo.

REM Create data directory
if not exist data mkdir data

REM Start backend server in new window
echo [1/2] Starting Backend Server (Port 3000)...
start "Backend Server" cmd /k "pnpm run dev:server"
timeout /t 3 /nobreak >nul

REM Start frontend in new window
echo [2/2] Starting Frontend (Port 5173)...
start "Frontend Dev Server" cmd /k "pnpm run dev"
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo Application Started Successfully!
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:3000/api
echo Health:   http://localhost:3000/api/health
echo.
echo Press any key to open the application in browser...
pause >nul
start http://localhost:5173
