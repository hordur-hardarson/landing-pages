const CACHE = 'hk-akureyri-v1';
const ASSETS = [
  '/s1h2gb/',
  '/s1h2gb/index.html',
  '/s1h2gb/images/entrance.jpeg',
  '/s1h2gb/images/lockbox.jpeg',
  '/s1h2gb/images/overview.jpeg',
  '/s1h2gb/images/hot-tub-switch.jpeg',
  '/s1h2gb/images/fireplace.jpeg',
  '/s1h2gb/images/paypal-qr.jpeg',
  '/s1h2gb/images/logo-white.png',
  '/s1h2gb/images/icon-192.png',
  '/s1h2gb/images/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});