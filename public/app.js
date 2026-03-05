// Archivo de utilidades comunes para la aplicación

// Función para formatear fechas
function formatearFecha(fecha) {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Función para validar token
function verificarAutenticacion() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return token && user;
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Configuración de la API
const API_URL = 'http://localhost:3000/api';

// Función para hacer peticiones autenticadas
async function fetchAuth(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };

    return fetch(`${API_URL}${endpoint}`, mergedOptions);
}
