// Registro del Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('✅ Service Worker registrado correctamente:', registration.scope);
        
        // Verificar actualizaciones cada hora
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);
      })
      .catch((error) => {
        console.error('❌ Error al registrar Service Worker:', error);
      });
  });
}

// Detectar si la app ya está instalada
let deferredPrompt;
let installButton;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt disparado');
  // Prevenir que Chrome muestre el prompt automáticamente
  e.preventDefault();
  // Guardar el evento para usarlo después
  deferredPrompt = e;
  
  // Mostrar botón de instalación personalizado si existe
  installButton = document.getElementById('installButton');
  if (installButton) {
    installButton.style.display = 'block';
    installButton.addEventListener('click', installApp);
  }
});

function installApp() {
  if (!deferredPrompt) {
    return;
  }
  
  // Mostrar el prompt de instalación
  deferredPrompt.prompt();
  
  // Esperar a que el usuario responda
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('✅ Usuario aceptó instalar la PWA');
    } else {
      console.log('❌ Usuario rechazó instalar la PWA');
    }
    deferredPrompt = null;
    if (installButton) {
      installButton.style.display = 'none';
    }
  });
}

// Detectar cuando la app fue instalada
window.addEventListener('appinstalled', () => {
  console.log('✅ PWA instalada correctamente');
  if (installButton) {
    installButton.style.display = 'none';
  }
  deferredPrompt = null;
});

// Verificar si la app está siendo ejecutada como PWA instalada
function isRunningAsPWA() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

// Mostrar mensaje informativo si está corriendo como PWA
if (isRunningAsPWA()) {
  console.log('✅ Ejecutando como PWA instalada');
}

// Solicitar permiso para notificaciones (opcional)
async function requestNotificationPermission() {
  if ('Notification' in window && 'serviceWorker' in navigator) {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('✅ Permisos de notificación concedidos');
        return true;
      } else {
        console.log('❌ Permisos de notificación denegados');
        return false;
      }
    } catch (error) {
      console.error('Error al solicitar permisos:', error);
      return false;
    }
  }
  return false;
}

// Sincronización en segundo plano
async function registrarSyncBackground() {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register('sync-asistencias');
      console.log('✅ Sync background registrado');
    } catch (error) {
      console.error('❌ Error al registrar sync:', error);
    }
  }
}

// Verificar estado de conexión
window.addEventListener('online', () => {
  console.log('🟢 Conexión restaurada');
  registrarSyncBackground();
  
  // Mostrar notificación al usuario
  const statusMessage = document.getElementById('connectionStatus');
  if (statusMessage) {
    statusMessage.textContent = '🟢 Conectado';
    statusMessage.className = 'connection-status online';
  }
});

window.addEventListener('offline', () => {
  console.log('🔴 Sin conexión a internet');
  
  const statusMessage = document.getElementById('connectionStatus');
  if (statusMessage) {
    statusMessage.textContent = '🔴 Sin conexión (modo offline)';
    statusMessage.className = 'connection-status offline';
  }
});
