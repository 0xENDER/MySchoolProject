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