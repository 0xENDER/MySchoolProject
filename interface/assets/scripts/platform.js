/*

    Keep track of all the data that is related to the
    platform this website is running on!

*/

// Helping variables
var isApp = window.location.protocol.indexOf("http") == -1;

window.platform = { // An object to keep track and organise the platform data

    type: { // The type

        isMac: false, // Is this a mac?
        isWindows: false, // Is this a Windows?
        isLinux: false, // Is this a Linux?
        isUnix: false, // Is Unix OS?
        isChromeOS: false,
        isAndroid: false, // Is this an Android?
        isIOS: false, // Is this an iPhone/iPad?
        isOther: false

    },

    architecture: { // The architecture of the CPU

        is64: false, // Is this a 64-bit processor?
        is32: false, // Is this a 32-bit processor?
        isARM: false, // Is this an ARM processor?
        isOther: false // This usually means that the user agent string does
            // not include a sufficient amount of data!

    },

    isApp: isApp, // Is this website open as an app?
    // ^^^ If this was opened as an app, the protocol ^^^
    // ^^^ of the page would not be set to "http(s)"! ^^^

    // The server address
    servers: {

        store: "%{{server:url}}%",
        accounts: "%{{server:AccountsURL}}%"

    },

    special: {

        intervalRefreshRate: 15, // The minimal interval refresh rate allowed on this device (ms)
        scrollSpace: 25, // The value of how much the scrollbar buttons scroll when clicked (content pixels)
        scrollLockPeriod: 400 // The time need to lock a scrollbar button

    },

    rendering: { // Rendering-related variables

        isBlink: (window.chrome != undefined || (window.Intl && Intl.v8BreakIterator != undefined)) && 'CSS' in window,
        isGecko: navigator.userAgent.toLowerCase().indexOf('gecko') != -1 && navigator.userAgent.toLocaleLowerCase().indexOf("like gecko") == -1,
        isWebKit: navigator.userAgent.toLocaleLowerCase().indexOf('applewebkit') != -1

    },

    more: { // If this is an app, that means you can get more info about the platform!

        isElectron: (isApp && window.api != null) // Is this version of the codebase running on Rlectron?

    },

    device: {

        isTablet: false,
        isMobile: false,
        isConsole: false,
        isDesktop: false

    },

    hardware: {

        hasTouchScreen: ( // Does this device have a touch screen?
            (window.matchMedia != undefined && (window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in document.documentElement)) ||
            (window.navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0)
        ),
        hasMouse: window.matchMedia != undefined && matchMedia('(pointer:fine)').matches,
        hasKeybord: false,
        controllers: {

            hasController: false,
            number: 0

        },
        connection: {

            effectiveType: (window.crossBrowser.connection.supported && 'effectiveType' in window.crossBrowser.connection.api) ? window.crossBrowser.connection.api.effectiveType : null // 'slow-2g', '2g', '3g', or '4g'.

        },
        supportsBluetooth: 'bluetooth' in navigator,
        memory: {

            capacity: ('deviceMemory' in navigator) ? navigator.deviceMemory : null

        },
        CPU: {

            logicalProcessors: ('hardwareConcurrency' in navigator) ? navigator.hardwareConcurrency : null

        }

    },

    codebase: { // Info about this current codebase of the website/app

        root: (isApp) ? "" : "/", // The root of this version of the codebase
        index: "/index.html", // The index file of directories
        version: document.documentElement.dataset.version // The current version of the codebase

    }

};

delete isApp;

// Check if the "LastVisitVersion" value is set
if (localStorage.getItem("LastVisitVersion") == null) {

    localStorage.setItem("LastVisitVersion", window.platform.codebase.version);

}

// Check the last version of this website the user used
if (localStorage.getItem("LastVisitVersion") != window.platform.codebase.version) {

    // Delete the old cache
    caches.keys().then((keys) => {

        for (var i = 0; i < keys.length; i++)
            caches.delete(keys[i]);

    }).finally(function() {

        // Set the new "LastVisitVersion" value
        localStorage.setItem("LastVisitVersion", window.platform.codebase.version);

    });

}

