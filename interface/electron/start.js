/*

    Manage the Electron version of this codebase

*/

// Cache the code
require('v8-compile-cache');

// Get all the required modules
const {

    app,
    BrowserWindow,
    nativeTheme,
    session,
    ipcMain

} = require('electron'),
    path = require('path'),
    sharedVariables = {

        lastRedirectURL: path.join(__dirname, "..", "page", "home/").replace(/\\/g, "/")

    };

// Define the window variable
var currentWindow;

// Do all the things Apache does
function imitateApache() {

    // Define the page root paths
    const pageRootPath = path.join(__dirname, "..", "page/").replace(/\\/g, "/"),
        layoutPath = path.join(__dirname, "..", "layout.html").replace(/\\/g, "/");

    // Keep watching the files handler
    session.defaultSession.webRequest.onBeforeRequest({ urls: [] }, (details, callback) => {

        var redirect = false;

        // Set the default directory index file to "index.html"
        if (details.url.indexOf("file:") != -1 && details.url[details.url.length - 1] === "/") {

            details.url += "index.html";

            redirect = true;

        }

        // Redirect the files in "/page/*" to "/pages/*"
        if (details.url.indexOf(pageRootPath) != -1) {

            details.url = layoutPath;

            redirect = true;

        }

        // Debug
        if (redirect)
            console.log(`\nURL: ${details.url}\n`);

        // Call the `callabck` function
        callback((redirect) ? {
            redirectURL: details.url
        } : {});

    });

    // Keep track of the redirected URLs
    session.defaultSession.webRequest.onBeforeRedirect({ urls: [] }, (details) => {

        // Update the `lastRedirectURL` shared variable
        sharedVariables.lastRedirectURL = details.url;

    });

}

// Create a window
function createWindow() {

    // Create a `BrowserWindow` object
    currentWindow = new BrowserWindow({

        webPreferences: {

            devTools: true, // Debug: "true", production: "false"
            preload: path.join(__dirname, 'preload.js'),
            defaultFontFamily: {
                standard: "Istok Web",
                serif: "Istok Web",
                sansSerif: "Istok Web",
                monospace: "Istok Web",
                cursive: "Istok Web",
                fantasy: "Istok Web"
            },
            defaultMonospaceFontSize: 12,
            autoplayPolicy: "no-user-gesture-required",
            enableWebSQL: false,
            v8CacheOptions: "bypassHeatCheckAndEagerCompile"

        },

        frame: false,
        show: false,
        minWidth: 860,
        minHeight: 500,
        width: 900,
        height: 600,
        backgroundColor: (nativeTheme.shouldUseDarkColors) ? '#252525' : '#e8e8e8',
        //titleBarStyle: 'hidden',
        center: true,
        fullscreenable: false,
        title: "MyStore",
        icon: path.join(__dirname, '..', 'assets', 'media', 'logo', 'apple-touch-icon.png')

    });

    // Load the home page
    currentWindow.loadFile(path.join(__dirname, '..', 'layout.html'));

    currentWindow.webContents.on('did-finish-load', function() {

        // Show the window
        currentWindow.show();

        // Maximise the window
        currentWindow.maximize();

    });

};

// Wait for the app to load
app.whenReady().then(() => {

    // Set up the apache imitation
    imitateApache();

    // Create a window
    createWindow();

    // Re-create a window in the app on macOS
    app.on('activate', function() {

        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();

    });

    // Keep track of the window's state
    currentWindow.on('maximize', (e) => {

        currentWindow.webContents.send('window-change', true);

    });
    currentWindow.on('unmaximize', (e) => {

        currentWindow.webContents.send('window-change', false);

    });

});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', function() {

    if (process.platform !== 'darwin')
        app.quit();

});

// Manage the shared variables
ipcMain.on('variable-request', function(event, arg) {

    // Send the shared variable value
    event.sender.send('variable-reply', sharedVariables[arg]);

});

// Check files
ipcMain.on('file-exists', function(event, arg) {

    // Send the shared variable value
    event.sender.send('file-status-reply', fs.existsSync(arg));

});

// Manage the window controls events
ipcMain.on('window-close', function(event) {

    currentWindow.close();

});
ipcMain.on('window-max', function(event) {

    // Check if the window is maximised or not
    if (currentWindow.isMaximized()) {

        currentWindow.restore();

    } else {

        currentWindow.maximize();

    }

});
ipcMain.on('window-hide', function(event) {

    currentWindow.minimize();

});