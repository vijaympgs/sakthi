@echo off
echo ============================================
echo   OWP - Daily Git Push
echo ============================================
echo.

cd /d "%~dp0"

git add -A
echo [1/3] Staged all changes
echo.

set /p commit_msg=Commit message (default: "daily update"): 
if "%commit_msg%"=="" set commit_msg=daily update

git commit -m "%commit_msg%"
echo [2/3] Committed
echo.

echo [3/3] Pushing to remote...
git push

echo.
echo ============================================
echo   Done
echo ============================================
echo.
pause
