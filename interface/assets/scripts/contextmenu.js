/*

    Manage the context menu

*/


// Detect any attempt to access the context menu
window.oncontextmenu = function(event) {

    var tagName = event.path[0].tagName;

    // Check if the current element is an input or if it has some selected text inside
    if (tagName != "INPUT" && !(event.path[0].hasAttribute("enable-select") && window.getSelection().toString() != "")) {

        event.preventDefault();

    }

};