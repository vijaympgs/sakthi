@echo off
echo ============================================
echo   OWP - Sakthi Solutions - Initial Setup
echo ============================================
echo.

echo [1/4] Setting up Django Backend...
cd /d "%~dp0backend"

if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)
call venv\Scripts\activate.bat

if not exist ".env" (
    copy .env.example .env >nul
    echo Created .env from .env.example
)

echo Installing Python dependencies...
pip install -r requirements.txt

echo Running database migrations...
python manage.py migrate

echo.
echo Creating superuser (admin account)...
python manage.py createsuperuser

echo Seeding Sakthi Solutions content...
python manage.py seed_sakthi

echo.
echo [2/4] Setting up Next.js Frontend...
cd /d "%~dp0frontend"

if not exist "node_modules" (
    echo Installing Node.js dependencies...
    call npm install
)

if not exist ".env.local" (
    copy .env.example .env.local >nul
    echo Created .env.local from .env.example
)

echo.
echo ============================================
echo   Setup Complete!
echo ============================================
echo.
echo To start servers, run: start-servers.bat
echo.
echo Default admin URL: http://localhost:8000/admin/
echo Frontend URL: http://localhost:3000
echo.
pause