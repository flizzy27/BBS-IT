@echo off
rem Beendet den lokalen Network-Academy-Server (Port 4317).
for /f "tokens=5" %%p in ('netstat -ano ^| findstr /r /c:":4317 .*LISTENING"') do taskkill /PID %%p /F >nul 2>nul
echo Network Academy wurde beendet.
timeout /t 2 >nul
