/*

    Scan directories

*/

// Get all the required modules
const path = require('path'),
    fs = require('fs'),
    blacklists = {

        // (blacklists directories)
        default: [ // A blacklist for default files

        ],
        html: [ // A blacklist for HTML files

            path.join(__dirname, "apps_codebase", "pages")

        ],
        js: [ // A blacklist for JavaScript files

        ],
        css: [ // A blacklist for CSS files

        ]

    };

// Define the module object
module.exports = {

    // A recursive function to scan a directory for a certain type of files
    scanDirectory: function(startPath, filterExtensions, callback) {

        // Check if the current path exists
        if (!fs.existsSync(startPath)) {

            // If not, stop this current path of the recursive loop
            return undefined;

        }

        // Get all the items within the current directory
        var files = fs.readdirSync(startPath);

        // Go through all the items inside the current directory
        for (var i = 0; i < files.length; i++) {

            // Get the current item's information
            var filename = path.join(startPath, files[i]),
                stat = fs.lstatSync(filename);

            // Check the current item's type
            if (stat.isDirectory()) {

                // Should this directory be blocked?
                var shouldBlock = (blacklists.default.indexOf(filename) != -1);

                // Check the blacklists
                // Start a loop to look through all the filter extensions
                for (var i2 = 0; i2 < filterExtensions.length; i2++) {

                    if (filterExtensions[i2] === ".html") {

                        // Save the condition
                        shouldBlock = (blacklists.html.indexOf(filename) != -1);

                        // End this check loop
                        i2 = filterExtensions.length;

                    } else if (filterExtensions[i2] === ".js") {

                        // Save the condition
                        shouldBlock = (blacklists.js.indexOf(filename) != -1);

                        // End this check loop
                        i2 = filterExtensions.length;

                    } else if (filterExtensions[i2] === ".css") {

                        // Save the condition
                        shouldBlock = (blacklists.css.indexOf(filename) != -1);

                        // End this check loop
                        i2 = filterExtensions.length;

                    }

                }

                // Start a new path in this recursive loop
                if (!shouldBlock) {

                    this.scanDirectory(filename, filterExtensions, callback);

                }

            } else {

                // Start a loop to look through all the filter extensions
                for (var i2 = 0; i2 < filterExtensions.length; i2++) {

                    // Check if the current filter extension matches the current file's extension
                    if (filename.indexOf(filterExtensions[i2]) == filename.length - filterExtensions[i2].length) {

                        // Run the callback function
                        callback(filename);

                        // End this check loop
                        i2 = filterExtensions.length;

                    }

                }

            };

        };

    }

};