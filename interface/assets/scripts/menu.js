/*

    Manage the mobile menu

*/


// Define the needed variables
var optionsButton = document.getElementById("button--menuOptions"),
    profilePictureButton = document.getElementById("user--profilepicture"),
    mobileMenuScreen = document.getElementById("mobilemenu--container"),
    mobileMenuCloseButton = document.getElementById("icon--mobilemenu-close");

// Show the menu
function showMobileMenu() {

    mobileMenuScreen.style.display = null;
    mobileMenuScreen.style.opacity = null;

}

// Hide the menu
function hideMobileMenu() {

    mobileMenuScreen.style.display = "none";
    mobileMenuScreen.style.opacity = 0;

}

// Update the `onclick` event functions
optionsButton.onclick = showMobileMenu;
profilePictureButton.onclick = showMobileMenu;
mobileMenuCloseButton.onclick = hideMobileMenu;