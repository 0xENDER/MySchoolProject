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

            path.join(__dirname, "..", "apps_codebase", "pages")

        ],
        js: [ // A blacklist for JavaScript files

        ],
        css: [ // A blacklist for CSS files

        ]

    };

// Define the module object
module.exports = {

    // A recursive function to scan a directory for a certain type of files
    scanDirectory: function(startPath, filterExtension, callback) {

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
                var shouldBlock = false;

                // Check the blacklists
                if (filterExtension === ".html") {

                    shouldBlock = (blacklists.html.indexOf(filename) != -1);

                } else if (filterExtension === ".js") {

                    shouldBlock = (blacklists.js.indexOf(filename) != -1);

                } else if (filterExtension === ".css") {

                    shouldBlock = (blacklists.css.indexOf(filename) != -1);

                } else {

                    shouldBlock = (blacklists.default.indexOf(filename) != -1);

                }

                // Start a new path in this recursive loop
                if (!shouldBlock) {

                    this.scanDirectory(filename, filterExtension, callback);

                }

            } else if (filename.indexOf(filterExtension) == filename.length - filterExtension.length) {

                // Run the callback function
                callback(filename);

            };

        };

    }

};