console.log("sw");

self.addEventListener("install", (event) => {
  console.log(`[Service Worker] Installing Service Worker .... ${event}`);
  console.log("event");
});
self.addEventListener("activate", (event) => {
  console.log(`[Service Worker] Activating Service Worker .... ${event}`);
});
