/*

    Manage the search bar

*/


// Get the needed elements
var searchBackButton = document.getElementById("button--searchback"),
    searchVoiceButton = document.getElementById("button--searchvoice"),
    searchBar = document.getElementById("component--search");

// Check if this is a small device that supports touch input
if (window.platform.hardware.display.isTouchCapable && window.platform.special.dynamic.isWindowSmall()) {

    // Handle the events of the search bar
    searchBar.onclick = function() {

        document.documentElement.dataset.usingSearch = true;

    };
    searchBar.onblur = function() { // Debug

        document.documentElement.dataset.usingSearch = false;

    };

}