/*

    Preload some content

*/

// Import the required modules
const {

    contextBridge,
    ipcRenderer

} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(

    // Define "window.api"
    "api", {

        // Enable the page content to send data to the main process
        send: (channel, data) => {

            // Whitelist send channels
            let validChannels = ["variable-request"];
            if (validChannels.includes(channel)) {

                // Send the data to the main process
                ipcRenderer.send(channel, data);

            }

        },

        // Enable the page content to receive data from the main process
        receive: (channel, callback) => {

            // Whitelist receive channels
            let validChannels = ["variable-reply"];
            if (validChannels.includes(channel)) {

                // Wait for the data from the main process
                ipcRenderer.on(channel, (event, ...args) => {

                    // Return all the arguments except for the `event` argument
                    callback(...args);

                });

            }

        }

    }

);