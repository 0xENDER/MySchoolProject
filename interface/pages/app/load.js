/*

    Load the page content

*/

// Wait for the page content ot be injected
window.oncontentinjection = function() {

    // Uncover the content
    window.uncover();

};

// Wait for the whole page to finish loading
window.onpagecontentload = function() {

    // Update the cover
    pageBackgroundElement.src = "./assets/media/placeholder_cover.svg";

    // Load the whole page
    window.load();

};

// Add an unloading function
window.unloading.append(function() {

    console.log("Oh no! (2)");

});