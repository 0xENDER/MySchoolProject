/*

    Manage the context menu

*/


// Detect any attempt to access the context menu
window.oncontextmenu = function(event) {

    // Get the tag name of the target element
    var tagName = event.target.tagName;

    // Check if the current element is not an input or if it does not have selected text inside
    if (tagName != "INPUT" && !(event.target.hasAttribute("enable-select") && window.getSelection().toString() != "")) {

        event.preventDefault();

    }

};