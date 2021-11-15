/*

    Keep track of all the data that is related to the
    platform this website is running on!

*/

// Helping variables
var isApp = window.location.protocol.indexOf("http") == -1;

// An object to keep track and organise the platform data
window.platform = {

    // The operating system
    operatingSystem: {

        // The OS version
        version: null,

        // The OS name
        name: null,

        // The OS type
        isMac: false, // Is this a mac?
        isWindows: false, // Is this a Windows?
        isLinux: false, // Is this a Linux?
        isUnix: false, // Is Unix OS?
        isChromeOS: false,
        isAndroid: false, // Is this an Android?
        isIOS: false, // Is this an iPhone/iPad?
        isOther: false

    },

    // The architecture of the device
    architecture: {

        is64: false, // Is this a 64-bit processor?
        is32: false, // Is this a 32-bit processor?
        isARM: false, // Is this an ARM processor?
        isOther: false // This usually means that the user agent string does
            // not include a sufficient amount of data!

    },

    // Is this website open as an app?
    isApp: isApp,
    // ^^^ If this was opened as an app, the protocol ^^^
    // ^^^ of the page would not be set to "http(s)"! ^^^

    // The server address
    servers: {

        store: "%{{server:url}}%",
        resources: "%{{server:ResourcesURL}}%",
        accounts: "%{{server:AccountsURL}}%"

    },

    special: {

        intervalRefreshRate: 100, // The minimal interval refresh rate allowed on this device (ms)
        scrollSpace: 25, // The value of how much the scrollbar buttons scroll when clicked (content pixels)
        scrollLockPeriod: 400, // The time need to lock a scrollbar button
        contentLoadingDelay: 110,
        dynamic: {

            isWindowSmall() {

                return window.innerWidth <= 840;

            },
            isUsingDarkTheme() {

                return window.matchMedia('(prefers-color-scheme)').media !== 'not all';

            }

        }

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

        display: {

            isTouchCapable: ( // Does this device have a touch screen?

                (window.matchMedia != undefined && (window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in document.documentElement)) ||
                (window.navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0)

            ),
            width: screen.width,
            height: screen.height

        },
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

// Note: `navigator.appVersion` is gonna get replaced by `navigator.userAgentData` soon
// Migrate to `navigator.userAgentData` once it's supported by all modern browsers!

// Get the user agent
var userAgent = navigator.userAgent.toLowerCase();

// Get the device type (modified version of https://github.com/PoeHaH/devicedetector/blob/master/devicedetector-production.js)
function getDeviceTypeFromUserAgent() {

    // Check the device type
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

}
if (window.crossBrowser.userAgentData.supported) {

    if (navigator.userAgentData.mobile) {

        window.platform.device.isMobile = true;
        document.documentElement.dataset.deviceType = "mobile";

    } else {

        // Fallback to the user agent
        getDeviceTypeFromUserAgent();

    }

} else {

    getDeviceTypeFromUserAgent();

}
delete getDeviceTypeFromUserAgent;

// Detect the user's OS
function getOSFromUserAgent() {

    // Check the user agent
    if (userAgent.indexOf("win") != -1) {

        window.platform.operatingSystem.isWindows = true;
        window.platform.operatingSystem.name = "Windows";

    } else if (userAgent.indexOf("android") != -1) {

        window.platform.operatingSystem.isAndroid = true;
        window.platform.operatingSystem.name = "Android";

    } else if (userAgent.indexOf("iphone os") != -1 || userAgent.indexOf("ipad") != -1) {

        window.platform.operatingSystem.isIOS = true;
        window.platform.operatingSystem.name = "iOS";

    } else if (userAgent.indexOf("mac") != -1) { // Order is important! (The iOS user agent string also has "Mac" in it)

        window.platform.operatingSystem.isMac = true;
        window.platform.operatingSystem.name = "macOS";

    } else if (userAgent.indexOf("cros") != -1) {

        window.platform.operatingSystem.isChromeOS = true;
        window.platform.operatingSystem.name = "Chrome OS";

    } else if (userAgent.indexOf("x11") != -1) {

        window.platform.operatingSystem.isUnix = true;
        window.platform.operatingSystem.name = "Unix";

    } else if (userAgent.indexOf("linux") != -1) {

        window.platform.operatingSystem.isLinux = true;
        window.platform.operatingSystem.name = "Linux";

    } else {

        window.platform.operatingSystem.isOther = true;
        window.platform.operatingSystem.name = "Unknown";

    }

}
if (window.crossBrowser.userAgentData.supported) {

    // Request the "platform" variable
    navigator.userAgentData.getHighEntropyValues([

        "platform"

    ]).then(function(userAgentData) {

        // Get the "platform" variable
        var platform = userAgentData.platform.toLocaleLowerCase();

        // Check the platform name
        if (platform == "windows") {

            window.platform.operatingSystem.isWindows = true;
            window.platform.operatingSystem.name = "Windows";

        } else if (platform == "android") {

            window.platform.operatingSystem.isAndroid = true;
            window.platform.operatingSystem.name = "Android";

        } else if (platform.indexOf("chrome") != -1) {

            window.platform.operatingSystem.isChromeOS = true;
            window.platform.operatingSystem.name = "Chrome OS";

        } else {

            // Fallback to the user agent string
            getOSFromUserAgent();

        }

    });

} else {

    getOSFromUserAgent();

}
delete getOSFromUserAgent;

// Check the OS version
function getOSVersionFromUserAgent() {

    if (window.platform.operatingSystem.isWindows) {

        //

    } else if (window.platform.operatingSystem.isMac) {

        //

    } else if (window.platform.operatingSystem.isChromeOS) {

        //

    } else if (window.platform.operatingSystem.isLinux) {

        //

    } else if (window.platform.operatingSystem.isUnix) {

        //

    } else if (window.platform.operatingSystem.isAndroid) {

        //

    } else if (window.platform.operatingSystem.isIOS) {

        //

    } else {

        window.platform.operatingSystem.version = 0;

    }

}
if (window.crossBrowser.userAgentData.supported) {

    // Request the "platformVersion" variable
    navigator.userAgentData.getHighEntropyValues([

        "platformVersion"

    ]).then(userAgentData => {

        // Get the OS version
        if (typeof userAgentData.platformVersion == "string" && userAgentData.platformVersion != "") {

            window.platform.operatingSystem.version = userAgentData.platformVersion;

        } else {

            // Fallback to the user agent
            getOSVersionFromUserAgent();

        }

    });

} else {

    getOSVersionFromUserAgent();

}
delete getOSVersionFromUserAgent;

// Check the processor architecture
function getArchitectureFromUserAgent() {

    if (userAgent.indexOf("x86_64") != -1 ||
        userAgent.indexOf("x64") != -1 ||
        userAgent.indexOf("armv8") != -1) {

        window.platform.architecture.is64 = true;

    } else if (userAgent.indexOf("x86_32") != -1 ||
        userAgent.indexOf("x86") != -1 ||
        userAgent.indexOf("x32") != -1 ||
        userAgent.indexOf("armv7") != -1) {

        window.platform.architecture.is32 = true;

    } else {

        window.platform.architecture.isOther = true;

    }
    if (userAgent.indexOf("armv") != -1) {

        window.platform.architecture.isARM = true;

    }

}
getArchitectureFromUserAgent();

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

    if (!(window.platform.device.isTablet || window.platform.device.isMobile)) {

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

// If this is an app, do some checks that are related to the `more` sub-object
if (window.platform.isApp) {

    // Check if this is a mac
    if (window.platform.operatingSystem.isMac) {

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