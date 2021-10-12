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

    // Define the dimensions of the window
    var width = 480,
        height = 620,
        left = (window.screen.width - width) / 2,
        top = (window.screen.height > height + 40) ? 40 : 0;

    // Open the window
    window.open(window.platform.servers.accounts + "/signin/", "Sign In", `menubar=no,toolbar=no,location=no,resizable=no,scrollbars=yes,status=no,width=${width}px,height=${height}px,left=${left}px,top=${top}px,nodeIntegration=no,alwaysOnTop=yes,fullscreenable=no,skipTaskbar=yes,minimizable=no`);

    // Listen to messages coming from the sign in window
    window.onmessage = (event) => {

        // Check if this message came from the server!
        if (event.origin == "%{{server:AccountsURL}}%") {

            console.log(event.data);
            console.log(event.source);

        }

    };

};