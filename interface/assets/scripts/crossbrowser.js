/*

    Manage browser APIs that are not the same on all browsers

*/


// Define the `crossBrowser` global object
window.crossBrowser = {

    connection: {

        supported: false,
        api: navigator.connection || navigator.mozConnection || navigator.webkitConnection

    },
    passiveEvents: {

        supported: false

    },
    speechRecognition: {

        supported: false,
        object: undefined

    },
    userAgentData: {

        supported: "userAgentData" in navigator && "getHighEntropyValues" in navigator.userAgentData

    }

};

// Update the APIs' status
window.crossBrowser.connection.supported = window.crossBrowser.connection.api != undefined && window.crossBrowser.connection.api != null;
window.crossBrowser.speechRecognition.supported =
    (window.api != null) ? // Check if this is electron!
    false : // The speech recognition object does not work properly on Electron
    ("webkitSpeechRecognition" in window || "SpeechRecognition" in window); // Check if this browser supports the speech recognition object
if (window.crossBrowser.speechRecognition.supported) {

    window.crossBrowser.speechRecognition.object = ("webkitSpeechRecognition" in window) ? webkitSpeechRecognition : SpeechRecognition;

}

// Update the passive event variable
try {

    var opts = Object.defineProperty({}, 'passive', {

        get: function() {

            window.crossBrowser.passiveEvents.supported = true;

        }

    });

    window.addEventListener("testPassive", null, opts);
    window.removeEventListener("testPassive", null, opts);

} catch {}

// Update the viewport across mobile devices
if ('ontouchstart' in document.documentElement) {

    document.documentElement.style.setProperty('--ivh', `${ window.innerHeight / 100 }px`);

    function updateHeightProperty() {

        document.documentElement.style.setProperty('--vh', `${ window.innerHeight / 100 }px`);

    }
    window.addEventListener('resize', updateHeightProperty, (window.crossBrowser.passiveEvents.supported) ? {

        passive: true

    } : false);
    updateHeightProperty();

}