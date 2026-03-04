# 📦 ARCHIVOS PARA TRANSFERIR

## ✅ Archivos NECESARIOS (copiar estos):

```
Biometrico Cresco/
│
├── public/                      ← TODA la carpeta
│   ├── img/
│   │   └── logocolor.png
│   ├── index.html
│   ├── register.html
│   ├── dashboard.html
│   ├── admin.html
│   ├── style.css
│   ├── admin-style.css
│   ├── colors.css
│   └── app.js
│
├── server.js                    ← Archivo principal del servidor
├── database.js                  ← Configuración de base de datos
├── package.json                 ← Lista de dependencias
│
├── INSTALAR.bat                 ← Script de instalación (opcional)
├── INICIAR-SERVIDOR.bat         ← Script para iniciar (opcional)
├── RESPALDO.bat                 ← Script de respaldo (opcional)
├── REINICIAR-SISTEMA.bat        ← Script de reinicio (opcional)
│
├── GUIA-INSTALACION.md          ← Guía completa (documentación)
├── LEEME-PRIMERO.txt            ← Guía rápida (documentación)
├── README.md                    ← Información del proyecto
├── COLORES.md                   ← Documentación de colores
├── INICIO-RAPIDO.md             ← Guía de inicio
│
└── .gitignore                   ← Configuración git (opcional)
```

---

## ❌ Archivos NO NECESARIOS (NO copiar):

```
Biometrico Cresco/
│
├── node_modules/                ← NO copiar (se reinstala)
├── asistencia.db                ← NO copiar (se crea nuevo)
├── package-lock.json            ← NO copiar (se genera auto)
└── Respaldos/                   ← Opcional (solo si necesitas datos)
```

---

## 📊 Tamaño Estimado

**CON node_modules:** ~100-150 MB
**SIN node_modules:** ~500 KB - 1 MB

**Recomendación:** Copia SIN node_modules y ejecuta `npm install` en el nuevo PC.

---

## 📝 Método de Transferencia

### Opción 1: USB (Recomendado)
1. Copiar carpeta completa a USB
2. NO incluir `node_modules/`
3. Pegar en nuevo PC
4. Ejecutar INSTALAR.bat

### Opción 2: Compartir en red
1. Compartir carpeta en red local
2. Copiar desde otro PC
3. Ejecutar INSTALAR.bat

### Opción 3: Comprimir en ZIP
1. Eliminar `node_modules/` y `asistencia.db`
2. Comprimir carpeta
3. Copiar ZIP al nuevo PC
4. Descomprimir
5. Ejecutar INSTALAR.bat

---

## 🎯 Estructura Mínima Funcional

Si solo quieres lo MÁS básico:

```
Biometrico Cresco/
├── public/              ← COMPLETA
├── server.js
├── database.js
└── package.json
```

Con esto + `npm install` + `npm start` funciona.

---

## 💡 Consejos

- **Usa los archivos .bat** - Facilitan mucho la instalación
- **Lee GUIA-INSTALACION.md** - Tiene solución a todos los problemas
- **Haz respaldos** - Ejecuta RESPALDO.bat regularmente
- **Documenta cambios** - Si modificas algo, anótalo

---

## 🔍 Verificar que todo esté

Antes de copiar, verifica que tengas:
- [ ] Carpeta `public/` con 9 archivos
- [ ] Archivo `server.js`
- [ ] Archivo `database.js`
- [ ] Archivo `package.json`
- [ ] Archivos .bat (opcional)
- [ ] Archivos .md de documentación

---

**Todo listo para transferir! 📦**
