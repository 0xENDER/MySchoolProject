/*

    Manage browser APIs that are not the same on all browsers

*/


// Define the `crossBrowser` global object
window.crossBrowser = {

    connection: {
        supported: false,
        api: navigator.connection || navigator.mozConnection || navigator.webkitConnection
    }

};

// Update the APIs status
window.crossBrowser.connection.supported = window.crossBrowser.connection.api != undefined && window.crossBrowser.connection.api;