// Get the device type (modified version of https://github.com/PoeHaH/devicedetector/blob/master/devicedetector-production.js)
var userAgent = navigator.userAgent.toLowerCase();
if (/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent)) {

    window.platform.device.isTablet = true;
    document.documentElement.dataset.deviceType = "tablet";

} else if (/(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(userAgent)) {

    window.platform.device.isMobile = true;
    document.documentElement.dataset.deviceType = "mobile";

} else if (/(xbox|playstation|nintendo)/.test(userAgent)) {

    window.platform.device.isConsole = true;
    document.documentElement.dataset.deviceType = "console";

} else {

    window.platform.device.isDesktop = true;
    document.documentElement.dataset.deviceType = "desktop";

}

// Detect the user's OS
if (navigator.appVersion.indexOf("Win") != -1)

    window.platform.type.isWindows = true;

else if (navigator.appVersion.indexOf("Android") != -1)

    window.platform.type.isAndroid = true;

else if (navigator.appVersion.indexOf("iPhone OS") != -1)

    window.platform.type.isIOS = true;

else if (navigator.appVersion.indexOf("Mac") != -1) // Order is important! (The iOS user agent string also has "Mac" in it)

    window.platform.type.isMac = true;

else if (navigator.appVersion.indexOf("CrOS") != -1)

    window.platform.type.isChromeOS = true;

else if (navigator.appVersion.indexOf("X11") != -1)

    window.platform.type.isUnix = true;

else if (navigator.appVersion.indexOf("Linux") != -1)

    window.platform.type.isLinux = true;

else

    window.platform.type.isOther = true;

// Check the processor architecture
if (navigator.appVersion.indexOf("x86_64") != -1 ||
    navigator.appVersion.indexOf("x64") != -1 ||
    navigator.appVersion.indexOf("armv8") != -1) {

    window.platform.architecture.is64 = true;

} else if (navigator.appVersion.indexOf("x86_32") != -1 ||
    navigator.appVersion.indexOf("x86") != -1 ||
    navigator.appVersion.indexOf("x32") != -1 ||
    navigator.appVersion.indexOf("armv7") != -1) {

    window.platform.architecture.is32 = true;

} else {

    window.platform.architecture.isOther = true;

}
if (navigator.appVersion.indexOf("armv") != -1) {

    window.platform.architecture.isARM = true;

}

// Get info about the user's hardware
function updateGamepads() {

    // Get all the available gamepads
    var gamepads = navigator.getGamepads();

    // Go through the list of gamepads (max 4, use `.length` as a precaution)
    for (var i = 0; i < gamepads.length; i++) {

        if (gamepads[i] != null) {

            window.platform.hardware.controllers.number++;

        }

    }
    window.platform.hardware.controllers.hasController = window.platform.hardware.controllers.number != 0;

    // Delete all the used variables
    delete gamepads;

}
window.addEventListener("gamepadconnected", updateGamepads);
window.addEventListener("gamepaddisconnected", updateGamepads);
updateGamepads();

// Get info about the user's hardware (web & native)
if (!window.platform.isApp) {

    if (!window.platform.device.isMobile) {

        function detectKeybordEvent() {

            // Change the keybord hardware value
            window.platform.hardware.hasKeybord = true;

            // Remove the event listeners
            window.removeEventListener("keydown", detectKeybordEvent);
            window.removeEventListener("keyup", detectKeybordEvent);

        }

        // Add the event listeners
        window.addEventListener("keydown", detectKeybordEvent);
        window.addEventListener("keyup", detectKeybordEvent);

    }

} else {

    //...
    //Use the custom window.hardware API!!!!

}

// Note: `navigator.appVersion` is gonna get replaced by `navigator.userAgentData` soon
// Migrate to `navigator.userAgentData` once it's supported by all modern browsers!

// If this is an app, do some checks that are related to the `more` sub-object
if (window.platform.isApp) {

    // Check if this is a mac
    if (window.platform.type.isMac) {

        // Change the document data set to apply the appropriate style for the title bar controls
        document.documentElement.dataset.mac = true;

    }

}

// Rendering-related actions
if (window.platform.rendering.isBlink) {

    document.documentElement.dataset.renderingEngine = "blink";

} else if (window.platform.rendering.isGecko) {

    document.documentElement.dataset.renderingEngine = "gecko";

} else if (window.platform.rendering.isWebKit) {

    document.documentElement.dataset.renderingEngine = "webkit";

} else {

    document.documentElement.dataset.renderingEngine = "unknown";

}