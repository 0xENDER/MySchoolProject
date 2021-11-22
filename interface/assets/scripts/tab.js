/*

    Manage the "tab" button

*/

// If this device has a touch screen, you should always enable the outline!
if (userSettings.alwaysShowFocusBorderOnTouch && (('ontouchstart' in window) ||
        ("maxTouchPoints" in navigator && navigator.maxTouchPoints > 0) ||
        ("msMaxTouchPoints" in navigator && navigator.msMaxTouchPoints > 0))) {

    document.documentElement.dataset.tab = true;

} else {

    /* Detect when the tab button is used, and when it's not! */

    document.addEventListener('mousedown', function() {

        document.documentElement.dataset.tab = false;

    }, window.performanceVariables.objects.passiveEvent);

    document.addEventListener('keydown', function(e) {

        if (e.code === "Tab") {

            document.documentElement.dataset.tab = true;

        }

    }, window.performanceVariables.objects.passiveEvent);

}