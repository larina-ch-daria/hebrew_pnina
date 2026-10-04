/* Офлайн-кэш. После любой правки в www/ увеличь номер версии — иначе телефоны продолжат показывать старую. */
const CACHE = 'pnina-v1';
const FILES = [
  './', './index.html', './manifest.webmanifest', './fonts/fonts.css',
  './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png',
  './fonts/frank-ruhl-libre-hebrew-500-normal.woff2',   './fonts/frank-ruhl-libre-hebrew-700-normal.woff2',   './fonts/frank-ruhl-libre-latin-500-normal.woff2',   './fonts/frank-ruhl-libre-latin-700-normal.woff2',   './fonts/playpen-sans-hebrew-hebrew-400-normal.woff2',   './fonts/playpen-sans-hebrew-hebrew-500-normal.woff2',   './fonts/playpen-sans-hebrew-latin-400-normal.woff2',   './fonts/playpen-sans-hebrew-latin-500-normal.woff2',   './fonts/rubik-cyrillic-400-normal.woff2',   './fonts/rubik-cyrillic-500-normal.woff2',   './fonts/rubik-cyrillic-700-normal.woff2',   './fonts/rubik-hebrew-400-normal.woff2',   './fonts/rubik-hebrew-500-normal.woff2',   './fonts/rubik-hebrew-700-normal.woff2',   './fonts/rubik-latin-400-normal.woff2',   './fonts/rubik-latin-500-normal.woff2',   './fonts/rubik-latin-700-normal.woff2', 
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(hit => hit || fetch(e.request)));
});
