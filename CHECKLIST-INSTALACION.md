# 📋 CHECKLIST DE TRANSFERENCIA

## Proceso completo para instalar en otro PC

---

## 🎯 ANTES DE TRANSFERIR

### En el PC Actual:

- [ ] Verificar que el sistema funciona correctamente
- [ ] Hacer un respaldo final (ejecutar RESPALDO.bat)
- [ ] Anotar cualquier configuración especial
- [ ] Preparar credenciales de admin

### Preparar Archivos:

- [ ] Eliminar carpeta `node_modules/` (se reinstalará)
- [ ] Eliminar archivo `asistencia.db` (opcional)
- [ ] Verificar que exista carpeta `public/` completa
- [ ] Verificar que existan: server.js, database.js, package.json
- [ ] Incluir archivos .bat para facilitar instalación

---

## 📦 DURANTE LA TRANSFERENCIA

### Método de Copia:

- [ ] **Opción A:** Copiar a USB
- [ ] **Opción B:** Compartir por red
- [ ] **Opción C:** Comprimir en ZIP y transferir

### Archivos a Copiar:

#### ✅ COPIAR ESTOS:
- [ ] Carpeta `public/` (9 archivos)
- [ ] `server.js`
- [ ] `database.js`
- [ ] `package.json`
- [ ] `INSTALAR.bat`
- [ ] `INICIAR-SERVIDOR.bat`
- [ ] `RESPALDO.bat`
- [ ] `REINICIAR-SISTEMA.bat`
- [ ] `GUIA-INSTALACION.md`
- [ ] `LEEME-PRIMERO.txt`
- [ ] `README.md`
- [ ] `.gitignore`

#### ❌ NO COPIAR:
- [ ] `node_modules/` (carpeta grande, ~150MB)
- [ ] `asistencia.db` (se crea nuevo)
- [ ] `package-lock.json` (se genera auto)

---

## 💻 EN EL PC NUEVO

### Paso 1: Prerrequisitos

- [ ] Instalar Node.js desde https://nodejs.org/ (versión LTS)
- [ ] Reiniciar el PC después de instalar Node.js
- [ ] Verificar instalación: abrir CMD y ejecutar `node --version`
- [ ] Verificar npm: ejecutar `npm --version`

### Paso 2: Copiar Archivos

- [ ] Copiar carpeta a ubicación deseada (ej: C:\Biometrico Cresco)
- [ ] Verificar que todos los archivos se copiaron correctamente
- [ ] Verificar que carpeta `public/img/` tenga el logo

### Paso 3: Instalación

- [ ] Abrir la carpeta del proyecto
- [ ] Ejecutar `INSTALAR.bat` (doble clic)
  - O abrir CMD en la carpeta y ejecutar: `npm install`
- [ ] Esperar a que termine la instalación (2-5 minutos)
- [ ] Verificar que se creó carpeta `node_modules/`
- [ ] Verificar que no hubo errores en la instalación

### Paso 4: Primera Ejecución

- [ ] Ejecutar `INICIAR-SERVIDOR.bat` (doble clic)
  - O abrir CMD y ejecutar: `npm start`
- [ ] Esperar a ver mensaje: "Servidor corriendo en http://localhost:3000"
- [ ] Verificar que se creó archivo `asistencia.db`
- [ ] Verificar mensaje: "Usuario admin creado"

### Paso 5: Pruebas

- [ ] Abrir navegador (Chrome, Edge, Firefox)
- [ ] Ir a: `http://localhost:3000`
- [ ] Página de login carga correctamente
- [ ] Logo aparece en la página
- [ ] Reloj funciona y se actualiza
- [ ] Login con admin/admin123 funciona
- [ ] Redirige al panel de administración
- [ ] Estadísticas muestran valores (0s al inicio)

### Paso 6: Verificación Completa

#### Funciones de Trabajador:
- [ ] Click en "Regístrate aquí"
- [ ] Crear cuenta de prueba
- [ ] Iniciar sesión con cuenta nueva
- [ ] Click en "Marcar Entrada"
- [ ] Mensaje "Gracias has llegado" aparece
- [ ] Sistema desloguea automáticamente
- [ ] Iniciar sesión nuevamente
- [ ] Click en "Marcar Salida"
- [ ] Mensaje "Gracias, que tengas buen día" aparece
- [ ] Sistema desloguea automáticamente

