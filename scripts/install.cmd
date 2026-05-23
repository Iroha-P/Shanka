@echo off
setlocal
cd /d %~dp0\..
npm install
python -m pip install -r requirements.txt
pause
