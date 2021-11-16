/*

    Analytics Library

*/


// Isolate the library
(function() {

    // Enable strict mode
    "use strict";

    // Define the needed variables
    var reportURL = null,
        additionalData = {};

    // Define the global object
    window.analytics = {

        // The report URL
        reportURL,

        // Attach additional data to the report
        attachData(name, getter) {

            // Check if the passed `name` variable is valid and if the name
            // is already used.
            if (typeof name != "string") {

                // Throw an error
                throw new Error("[Analytics] You need to provide a valid name for the data you want to attach!\nattachData(<string>, <function>)");

            } else if (additionalData[name] == undefined) {

                if (typeof getter == "function") {

                    // Save the data
                    additionalData[name] = getter;

                } else {

                    // Throw an error
                    throw new Error("[Analytics] You can only attach getter functions to reports!\nattachData(<string>, <function>)");

                }

            } else {

                // Throw an error
                throw new Error("[Analytics] You can not override already-attached report data! (You must detach this data first)");

            }

        },

        // Detach additional data from the report
        detachData(name) {

            if (typeof name != "string") {

                // Throw an error
                throw new Error("[Analytics] You need to provide a valid name for the data you want to detach!\ndetachData(<string>)");

            } else {

                // Check if this new data is already present
                if (additionalData[name] != undefined) {

                    // Delete this data
                    additionalData[name] = undefined;
                    delete additionalData[name];

                } else {

                    // Throw an error
                    throw new Error("[Analytics] No such data is currently attached to the reports!");

                }

            }

        },

        // Send a report
        sendReport(isError = false) {

            // Check if there is a valid report URL
            if (reportURL != null) {

                // Get the essential info for this report
                var reportObject = {

                    // Get the user agent string
                    userAgent: window.userAgent,

                    // Additional data
                    additionalData: function() { return additionalData; },
                    /*
                    // Get the version of the codebase
                    codebaseVersion: window.platform.codebase.version,

                    // Check if this is an installed app
                    isApp: window.platform.isApp,

                    // Get the operating system
                    operatingSystem: null,
                    */

                    // Get the stack of this call
                    stack: (isError) ? (new Error()).stack : null

                };

                // Debug
                return reportObject;

            } else {

                // Throw an error
                throw new Error("[Analytics] You can't use the `sendReport` analytics function whilst the `reportURL` is set to 'null'!");

            }

        }

    };

    // Secure the global object
    [

        "attachData",
        "detachData",
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
    Object.preventExtensions(window.analytics);

})();