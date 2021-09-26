/*

    (!: Unused) The components module

*/

// Get all the required modules for this process
const path = require("path"),
    scan = require("./../scan"),
    fs = require("fs"),
    interfacePath = path.join(__dirname, "..", "..", "interface"),
    componentsPath = path.join(interfacePath, "components");

// Define the module object
module.exports = function(componentType) {

    // Start Scanning
    scan.scanDirectory(interfacePath, [".html"], function(fileDirectory) {

        // Get the content of this file
        console.log(fileDirectory);
        var textContent = fs.readFileSync(fileDirectory, "utf8");

        // Loop for component calls inside the file
        var splitTextContent = textContent.split(/(<component:.*?\/>)/g, "");
        console.log(splitTextContent);
        //<component:window-controls/>
        //#typestart <type>
        //#typeend <type>

        /*
        // Get the component path
        var componentPath = path.join(componentsPath, `${componentName}.html`);

        // Check if the component exists
        if (fs.existsSync(componentPath)) {

        } else {

            // Throw an error!
            throw new Error("Can not find the required component!");

        }
        */

    });

};