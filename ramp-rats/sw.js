importScripts('/sw-version.js?v=' + Date.now());
const CACHE_NAME = 'ramp-rats-' + SW_VERSION;

self.addEventListener('install', event => {
  self.skipWaiting(); // activate new SW immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '/ramp-rats/index.html',
        '/ramp-rats/manifest.json',
        '/fileshare/The-Crew-I-Ran-With-PRODUCTION.wav',
        '/fileshare/Fourteen-Eighty-Six-PRODUCTION.wav',
        '/fileshare/rr-wallpaper.png'
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  clients.claim(); // take control of pages immediately
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});