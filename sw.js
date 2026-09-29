// Offline cache for Sarah's Cook Book. The version changes whenever any file changes.
const CACHE = 'cookbook-d2c8f1cbca';
const ASSETS = ["./", "index.html", "fonts/serif-sb.woff2", "fonts/serif-md.woff2", "fonts/body.woff2", "fonts/body-it.woff2", "fonts/body-bd.woff2", "fonts/script.woff2", "img/01-t.jpg", "img/02-t.jpg", "img/03-t.jpg", "img/04-t.jpg", "img/05-t.jpg", "img/06-t.jpg", "img/07-t.jpg", "img/08-t.jpg", "img/09-t.jpg", "img/10-t.jpg", "img/11-t.jpg", "img/12-t.jpg", "img/13-t.jpg", "img/14-t.jpg", "img/15-t.jpg", "img/16-t.jpg", "img/17-t.jpg", "img/18-t.jpg", "img/19-t.jpg", "img/20-t.jpg", "img/21-t.jpg", "img/22-t.jpg", "img/23-t.jpg", "img/24-t.jpg", "img/25-t.jpg", "img/26-t.jpg", "img/27-t.jpg", "img/28-t.jpg", "img/29-t.jpg", "img/30-t.jpg", "img/31-t.jpg", "img/32-t.jpg", "img/33-t.jpg", "img/34-t.jpg", "img/35-t.jpg", "img/36-t.jpg", "img/37-t.jpg", "img/38-t.jpg", "img/39-t.jpg", "img/40-t.jpg", "img/41-t.jpg", "img/42-t.jpg", "img/43-t.jpg", "img/44-t.jpg", "img/45-t.jpg", "img/46-t.jpg", "img/47-t.jpg", "img/48-t.jpg", "img/49-t.jpg", "img/50-t.jpg", "img/51-t.jpg", "img/52-t.jpg", "img/53-t.jpg", "img/54-t.jpg", "img/55-t.jpg", "img/56-t.jpg", "img/57-t.jpg", "img/58-t.jpg", "img/59-t.jpg", "img/60-t.jpg", "img/61-t.jpg", "img/62-t.jpg", "img/63-t.jpg", "img/64-t.jpg", "img/65-t.jpg", "img/66-t.jpg", "img/67-t.jpg", "img/68-t.jpg", "img/69-t.jpg", "img/70-t.jpg", "img/71-t.jpg", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png", "apple-touch-icon.png", "favicon.png", "manifest.webmanifest", "robots.txt"];
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
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put('index.html', c)); return r; })
      .catch(() => caches.match('index.html', {ignoreSearch: true})));
    return;
  }
  e.respondWith(caches.match(req, {ignoreSearch: true}).then(hit => hit || fetch(req).then(r => {
    if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return r; })));
});
