/*

    Minify all HTML files in the 'apps_codebase/' directory

*/

// Get all the required modules for this process
const minify = require('html-minifier').minify,
    path = require("path"),
    fs = require("fs"),
    scan = require("./scan");

// Scan the 'apps_codebase/' directory
scan.scanDirectory(path.join(__dirname, "..", "apps_codebase"), ".html", function(fileDirectory) {

    // Get the content of this file
    var textContent = fs.readFileSync(fileDirectory, "utf8");

    // Minify the content of this file
    var minifiedContent = minify(textContent, {

        caseSensitive: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true

    });

    // Save the new minified content
    fs.writeFileSync(fileDirectory, minifiedContent);

    // Delete the used variables
    delete textContent, minifiedContent;

});