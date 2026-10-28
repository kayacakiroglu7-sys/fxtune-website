# FxTune Website Setup Script
# This script sets up the development environment for the FxTune marketing website.

param(
    [switch]$SkipInstall,
    [switch]$SkipDevServer
)

# Colors for output
$host.UI.RawUI.WindowTitle = "FxTune Website Setup"

Write-Host "=================================" -ForegroundColor Cyan
Write-Host "FxTune Marketing Website Setup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# 1. Check Node.js version
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Node.js found: $nodeVersion" -ForegroundColor Green
        
        # Check minimum version (Node.js 18+)
        $versionNumber = [int]($nodeVersion -replace 'v(\d+).*', '$1')
        if ($versionNumber -lt 18) {
            Write-Host "[ERROR] Node.js version 18 or higher is required. You have $nodeVersion" -ForegroundColor Red
            Write-Host "  Please download from https://nodejs.org/" -ForegroundColor Yellow
            exit 1
        }
    } else {
        throw "Node.js not found"
    }
} catch {
    Write-Host "[ERROR] Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "  Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# 2. Check npm version
Write-Host "Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] npm found: $npmVersion" -ForegroundColor Green
    } else {
        throw "npm not found"
    }
} catch {
    Write-Host "[ERROR] npm is not installed or not in PATH" -ForegroundColor Red
    Write-Host "  npm should come with Node.js installation" -ForegroundColor Yellow
    exit 1
}

# 3. Install dependencies
if (-not $SkipInstall) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    $installOutput = npm install 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to install dependencies" -ForegroundColor Red
        Write-Host $installOutput -ForegroundColor Gray
        exit 1
    }
    Write-Host "[OK] Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "[SKIP] Skipping dependency installation" -ForegroundColor Gray
}

Write-Host ""
Write-Host "=================================" -ForegroundColor Green
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""
Write-Host "Available commands:" -ForegroundColor Cyan
Write-Host "  npm run dev      - Start development server (http://localhost:4321)" -ForegroundColor White
Write-Host "  npm run build    - Build for production" -ForegroundColor White
Write-Host "  npm run preview  - Preview production build" -ForegroundColor White
Write-Host "  npm run lint     - Lint source files" -ForegroundColor White
Write-Host "  npm run format   - Format with Prettier" -ForegroundColor White
Write-Host ""

# 4. Start dev server if not skipped
if (-not $SkipDevServer) {
    $startDev = Read-Host "Start development server now? (y/n)"
    if ($startDev -eq 'y' -or $startDev -eq 'Y') {
        Write-Host "Starting development server..." -ForegroundColor Yellow
        Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
        Write-Host ""
        
        # Change to script directory
        Set-Location -Path $PSScriptRoot
        
        # Start dev server
        npm run dev
    } else {
        Write-Host "To start the development server later, run:" -ForegroundColor Gray
        Write-Host "  cd fxtune-website" -ForegroundColor White
        Write-Host "  npm run dev" -ForegroundColor White
    }
} else {
    Write-Host "To start the development server later, run:" -ForegroundColor Gray
    Write-Host "  cd fxtune-website" -ForegroundColor White
    Write-Host "  npm run dev" -ForegroundColor White
}