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
    ipcMain,
    shell

} = require('electron'),
    path = require('path'),
    sharedVariables = {

        lastRedirectURL: path.join(__dirname, "..", "page", "home/").replace(/\\/g, "/")

    };

// Disable hardware acceleration
app.disableHardwareAcceleration();

// Limit the RAM usage
app.commandLine.appendSwitch('js-flags', '--max-old-space-size=64');

// Define the window variable
var currentWindow;

// Do all the things Apache does
function imitateApache() {

    // Define the page root paths
    const pageRootPath = path.join(__dirname, "..", "page/").replace(/\\/g, "/"),
        layoutPath = path.join(__dirname, "..", "layout.html").replace(/\\/g, "/");

    // Keep watching the files handler
    session.defaultSession.webRequest.onBeforeRequest({ urls: [] }, (details, callback) => {

        var redirect = false,
            newURL = "file://";

        // Set the default directory index file to "index.html"
        if (details.url.indexOf("file:") != -1 && details.url[details.url.length - 1] === "/") {

            newURL += path.join(details.url, "index.html");

            redirect = true;

        }

        // Redirect the files in "/page/*" to the main layout page
        if (details.url.indexOf(pageRootPath) != -1) {

            newURL = "file://" + layoutPath;

            redirect = true;

        }

        // Call the `callabck` function
        callback((redirect) ? {
            redirectURL: newURL
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

            devTools: false, // Debug: "true", production: "false"
            preload: path.join(__dirname, 'preload.js'),
            defaultFontFamily: {
                standard: "Didact Gothic",
                serif: "Didact Gothic",
                sansSerif: "Didact Gothic",
                monospace: "Didact Gothic",
                cursive: "Didact Gothic",
                fantasy: "Didact Gothic"
            },
            //defaultFontSize: 18,
            defaultMonospaceFontSize: 13,
            autoplayPolicy: "no-user-gesture-required",
            enableWebSQL: false,
            nativeWindowOpen: true

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
        title: "%{{global:appInfo.name}}%",
        icon: path.join(__dirname, '..', 'assets', 'media', 'logo', 'apple-touch-icon.png')

    });

    // Load the home page
    currentWindow.loadFile(path.join(__dirname, '..', 'layout.html'));

    // Maximise and show the window on the first load
    var didLoad = false;
    currentWindow.webContents.on('did-finish-load', function() {

        if (!didLoad) {

            didLoad = true;
            // Show the window
            currentWindow.show();

            // Maximise the window
            currentWindow.maximize();

        }

    });

    // Manage windows
    currentWindow.webContents.setWindowOpenHandler(({ url }) => {

        // Check if this is a login-related page
        if (url.startsWith('%{{server:AccountsURL}}%')) {

            var shouldAllow = false;

            // Check if this page is one of the allowed login pages
            [

                "%{{server:AccountsURL}}%/sign",
                "%{{server:AccountsURL}}%/auth"

            ].forEach(item => {

                if (url.startsWith(item)) {

                    // Accept the new window request
                    shouldAllow = true;

                }

            });

            if (shouldAllow) {

                // Accept the new window request
                return { action: 'allow' }

            } else {

                // Open this page in the default browser
                shell.openExternal(url);

                // Deny the new window request
                return { action: 'deny' }

            }

        } else {

            // Open this page in the default browser
            shell.openExternal(url);

            // Deny the new window request
            return { action: 'deny' };

        }

    });
    currentWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {

        // Prevent electron from opening a new window
        event.preventDefault();

        // Change the window options
        Object.assign(options, {

            parent: currentWindow,
            show: true,
            modal: true,
            webPreferences: {

                nodeIntegration: false,
                nodeIntegrationInSubFrames: false,
                contextIsolation: true,
                webviewTag: false

            }

        });

        // Create a new window
        event.newGuest = new BrowserWindow(options);

        // Remove the menu of the new window
        event.newGuest.removeMenu();

        // Center the new window
        event.newGuest.center();

    });

    // Manage permissions
    currentWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {

        // Get the page URL
        var url = webContents.getURL();

        // Check if this is a local file
        if (url.startsWith("file://")) {

            if (false) { // Debug

                // Approve the permission request
                callback(true);

            } else {

                // Deny the permission request
                callback(false);

            }

        } else {

            // Deny the permission request
            callback(false);

        }

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