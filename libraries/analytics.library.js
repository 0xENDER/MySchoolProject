/*

    Analytics Library

*/


// Isolate the library
(function() {

    // Enable strict mode
    "use strict";

    // Define the needed variables
    var reportURL = null;

    // Define the global object
    window.analytics = {

        // The report URL
        reportURL: null,

        // Send a report
        sendReport() {

            // Check if there is a valid report URL
            if (reportURL != null) {

                // Get the essential info for this report
                var reportObject = {

                    // Get the version of the codebase
                    codebaseVersion: window.platform.codebase.version,

                    // Check if this is an installed app
                    isApp: window.platform.isApp,

                    // Get the operating system
                    operatingSystem: null,

                    // Get the stack of this call
                    stack: (new Error()).stack

                };
                console.log(reportObject);

            } else {

                // Throw an error
                throw new Error("[Analytics] You can't use the `sendReport` analytics function whilst the `reportURL` is set to 'null'!");

            }

        }

    };

    // Secure the global object
    [
        "sendReport"
    ].forEach(function(property) {

        Object.defineProperty(window.analytics, property, {

            configurable: false,
            writable: false

        });

    });
    Object.defineProperty(window.analytics, "reportURL", {

        configurable: false,
        set: function(value) {

            if (typeof value == "string") {

                try {

                    // Check if this value is considered a valid URL
                    new URL(value);

                } catch {

                    // Throw an error
                    throw new Error("[Analytics] The \"reportURL\" can only accept valid URLs!");

                } finally {

                    // Update the value of the `reportURL` variable
                    reportURL = value;

                }

            } else if (value === null) {

                // Reset the value of the `reportURL` variable
                reportURL = null;

            } else {

                // Throw an error
                throw new Error("[Analytics] The \"reportURL\" property can only be set to a string or 'null'!");

            }

        },
        get: function() {

            // Return the value of the `reportURL` variable
            return reportURL;

        }

    });

})();