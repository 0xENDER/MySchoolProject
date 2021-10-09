/*

    The service worker

*/

var cacheName = null,
    contentToCache = [

        // Cache the main page
        '/',

        // Cache fonts
        '/assets/fonts/latin.woff2?v=%{{global:codebase.version}}%',
        '/assets/fonts/latin-ext.woff2?v=%{{global:codebase.version}}%',

        // Cache images
        '/assets/media/logo/logo.svg?v=%{{global:codebase.version}}%',
        '/assets/media/logo/logo-48.svg?v=%{{global:codebase.version}}%',
        '/assets/media/logo/logo-72.svg?v=%{{global:codebase.version}}%',
        '/assets/media/logo/logo-96.svg?v=%{{global:codebase.version}}%',
        '/assets/media/logo/logo-144.svg?v=%{{global:codebase.version}}%',
        '/assets/media/logo/logo-168.svg?v=%{{global:codebase.version}}%',
        '/assets/media/logo/logo-192.svg?v=%{{global:codebase.version}}%',
        '/assets/media/logo/logo.png?v=%{{global:codebase.version}}%',
        '/assets/media/icon.ico?v=%{{global:codebase.version}}%',

        // Cache scripts
        '/assets/scripts/alerts.js?v=%{{global:codebase.version}}%',
        '/assets/scripts/load.js?v=%{{global:codebase.version}}%',
        '/assets/scripts/scrollbar.js?v=%{{global:codebase.version}}%',
        '/assets/scripts/tab.js?v=%{{global:codebase.version}}%',
        '/assets/scripts/crossbrowser.js?v=%{{global:codebase.version}}%',
        '/assets/scripts/platform.js?v=%{{global:codebase.version}}%',
        '/assets/scripts/performance.js?v=%{{global:codebase.version}}%',
        '/assets/scripts/account.js?v=%{{global:codebase.version}}%',
        '/assets/scripts/worker.js?v=%{{global:codebase.version}}%',

        // Cache Styles
        '/assets/styles/all.css?v=%{{global:codebase.version}}%',
        '/assets/styles/colours.css?v=%{{global:codebase.version}}%',
        '/assets/styles/components.css?v=%{{global:codebase.version}}%',
        '/assets/styles/font.css?v=%{{global:codebase.version}}%',
        '/assets/styles/layout.css?v=%{{global:codebase.version}}%',
        '/assets/styles/load.css?v=%{{global:codebase.version}}%',
        '/assets/styles/complex/alerts.css?v=%{{global:codebase.version}}%',
        '/assets/styles/complex/components.css?v=%{{global:codebase.version}}%',
        '/assets/styles/complex/layout.css?v=%{{global:codebase.version}}%',

        // Cache components
        '/components/basics.css?v=%{{global:codebase.version}}%',
        '/components/home-page.css?v=%{{global:codebase.version}}%',
        '/components/suggestions/cards.css?v=%{{global:codebase.version}}%',
        '/components/suggestions/cards.js?v=%{{global:codebase.version}}%'

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

}, {

    passive: true

});

// Install the service worker
self.addEventListener('install', e => {

    // Activate worker immediately
    e.waitUntil(self.skipWaiting());

}, {

    passive: true

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

            if (e.request.method !== "POST" && e.request.method !== "HEAD")
                cache.put(e.request, response.clone());

        }

        // Return it
        return response;

    })());

}, {

    passive: true

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

}, {

    passive: true

});