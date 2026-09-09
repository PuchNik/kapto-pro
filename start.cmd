@echo off
cd /d "%~dp0"
where node >nul 2>nul
if %errorlevel% equ 0 (
  node node_modules/vinext/dist/cli.js dev
) else (
  "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" node_modules/vinext/dist/cli.js dev
)
pause
