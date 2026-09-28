// Offline cache for the recipe app. Version changes whenever any file changes.
const CACHE = 'recipes-f104d163ca';
const ASSETS = ["./", "index.html", "img/01.jpg", "img/02.jpg", "img/03.jpg", "img/03-keepsake.jpg", "img/04.jpg", "img/05.jpg", "img/06.jpg", "img/07.jpg", "img/08.jpg", "img/09.jpg", "img/10.jpg", "img/11.jpg", "img/12.jpg", "img/13.jpg", "img/14.jpg", "img/15.jpg", "img/16.jpg", "img/17.jpg", "img/18.jpg", "img/19.jpg", "img/20.jpg", "img/21.jpg", "img/22.jpg", "img/23.jpg", "img/24.jpg", "img/25.jpg", "img/26.jpg", "img/27.jpg", "img/28.jpg", "img/29.jpg", "img/30.jpg", "img/31.jpg", "img/32.jpg", "img/33.jpg", "img/34.jpg", "img/35.jpg", "img/36.jpg", "img/37.jpg", "img/38.jpg", "img/39.jpg", "img/40.jpg", "img/41.jpg", "img/42.jpg", "img/43.jpg", "img/43-keepsake.jpg", "img/44.jpg", "img/45.jpg", "img/46.jpg", "img/47.jpg", "img/47-keepsake.jpg", "img/48.jpg", "img/49.jpg", "img/50.jpg", "img/51.jpg", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png", "apple-touch-icon.png", "favicon.png", "manifest.webmanifest", "robots.txt"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    // network first for the page so updates show up; fall back to the cached copy offline
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put('index.html', c)); return r; })
      .catch(() => caches.match('index.html', {ignoreSearch: true})));
    return;
  }
  e.respondWith(caches.match(req, {ignoreSearch: true}).then(hit => hit || fetch(req)));
});
