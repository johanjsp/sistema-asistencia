# 🎨 Esquema de Colores - Sistema de Asistencia

## Paleta de Colores Principal

### Color Principal
**#1D0C4F** - Morado Oscuro
- Uso: Fondos principales, encabezados, botones primarios
- RGB: (29, 12, 79)

### Color Secundario
**#7DC3FD** - Azul Claro
- Uso: Acentos, enlaces, gradientes complementarios
- RGB: (125, 195, 253)

### Color Terciario
**#F4F48C** - Amarillo
- Uso: Botones de entrada, destacados, badges
- RGB: (244, 244, 140)

---

## Aplicaciones por Componente

### Fondos y Headers

**Fondo de Aplicación**
```css
background: #1D0C4F;
```

**Header de Administración**
```css
background: #1D0C4F;
color: white;
```

**Botón Principal**
```css
background: #1D0C4F;
color: white;
```

**Botón de Entrada**
```css
background: #F4F48C;
color: #000;
```

**Botón de Salida**
```css
background: #7DC3FD;
color: #000;
```

### Tipografía

- **Texto Principal**: `#000` (Negro)
- **Texto Secundario**: `#333` (Gris oscuro)
- **Texto Suave**: `#666` (Gris medio)
- **Texto en botones oscuros**: `white`

### Badges y Etiquetas

**Entrada**
- Fondo: `#F4F48C` (Amarillo)
- Texto: `#000` (Negro)

**Salida**
- Fondo: `#7DC3FD` (Azul claro)
- Texto: `#000` (Negro)

### Tablas (Panel Admin)

**Encabezado**
```css
background: #1D0C4F;
color: white;
```

### Estados Interactivos

**Focus en inputs**
```css
border-color: #7DC3FD;
```

**Hover en botones primarios**
```css
box-shadow: 0 5px 15px rgba(29, 12, 79, 0.4);
```

---

## Contraste y Accesibilidad

- ✅ Contraste texto negro sobre amarillo: AAA
- ✅ Contraste texto blanco sobre morado oscuro: AAA
- ✅ Contraste texto negro sobre azul claro: AA
- ✅ Todos los colores cumplen con WCAG 2.1

---

## Archivos Actualizados

- ✅ `style.css` - Estilos generales
- ✅ `admin-style.css` - Panel de administración
- ✅ `admin.html` - Estilos inline del reporte
- ✅ `colors.css` - Variables CSS (nuevo)

---

## Uso de Variables CSS

El archivo `colors.css` contiene variables CSS para facilitar cambios futuros:

```css
:root {
    --color-principal: #1D0C4F;
    --color-secundario: #7DC3FD;
    --color-terciario: #F4F48C;
    --color-texto-principal: #000;
}
```

Para usarlas en tu CSS:
```css
.elemento {
    color: var(--color-principal);
    background: var(--gradiente-principal);
}
```

---

## Vista Previa Rápida

🟣 **Principal** #1D0C4F  
🔵 **Secundario** #7DC3FD  
🟡 **Terciario** #F4F48C  
⚫ **Texto** #000

---

Actualizado: 3 de marzo de 2026
