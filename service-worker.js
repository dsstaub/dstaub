// service-worker.js

const CACHE_VERSION = 'v13'; // Increment this value with each deployment
const CACHE_NAME = `my-pwa-cache-${CACHE_VERSION}`;

const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  // Add other assets to cache
];

// Install event - caching assets
self.addEventListener('install', event => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Caching assets');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event - cleaning up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event - serving cached content when offline
self.addEventListener('fetch', event => {
  console.log('[Service Worker] Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() => {
          // Fallback logic if needed
        })
      );
    })
  );
});

// Inside service-worker.js

self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
