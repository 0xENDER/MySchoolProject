// Wait for the page content ot be injected
pageContentElement.oncontentinjection = function() {

    // Make some changes to this file
    document.getElementById("homepage--cover-suggestions").scrollTo({

        top: 0,
        left: 0,
        behavior: 'auto'

    });

};

// Wait for the whole page to finish loading
pageContentElement.onpagecontentload = function() {

    // Load the whole page
    window.load();

};