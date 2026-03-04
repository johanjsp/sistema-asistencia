# 💻 REQUISITOS DEL SISTEMA

## Especificaciones mínimas y recomendadas para ejecutar el Sistema de Asistencia

---

## 🖥️ Sistema Operativo

### ✅ Compatible:
- **Windows 10** (cualquier versión)
- **Windows 11**
- **Windows Server 2016** o superior
- **Linux** (Ubuntu, Debian, CentOS, etc.)
- **macOS** 10.13 o superior

### Recomendado:
- **Windows 10** o **Windows 11** (64-bit)
- Con últimas actualizaciones instaladas

---

## 🔧 Software Requerido

### Node.js (OBLIGATORIO)

**Versión Mínima:** v14.0.0  
**Versión Recomendada:** v18.x LTS o v20.x LTS

**Descarga:**
- https://nodejs.org/ (descargar versión LTS)

**Incluye automáticamente:**
- npm (Node Package Manager)

### Navegador Web (OBLIGATORIO)

**Navegadores Compatibles:**
- ✅ Google Chrome (versión 90+)
- ✅ Microsoft Edge (versión 90+)
- ✅ Mozilla Firefox (versión 88+)
- ✅ Safari (versión 14+)
- ✅ Opera (versión 76+)

**Recomendado:**
- Google Chrome o Microsoft Edge (últimas versiones)

### Opcional:
- SQLite Browser (para ver la base de datos)
- Git (para control de versiones)

---

## 💾 Hardware Mínimo

### Procesador:
- **Mínimo:** Intel/AMD de 1 GHz o superior
- **Recomendado:** Intel i3 o AMD Ryzen 3 o superior

### Memoria RAM:
- **Mínimo:** 2 GB
- **Recomendado:** 4 GB o más

### Disco Duro:
- **Espacio requerido:** 500 MB libres
- **Espacio recomendado:** 1 GB libres
  - 200 MB para Node.js
  - 150 MB para dependencias (node_modules)
  - 100 MB para el sistema
  - Espacio adicional para base de datos (crece con el uso)

### Monitor:
- **Resolución mínima:** 1024x768
- **Recomendado:** 1366x768 o superior
- **Ideal:** 1920x1080 (Full HD)

---

## 🌐 Conectividad

### Red Local:
- **Para uso básico:** No requiere internet
- **Para instalación:** Requiere internet (descargar dependencias)
- **Para red interna:** Tarjeta de red ethernet o WiFi

### Internet:
- **Solo necesario para:**
  - Instalar Node.js
  - Ejecutar `npm install` (descargar dependencias)
- **No necesario para:**
  - Ejecutar el sistema día a día
  - Marcar asistencias
  - Generar reportes

---

## 🔌 Puertos

### Puerto por Defecto:
- **Puerto:** 3000
- **Protocolo:** HTTP
- **Acceso local:** http://localhost:3000

### Requisitos de Firewall:
- Si accedes desde otros dispositivos:
  - Permitir conexiones entrantes al puerto 3000
  - O configurar excepción en el firewall

---

## 📱 Dispositivos Compatibles

### Dispositivos que pueden acceder al sistema:

#### PC/Laptop:
- ✅ Windows
- ✅ Mac
- ✅ Linux

#### Tablets:
- ✅ iPad (Safari)
- ✅ Android tablets (Chrome)
- ✅ Windows tablets

#### Smartphones:
- ✅ iPhone (iOS 12+)
- ✅ Android (6.0+)
- ✅ Cualquier dispositivo con navegador moderno

**Nota:** El dispositivo debe estar en la misma red local que el servidor.

---

## ⚡ Rendimiento Esperado

### Capacidad del Sistema:

**Usuarios Simultáneos:**
- Sin problemas: 10-50 usuarios
- Aceptable: 50-100 usuarios
- Requiere optimización: 100+ usuarios

**Base de Datos:**
- Puede almacenar: Millones de registros
- Sin degradación notable: 100,000 registros
- SQLite es muy eficiente para este tamaño

**Tiempo de Respuesta:**
- Login: < 500ms
- Marcar asistencia: < 300ms
- Generar reporte: 500ms - 2s (dependiendo de cantidad de datos)
- Cargar panel admin: < 1s

