/* HL-SIGNAL Service Worker v2.0
   Strategy:
   - HTML (index.html) → network-first, cache:'no-cache' → always latest without hard refresh
   - External CDN      → network-first, cache fallback   → fast with offline support
   - Icons / manifest  → cache-first                     → instant load, rarely changes
   - HL API / stats    → network-only                    → live data, never cache
*/
const CACHE = 'hl-signal-v2.0';

const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon.png',
];

/* Install: pre-cache shell, activate immediately without waiting for old tabs */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

/* Activate: purge all old caches, claim existing clients immediately */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* Fetch handler */
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // ── Live API data: network-only, never cache ─────────────────────────────
  if (url.hostname === 'api.hyperliquid.xyz' ||
      url.hostname === 'stats-data.hyperliquid.xyz') {
    e.respondWith(fetch(e.request));
    return;
  }

  // ── External CDN (charts, fonts): network-first, cache fallback ──────────
  if (['unpkg.com', 'cdn.jsdelivr.net',
       'fonts.googleapis.com', 'fonts.gstatic.com'].includes(url.hostname)) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // ── HTML pages: network-first with cache:'no-cache' ──────────────────────
  // cache:'no-cache' sends a conditional ETag request to the server, bypassing
  // the GitHub Pages CDN 10-min max-age. If the file hasn't changed the server
  // returns 304 (fast). If it has changed the new version is served immediately.
  // Users always see the latest deployment — no hard refresh needed.
  if (e.request.destination === 'document') {
    e.respondWith(
      fetch(new Request(e.request, { cache: 'no-cache' }))
        .then(res => {
          if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          return res;
        })
        .catch(() => caches.match(e.request))  // offline: serve last cached copy
    );
    return;
  }

  // ── App shell assets (icons, manifest): cache-first ──────────────────────
  e.respondWith(
    caches.match(e.request)
      .then(cached => cached || fetch(e.request).then(res => {
        if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }))
  );
});
