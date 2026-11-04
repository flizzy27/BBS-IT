@echo off
setlocal
title FISI Academy
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  Node.js wurde nicht gefunden.
  echo  Bitte Node.js LTS ^(Version 22 oder neuer^) installieren: https://nodejs.org/de
  echo  Danach dieses Fenster schliessen und start.bat erneut ausfuehren.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo  Erster Start: Abhaengigkeiten werden installiert ^(einmalig, ca. 1 Minute^) ...
  call npm install --no-fund --no-audit
  if errorlevel 1 ( echo Installation fehlgeschlagen. & pause & exit /b 1 )
)

if not exist "dist\index.html" (
  echo  Oberflaeche wird gebaut ...
  call npx vite build
  if errorlevel 1 ( echo Build fehlgeschlagen. & pause & exit /b 1 )
)

echo  Starte FISI Academy ...
start "FISI Academy Server" /min node server/index.mjs

rem kurz warten, bis der Server antwortet
powershell -NoProfile -Command "for($i=0;$i -lt 40;$i++){try{Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4317/api/health -TimeoutSec 2 | Out-Null; exit 0}catch{Start-Sleep -Milliseconds 250}}; exit 1"

rem Als App-Fenster in Microsoft Edge oeffnen (sieht aus wie ein eigenes Programm), sonst Standardbrowser
where msedge >nul 2>nul
if not errorlevel 1 (
  start "" msedge --app=http://localhost:4317 --window-size=1440,900
) else if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
  start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --app=http://localhost:4317 --window-size=1440,900
) else (
  start "" http://localhost:4317
)
echo.
echo  FISI Academy laeuft auf http://localhost:4317
echo  Zum Beenden das minimierte Fenster "FISI Academy Server" schliessen oder stop.bat ausfuehren.
timeout /t 4 >nul
endlocal
