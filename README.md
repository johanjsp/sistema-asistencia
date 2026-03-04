# Sistema de Asistencia

Sistema de registro de asistencia con marcado de entrada y salida, con autenticación de usuarios y panel de administración.

## Características

- ✅ Registro de usuarios
- 🔐 Autenticación con JWT
- ⏱️ Reloj en tiempo real
- 📝 Registro de entrada y salida
- 📊 Historial de asistencias
- 🔄 Deslogueo automático después de marcar asistencia
- 👨‍💼 **Panel de Administración**
- 📈 **Estadísticas en tiempo real**
- 🖨️ **Generación de reportes imprimibles**
- 🔍 **Filtros avanzados por fecha y usuario**

## Tecnologías

- **Backend**: Node.js, Express
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Autenticación**: JWT (JSON Web Tokens)
- **Base de datos**: 
  - SQLite3 (desarrollo local)
  - PostgreSQL (producción en Render)
- **Deploy**: Render (con Blueprint automático)

## Instalación

### Instalación Local (Este PC)

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar el servidor:
```bash
npm start
```

3. Abrir el navegador en: `http://localhost:3000`

### Instalación en Otro PC

📖 **Guía Rápida:** Lee el archivo `LEEME-PRIMERO.txt`  
📖 **Guía Completa:** Lee el archivo `GUIA-INSTALACION.md`

