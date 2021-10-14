/*

    The accounts system API

*/


// Run the library (as a function)
(function() {

    // Define a child window events object
    var childWindowEvents = {

        "loaded": null,
        "failed": function(data) {

            if (typeof accountsSystemAPI.onFailure == "function") {

                accountsSystemAPI.onFailure(data);

            }

        },
        "signed-in": function(data) {

            if (typeof accountsSystemAPI.onSignIn == "function") {

                accountsSystemAPI.onSignIn(data);

            }

        },
        "authenticated": function(data) {

            if (typeof accountsSystemAPI.onAuth == "function") {

                accountsSystemAPI.onAuth(data);

            }

        }

    };

    // Define a function to open a child widnow
    function openChildWindow() {

        // Define the dimensions of the sign in window
        var width = 480,
            height = 620,
            left = (window.screen.width - width) / 2,
            top = (window.screen.height > height + 40) ? 40 : 0;

        // Open the window
        return window.open("%{{server:AccountsURL}}%/signin/", "Sign In", `menubar=no,toolbar=no,location=no,resizable=no,scrollbars=yes,status=no,width=${width}px,height=${height}px,left=${left}px,top=${top}px,nodeIntegration=no,alwaysOnTop=yes,fullscreenable=no,skipTaskbar=yes,minimizable=no`);

    }

    // Listen to messages coming from the sign in window
    window.addEventListener("message", function(event) {

        // Check if this message came from the server!
        if (event.origin == "%{{server:AccountsURL}}%") {

            // Debug
            //console.log(event.data);
            //console.log(event.source);

            // Run the event's function
            childWindowEvents[event.data.type](event.data);

        }

    }, {

        passive: true

    });

    // Define the API's object
    window.accountsSystemAPI = {

        // Open a new sign in request
        openRequest(configurations) {

            // Open a sign in window
            var childWindow = openChildWindow();

            // Wait for the child window to finish loading
            childWindowEvents["loaded"] = () => {

                // Send the required data for the sign in API
                childWindow.postMessage({

                    url: window.location.href,
                    configurations: configurations

                }, "%{{server:AccountsURL}}%");

                // Tell the website that the request has been opened!
                if (typeof this.onConnected == "function") {

                    this.onConnected();

                }

            };

        },
        onFailure: null,
        onConnected: null,
        onSignIn: null,
        onAuth: null

    };

})();