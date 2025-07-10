const CACHE_NAME = "chatroom-v3"; // ✅ Always bump this when updating files

const FILES_TO_PRECACHE = [
  "/",
  "/index.html",
  "/dashboard.html",
  "/style.css",
  "/firebase-config.js",
  "/manifest.json",
  "/icon.png",
  "/favicon.ico",
  "/icon-192.png",
  "/icon-512.png"
];

// ✅ Precache essential files on install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_PRECACHE))
  );
  self.skipWaiting(); // Force immediate activation
});

// ✅ Delete old caches on activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ✅ Network-first strategy with cache fallback
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return; // only cache GET requests

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // ✅ Save updated response to cache
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() =>
        // ❌ Network failed → fallback to cache
        caches.match(event.request)
      )
  );
});
