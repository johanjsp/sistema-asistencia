# 📦 Guía de Instalación - Sistema de Asistencia

## Guía completa para instalar el sistema en otro computador

---

## 📋 Prerrequisitos

### 1. Instalar Node.js

**Descargar Node.js:**
- Ve a: https://nodejs.org/
- Descarga la versión **LTS** (recomendada)
- Ejecuta el instalador
- Sigue los pasos del instalador (acepta todas las opciones por defecto)

**Verificar instalación:**
Abre PowerShell o CMD y ejecuta:
```bash
node --version
npm --version
```

Deberías ver las versiones instaladas (ejemplo: v18.x.x y 9.x.x)

---

## 📂 Paso 1: Copiar los Archivos

### Opción A: Copiar la carpeta completa

**En este PC (origen):**
1. Copia toda la carpeta `Biometrico Cresco`
2. Pégala en una USB o compártela por red

**En el nuevo PC (destino):**
1. Pega la carpeta en la ubicación deseada
   - Ejemplo: `C:\Biometrico Cresco` o `D:\Biometrico Cresco`

### Opción B: Copiar solo archivos necesarios

**Archivos y carpetas que DEBES copiar:**
```
Biometrico Cresco/
├── public/              (toda la carpeta)
├── server.js
├── database.js
├── package.json
├── .gitignore
└── README.md
```

**Archivos que NO necesitas copiar:**
- `node_modules/` (se reinstalará)
- `asistencia.db` (se creará automáticamente)
- `package-lock.json` (se generará automáticamente)

---

## 🔧 Paso 2: Instalar Dependencias

**En el nuevo PC:**

1. Abre PowerShell o CMD
2. Navega a la carpeta del proyecto:
   ```powershell
   cd "C:\Biometrico Cresco"
   ```
   *(Ajusta la ruta según donde copiaste la carpeta)*

3. Instala las dependencias:
   ```powershell
   npm install
   ```

**Esto instalará:**
- Express (servidor web)
- SQLite3 (base de datos)
- bcryptjs (encriptación de contraseñas)
- jsonwebtoken (autenticación)
- body-parser (manejo de datos)
- cors (seguridad)

⏱️ **Tiempo estimado:** 2-5 minutos

---

## ▶️ Paso 3: Iniciar el Sistema

### Primera vez:

```powershell
npm start
```

Deberías ver en la consola:
```
Conectado a la base de datos SQLite
Tabla usuarios lista
Tabla asistencias lista
Usuario admin creado (usuario: admin, contraseña: admin123)
Servidor corriendo en http://localhost:3000
```

### Abrir en el navegador:

Abre tu navegador (Chrome, Edge, Firefox) y ve a:
```
http://localhost:3000
```

---

## 👤 Paso 4: Primer Acceso

### Credenciales de Administrador:

- **Usuario:** `admin`
- **Contraseña:** `admin123`

### Crear trabajadores:

1. En la página de login, click en "Regístrate aquí"
2. Cada trabajador crea su propia cuenta
3. O desde el panel de admin puedes crear usuarios

---

## 🔒 Paso 5: Seguridad (IMPORTANTE)

### Cambiar contraseña del admin:

**Opción 1: Editar el código (antes de crear la base de datos)**

Edita el archivo `database.js` en la línea 62:
```javascript
const adminPassword = 'admin123'; // ← Cambia esto
```

Luego:
1. Elimina `asistencia.db` (si existe)
2. Reinicia el servidor

**Opción 2: Cambiar después (recomendado para producción)**

Implementar una función de cambio de contraseña en el sistema.

---

## 🌐 Configuración de Red (Opcional)

### Para acceder desde otros dispositivos en la misma red:

1. Edita `server.js` línea 9:
   ```javascript
   const PORT = 3000; // Puedes cambiar el puerto si es necesario
   ```

2. Inicia el servidor
3. Obtén la IP local de tu PC:
   ```powershell
   ipconfig
   ```
   Busca "Dirección IPv4" (ejemplo: 192.168.1.100)

4. En otros dispositivos, abre:
   ```
   http://192.168.1.100:3000
   ```

---

## 🛠️ Comandos Útiles

### Iniciar el servidor:
```powershell
npm start
```

### Detener el servidor:
Presiona `Ctrl + C` en la terminal

### Reiniciar desde cero (eliminar base de datos):
```powershell
Remove-Item asistencia.db
npm start
```

