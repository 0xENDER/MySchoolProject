/*
    Manage pop-up alerts and similar stuff!
*/

// Get the required elements for the alert screen
var alertScreen = document.getElementById("alerts--container"),
    alertBox = document.getElementById("alerts--card"),
    alertTitle = document.getElementById("alerts--title"),
    alertMessage = document.getElementById("alerts--message"),
    alertButtonPrimary = document.getElementById("alerts--button-primary"),
    alertButton = document.getElementById("alerts--button"),
    alertLastThemeColor = null;

// Create a function to show alerts
function showAlert(title, message, primaryButtonName, primaryButtonCallback, buttonName, buttonCallback) {

    // Show the alert container
    alertScreen.style.display = null;
    alertScreen.style.opacity = null;

    // Update the theme colour
    if (alertLastThemeColor == null) {

        // Update the `alertLastThemeColor` variable
        alertLastThemeColor = {

            light: themeColor.light.getAttribute("content"),
            dark: themeColor.dark.getAttribute("content")

        };

        // Update the theme colour
        updateThemeColor(null, null, true);

    }

    // Change the content of the alert screen
    alertTitle.textContent = title;
    alertMessage.innerHTML = message;

    // Check if this alert requires a primary button
    if (primaryButtonName != null) {

        alertButtonPrimary.textContent = primaryButtonName;
        alertButtonPrimary.onclick = primaryButtonCallback;
        alertButtonPrimary.style.display = null;

    } else {

        alertButtonPrimary.onclick = null;
        alertButtonPrimary.style.display = "none";

    }

    // Check if this alert requires a normal button
    if (buttonName != null) {

        alertButton.textContent = buttonName;
        alertButton.onclick = buttonCallback;
        alertButton.style.display = null;

    } else {

        alertButton.onclick = null;
        alertButton.style.display = "none";

    }

}

// Create a function to hide alerts
function hideAlert() {

    // Hide the alert container
    alertScreen.style.display = "none";
    alertScreen.style.opacity = 0;

    // Reset the theme colour
    if (alertLastThemeColor != null) {

        updateThemeColor(alertLastThemeColor.light, alertLastThemeColor.dark, true);

        // Update the `alertLastThemeColor` variable
        alertLastThemeColor = null;

    }

}