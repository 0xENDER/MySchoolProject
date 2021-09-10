// This file is used to keep track of all the data that is
// related to the platform this website is running on!

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
    isApp: (window.location.protocol.indexOf("http") == -1), // Is this website open as an app?
    // ^^^ If this was opened as an app, the protocol ^^^
    // ^^^ of the page would not be set to "http(s)"! ^^^
    special: {
        intervalRefreshRate: 25 // The minimal interval refresh rate allowed on this device (ms)
    },
    more: { // If this is an app, that means you can get more info about the platform!
        //
    }
};


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

if (window.platform.isApp) { // If this is an app, do some checks that are related to the `more` sub-object

    //

}