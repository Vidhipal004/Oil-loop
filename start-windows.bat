@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Install Node.js 20 LTS from https://nodejs.org and run this file again.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing app dependencies (internet connection required on first run)...
  call npm install
  if errorlevel 1 pause & exit /b 1
)
echo Starting OilLoop. Leave this window open while using the app.
call npm run dev
pause
