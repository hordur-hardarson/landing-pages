const CACHE = 'hk-akureyri-v1';
const ASSETS = [
  "/s1h2gb/",
  "/s1h2gb/index.html",
  "/s1h2gb/is/",
  "/s1h2gb/is/index.html",
  "/s1h2gb/manifest.json",
  "/s1h2gb/is/manifest.json",
  "/s1h2gb/images/entrance.jpeg",
  "/s1h2gb/images/fireplace.jpeg",
  "/s1h2gb/images/hot-tub-lockbox.jpeg",
  "/s1h2gb/images/hot-tub-switch.jpeg",
  "/s1h2gb/images/icon-192.png",
  "/s1h2gb/images/icon-512.png",
  "/s1h2gb/images/lockbox.jpeg",
  "/s1h2gb/images/logo-white.png",
  "/s1h2gb/images/overview.jpeg",
  "/s1h2gb/images/paypal-qr.jpeg",
  "/s1h2gb/consent/complianz/banner-1-optin.css",
  "/s1h2gb/consent/complianz/complianz.min.js",
  "/s1h2gb/consent/complianz/cookieblocker.min.css",
  "/s1h2gb/consent/consent.js",
  "/s1h2gb/consent/source-en.html",
  "/s1h2gb/consent/source-is.html"
];

self.addEventListener('install', e => {
  // Reload every asset so language pages and offline copies update together.
  e.waitUntil(caches.open(CACHE).then(c =>
    c.addAll(ASSETS.map(url => new Request(url, { cache: 'reload' })))
  ).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k.startsWith('hk-akureyri-') && k !== CACHE)
      .map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
});
