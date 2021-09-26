// console.log("sw");

// install service worker

self.addEventListener("install", (event) => {
  // console.log(`[Service Worker] Installing Service Worker .... `, event);
  // console.log("event");
});

// activate service worker

self.addEventListener("activate", (event) => {
  // console.log(`[Service Worker] Activating Service Worker .... `, event);
});

self.addEventListener("fetch", (event) => {
  // console.log(`[Service Worker] Fetching something .... `, event);
  event.respondWith(fetch(event.request));
});
