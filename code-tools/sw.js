importScripts('/sw-version.js');

const CACHE_NAME = SW_VERSION;
const CACHE_FILES = [
  '/code-tools/index.html',
  '/code-tools/color-picker.html',
  '/code-tools/icons/icon-192.png',
  '/code-tools/icons/icon-512.png',
  '/code-tools/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_FILES))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});