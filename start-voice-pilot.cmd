@echo off
cd /d "%~dp0"
set NODE_USE_ENV_PROXY=1
"C:\Users\donut\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" voice\gateway.mjs
pause
