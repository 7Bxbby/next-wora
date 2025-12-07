self.addEventListener("install", (event) => {
    // You can pre-cache assets here later
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    // Cleanup logic if needed
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    // v0: do not modify network behavior (no offline cache yet)
    return;
});
