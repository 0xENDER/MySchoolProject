/*

    Manage cross-page events

*/


// Tell the window opener that the page has finished loading
if (window.opener != null) {

    if (!("didLoad" in window.temporaryData.currentData) || !window.temporaryData.currentData.didLoad) {

        window.opener.postMessage({

            type: "loaded",
            data: null

        }, "*");

    }

    window.temporaryData.setItem("didLoad", true);

}

// Define the events object
window.events = {

    // Events data
    data: {

        didFail: false,
        isRedirect: false,
        isPlannedExit: false,
        openerOrigin: null,
        openerURL: null,
        configurations: null

    },

    redirect(url) {

        // Mark this as an intentional redirect
        window.events.data.isRedirect = true;

        // Redirect the page
        window.location.href = url;

    },

    reload() {

        // Mark this as an intentional redirect
        window.events.data.isRedirect = true;

        // Redirect the page
        window.location.reload();

    },

    // Close this window
    close() {

        // Mark this action as "intended"
        window.events.data.isPlannedExit = true;

        // Close the window
        window.close();

    },

    // The events manager
    manager: {

        // Report an error
        error(errorMessage, errorCode) {

            window.events.data.didFail = true;

            alert(`ERROR: ${errorMessage}\nCODE: ${errorCode}`);

            window.opener.postMessage({

                type: "failed",
                data: {

                    error: {

                        message: errorMessage,
                        code: errorCode

                    }

                }

            }, (window.events.data.openerURL != null) ? window.events.data.openerURL : "*");

            throw new Error(`ERROR: ${errorMessage}\nCODE: ${errorCode}`);

        }

    },

    // The user has signed in
    signedIn() {

        // Only allow failure-free processes to use this function
        if (!this.data.didFail) {

            // Check if this is a child window
            if (window.opener != null) {

                // Send a "signed-in" event message
                window.opener.postMessage({

                    type: "signed-in",
                    data: null

                }, window.events.data.openerURL);

                // Check if this is an app that requires authentication
                if (
                    window.events.data.openerOrigin.indexOf("%%HOST%%") != -1
                ) {

                    // Close the window
                    window.events.close();

                } else {

                    // Authenticate the request! (Debug)
                    alert("DEBUG: Auth system is not ready yet!\nUse the debug auth button.");

                }

            } else {

                // Tmp...
                window.location.href = "/";

            }

        }

    },

    // The user has authenticated the request
    authenticated(authKey) {

        // Send an "authenticated" event message
        window.opener.postMessage({

            type: "authenticated",
            data: {

                authKey: authKey

            }

        }, window.events.data.openerURL);

        // Close the window
        window.events.close();


    }

};

// Get the required working variables
if (window.temporaryData.currentData.openerOrigin == undefined) {

    // Listen to incoming messages
    window.onmessage = function(event) {

        // Check if the received data is valid
        if (event.data.configurations != undefined && event.data.url != undefined) {

            // Check if the request URL has the same origin as the message's origin
            if (event.data.url.indexOf(event.origin) != 0) {

                // Report the error
                window.events.manager.error("The request page URL's origin does not match the request page's origin!", "0002");

            } else {

                window.events.data.openerOrigin = event.origin;
                window.events.data.openerURL = event.data.url;
                window.events.data.configurations = event.data.configurations;

            }

            // Stop listening to messages
            window.onmessage = null;

        } else {

            // Report the error
            window.events.manager.error("Received invalid data!", "0001");

        }

    };

} else {

    // Get the data
    window.events.data.openerOrigin = window.temporaryData.currentData.openerOrigin;
    window.events.data.openerURL = window.temporaryData.currentData.openerURL;
    window.events.data.configurations = window.temporaryData.currentData.configurations;

}

// Save temporary data before unloading
window.onbeforeunload = function() {

    if (!window.events.data.isRedirect) {

        window.temporaryData.removeItem("didLoad", true);

        window.opener.postMessage({

            type: "closed",
            data: {

                intended: window.events.data.isPlannedExit

            }

        }, "*");

    }

    // Save this data for later use
    window.temporaryData.setItem("openerOrigin", window.events.data.openerOrigin);
    window.temporaryData.setItem("openerURL", window.events.data.openerURL);
    window.temporaryData.setItem("configurations", window.events.data.configurations);

}