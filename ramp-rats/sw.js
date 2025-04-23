self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('ramp-rats-v1').then(cache => {
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

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});