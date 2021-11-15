/*

    The accounts system API

*/


// Run the library (as a function)
(function() {

    // Enable strict mode
    "use strict";

    // Define a child window events object
    var eventsFunctions = {

            onFailure: null,
            onConnected: null,
            onClose: null,
            onSignIn: null,
            onAuth: null

        },
        childWindowEvents = {

            "loaded": null,
            "closed": function(data) {

                if (typeof eventsFunctions.onClose == "function") {

                    eventsFunctions.onClose(data);

                }

            },
            "failed": function(data) {

                if (typeof eventsFunctions.onFailure == "function") {

                    eventsFunctions.onFailure(data);

                }

            },
            "signed-in": function(data) {

                if (typeof eventsFunctions.onSignIn == "function") {

                    eventsFunctions.onSignIn(data);

                }

            },
            "authenticated": function(data) {

                if (typeof eventsFunctions.onAuth == "function") {

                    eventsFunctions.onAuth(data);

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
        if (event.origin == "%{{server:AccountsURL}}%" || (
                window.location.protocol == "file:" &&
                event.origin == undefined
            )) {

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
                if (typeof eventsFunctions.onConnected == "function") {

                    eventsFunctions.onConnected();

                }

            };

        },
        reset() {

            this.onFailure = null;
            this.onConnected = null;
            this.onClose = null;
            this.onSignIn = null;
            this.onAuth = null;

        },
        onFailure: null,
        onConnected: null,
        onClose: null,
        onSignIn: null,
        onAuth: null

    };

    // Secure the global object
    [

        "openRequest",
        "reset"

    ].forEach(function(property) {

        Object.defineProperty(window.accountsSystemAPI, property, {

            configurable: false,
            writable: false

        });

    });
    [

        ["onFailure", 1],
        ["onConnected", 0],
        ["onClose", 1],
        ["onSignIn", 1],
        ["onAuth", 1]

    ].forEach(function(property) {

        Object.defineProperty(window.accountsSystemAPI, property[0], {

            configurable: false,
            set: function(v) {

                if (typeof v == "function") {

                    if (v.length == property[1]) {

                        eventsFunctions[property[0]] = v;

                    } else {

                        throw new Error(`[Accounts System API] An invalid function was assigned to the "${property[0]}" property!\nExpected: function(${

                            (function(){

                                var argumentsString = "";

                                if(property[1] == 1) {

                                    argumentsString = "arg";

                                }else{
    
                                    for(var i = 0; i < property[1]; i++){

                                        argumentsString += "arg" + String(i + 1) + ((i != property[1] - 1) ? ", " : "");

                                    }

                                }

                                return argumentsString;

                            })()

                        }){ ... }`);

                    }

                } else if (v === null) {

                    eventsFunctions[property[0]] = null;

                } else {

                    throw new Error(`[Accounts System API] The "${property[0]}" property can only be set to a function or 'null'!`);

                }

            },
            get: function() {

                return eventsFunctions[property[0]];

            }

        });

    });

})();