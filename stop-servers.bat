@echo off
echo ============================================
echo   OWP - Sakthi Solutions - Stop Servers
echo ============================================
echo.

echo Stopping Django Backend...
taskkill /FI "WINDOWTITLE eq OWP-Backend*" /T /F >nul 2>&1

echo Stopping Next.js Frontend...
taskkill /FI "WINDOWTITLE eq OWP-Frontend*" /T /F >nul 2>&1

echo.
echo All servers stopped.
echo.
pause