**Pasos Rápidos:**
1. Instalar Node.js en el nuevo PC (https://nodejs.org/)
2. Copiar la carpeta del proyecto al nuevo PC
3. Ejecutar `INSTALAR.bat` (o `npm install`)
4. Ejecutar `INICIAR-SERVIDOR.bat` (o `npm start`)

**Archivos necesarios para copiar:**
- Carpeta `public/` (completa)
- `server.js`, `database.js`, `package.json`
- Archivos `.bat` (opcional, facilitan la instalación)

**NO copiar:**
- `node_modules/` (se reinstala automáticamente)
- `asistencia.db` (se crea nuevo en cada PC)

### Deploy en Render (Producción en Internet)

🚀 **Para poner tu sistema en Internet con datos permanentes:**

1. **Lee la guía rápida:** `DEPLOY-COMANDOS.md`
2. **O la guía completa:** `DEPLOY-RENDER.md`

**Pasos básicos:**
```bash
# 1. Subir a GitHub
git init
git add .
git commit -m "Sistema de asistencia"
git push

# 2. En Render: New + → Blueprint
# 3. Seleccionar tu repositorio
# 4. ¡Listo! Tu app estará en https://tu-app.onrender.com
```

**Ventajas del deploy:**
- ✅ Base de datos PostgreSQL (datos permanentes)
- ✅ Acceso desde cualquier dispositivo con Internet
- ✅ Gratis en plan básico
- ✅ HTTPS automático (seguro)
- ✅ Backups automáticos

📖 **Más info:** Lee [POSTGRESQL.md](POSTGRESQL.md) para entender la migración automática.

---

## Modo desarrollo

Para desarrollo con reinicio automático:
```bash
npm run dev
```

## Uso

### Para Trabajadores:

1. **Registro**: Crear una cuenta nueva con nombre, usuario y contraseña
2. **Login**: Iniciar sesión con las credenciales
3. **Marcar Entrada**: Click en "Marcar Entrada" al llegar → mensaje de bienvenida → deslogueo automático
4. **Marcar Salida**: Login nuevamente → Click en "Marcar Salida" → mensaje de despedida → deslogueo automático

### Para Administradores:

**Credenciales por defecto:**
- Usuario: `admin`
- Contraseña: `admin123`

**Funcionalidades del Panel de Admin:**
- 📊 **Dashboard con estadísticas en tiempo real**:
  - Total de trabajadores
  - Registros del día
  - Entradas del día
  - Salidas del día

- 🔍 **Filtros avanzados**:
  - Filtrar por fecha específica
  - Filtrar por usuario
  - Ver todos los registros

- 📋 **Tabla de asistencias completa**:
  - Ver todas las entradas y salidas
  - Información detallada de cada registro
  - Ordenadas por fecha/hora

- 🖨️ **Generación de reportes**:
  - Seleccionar rango de fechas
  - Filtrar por usuario específico o todos
  - Generar reporte imprimible en formato profesional
  - Impresión directa o guardar como PDF

## Estructura del Proyecto

```
sistema-asistencia/
├── server.js                  # Servidor Express con API
├── database.js                # Configuración dual SQLite/PostgreSQL
├── package.json               # Dependencias
├── render.yaml                # Configuración automática de Render
├── asistencia.db              # Base de datos SQLite (solo local)
├── DEPLOY-RENDER.md           # Guía completa de deploy
├── DEPLOY-COMANDOS.md         # Comandos rápidos de deploy
├── POSTGRESQL.md              # Documentación de PostgreSQL
├── GUIA-INSTALACION.md        # Guía de instalación local
└── public/
    ├── index.html             # Página de login
    ├── register.html          # Página de registro
    ├── dashboard.html         # Dashboard de trabajadores
    ├── admin.html             # Panel de administración
    ├── config.js              # Configuración dinámica de URLs
    ├── style.css              # Estilos generales
    ├── admin-style.css        # Estilos del panel de admin
    └── img/                   # Imágenes y logos
        ├── logocolor.png
        └── logoblanca.png
```

## API Endpoints

### Públicos:
- `POST /api/register` - Registrar nuevo usuario
- `POST /api/login` - Iniciar sesión

### Trabajadores (requiere autenticación):
- `POST /api/entrada` - Marcar entrada
- `POST /api/salida` - Marcar salida
- `GET /api/mis-asistencias` - Obtener historial personal

### Administradores (requiere autenticación y rol admin):
- `GET /api/admin/usuarios` - Obtener todos los usuarios
- `GET /api/admin/asistencias` - Obtener todas las asistencias (con filtros)
- `GET /api/admin/resumen` - Obtener resumen de asistencias
- `GET /api/admin/estadisticas` - Obtener estadísticas generales

## Roles de Usuario

- **trabajador**: Rol por defecto, puede marcar entrada/salida y ver su historial
- **admin**: Acceso al panel de administración con todas las funcionalidades

## Seguridad

- Contraseñas hasheadas con bcryptjs
- Autenticación basada en JWT
- Middleware de verificación de roles
- Protección de endpoints sensibles

## Notas Importantes

⚠️ **Cambiar en producción:**
- La clave secreta de JWT (variable `SECRET_KEY` en Render)
- La contraseña del usuario admin
- Utilizar variables de entorno en Render (automático con Blueprint)

💾 **Base de datos:**
- **Desarrollo local**: Usa SQLite automáticamente
- **Producción (Render)**: Usa PostgreSQL automáticamente
- Los datos NO se sincronizan entre ambas
- PostgreSQL mantiene datos permanentes (nunca se pierden)

🔒 **Seguridad en producción:**
- SSL/HTTPS habilitado automáticamente en Render
- Generar SECRET_KEY aleatoria en variables de entorno
- Cambiar contraseña de admin inmediatamente después del primer deploy

## Documentación Adicional

📚 **Guías disponibles:**
- [DEPLOY-RENDER.md](DEPLOY-RENDER.md) - Deploy completo en Render paso a paso
- [DEPLOY-COMANDOS.md](DEPLOY-COMANDOS.md) - Comandos rápidos y checklist
- [POSTGRESQL.md](POSTGRESQL.md) - Migración y uso de PostgreSQL
- [GUIA-INSTALACION.md](GUIA-INSTALACION.md) - Instalación en otro PC
- [LEEME-PRIMERO.txt](LEEME-PRIMERO.txt) - Inicio rápido
- [REQUISITOS-SISTEMA.md](REQUISITOS-SISTEMA.md) - Requisitos mínimos

## Soporte

Para cualquier duda o problema, consulta la documentación o reporta un issue.
