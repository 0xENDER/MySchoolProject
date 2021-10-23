/*

    Manage the user info and state

*/
var userSettings = { // The user settings

        info: {

            username: "[username]",
            profilePicture: null

        },

        alwaysShowFocusBorderOnTouch: false

    },
    signInButton = document.getElementById("button--signin"),
    menuSignInButton = document.getElementById("menubutton--signin");

// Update the document data set
document.documentElement.dataset.signedIn = false;

// Prepare the sign in function
function openSignInRequest() {

    // Hide the alerts and the mobile menu
    hideMenu();
    hideAlert();

    // Open a request
    accountsSystemAPI.openRequest({

        //

    });

    accountsSystemAPI.onConnected = function(data) {

        console.log("Connected!");
        console.log(data);

    };

    accountsSystemAPI.onClose = function(data) {

        console.log("Closed!");
        console.log(data);

    }

    if (window.platform.isApp) {

        accountsSystemAPI.onAuth = function(data) {

            console.log("Authenticated!");
            console.log(data);
            window.document.documentElement.dataset.signedIn = true;

        }

    } else {

        accountsSystemAPI.onSignIn = function(data) {

            console.log("Signed in!");
            console.log(data);
            window.document.documentElement.dataset.signedIn = true;

        }

    }


}

// Prepare the sign in button
signInButton.addEventListener("click", openSignInRequest, (window.crossBrowser.passiveEvents.supported) ? {

    passive: true

} : false);
menuSignInButton.addEventListener("click", openSignInRequest, (window.crossBrowser.passiveEvents.supported) ? {

    passive: true

} : false);