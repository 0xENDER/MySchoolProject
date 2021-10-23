/*

    Initiate the service worker

*/

// Set up the service worker
function setupServiceWorker() {

    // Check if the browser supports service workers, and if this is not an app.
    if ('serviceWorker' in navigator) {

        // Register the service worker
        navigator.serviceWorker.register('./worker.js').then(function(registration) {

            // Send the codebase version
            var intervalLoop = setInterval(function() {

                // Wait for the service worker controller to get defined!
                if (navigator.serviceWorker.controller != null) {

                    // Send the codebase version
                    navigator.serviceWorker.controller.postMessage({

                        type: 'set-version',
                        value: window.platform.codebase.version

                    });

                    // Stop this loop
                    clearInterval(intervalLoop);
                }

            }, window.platform.special.intervalRefreshRate);

        }, function(err) {

            // Registration failed
            console.log('ServiceWorker registration failed: ', err);

        });

    }

}

// Initialise the service worker
if (!window.platform.more.isElectron) {

    // Setup the service worker
    setupServiceWorker();

}