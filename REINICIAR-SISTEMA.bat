@echo off
echo ========================================
echo   REINICIO COMPLETO DEL SISTEMA
echo ========================================
echo.
echo ADVERTENCIA: Esto eliminara TODOS los datos!
echo - Usuarios registrados
echo - Registros de asistencia
echo - Todo se perdera
echo.
echo Se creara una base de datos nueva con:
echo - Usuario admin (admin / admin123)
echo.
set /p confirmar="Estas seguro? (SI/NO): "

if /i not "%confirmar%"=="SI" (
    echo.
    echo Operacion cancelada.
    pause
    exit /b 0
)

echo.
echo Eliminando base de datos antigua...

if exist "asistencia.db" (
    del /f /q "asistencia.db"
    echo [OK] Base de datos eliminada
) else (
    echo [INFO] No habia base de datos previa
)

echo.
echo Reiniciando servidor...
echo La nueva base de datos se creara automaticamente.
echo.

npm start

pause
