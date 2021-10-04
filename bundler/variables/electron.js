/*

    Replace all the custom variables in the Electron framework version of the codebase

*/

// Get all the required modules for this process
const path = require("path"),
    replaceVariables = require("./module");

// Call the custom variables module
replaceVariables(path.join(__dirname, "..", "builds", "frameworks", "electron"), [".js", ".html", ".css", ".json", ".sh"], "electron");