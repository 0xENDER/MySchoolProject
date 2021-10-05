/*

    Generate a sitemap

*/


// Get the required modules
const scan = require("./scan"),
    path = require("path"),
    scanDirectory = path.join(__dirname, "..", "builds", "web");

// Scan all the '/web' build directory and organise all html files into a sitemap
scan.scanDirectory(scanDirectory, [".html"], function(fileDirectory) {

    console.log(fileDirectory);

});