/*

    Manage the search bar

*/


// Get the needed elements
var searchBackButton = document.getElementById("button--searchback"),
    searchVoiceButton = document.getElementById("button--searchvoice"),
    searchBar = document.getElementById("component--search"),
    searchContainer = document.getElementById("search--container");

// Show the search interface
function showSearch() {

    // Check if this device has a small screen
    if (window.platform.special.dynamic.isWindowSmall()) {

        // Show the mobile search interface
        document.documentElement.dataset.usingSearch = true;

    } else {

        // Show the search container
        searchContainer.style.display = "block";

    }

    // Make sure that the search bar is focused
    searchBar.focus();

}

// Handle the events of the search bar
searchBar.onmousedown = showSearch;
searchBar.ontouchstart = showSearch;
searchBar.onkeyup = function() {

    // Check if the search bar is focused
    if (document.activeElement == searchBar) {

        // Show the search interface
        showSearch();

    } else {

        // Hide the mobile search interface
        document.documentElement.dataset.usingSearch = false;

    }

};
searchBar.onblur = function() { // Debug

    // Hide the mobile search interface
    document.documentElement.dataset.usingSearch = false;

    // Check if this device has a big screen
    if (!window.platform.special.dynamic.isWindowSmall()) {

        // Hide the search container
        searchContainer.style.display = null;

    }

};