const CACHE = 'hk-husafell-v1';
const ASSETS = [
  "/s1h1gb/",
  "/s1h1gb/index.html",
  "/s1h1gb/is/",
  "/s1h1gb/is/index.html",
  "/s1h1gb/manifest.json",
  "/s1h1gb/is/manifest.json",
  "/s1h1gb/images/hiking-qr.jpeg",
  "/s1h1gb/images/hot-tub-controls.jpeg",
  "/s1h1gb/images/ice-machine.jpeg",
  "/s1h1gb/images/icon-192.png",
  "/s1h1gb/images/icon-512.png",
  "/s1h1gb/images/lid1.jpeg",
  "/s1h1gb/images/lid2.jpeg",
  "/s1h1gb/images/lid3.jpeg",
  "/s1h1gb/images/lid4.jpeg",
  "/s1h1gb/images/logo-white.png",
  "/s1h1gb/images/master-switch.jpeg",
  "/s1h1gb/images/paypal-qr.jpeg",
  "/s1h1gb/images/sauna-controls.jpeg",
  "/s1h1gb/consent/complianz/banner-1-optin.css",
  "/s1h1gb/consent/complianz/complianz.min.js",
  "/s1h1gb/consent/complianz/cookieblocker.min.css",
  "/s1h1gb/consent/consent.js",
  "/s1h1gb/consent/source-en.html",
  "/s1h1gb/consent/source-is.html"
];

self.addEventListener('install', e => {
  // Reload every asset so language pages and offline copies update together.
  e.waitUntil(caches.open(CACHE).then(c =>
    c.addAll(ASSETS.map(url => new Request(url, { cache: 'reload' })))
  ).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k.startsWith('hk-husafell-') && k !== CACHE)
      .map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== self.location.origin) return;
  const url = new URL(e.request.url);
  const pages = ['/s1h1gb/', '/s1h1gb/index.html', '/s1h1gb/is/', '/s1h1gb/is/index.html'];
  if (e.request.mode === 'navigate' && pages.includes(url.pathname)) {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const key = url.origin + url.pathname;
      try {
        const response = await fetch(e.request, { cache: 'no-store' });
        if (response.ok) {
          await cache.put(key, response.clone());
          return response;
        }
        return (await cache.match(key)) || response;
      } catch (error) {
        const cached = await cache.match(key);
        if (cached) return cached;
        throw error;
      }
    })());
    return;
  }
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
});
