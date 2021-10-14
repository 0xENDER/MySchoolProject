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
    signInButton = document.getElementById("button--signin");

// Update the document data set
document.documentElement.dataset.signedIn = false;

// Prepare the sign in button
signInButton.onclick = function() {

    // Open a request
    accountsSystemAPI.openRequest({

        //

    });

    accountsSystemAPI.onConnected = function() {

        console.log("Connected!");

    };

    accountsSystemAPI.onSignIn = function(data) {

        console.log("Signed in!");
        console.log(data);

    }

    accountsSystemAPI.onAuth = function(data) {

        console.log("Authenticated!");
        console.log(data);

    }

};