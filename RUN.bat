@echo off
echo Starting Smart Government Scheme Platform...
echo.
if not exist data mkdir data
pnpm run dev