### Ver el contenido de la base de datos:
Puedes usar cualquier visor de SQLite:
- DB Browser for SQLite (https://sqlitebrowser.org/)
- DBeaver
- O cualquier otro cliente SQLite

---

## ❌ Solución de Problemas

### Error: "node no se reconoce como comando"
**Solución:** Node.js no está instalado o no está en el PATH
- Reinstala Node.js
- Reinicia el PC

### Error: "Cannot find module 'express'"
**Solución:** Las dependencias no están instaladas
```powershell
npm install
```

### Error: "Port 3000 already in use"
**Solución:** Otro programa está usando el puerto 3000
- Cierra el otro programa
- O cambia el puerto en `server.js`

### Error: "ENOENT: no such file or directory"
**Solución:** Estás en la carpeta incorrecta
```powershell
cd "C:\Biometrico Cresco"
```

### La página no carga / Error de conexión
**Solución:**
1. Verifica que el servidor esté corriendo
2. Asegúrate de usar `http://localhost:3000` (no https)
3. Prueba con otro navegador
4. Desactiva temporalmente el antivirus/firewall

### El logo no aparece
**Solución:** Verifica que exista la carpeta `public/img/` con el archivo `logocolor.png`

### Los usuarios creados desaparecen
**Solución:** No elimines el archivo `asistencia.db`

---

## 📊 Estructura de la Base de Datos

El sistema crea automáticamente 2 tablas:

### Tabla: usuarios
```sql
- id (identificador único)
- username (nombre de usuario)
- password_hash (contraseña encriptada)
- nombre (nombre completo)
- rol (admin o trabajador)
- fecha_creacion (fecha de registro)
```

### Tabla: asistencias
```sql
- id (identificador único)
- usuario_id (referencia al usuario)
- tipo (entrada o salida)
- timestamp (fecha y hora exacta)
```

---

## 🔄 Actualizar el Sistema

Si haces cambios en el código:

1. Detén el servidor (`Ctrl + C`)
2. Guarda los cambios
3. Reinicia el servidor (`npm start`)

Si actualizas dependencias:
```powershell
npm update
```

---

## 💾 Respaldo de Datos

### Hacer respaldo:

Copia el archivo `asistencia.db` a un lugar seguro:
```powershell
Copy-Item asistencia.db C:\Respaldos\asistencia_backup.db
```

### Restaurar respaldo:

Copia el archivo de respaldo a la carpeta del proyecto:
```powershell
Copy-Item C:\Respaldos\asistencia_backup.db asistencia.db
```

---

## ⚙️ Ejecutar como Servicio (Opcional)

Para que el sistema inicie automáticamente con Windows:

### Opción 1: PM2 (Recomendado)
```powershell
npm install -g pm2
pm2 start server.js --name "asistencia"
pm2 save
pm2 startup
```

### Opción 2: NSSM (Windows Service)
Descarga NSSM y configúralo como servicio de Windows.

---

## 📞 Soporte

### Verificar versiones:
```powershell
node --version
npm --version
```

### Logs del sistema:
El servidor muestra logs en la consola. Si hay errores, léelos cuidadosamente.

---

## ✅ Checklist de Instalación

- [ ] Node.js instalado y verificado
- [ ] Carpeta del proyecto copiada
- [ ] `npm install` ejecutado sin errores
- [ ] Servidor iniciado correctamente
- [ ] Base de datos creada (aparece `asistencia.db`)
- [ ] Usuario admin creado
- [ ] Página accesible en `http://localhost:3000`
- [ ] Login con admin funciona
- [ ] Registro de trabajadores funciona
- [ ] Marcado de entrada/salida funciona
- [ ] Panel de admin accesible
- [ ] Generación de reportes funciona

---

## 🎯 Recomendaciones Finales

1. **Guarda respaldos regulares** del archivo `asistencia.db`
2. **Cambia la contraseña del admin** en producción
3. **Usa HTTPS** si vas a exponerlo a internet (requiere configuración adicional)
4. **Actualiza Node.js** periódicamente para seguridad
5. **Documenta** cualquier cambio que hagas al sistema

---

## 📱 Acceso desde Dispositivos Móviles

El sistema es compatible con navegadores móviles:
1. Conecta el móvil a la misma red WiFi
2. Abre el navegador
3. Ingresa la IP del servidor: `http://192.168.X.X:3000`

---

**¡Instalación completa! El sistema está listo para usar.** 🎉

Para más información, consulta el archivo `README.md`
