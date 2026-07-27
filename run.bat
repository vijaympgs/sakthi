@echo off
echo ============================================
echo   OWP - Sakthi Solutions - Run Servers
echo ============================================
echo.

echo [0/3] Stopping previous instances...
taskkill /F /IM python.exe 2>nul
taskkill /F /IM node.exe 2>nul
powershell -Command "$current = Get-CimInstance Win32_Process -Filter ('ProcessId = ' + $PID) | Select-Object -ExpandProperty ParentProcessId; Get-Process -Name cmd -ErrorAction SilentlyContinue | Where-Object { $_.Id -ne $PID -and $_.Id -ne $current } | Stop-Process -Force" 2>nul
timeout /t 2 /nobreak >nul
echo Done.
echo.

echo [1/3] Starting Django Backend...
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

echo [2/3] Starting Next.js Frontend...
cd /d "%~dp0frontend"
if not exist "node_modules" call npm install
if not exist ".env.local" copy .env.example .env.local >nul 2>&1
start /b npm run dev
echo   Frontend: http://localhost:3000

echo.
echo ============================================
echo   All servers running in this window.
echo   Backend:  http://localhost:8000
echo   Admin:    http://localhost:8000/admin/
echo   Frontend: http://localhost:3000
echo.
echo   Press Ctrl+C to stop all servers.
echo ============================================
