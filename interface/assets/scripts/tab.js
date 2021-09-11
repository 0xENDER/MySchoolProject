// If this device has a touch screen, you should always enable the outline!
if (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0)) {

    document.documentElement.dataset.tab = true;

} else {

    /* Detect when the tab button is used, and when it's not! */

    document.addEventListener('mousedown', function() {
        document.documentElement.dataset.tab = false;
    });

    document.addEventListener('keydown', function(e) {
        if (e.code === "Tab") {
            console.log(e);
            document.documentElement.dataset.tab = true;
        }
    });

}