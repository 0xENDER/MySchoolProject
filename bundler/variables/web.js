/*

    Replace all the custom variables in the web version of the codebase

*/

// Get all the required modules for this process
const path = require("path"),
    replaceVariables = require("./module");

// Call the custom variables module
replaceVariables(
    path.join(__dirname, "..", "builds", "web/"), [
        ".js", ".html", ".css", ".webmanifest", ".htaccess", ".xml", ".txt", ".server"
    ],
    "web",
    process.argv[2] == 1
);