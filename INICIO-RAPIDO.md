# 🚀 Inicio Rápido - Sistema de Asistencia

## ¡El servidor ya está corriendo! ✅

Accede al sistema en: **http://localhost:3000**

---

## 👨‍💼 Acceso de Administrador

Para acceder al **Panel de Administración** usa estas credenciales:

- **Usuario**: `admin`
- **Contraseña**: `admin123`

### ¿Qué puedes hacer en el Panel de Admin?

✅ Ver estadísticas en tiempo real  
✅ Ver todas las entradas y salidas de los trabajadores  
✅ Filtrar por fecha y usuario  
✅ Generar reportes imprimibles  

---

## 👷 Acceso de Trabajador

Si eres un trabajador:

1. Ve a: http://localhost:3000
2. Click en "Regístrate aquí"
3. Completa tus datos (nombre, usuario, contraseña)
4. Inicia sesión con tu usuario y contraseña

### ¿Qué puedes hacer como trabajador?

✅ Marcar tu hora de entrada  
✅ Marcar tu hora de salida  
✅ Ver tu historial de asistencias  

---

## 📝 Flujo de Uso

### Para marcar entrada:
1. Ingresa con tu usuario y contraseña
2. Click en "Marcar Entrada"
3. Verás el mensaje: "Gracias has llegado"
4. Te desloguea automáticamente

### Para marcar salida:
1. Ingresa con tu usuario y contraseña
2. Click en "Marcar Salida"
3. Verás el mensaje: "Gracias, que tengas buen día"
4. Te desloguea automáticamente

---

## 🖨️ Generar Reportes (Solo Admin)

1. Ingresa como admin
2. En el Panel de Administración, click en "🖨️ Generar Reporte"
3. Selecciona el rango de fechas
4. Opcional: filtra por un usuario específico
5. Click en "Generar e Imprimir"
6. Se abrirá una ventana de impresión con el reporte

---

## 🔧 Comandos Útiles

### Iniciar el servidor:
```bash
npm start
```

### Modo desarrollo (con auto-reload):
```bash
npm run dev
```

### Detener el servidor:
Presiona `Ctrl + C` en la terminal

---

## ⚠️ Importante

**Por seguridad, cambia la contraseña del admin en producción:**

Edita el archivo `database.js` línea 62:
```javascript
const adminPassword = 'admin123'; // ← Cambia esto
```

---

## 📞 ¿Necesitas ayuda?

- Lee el archivo `README.md` para más detalles
- Verifica que el servidor esté corriendo en http://localhost:3000
- Asegúrate de que no haya otro programa usando el puerto 3000

---

¡Listo para usar! 🎉
