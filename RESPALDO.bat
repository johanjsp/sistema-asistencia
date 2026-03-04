@echo off
echo ========================================
echo   RESPALDO DE BASE DE DATOS
echo ========================================
echo.

if not exist "asistencia.db" (
    echo [ERROR] No existe base de datos para respaldar
    echo Primero inicia el servidor al menos una vez.
    pause
    exit /b 1
)

:: Crear carpeta de respaldos si no existe
if not exist "Respaldos\" (
    mkdir "Respaldos"
)

:: Generar nombre con fecha y hora
set fecha=%date:~-4%%date:~3,2%%date:~0,2%
set hora=%time:~0,2%%time:~3,2%
set hora=%hora: =0%

set archivo_respaldo=Respaldos\asistencia_backup_%fecha%_%hora%.db

echo Creando respaldo...
copy /y "asistencia.db" "%archivo_respaldo%" >nul

if errorlevel 1 (
    echo [ERROR] No se pudo crear el respaldo
    pause
    exit /b 1
)

echo.
echo [OK] Respaldo creado exitosamente!
echo.
echo Archivo: %archivo_respaldo%
echo.
echo Para restaurar este respaldo:
echo 1. Detén el servidor
echo 2. Copia este archivo como "asistencia.db"
echo 3. Reinicia el servidor
echo.
pause
