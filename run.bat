@echo off
echo ============================================
echo   OWP - Sakthi Solutions - Run Servers
echo ============================================
echo.

echo [0/5] Stopping previous instances...
taskkill /F /IM python.exe 2>nul
taskkill /F /IM node.exe 2>nul
rem taskkill /F /IM chrome.exe 2>nul
timeout /t 2 /nobreak >nul
echo Done.
echo.

echo [1/5] Starting Django Backend...
cd /d "%~dp0backend"
call venv\Scripts\activate.bat 2>nul
if errorlevel 1 (
    echo Creating virtual environment...
    python -m venv venv
    call venv\Scripts\activate.bat
)
if not exist ".env" copy .env.example .env >nul 2>&1
start /b python manage.py runserver >nul 2>&1
echo   Backend:  http://localhost:8000

echo [2/5] Starting Next.js Frontend...
cd /d "%~dp0frontend"
if not exist "node_modules" call npm install
if not exist ".env.local" copy .env.example .env.local >nul 2>&1
start /b npm run dev
echo   Frontend: http://localhost:3000

echo [3/5] Starting 9Router...
start "9Router" /MIN cmd /c "9router"
echo   9Router:  http://localhost:20128/v1

echo [4/5] Waiting for servers to start...
timeout /t 5 /nobreak >nul
echo Done.

echo [5/5] Opening Chrome...
start chrome http://localhost:3000

echo.
echo ============================================
echo   All servers started in background.
echo   Backend:  http://localhost:8000
echo   Admin:    http://localhost:8000/admin/
echo   Frontend: http://localhost:3000
echo   9Router:  http://localhost:20128/v1
echo.
echo   This window will close automatically.
echo ============================================
timeout /t 3 /nobreak >nul
exit
