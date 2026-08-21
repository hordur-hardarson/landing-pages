const CACHE = 'hk-husafell-v1';
const ASSETS = [
  '/s1h1gb/',
  '/s1h1gb/index.html',
  '/s1h1gb/images/master-switch.jpeg',
  '/s1h1gb/images/ice-machine.jpeg',
  '/s1h1gb/images/sauna-controls.jpeg',
  '/s1h1gb/images/hot-tub-controls.jpeg',
  '/s1h1gb/images/lid1.jpeg',
  '/s1h1gb/images/lid2.jpeg',
  '/s1h1gb/images/lid3.jpeg',
  '/s1h1gb/images/lid4.jpeg',
  '/s1h1gb/images/paypal-qr.jpeg',
  '/s1h1gb/images/hiking-qr.jpeg',
  '/s1h1gb/images/logo-white.png',
  '/s1h1gb/images/icon-192.png',
  '/s1h1gb/images/icon-512.png'
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
