@echo off
rem Holt die neueste Version von GitHub, installiert Abhaengigkeiten und baut die Oberflaeche neu.
cd /d "%~dp0"
call stop.bat
git pull
call npm install --no-fund --no-audit
call npx vite build
echo Update abgeschlossen. Starte mit start.bat.
pause
