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
    server: (isApp) ? "https://store.mur-lang.org" : window.location.origin,

    special: {

        intervalRefreshRate: 15, // The minimal interval refresh rate allowed on this device (ms)
        scrollSpace: 25, // The value of how much the scrollbar buttons scroll when clicked (content pixels)
        scrollLockPeriod: 400, // The time need to lock a scrollbar button
        startAgreementDelay: 100

    },

    rendering: { // Rendering-related variables

        isBlink: (window.chrome != undefined || (window.Intl && Intl.v8BreakIterator != undefined)) && 'CSS' in window,
        isGecko: navigator.userAgent.toLowerCase().indexOf('gecko') != -1 && navigator.userAgent.toLocaleLowerCase().indexOf("like gecko") == -1,
        isWebKit: navigator.userAgent.toLocaleLowerCase().indexOf('applewebkit') != -1

    },

    more: { // If this is an app, that means you can get more info about the platform!

        isElectron: (isApp && window.api != null) // Is this version of the codebase running on Rlectron?

    },

    hardware: {

        hasTouchScreen: window.matchMedia != undefined && window.matchMedia("(pointer: coarse)").matches, // Does this device have a touch screen?
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

    });

    // Set the new "LastVisitVersion" value
    localStorage.setItem("LastVisitVersion", window.platform.codebase.version);

}


// Start analysing the user agent string

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
    navigator.appVersion.indexOf("armv8") != -1)

    window.platform.architecture.is64 = true;

else if (navigator.appVersion.indexOf("x86_32") != -1 ||
    navigator.appVersion.indexOf("x86") != -1 ||
    navigator.appVersion.indexOf("x32") != -1 ||
    navigator.appVersion.indexOf("armv7") != -1)

    window.platform.architecture.is32 = true;

else
    window.platform.architecture.isOther = true;

if (navigator.appVersion.indexOf("armv") != -1)
    window.platform.architecture.isARM = true;

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
/*document.documentElement.dataset.lowPerformance = (window.platform.hardware.CPU.logicalProcessors != null && window.platform.hardware.memory.capacity != null) ? ((
    window.platform.hardware.memory.capacity != null && window.platform.hardware.memory.capacity <= 8
) || (
    window.platform.hardware.CPU.logicalProcessors <= 8
)) : true;*/