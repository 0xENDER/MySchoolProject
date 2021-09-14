/*
    This file is used to manage pop-up alerts and similar stuff!
*/

// Get the required elements for the alert screen
var alertScreen = document.getElementById("alerts--container"),
    alertBox = document.getElementById("alerts--card"),
    alertTitle = document.getElementById("alerts--title"),
    alertMessage = document.getElementById("alerts--message"),
    alertButtonPrimary = document.getElementById("alerts--button-primary"),
    alertButton = document.getElementById("alerts--button");

// Create a function to show alerts
function showAlert(title, message, primaryButtonName, primaryButtonCallback, buttonName, buttonCallback) {

    // Change the content of the alert screen
    alertTitle.textContent = title;
    alertMessage.textContent = message;
    alertMessage.textContent = message;

    // Check if this alert requires a primary button
    if (primaryButtonName != null) {

        alertButtonPrimary.style.display = null;

    } else {

        alertButtonPrimary.style.display = "none";

    }

    // Check if this alert requires a normal button
    if (buttonName != null) {

        alertButton.style.display = null;

    } else {

        alertButton.style.display = "none";

    }
}

// Create a function to hide alerts
function hideAlert() {

    //

}