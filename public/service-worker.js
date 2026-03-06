const CACHE_NAME = 'asistencia-biometrica-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/admin.html',
  '/register.html',
  '/style.css',
  '/admin-style.css',
  '/colors.css',
  '/app.js',
  '/config.js',
  '/img/logocolor.png',
  '/img/logoblanca.png',
  '/img/launchericon-192x192.png',
  '/img/launchericon-512x512.png'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Archivos en caché');
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        console.log('Service Worker: Error al cachear', err);
      })
  );
  self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activado');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Eliminando caché antiguo', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Estrategia: Network First, fallback a Cache
self.addEventListener('fetch', (event) => {
  // Omitir requests que no sean GET
  if (event.request.method !== 'GET') {
    return;
  }

  // Omitir requests a la API
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return new Response(
            JSON.stringify({ error: 'Sin conexión a internet' }),
            { 
              headers: { 'Content-Type': 'application/json' },
              status: 503
            }
          );
        })
    );
    return;
  }

  // Para todo lo demás: Network First con fallback a Cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clonar la respuesta para guardarla en caché
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // Si falla la red, intentar servir desde caché
        return caches.match(event.request).then((response) => {
          if (response) {
            return response;
          }
          // Si no está en caché, mostrar página offline
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

// Sincronización en segundo plano (para cuando vuelva la conexión)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-asistencias') {
    event.waitUntil(syncAsistencias());
  }
});

async function syncAsistencias() {
  // Aquí podrías implementar lógica para sincronizar datos pendientes
  console.log('Sincronizando datos pendientes...');
}

// Notificaciones push
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nueva notificación',
    icon: '/img/launchericon-192x192.png',
    badge: '/img/launchericon-72x72.png',
    vibrate: [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification('Sistema de Asistencia', options)
  );
});

// Click en notificación
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
