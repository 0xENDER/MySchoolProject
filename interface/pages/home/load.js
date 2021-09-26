pageContentElement.onpagecontentload = function() {

    // Make some changes to this file
    document.getElementById("homepage--cover-suggestions").scrollTo({

        top: 0,
        left: 0,
        behavior: 'auto'

    });

    // Load the whole page
    window.load();

};