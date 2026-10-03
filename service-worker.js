const CACHE="educonnect-v1";

self.addEventListener("install",e=>{
  e.waitUntil(
    caches.open(CACHE).then(c=>c.addAll([
      "./",
      "./index.html",
      "./style.css",
      "./app.js",
      "./manifest.json"
    ]))
  );
  self.skipWaiting();
});

self.addEventListener("activate",e=>{
  e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch",e=>{
  e.respondWith(
    caches.match(e.request).then(cached=>{
      return cached || fetch(e.request);
    })
  );
});
