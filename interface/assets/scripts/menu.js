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
    lastWindowMenuResizeFunction = null;

// Show the menu
function showMenu(top = null, left = null, element) {

    // Check the menu's position
    if (top != null && left != null) {

        // Load the content without showing it
        menuScreen.style.display = "block";
        menuScreen.style.opacity = 0;

        // Get the new position of the menu
        top += 5;
        left = left - menuCard.offsetWidth / 2;
        if (left + menuCard.offsetWidth > window.innerWidth) {

            left = window.innerWidth - menuCard.offsetWidth / 2 - 5;

        }

        // Remove the last window resize event listener
        lastWindowMenuResizeFunction = windowResize;

        // Detect window resize changes
        function windowResize() {

            // Redo the same calculations
            left = element.getBoundingClientRect().left - menuCard.offsetWidth / 2;
            if (left + menuCard.offsetWidth > window.innerWidth) {

                left = window.innerWidth - menuCard.offsetWidth / 2 - 5;

            }
            menuCard.style.left = `${window.innerWidth - menuCard.offsetWidth - 5}px`;

        }
        window.addEventListener("resize", windowResize, (window.crossBrowser.passiveEvents.supported) ? {

            passive: true

        } : false);

        // Change the position of the menu
        menuCard.style.top = `${top + 5}px`;
        menuCard.style.left = `${left - menuCard.offsetWidth / 2}px`;

    }

    // Show the menu
    menuScreen.style.display = null;
    menuScreen.style.opacity = null;

}

// Hide the menu
function hideMenu() {

    // Remove the resize event listener
    window.removeEventListener("resize", lastWindowMenuResizeFunction);

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
optionsButton.onclick = showMenu;
menuCloseButton.onclick = hideMenu;
profilePictureButton.onclick = function() {

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

};

// Update the menu's container click events
menuCard.onmousedown = menuCardClick;
menuCard.ontouchstart = menuCardClick;
menuScreen.onmousedown = shouldHideMenu;
menuScreen.ontouchstart = shouldHideMenu;