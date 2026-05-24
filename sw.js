/* HL-SIGNAL Service Worker v1.1 */
const CACHE = 'hl-signal-v1.1';

const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon.png',
];

/* Install: pre-cache the app shell */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

/* Activate: purge old caches */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* Fetch strategy:
   - Hyperliquid API  → network-only (live data, never cache)
   - CDN (unpkg, fonts) → network-first, fall back to cache
   - App shell        → cache-first, fall back to network
*/
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Live data: always hit the network
  if (url.hostname === 'api.hyperliquid.xyz') {
    e.respondWith(fetch(e.request));
    return;
  }

  // External CDN assets: network-first, cache on success
  const isExternal = ['unpkg.com', 'fonts.googleapis.com', 'fonts.gstatic.com']
    .includes(url.hostname);
  if (isExternal) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // App shell: cache-first
  e.respondWith(
    caches.match(e.request)
      .then(cached => cached || fetch(e.request)
        .then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
      )
  );
});
