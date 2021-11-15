/*

    The CSS Bridge Library (NOT IN USE)

*/


// Isolate the library
(function() {

    // Enable strict mode
    "use strict";

    // The global library object
    window.cssBridge = {

        convert: {

            // Convert CSS px value to an int
            pxToInt(string) {

                return eval(
                    string.replace(/(\d+)v([hw])/g, function(match, value, type) {
                        return Number(value) / 100 * window[(type == "h") ? "innerHeight" : "innerWidth"];
                    }).replace(/px/g, "")
                    .replace(/calc/g, "")
                );

            }

        }

    };

})();