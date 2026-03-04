@echo off
echo ========================================
echo   INSTALACION - Sistema de Asistencia
echo ========================================
echo.

:: Verificar si Node.js esta instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js NO esta instalado
    echo.
    echo Por favor instala Node.js desde: https://nodejs.org/
    echo Descarga la version LTS y ejecuta el instalador.
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js detectado
node --version
echo.

:: Verificar si npm esta disponible
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm NO esta disponible
    pause
    exit /b 1
)

echo [OK] npm detectado
npm --version
echo.

echo ========================================
echo   Instalando dependencias...
echo ========================================
echo.
echo Esto puede tardar algunos minutos...
echo.

npm install

if errorlevel 1 (
    echo.
    echo [ERROR] Hubo un problema al instalar las dependencias
    echo Verifica tu conexion a internet e intenta de nuevo.
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   INSTALACION COMPLETADA
echo ========================================
echo.
echo El sistema esta listo para usar!
echo.
echo Para iniciar el servidor, ejecuta: INICIAR-SERVIDOR.bat
echo O desde la consola: npm start
echo.
echo Credenciales de admin:
echo   Usuario: admin
echo   Contraseña: admin123
echo.
pause