#### Funciones de Administrador:
- [ ] Iniciar sesión como admin
- [ ] Panel de administración carga correctamente
- [ ] Estadísticas muestran valores actualizados
- [ ] Tabla de asistencias muestra registros
- [ ] Filtros funcionan (por fecha, por usuario)
- [ ] Click en "Generar Reporte"
- [ ] Seleccionar fechas
- [ ] Click en "Generar e Imprimir"
- [ ] Ventana de impresión se abre
- [ ] Reporte muestra datos correctamente

---

## 🔧 CONFIGURACIÓN ADICIONAL (Opcional)

### Acceso desde Red Local:

- [ ] En el servidor, abrir CMD
- [ ] Ejecutar: `ipconfig`
- [ ] Anotar "Dirección IPv4" (ej: 192.168.1.100)
- [ ] En otro dispositivo, abrir navegador
- [ ] Ir a: `http://[IP]:3000` (ej: http://192.168.1.100:3000)
- [ ] Verificar que funciona desde otro dispositivo

### Configurar Firewall:

- [ ] Permitir conexiones al puerto 3000 (si es necesario)
- [ ] Configurar router para port forwarding (si acceso externo)

### Seguridad:

- [ ] Cambiar contraseña del admin en `database.js` línea 62
- [ ] Eliminar `asistencia.db` y reiniciar
- [ ] Cambiar SECRET_KEY en `server.js` línea 10
- [ ] Anotar nuevas credenciales en lugar seguro

---

## 💾 DESPUÉS DE LA INSTALACIÓN

### Respaldos:

- [ ] Ejecutar `RESPALDO.bat` para crear primer respaldo
- [ ] Programar respaldos regulares (diario/semanal)
- [ ] Guardar respaldos en ubicación segura

### Documentación:

- [ ] Anotar ubicación de instalación
- [ ] Anotar credenciales (en lugar seguro)
- [ ] Anotar fecha de instalación
- [ ] Documentar cualquier problema encontrado

### Capacitación:

- [ ] Capacitar a usuarios en cómo registrarse
- [ ] Explicar cómo marcar entrada/salida
- [ ] Capacitar a admin en panel de administración
- [ ] Explicar cómo generar reportes

---

## ❌ SOLUCIÓN DE PROBLEMAS

### Si algo no funciona:

- [ ] Verificar que Node.js esté instalado (`node --version`)
- [ ] Verificar que npm esté disponible (`npm --version`)
- [ ] Verificar que `node_modules/` exista
- [ ] Verificar que servidor esté corriendo
- [ ] Revisar mensajes de error en la consola
- [ ] Consultar GUIA-INSTALACION.md sección "Solución de Problemas"
- [ ] Reiniciar el servidor
- [ ] Reiniciar el PC (última opción)

### Errores Comunes:

- [ ] "node no se reconoce" → Reinstalar Node.js y reiniciar PC
- [ ] "Cannot find module" → Ejecutar `npm install` de nuevo
- [ ] "Port already in use" → Cerrar otros programas o cambiar puerto
- [ ] "ENOENT" → Verificar que estás en la carpeta correcta
- [ ] Logo no aparece → Verificar `public/img/logocolor.png`

---

## ✅ VERIFICACIÓN FINAL

### Sistema Funcionando Correctamente Si:

- [ ] ✅ Servidor inicia sin errores
- [ ] ✅ Base de datos se crea automáticamente
- [ ] ✅ Usuario admin existe
- [ ] ✅ Página accesible en navegador
- [ ] ✅ Login funciona
- [ ] ✅ Registro de trabajadores funciona
- [ ] ✅ Entrada/Salida funcionan
- [ ] ✅ Panel admin accesible
- [ ] ✅ Reportes se generan
- [ ] ✅ Logo aparece
- [ ] ✅ Colores correctos (#1D0C4F, #7DC3FD, #F4F48C)
- [ ] ✅ Reloj se actualiza en tiempo real

---

## 📞 DATOS IMPORTANTES

### Credenciales por Defecto:
```
Usuario: admin
Contraseña: admin123
```

### Acceso:
```
http://localhost:3000
```

### Ubicación de Datos:
```
Base de datos: asistencia.db
Respaldos: Respaldos/
```

### Versión de Node.js Recomendada:
```
Node.js: v18.x o superior (LTS)
npm: v9.x o superior
```

---

**✨ INSTALACIÓN COMPLETADA EXITOSAMENTE ✨**

Fecha de instalación: _______________
Instalado por: _______________
Ubicación: _______________
Notas adicionales: _______________

---

**Archivos de ayuda:**
- `LEEME-PRIMERO.txt` - Guía rápida
- `GUIA-INSTALACION.md` - Guía detallada
- `README.md` - Documentación del proyecto
- `LISTA-ARCHIVOS.md` - Qué archivos copiar
