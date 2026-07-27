@echo off
echo ============================================
echo   OWP - Sakthi Solutions - Start Servers
echo ============================================
echo.

echo [0/2] Terminating existing processes and other command windows...
taskkill /F /IM python.exe 2>nul
taskkill /F /IM node.exe 2>nul
powershell -Command "Get-Process -Name cmd -ErrorAction SilentlyContinue | Where-Object { `$_.Id -ne (Get-CimInstance Win32_Process -Filter 'ProcessId = $PID').ParentProcessId } | Stop-Process -Force" 2>nul
timeout /t 1 /nobreak >nul
echo Done.
echo.

echo [1/2] Starting Django Backend on http://localhost:8000
cd /d "%~dp0backend"
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate.bat
if not exist ".env" (
    copy .env.example .env >nul
    echo Created .env from .env.example
)
pip install -r requirements.txt -q 2>nul
python manage.py migrate --run-syncdb 2>nul
start "OWP-Backend" cmd /k "cd /d "%~dp0backend" && venv\Scripts\activate.bat && python manage.py runserver"

echo [2/2] Starting Next.js Frontend on http://localhost:3000
cd /d "%~dp0frontend"
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)
if not exist ".env.local" (
    copy .env.example .env.local >nul
    echo Created .env.local from .env.example
)
start "OWP-Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo ============================================
echo   Servers starting...
echo   Backend:  http://localhost:8000
echo   Admin:    http://localhost:8000/admin/
echo   API Docs: http://localhost:8000/api/docs/
echo   Frontend: http://localhost:3000
echo ============================================
echo.
pause