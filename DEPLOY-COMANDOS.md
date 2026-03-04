# ⚡ Deploy Rápido - Comandos

## ✅ Sistema actualizado con PostgreSQL

Tu sistema ahora usa **PostgreSQL** (datos permanentes) en lugar de SQLite.

**Ventaja**: Los datos NUNCA se pierden, incluso en plan gratuito.

---

## 1️⃣ Subir a GitHub (Primera vez)

```bash
cd "d:\Biometrico Cresco"
git init
git add .
git commit -m "Sistema de asistencia con PostgreSQL"
git remote add origin https://github.com/TU-USUARIO/sistema-asistencia.git
git branch -M main
git push -u origin main
```

## 2️⃣ Deploy en Render (AUTOMÁTICO con Blueprint)

**Método recomendado** - Render crea todo automáticamente:

1. Ve a https://render.com
2. Click "New +" → **"Blueprint"**
3. Selecciona tu repositorio `sistema-asistencia`
4. Click "Apply"

**Render creará automáticamente**:
- ✅ Base de datos PostgreSQL (gratis)
- ✅ Web Service con tu app
- ✅ Todas las configuraciones

**Espera 3-5 minutos** y estará listo.

---

### Método Manual (Alternativo)

Si prefieres hacerlo paso a paso:

**Paso 1: Crear PostgreSQL Database**
```
New + → PostgreSQL
Name: asistencia-db
Plan: Free
```

**Paso 2: Crear Web Service**
```
Name: sistema-asistencia
Runtime: Node
Build Command: npm install
Start Command: npm start
Plan: Free

Environment Variables:
- NODE_VERSION = 18
- SECRET_KEY = (genera una clave aleatoria segura)
- NODE_ENV = production
- DATABASE_URL = (conectar con la base de datos creada)
```

---

## 3️⃣ Actualizar después de cambios

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

Render desplegará automáticamente.

## 4️⃣ Tu URL

```
https://sistema-asistencia-XXXX.onrender.com
```

Login inicial:
- Usuario: admin
- Contraseña: admin123

---

## ✅ Checklist de Deploy

- [ ] Cuenta de GitHub creada
- [ ] Código subido a GitHub
- [ ] Cuenta de Render creada
- [ ] **Blueprint aplicado** o servicios creados manualmente
- [ ] **PostgreSQL Database creada** (automático con Blueprint)
- [ ] **Web Service creado** (automático con Blueprint)
- [ ] Deploy completado (ver logs en Render)
- [ ] Ver mensaje: `✅ Conectado a PostgreSQL (Producción)`
- [ ] Aplicación accesible en navegador
- [ ] Login funciona correctamente
- [ ] Contraseña de admin cambiada
- [ ] URL compartida con el equipo

---

## 📊 Ventajas de PostgreSQL

✅ **Datos permanentes** (nunca se pierden)  
✅ **Gratis en Render**  
✅ **Backups automáticos**  
✅ **Mejor rendimiento con múltiples usuarios**

En tu PC sigue usando SQLite (más simple para desarrollo).

---

## 📚 Documentación Completa

- **DEPLOY-RENDER.md** - Guía paso a paso completa
- **POSTGRESQL.md** - Todo sobre la migración a PostgreSQL
- **GUIA-INSTALACION.md** - Instalación local en otra PC

---

**¡Tu sistema está listo para producción con datos permanentes! 🎉**
