@echo off
echo ========================================
echo   Sistema de Asistencia - INICIANDO
echo ========================================
echo.

:: Verificar si Node.js esta instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js NO esta instalado
    echo Ejecuta primero: INSTALAR.bat
    echo.
    pause
    exit /b 1
)

:: Verificar si las dependencias estan instaladas
if not exist "node_modules\" (
    echo [ERROR] Dependencias no instaladas
    echo Ejecuta primero: INSTALAR.bat
    echo.
    pause
    exit /b 1
)

echo [OK] Iniciando servidor...
echo.
echo El servidor se iniciara en: http://localhost:3000
echo.
echo Para detener el servidor, presiona Ctrl+C
echo.
echo ========================================
echo.

npm start

pause
