/*

    Minify all JSON files in the 'apps_codebase/' directory

*/

// Get all the required modules for this process
const minify = require("jsonminify"),
    path = require("path"),
    fs = require("fs"),
    scan = require("./../scan");

// Scan the 'apps_codebase/' directory
scan.scanDirectory(path.join(__dirname, "..", "apps_codebase"), [".json", ".webmanifest"], function(fileDirectory) {

    // Get the content of this file
    var textContent = fs.readFileSync(fileDirectory, "utf8");

    // Filter out comments
    textContent = textContent.replace(/\/\*.*?\*\//g, "");
    textContent = textContent.replace(/\/\/.*?\n/g, "");

    // Minify the content of this file
    var minifiedContent = minify(textContent);

    // Check if the output is valid for insertion
    if (typeof minifiedContent !== 'string') {

        // Throw an error
        throw new Error(`Minifier output is not valid! (${fileDirectory})`);

    }

    // Save the new minified content
    fs.writeFileSync(fileDirectory, minifiedContent);

    // Delete the used variables
    delete textContent, minifiedContent;

});