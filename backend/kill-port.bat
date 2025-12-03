@echo off
echo Checking for processes on port 5000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000') do (
    echo Found process: %%a
    taskkill /F /PID %%a
)
echo Port 5000 is now free!
pause
