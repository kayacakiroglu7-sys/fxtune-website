@echo off
REM FxTune Website Setup Batch File
REM This script runs the PowerShell setup script for the FxTune marketing website.

echo ===================================
echo FxTune Marketing Website Setup
echo ===================================
echo.

REM Check if PowerShell is available
where powershell >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Error: PowerShell is not available on this system.
    echo Please install PowerShell or run the setup manually.
    pause
    exit /b 1
)

REM Get the directory of this batch file
set "SCRIPT_DIR=%~dp0"

REM Run the PowerShell script
echo Running setup script...
echo.

REM Check for execution policy and run accordingly
powershell -ExecutionPolicy Bypass -File "%SCRIPT_DIR%setup.ps1" %*

if %ERRORLEVEL% neq 0 (
    echo.
    echo Setup encountered an error. Please check the output above.
    pause
    exit /b 1
)

echo.
echo Setup completed successfully!
pause