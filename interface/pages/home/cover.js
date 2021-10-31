/*

    Manage the cover in the main page

*/

// The cover effect function
function homepageCoverEffect() {

    // Get the required elements
    var homepageCoverBackgroundElement = document.getElementById("homepage--background");

    pageContentElement.addEventListener("scroll", function() {

        var scrollTop = pageContentElement.scrollTop,
            clientHeight = pageContentElement.clientHeight,
            clientHeightDiff = clientHeight - scrollTop;
        homepageCoverBackgroundElement.style.transform = `Scale(${1 + 1/3 - clientHeightDiff / clientHeight / 3})`;
        homepageCoverBackgroundElement.style.opacity = (clientHeightDiff - 210) / (clientHeight - 210);

        delete scrollTop, clientHeight, clientHeightDiff;

    }, window.performanceVariables.objects.passiveEvent);

}