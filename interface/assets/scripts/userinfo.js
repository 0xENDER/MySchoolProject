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
    hideMobileMenu();
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

    accountsSystemAPI.onSignIn = function(data) {

        console.log("Signed in!");
        console.log(data);

    }

    accountsSystemAPI.onAuth = function(data) {

        console.log("Authenticated!");
        console.log(data);

    }

}

// Prepare the sign in button
signInButton.onclick = openSignInRequest;
menuSignInButton.onclick = openSignInRequest;