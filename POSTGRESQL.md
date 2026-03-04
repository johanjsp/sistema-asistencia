# 🐘 Migración a PostgreSQL - Sistema de Asistencia

## ✅ ¿Qué se hizo?

Tu sistema ahora soporta **PostgreSQL** en producción y **SQLite** en desarrollo:

### Ventajas de PostgreSQL:
- ✅ **Datos permanentes** (nunca se pierden)
- ✅ **Gratis en Render** (plan gratuito)
- ✅ **Más robusto** para múltiples usuarios
- ✅ **Escalable** para crecer con tu negocio

### Ventajas de mantener SQLite local:
- ✅ **Desarrollo rápido** en tu PC
- ✅ **No requiere instalación** de PostgreSQL local
- ✅ **Portabilidad** para desarrollo offline

---

## 🔄 Cómo Funciona

El sistema **detecta automáticamente** dónde está corriendo:

### En tu PC (desarrollo):
```
DATABASE_URL no existe → Usa SQLite (asistencia.db)
✅ Conectado a SQLite (Desarrollo Local)
```

### En Render (producción):
```
DATABASE_URL existe → Usa PostgreSQL
✅ Conectado a PostgreSQL (Producción)
```

**No necesitas hacer nada especial**, el código elige automáticamente.

---

## 🚀 Deploy en Render con PostgreSQL

### Método 1: Con render.yaml (Automático - Recomendado)

El archivo `render.yaml` ya está configurado. Solo necesitas:

1. **Sube tu código a GitHub** (igual que antes):
   ```bash
   git add .
   git commit -m "Migrado a PostgreSQL"
   git push
   ```

2. **En Render Dashboard**:
   - Click "New +" → "Blueprint"
   - Selecciona tu repositorio
   - Click "Apply"
   
3. **Render creará automáticamente**:
   - ✅ Base de datos PostgreSQL (gratis)
   - ✅ Web Service con la aplicación
   - ✅ Conexión automática entre ambos

**¡Listo!** En 3-5 minutos tu app estará funcionando con datos permanentes.

---

### Método 2: Manual (Paso a Paso)

Si prefieres hacerlo manualmente:

#### Paso 1: Crear Base de Datos PostgreSQL

1. En Render Dashboard, click "New +" → "PostgreSQL"
2. Configura:
   - **Name**: `asistencia-db`
   - **Database**: `asistencia_db`
   - **User**: `asistencia_user`
   - **Region**: Same as your web service
   - **Plan**: **Free** ✅
3. Click "Create Database"
4. Espera 1-2 minutos a que esté lista
5. **Copia la "Internal Database URL"** (algo como `postgresql://user:pass@host/db`)

#### Paso 2: Configurar Web Service

1. Ve a tu Web Service existente (o crea uno nuevo)
2. Click en "Environment" en el menú izquierdo
3. Agrega las variables de entorno:

   ```
   NODE_VERSION = 18
   SECRET_KEY = (genera-una-clave-aleatoria-segura)
   NODE_ENV = production
   DATABASE_URL = (pega la Internal Database URL que copiaste)
   ```

4. Click "Save Changes"
5. El servicio se reiniciará automáticamente

#### Paso 3: Verificar

Abre los logs de tu Web Service. Deberías ver:

```
✅ Conectado a PostgreSQL (Producción)
✅ Tabla usuarios lista
✅ Tabla asistencias lista
✅ Usuario admin creado (usuario: admin, contraseña: admin123)
```

**¡Listo!** Tu sistema ahora usa PostgreSQL permanente.

---

## 🧪 Probar Localmente

Para probar que todo funciona en tu PC:

1. **Sin hacer nada** (sigue usando SQLite):
   ```bash
   npm start
   ```
   Verás: `✅ Conectado a SQLite (Desarrollo Local)`

2. **Forzar PostgreSQL local** (opcional, para testing):
   Necesitas PostgreSQL instalado localmente, luego:
   ```bash
   set DATABASE_URL=postgresql://localhost/asistencia_test
   npm start
   ```

---

## 📊 Comparación: SQLite vs PostgreSQL

| Característica | SQLite (Local) | PostgreSQL (Render) |
|---------------|----------------|---------------------|
| **Persistencia** | ✅ Permanente en tu PC | ✅ Permanente en la nube |
| **Instalación** | ✅ No requiere nada | ⚠️ Requiere servicio |
| **Múltiples usuarios** | ⚠️ Limitado | ✅ Excelente |
| **Gratis** | ✅ Sí | ✅ Sí |
| **Plan gratuito Render** | ❌ Datos se pierden | ✅ Datos permanentes |
| **Producción** | ❌ No recomendado | ✅ Recomendado |

---

## 🔍 Detalles Técnicos

### Archivos Modificados:

