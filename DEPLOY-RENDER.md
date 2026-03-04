# 🚀 Guía de Despliegue en Render

Esta guía te ayudará a desplegar tu Sistema de Asistencia en Render de forma gratuita.

## 📋 Requisitos Previos

1. Una cuenta en GitHub (https://github.com)
2. Una cuenta en Render (https://render.com) - puedes registrarte con tu cuenta de GitHub

## 🔧 Paso 1: Subir el Código a GitHub

### Opción A: Usando Git desde la línea de comandos

1. **Inicializa Git en tu proyecto** (si aún no lo has hecho):
   ```bash
   cd "d:\Biometrico Cresco"
   git init
   ```

2. **Agrega todos los archivos**:
   ```bash
   git add .
   ```

3. **Haz el primer commit**:
   ```bash
   git commit -m "Sistema de asistencia completo"
   ```

4. **Crea un repositorio en GitHub**:
   - Ve a https://github.com/new
   - Nombre: `sistema-asistencia`
   - Deja todo lo demás por defecto
   - Click en "Create repository"

5. **Conecta tu proyecto local con GitHub**:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/sistema-asistencia.git
   git branch -M main
   git push -u origin main
   ```
   (Reemplaza `TU-USUARIO` con tu nombre de usuario de GitHub)

### Opción B: Usando GitHub Desktop

1. Descarga GitHub Desktop: https://desktop.github.com/
2. Instala y abre GitHub Desktop
3. Click en "File" → "Add local repository"
4. Selecciona la carpeta `d:\Biometrico Cresco`
5. Click en "Publish repository"
6. Marca como "Private" si quieres que sea privado
7. Click en "Publish Repository"

## 🌐 Paso 2: Desplegar en Render

1. **Ve a Render**:
   - Abre https://render.com
   - Inicia sesión o regístrate (recomiendo usar "Sign in with GitHub")

2. **Crea un nuevo Web Service**:
   - Click en "New +" en la esquina superior derecha
   - Selecciona "Web Service"

3. **Conecta tu repositorio**:
   - Autoriza a Render para acceder a tus repositorios de GitHub
   - Busca y selecciona el repositorio `sistema-asistencia`
   - Click en "Connect"

4. **Configura el servicio**:
   
   **Name**: `sistema-asistencia` (o el nombre que prefieras)
   
   **Region**: Selecciona la región más cercana (ejemplo: Oregon, USA)
   
   **Branch**: `main`
   
   **Root Directory**: Déjalo vacío
   
   **Runtime**: `Node`
   
   **Build Command**: 
   ```
   npm install
   ```
   
   **Start Command**: 
   ```
   npm start
   ```
   
   **Plan**: Selecciona **"Free"** (gratis)

5. **Variables de entorno** (Advanced → Environment Variables):
   
   Click en "Add Environment Variable" y agrega:
   
   - **Key**: `NODE_VERSION`
     **Value**: `18`
   
   - **Key**: `SECRET_KEY`
     **Value**: `tu-clave-super-secreta-2024-cambiar-por-algo-aleatorio`
     (Genera una clave aleatoria y segura)

6. **Click en "Create Web Service"**

## ⏳ Paso 3: Esperar el Despliegue

Render comenzará a:
1. Clonar tu repositorio
2. Instalar las dependencias (`npm install`)
3. Iniciar el servidor (`npm start`)

Esto toma aproximadamente **2-5 minutos**. Verás los logs en tiempo real.

Cuando veas el mensaje:
```
✅ Servidor corriendo en puerto XXXX
✅ Base de datos inicializada correctamente
✅ Usuario admin creado
```

¡Tu aplicación está lista!

## 🌍 Paso 4: Acceder a tu Aplicación

1. **URL de tu aplicación**:
   Render te asignará una URL como:
   ```
   https://sistema-asistencia-XXXX.onrender.com
   ```

2. **Primer acceso**:
   - Abre la URL en tu navegador
   - Verás la página de login
   - Usuario: `admin`
   - Contraseña: `admin123`

3. **¡IMPORTANTE! Cambia la contraseña del admin**:
   Por seguridad, cambia la contraseña por defecto inmediatamente.

## 📱 Acceso desde Cualquier Dispositivo

Ahora tu sistema está en Internet y puedes acceder desde:
- ✅ Cualquier computadora
- ✅ Teléfonos móviles
- ✅ Tablets
- ✅ Desde cualquier lugar con Internet

Solo necesitas compartir la URL: `https://tu-app.onrender.com`

## 💾 Sobre la Base de Datos

### ⚠️ IMPORTANTE - Limitación del Plan Gratuito:

En el plan gratuito de Render:
- **El disco es temporal** (ephemeral storage)
- **La base de datos SQLite puede perderse** cuando el servidor se reinicia por inactividad
- Render apaga tu servicio después de **15 minutos de inactividad**
- Al volver a activarse, los datos pueden haberse perdido

### 🔄 Soluciones:

#### Opción 1: Actualizar a Plan Pagado ($7/mes)
- Disco persistente garantizado
- Servidor siempre activo
- No pierde datos

#### Opción 2: Usar Base de Datos Externa (Gratis)
Puedo modificar el código para usar PostgreSQL en lugar de SQLite:
- Render ofrece PostgreSQL gratis
- Los datos se mantienen permanentemente
- Requiere pequeños cambios en el código

#### Opción 3: Sistema de Respaldo Automático
Puedo agregar un sistema que:
- Envíe respaldos diarios por email
- Suba respaldos a Google Drive
- Restaure automáticamente al reiniciar

### 🎯 Recomendación para Producción:

Para un negocio real, te recomiendo:
1. **Opción 1**: Plan de $7/mes de Render (más simple, disco persistente)
2. **O usar PostgreSQL gratis** (requiere cambios de código)

## 🔧 Mantenimiento

### Actualizar la Aplicación:

Cuando hagas cambios en tu código local:

1. **Haz commit de los cambios**:
   ```bash
   git add .
   git commit -m "Descripción de cambios"
   git push
   ```

2. **Render desplegará automáticamente** los cambios
   - Toma 2-3 minutos
   - Verás el progreso en el Dashboard

### Ver Logs:

En el Dashboard de Render:
- Click en tu servicio
- Click en "Logs" en el menú izquierdo
- Verás logs en tiempo real

### Reiniciar el Servicio:

Si algo falla:
- Click en "Manual Deploy" → "Clear build cache & deploy"

## 🔒 Seguridad

### Cambios Recomendados:

1. **Cambiar contraseña del admin**:
   - Inicia sesión con admin/admin123
   - Ve a configuración (si agregamos esa función)
   - O modifica directamente en la base de datos

2. **Generar SECRET_KEY segura**:
   En las variables de entorno de Render, usa algo como:
   ```
   aB3$xZ9@mK7!pQ2#vN5&wR8*uY4^tL6
   ```

3. **Considerar HTTPS**:
   - Render proporciona HTTPS automáticamente ✅
   - Tu aplicación ya es segura por defecto

## 📊 Monitoreo

Render ofrece:
- **Métricas de uso**: CPU, memoria, requests
- **Logs en tiempo real**
- **Alertas por email** (en planes pagados)

## 🆘 Solución de Problemas

### Error: "Application failed to respond"
- Verifica que el puerto sea dinámico: `process.env.PORT`
- Revisa los logs para ver el error específico

### Error: "Build failed"
- Verifica que `package.json` esté correcto
- Asegúrate de que todas las dependencias estén listadas

### La aplicación se ve mal o no carga
- Verifica que la carpeta `public/` esté en el repositorio
- Revisa la consola del navegador (F12) para ver errores

### Base de datos vacía después de reinicio
- Es normal en el plan gratuito
- Considera migrar a PostgreSQL (gratis) o plan pagado

## 💡 Siguientes Pasos

¿Quieres mejorar tu sistema? Puedo ayudarte con:

1. **Migrar a PostgreSQL** (datos persistentes gratis)
2. **Sistema de respaldos automáticos**
3. **Notificaciones por email**
4. **Exportar reportes a Excel**
5. **App móvil dedicada**
6. **Dominio personalizado** (ejemplo.com en lugar de .onrender.com)

## 📞 ¿Necesitas Ayuda?

Si tienes algún problema durante el despliegue, déjame saber en qué paso estás y qué error ves.

---

**¡Tu sistema de asistencia ya está listo para usarse en producción! 🎉**
