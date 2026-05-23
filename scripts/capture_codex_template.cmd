@echo off
setlocal
cd /d %~dp0\..
npm run capture:codex
pause
