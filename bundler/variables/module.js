/*

    The custom variables module

*/

// Get all the required modules for this process
const path = require("path"),
    scan = require("./../scan"),
    fs = require("fs"),
    dataPath = path.join(__dirname, "..", "..", "data"),
    dataRegex = /%{{(.*)}}%/g,
    dataSplitRegex = /(%{{.*?}}%)/, // /(?<=%{{)(.*?)(?=}}%)/
    data = {
        interface: JSON.parse(fs.readFileSync(path.join(dataPath, "interface.json"), "utf8"))
    };

// Define the module object
module.exports = function(directory, filterExtensions, variableType) {

    scan.scanDirectory(directory, filterExtensions, function(fileDirectory) {

        // Get the content of this file
        var textContent = fs.readFileSync(fileDirectory, "utf8");

        // Search for custom variables
        var matchResult = dataRegex.exec(textContent),
            processedTextContent = textContent;
        if (matchResult != null) { // This file contains some custom variables

            var innerSplitRegex = /%{{(.*):(.*)}}%/,
                splitTextContent = textContent.split(dataSplitRegex),
                processedTextContent = "";

            // Go through the split content
            for (var i = 0; i < splitTextContent.length; i++) {

                if (splitTextContent[i].indexOf("%{{") == 0) {

                    // Insert the value of the variable
                    var variable = splitTextContent[i].split(innerSplitRegex).filter(value => value != '');
                    if (variable.length == 2) {

                        // Define the needed variables for this process
                        var splitValue = variable[1].split("."),
                            variableValue = data.interface;

                        // Get through the path of the variable
                        for (var i2 = 0; i2 < splitValue.length; i2++) {

                            variableValue = variableValue[splitValue[i2]];

                        }

                        // Get the variable value (according to the passed variable "type")
                        variableValue = variableValue[(variableType != null && variableType != undefined) ? variableType : "default"];

                        // Check if this variable is defined
                        if (variableValue != undefined && variableValue != null) {

                            // Insert the variable's value
                            processedTextContent += variableValue;

                        } else {

                            throw new Error(`"Undefined custom variable! (${splitTextContent[i]}>::${(variableType != null && variableType != undefined) ? variableType : "default"})"`);

                        }

                    } else {

                        // This is an invalid variable
                        throw new Error(`"Invalid custom variable format! (${splitTextContent[i]})"`);

                    }

                } else {

                    // Reinsert the normal text content
                    processedTextContent += splitTextContent[i];

                }

            }

        }

        // Save the new content
        fs.writeFileSync(fileDirectory, processedTextContent);

        delete match;

    });

};