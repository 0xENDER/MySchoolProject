/*

    Manage the cover in the main page

*/

// The cover effect function
function homepageCoverEffect() {

    // Get the required elements
    var homepageCoverBackgroundElement = document.getElementById("homepage--background");

    // Keep updating the CSS properties of the cover on scroll
    pageContentElement.addEventListener("scroll", function() {

        // Get the element's scrolling-related variables
        var scrollTop = pageContentElement.scrollTop,
            clientHeight = pageContentElement.clientHeight,
            clientHeightDiff = clientHeight - scrollTop;

        // Update the style attribute
        homepageCoverBackgroundElement.style.transform = `Scale(${1 + 1/3 - clientHeightDiff / clientHeight / 3})`;
        homepageCoverBackgroundElement.style.opacity = (clientHeightDiff - 250) / (clientHeight - 250);

        // Delete the used variables
        delete scrollTop, clientHeight, clientHeightDiff;

    }, window.performanceVariables.objects.passiveEvent);

}