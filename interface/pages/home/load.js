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

    // Debug
    var tmp1 = document.getElementsByClassName("homepage--coversuggestions-card"),
        tmp2 = document.getElementsByClassName("suggestions--card");
    for (var i = 0; i < tmp1.length; i++) {
        tmp1[i].dataset.loaded = true;
    }
    for (var i = 0; i < tmp2.length; i++) {
        for (var i2 = 0; i2 < tmp2[i].children.length; i2++) {
            tmp2[i].children[i2].dataset.loaded = true;
        }
    }

    homepageCoverEffect();

    // Load the whole page
    window.load();

};

// Add an unloading function
window.unloading.append(function() {

    console.log("Oh no!");

});