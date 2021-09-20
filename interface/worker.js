/*

    The service worker

*/

var cacheName = null,
    contentToCache = [

        // Cache the main page
        '/',

        // Cache fonts
        '/assets/fonts/file1.woff2',
        '/assets/fonts/file2.woff2',
        '/assets/fonts/file3.woff2',
        '/assets/fonts/file4.woff2',

        // Cache images
        '/assets/media/logo/logo.svg',
        '/assets/media/logo/logo-48.svg',
        '/assets/media/logo/logo-72.svg',
        '/assets/media/logo/logo-96.svg',
        '/assets/media/logo/logo-144.svg',
        '/assets/media/logo/logo-168.svg',
        '/assets/media/logo/logo-192.svg',
        '/assets/media/logo/logo.png',
        '/assets/media/icon.ico',

        // Cache scripts
        '/assets/scripts/alerts.js',
        '/assets/scripts/load.js',
        '/assets/scripts/scrollbar.js',
        '/assets/scripts/tab.js',
        '/assets/scripts/worker.js',
        //Note for scripts:
        //  Don't cache the `platform.js` file, or the `account.js` file.

        // Cache Styles
        '/assets/styles/all.css',
        '/assets/styles/colours.css',
        '/assets/styles/components.css',
        '/assets/styles/font.css',
        '/assets/styles/layout.css',
        '/assets/styles/load.css',
        '/assets/styles/complex/alerts.css',
        '/assets/styles/complex/components.css',
        '/assets/styles/complex/layout.css',
        '/assets/styles/content/components.css',

    ];

self.addEventListener('message', (event) => {

    if (event.data && event.data.type === 'set-version' && event.data.value != null) {

        cacheName = event.data.value;

        event.waitUntil((async() => {

            // Cache all the app
            const cache = await caches.open(cacheName);
            await cache.addAll(contentToCache);

        })());

    }

});

// Install the service worker
self.addEventListener('install', e => {

    // Activate worker immediately
    e.waitUntil(self.skipWaiting());

});

// Process file requests
self.addEventListener('fetch', (e) => {

    e.respondWith((async() => {

        // Fetch the request in the cache
        const r = await caches.match(e.request);

        // Check if it was found
        if (r) {

            // Return the cached request
            return r;

        }

        // Get the request from the server
        const response = await fetch(e.request);

        // Cache the request
        if (cacheName != null) {

            const cache = await caches.open(cacheName);

            if (e.request.method !== "POST" && e.request.method !== "HEAD" && e.request.url.indexOf(".server.test.connection") == -1 && e.request.url.indexOf("platform.js") == -1)
                cache.put(e.request, response.clone());

        }

        // Return it
        return response;

    })());

});

// Activate the service worker
self.addEventListener('activate', (e) => {

    e.waitUntil(self.clients.claim().then(

        caches.keys().then((keyList) => {

            return Promise.all(keyList.map((key) => {

                return (key === cacheName) ? undefined : caches.delete(key);

            }));

        })

    ));

});