1. **database.js**: 
   - Detecta variable `DATABASE_URL`
   - Crea wrapper para unificar API de SQLite y PostgreSQL
   - Convierte sintaxis SQLite a PostgreSQL automáticamente

2. **package.json**: 
   - Agregada dependencia `pg` (cliente PostgreSQL)

3. **render.yaml**: 
   - Define base de datos PostgreSQL
   - Conecta automáticamente con el web service

### Diferencias de Sintaxis (Automáticas):

```sql
-- SQLite
INTEGER PRIMARY KEY AUTOINCREMENT

-- PostgreSQL (convertido automáticamente)
SERIAL PRIMARY KEY

-- SQLite
DATETIME DEFAULT CURRENT_TIMESTAMP

-- PostgreSQL (convertido automáticamente)
TIMESTAMP DEFAULT NOW()

-- SQLite
TEXT

-- PostgreSQL (convertido automáticamente)
VARCHAR(255)
```

**No necesitas preocuparte por esto**, el código lo maneja automáticamente.

---

## 🔐 Seguridad

### Variables de Entorno Importantes:

```bash
DATABASE_URL       # URL de conexión PostgreSQL (Render la genera automáticamente)
SECRET_KEY         # Para JWT (genera una aleatoria)
NODE_ENV=production # Habilita SSL en PostgreSQL
```

### SSL en Producción:

PostgreSQL en Render requiere SSL. El código lo maneja automáticamente:

```javascript
ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
```

---

## 🛠️ Mantenimiento

### Ver Datos en PostgreSQL:

1. En Render Dashboard, abre tu database
2. Click en "Connect" → "External Connection"
3. Usa herramientas como:
   - **pgAdmin** (GUI completa)
   - **TablePlus** (GUI moderna)
   - **psql** (línea de comandos)

### Backup Manual:

```bash
# En Render, ve a tu database
# Click en "Backups"
# Los backups se hacen automáticamente cada día en el plan gratuito
```

### Migrar Datos de SQLite a PostgreSQL:

Si ya tienes datos en SQLite local y quieres pasarlos a PostgreSQL:

1. **Exporta de SQLite**:
   ```bash
   sqlite3 asistencia.db .dump > backup.sql
   ```

2. **Convierte sintaxis** (reemplaza en backup.sql):
   - `AUTOINCREMENT` → `SERIAL`
   - `DATETIME` → `TIMESTAMP`
   - `TEXT` → `VARCHAR(255)`

3. **Importa a PostgreSQL**:
   ```bash
   psql $DATABASE_URL < backup.sql
   ```

---

## ❓ Preguntas Frecuentes

### ¿Tendré dos bases de datos?

Sí:
- **asistencia.db** (SQLite) en tu PC para desarrollo
- **PostgreSQL** en Render para producción

Son independientes. Los datos NO se sincronizan automáticamente.

### ¿Puedo seguir usando SQLite en producción?

Técnicamente sí, pero **no es recomendado**:
- ❌ Se pierden datos al reiniciar (plan gratuito)
- ❌ No escala bien con múltiples usuarios
- ✅ PostgreSQL es mejor para producción

### ¿Cuánto cuesta PostgreSQL en Render?

- **Plan Free**: Gratis, 1GB storage, 90 días de backups
- **Plan Starter**: $7/mes, 10GB storage, backups ilimitados

Para tu sistema de asistencia, **el plan gratuito es suficiente**.

### ¿Los datos en PostgreSQL se pierden?

**NO**. A diferencia de SQLite en plan gratuito de Render:
- ✅ PostgreSQL mantiene datos permanentemente
- ✅ Incluso si el servidor se apaga por inactividad
- ✅ Backups automáticos diarios

### ¿Necesito instalar PostgreSQL en mi PC?

**NO**. El sistema usa SQLite automáticamente en desarrollo local.

Solo necesitas PostgreSQL en Render (producción), que ya está incluido.

---

## 🎉 Resumen

### Antes (Solo SQLite):
```
❌ Datos se perdían en Render plan gratuito
❌ No recomendado para producción
```

### Ahora (SQLite + PostgreSQL):
```
✅ SQLite en tu PC (desarrollo rápido)
✅ PostgreSQL en Render (producción confiable)
✅ Datos permanentes GRATIS
✅ Cambio automático según el entorno
```

---

## 🚀 Siguiente Paso

**Despliega tu aplicación**:

```bash
git add .
git commit -m "Sistema migrado a PostgreSQL"
git push
```

Luego sigue [DEPLOY-RENDER.md](DEPLOY-RENDER.md) para el deploy completo.

---

## 💡 Soporte

Si tienes problemas:
1. Verifica los logs en Render Dashboard
2. Busca los mensajes de conexión:
   - `✅ Conectado a PostgreSQL` = Todo bien
   - `❌ Error al conectar` = Revisar DATABASE_URL

¿Necesitas ayuda? Dime qué paso te está causando problemas.
