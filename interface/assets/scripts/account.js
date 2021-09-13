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
    var usernameElement = document.getElementById("user--username"),
        profilePictureElement = document.getElementById("user--profilepicture");

    usernameElement.textContent = userSettings.info.username;
    profilePictureElement.src = userSettings.info.profilePicture;
}

if (document.documentElement.dataset.signedin === true)
    updateUserInfo();