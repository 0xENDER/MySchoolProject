/*

    Load the page content

*/

// Wait for the page content ot be injected
window.oncontentinjection = function() {

    // Make some changes to this file
    document.getElementById("homepage--cover-suggestions").scrollTo({

        top: 0,
        left: 0,
        behavior: 'auto'

    });

    // Uncover the content
    window.uncover();

};

// Wait for the whole page to finish loading
window.onpagecontentload = function() {

    // Load the whole page
    window.load();

};