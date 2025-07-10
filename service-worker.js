const CACHE_NAME = "chatroom-v4"; // update version here when needed

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

// Install: cache essential files immediately
self.addEventListener("install", (event) => {
  console.log("🔧 Service Worker Installing...");
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_PRECACHE);
    })
  );
});

// Activate: remove old cache versions and take control
self.addEventListener("activate", (event) => {
  console.log("🚀 Service Worker Activating...");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: Network First Strategy
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Update the cache in background
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => caches.match(event.request)) // fallback to cache if offline
  );
});

// Allow skipWaiting() via postMessage
self.addEventListener("message", (event) => {
  if (event.data && event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
