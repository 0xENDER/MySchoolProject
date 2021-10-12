/*

    Manage sign in requests

*/


// Define the events object
window.events = {

    signedIn: function() {

        // Check if this is a child window
        if (window.opener != null) {

            // Send a "signed-in" event message
            window.opener.postMessage({

                event: "signed-in"

            }, "*");

            // Close the window
            window.close();

        } else {

            // Tmp...
            window.location.href = "/";

        }

    }

};