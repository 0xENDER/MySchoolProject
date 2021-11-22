/*

    Manage the mobile menu

*/


// Define the needed variables
var optionsButton = document.getElementById("button--menuOptions"),
    profilePictureButton = document.getElementById("user--profilepicture"),
    menuScreen = document.getElementById("menu--container"),
    menuCard = document.getElementById("menu--card"),
    menuCloseButton = document.getElementById("icon--menu-close"),
    menuCardClicked = false,
    lastWindowMenuResizeFunction = null,
    menuLastThemeColor = null;

// Show the menu
function showMenu(top = null, left = null, element) {


    if (menuLastThemeColor == null) {

        // Update the `menuLastThemeColor` variable
        menuLastThemeColor = getThemeColor();

        // Update the theme colour
        updateThemeColor(null, null, true);

    }

    // Check the menu's position
    if (top != null && left != null) {

        // Load the content without showing it
        menuScreen.style.display = "block";
        menuScreen.style.opacity = 0;

        // Get the new position of the menu
        left = left - menuCard.offsetWidth / 2;
        if (left + menuCard.offsetWidth * 1.5 > window.innerWidth + 15) {

            left = window.innerWidth - menuCard.offsetWidth;

        }

        // Remove the last window resize event listener
        lastWindowMenuResizeFunction = windowResize;

        // Detect window resize changes
        function windowResize() {

            // Redo the same calculations
            left = element.getBoundingClientRect().left - menuCard.offsetWidth / 2;
            if (left + menuCard.offsetWidth * 1.5 > window.innerWidth + 15) {

                left = window.innerWidth - menuCard.offsetWidth;

            }
            menuCard.style.left = `calc( ${left}px - var(--global-sidesmargin) )`;

        }
        window.addEventListener("resize", windowResize, window.performanceVariables.objects.passiveEvent);

        // Change the position of the menu
        menuCard.style.top = `calc( ${top}px + var(--global-topbottommargin) )`;
        menuCard.style.left = `calc( ${left}px - var(--global-sidesmargin) )`;

    }

    // Show the menu
    menuScreen.style.display = null;
    menuScreen.style.opacity = null;

}

// Hide the menu
function hideMenu() {

    // Reset the theme colour
    if (menuLastThemeColor != null) {

        updateThemeColor(menuLastThemeColor.light, menuLastThemeColor.dark, true);

        // Update the `menuLastThemeColor` variable
        menuLastThemeColor = null;

    }

    // Remove the resize event listener
    window.removeEventListener("resize", lastWindowMenuResizeFunction);
    delete lastWindowMenuResizeFunction;

    // Hide the menu
    menuScreen.style.display = "none";
    menuScreen.style.opacity = 0;

}

// Menu card click function
function menuCardClick() {

    menuCardClicked = true;

}

// Check if the menu should be hidden after this click
function shouldHideMenu() {

    // Check if this a click inside the menu card
    if (!menuCardClicked) {

        hideMenu();

    } else {

        menuCardClicked = false;

    }

}

// Update the `onclick` event functions
if (window.platform.special.dynamic.isWindowSmall()) {

    optionsButton.addEventListener("click", showMenu, window.performanceVariables.objects.passiveEvent);
    menuCloseButton.addEventListener("click", hideMenu, window.performanceVariables.objects.passiveEvent);

}
profilePictureButton.addEventListener("click", function() {

    // Check if this is a small screen
    if (!window.platform.special.dynamic.isWindowSmall()) {

        // Get the element's position
        var elementPosition = profilePictureButton.getBoundingClientRect();

        // Show the menu
        showMenu(elementPosition.top + elementPosition.height,
            elementPosition.left + elementPosition.width / 2,
            profilePictureButton
        );

        // Delete the used variables
        delete elementPosition;

    } else {

        showMenu();

    }

}, window.performanceVariables.objects.passiveEvent);

// Update the menu's container click events
if (!window.platform.special.dynamic.isWindowSmall()) {

    menuCard.addEventListener("mousedown", menuCardClick, window.performanceVariables.objects.passiveEvent);
    window.addEventListener("mousedown", shouldHideMenu, window.performanceVariables.objects.passiveEvent);

}
menuCard.addEventListener("click", menuCardClick, window.performanceVariables.objects.passiveEvent);
menuScreen.addEventListener("click", shouldHideMenu, window.performanceVariables.objects.passiveEvent);