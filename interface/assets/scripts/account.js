"user--username";
"user--profilepicture";

var userSettings = { // The user settings

    info: {

        username: "[username]",
        profilePicture: null

    },

    alwaysShowFocusBorderOnTouch: false

};

function updateUserInfo() {

    // Get the username element and the profile picture element
    var usernameElement = document.getElementById("user--username"),
        profilePictureElement = document.getElementById("user--profilepicture");

    // Change the values of these elements
    usernameElement.textContent = userSettings.info.username;
    profilePictureElement.src = userSettings.info.profilePicture;

}

// Update the info on the screen if the user is signed in
if (document.documentElement.dataset.signedin === true)
    updateUserInfo();