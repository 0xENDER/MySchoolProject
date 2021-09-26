/*

    Manage the user account info

*/

function updateUserInfo() {

    // Get the username element and the profile picture element
    var usernameElement = document.getElementById("user--username"),
        profilePictureElement = document.getElementById("user--profilepicture");

    // Change the values of these elements
    usernameElement.textContent = userSettings.info.username;
    profilePictureElement.src = userSettings.info.profilePicture;

    // Delete the used variables
    delete usernameElement, profilePictureElement;

}

// Update the info on the screen if the user is signed in
if (document.documentElement.dataset.signedin === true)
    updateUserInfo();