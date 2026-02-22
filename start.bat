@echo off
echo ========================================
echo   MedFinder - Quick Start Script
echo ========================================
echo.

echo [1/4] Checking Python...
python --version
if %errorlevel% neq 0 (
    echo ERROR: Python not found. Please install Python 3.10+
    pause
    exit /b 1
)

echo.
echo [2/4] Checking Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found. Please install Node.js 18+
    pause
    exit /b 1
)

echo.
echo [3/4] Starting Backend...
start cmd /k "cd backend && pip install -r requirements.txt && python main.py"

timeout /t 5

echo.
echo [4/4] Starting Frontend...
start cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ========================================
echo   MedFinder is starting!
echo ========================================
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to open browser...
pause > nul

start http://localhost:3000

echo.
echo Setup complete! Close this window when done.
pause