---

## 🔐 Seguridad

### Requisitos de Seguridad:

**Antivirus:**
- Compatible con cualquier antivirus
- Node.js puede requerir excepción en antivirus
- Puerto 3000 puede requerir excepción en firewall

**Permisos:**
- Requiere permisos de lectura/escritura en la carpeta del proyecto
- Requiere permisos para crear/modificar archivos (.db)
- No requiere permisos de administrador

---

## 📊 Tamaño de la Instalación

### Después de Instalación Completa:

```
Node.js:               ~200 MB
node_modules/:         ~150 MB
Código del sistema:    ~1 MB
Base de datos inicial: ~50 KB
Logo e imágenes:       ~100 KB
Documentación:         ~50 KB
---------------------------------
Total aproximado:      ~351 MB
```

### Crecimiento con el Uso:

**Base de datos (asistencia.db):**
- 1 usuario ≈ 500 bytes
- 1 registro de asistencia ≈ 200 bytes

**Ejemplo con 100 usuarios y 1 año:**
- 100 usuarios × 500 bytes = 50 KB
- 100 usuarios × 2 registros/día × 365 días × 200 bytes = 14 MB
- **Total después de 1 año:** ~15 MB

---

## ✅ Verificación de Compatibilidad

### Antes de Instalar, verifica:

1. **Sistema Operativo:**
   ```cmd
   systeminfo
   ```

2. **Espacio Libre:**
   ```cmd
   dir
   ```

3. **Versión de Windows:**
   ```cmd
   winver
   ```

4. **Después de instalar Node.js:**
   ```cmd
   node --version
   npm --version
   ```

---

## ⚙️ Configuraciones Especiales

### Para Empresas:

**Servidor Dedicado:**
- Windows Server 2016+
- 4 GB RAM mínimo
- Procesador dual-core
- Conexión ethernet 100 Mbps

**Muchos Usuarios (100+):**
- Considerar servidor de mayor capacidad
- 8 GB RAM recomendado
- SSD para mejor rendimiento
- Monitorear uso de CPU y RAM

**Alta Disponibilidad:**
- Considerar ejecutar como servicio de Windows
- Usar PM2 para auto-reinicio
- Configurar respaldos automáticos

---

## 🚫 Limitaciones Conocidas

### SQLite:
- No ideal para 100+ usuarios simultáneos escribiendo
- Para ese caso, migrar a MySQL/PostgreSQL

### Puerto 3000:
- Puede estar ocupado por otras aplicaciones
- Solución: Cambiar puerto en server.js

### Navegadores Antiguos:
- Internet Explorer no es compatible
- Navegadores muy antiguos pueden tener problemas

---

## 📈 Escalabilidad

### Pequeña Empresa (1-50 empleados):
- ✅ Configuración actual es perfecta
- PC común puede ser el servidor
- Sin modificaciones necesarias

### Mediana Empresa (50-200 empleados):
- ⚠️ Considerar servidor dedicado
- Monitorear rendimiento
- Respaldos más frecuentes

### Grande Empresa (200+ empleados):
- ❌ Considerar migrar a MySQL/PostgreSQL
- Servidor dedicado obligatorio
- Implementar balanceo de carga

---

## ✨ Optimización Opcional

### Para Mejor Rendimiento:

1. **SSD en lugar de HDD**
2. **Más RAM (8 GB+)**
3. **Conexión ethernet en lugar de WiFi**
4. **Cerrar programas innecesarios**
5. **Mantener Windows actualizado**

---

## 📞 Compatibilidad Verificada

**Probado exitosamente en:**
- ✅ Windows 10 (64-bit)
- ✅ Windows 11
- ✅ Node.js v18.x
- ✅ Chrome 120+
- ✅ Edge 120+
- ✅ Firefox 121+

**Configuraciones típicas:**
- ✅ PC de oficina estándar
- ✅ Laptop moderna
- ✅ Mini PC
- ✅ Servidor básico
- ✅ VM (Máquina Virtual)

---

**El sistema está diseñado para ser ligero y eficiente. Si tu PC puede ejecutar Windows 10, puede ejecutar este sistema sin problemas.** ✅
