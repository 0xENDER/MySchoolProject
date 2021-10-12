/*

    Preload some content

*/

// Import the required modules
const {

    contextBridge,
    ipcRenderer

} = require("electron");

// Set the window controls events
window.addEventListener('DOMContentLoaded', function() {

    // Define needed variables
    var iconOne = document.getElementById("windowcontrols--max-iconOne"),
        iconTwo = document.getElementById("windowcontrols--max-iconTwo");

    ipcRenderer.on("window-change", (event, isMax) => {

        if (isMax) {

            iconOne.style.display = "none";
            iconTwo.style.display = null;

        } else {

            iconOne.style.display = null;
            iconTwo.style.display = "none";

        }

    });

    // Get all the title bar buttons
    var hideButton = document.getElementById("windowcontrols--hide"),
        maxButton = document.getElementById("windowcontrols--max"),
        closeButton = document.getElementById("windowcontrols--close");

    // Set the `onclick` event of the minimise button
    hideButton.onclick = function() {

        ipcRenderer.send("window-hide");

    };

    // Set the `onclick` event of the maximise button
    maxButton.onclick = function() {

        ipcRenderer.send("window-max");

    };

    // Set the `onclick` event of the close button
    closeButton.onclick = function() {

        ipcRenderer.send("window-close");

    };

});

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(

    // Define "window.api"
    "api", {

        // Enable the page content to send data to the main process
        send: (channel, data) => {

            // Whitelist send channels
            let validChannels = ["variable-request", "file-exists"];
            if (validChannels.includes(channel)) {

                // Send the data to the main process
                ipcRenderer.send(channel, data);

            }

        },

        // Enable the page content to receive data from the main process
        receive: (channel, callback) => {

            // Whitelist receive channels
            let validChannels = ["variable-reply", "file-status-reply"];
            if (validChannels.includes(channel)) {

                // Define a request callback function
                var receiveCallback = (event, ...args) => {

                    // Remove this listener
                    ipcRenderer.removeListener(channel, receiveCallback);

                    // Return all the arguments except for the `event` argument
                    callback(...args);

                };

                // Wait for the data from the main process
                ipcRenderer.on(channel, receiveCallback);

            }

        }

    }

);