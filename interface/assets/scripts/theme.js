/*

    Manage the theme

*/


// Get the required elements
var themeColor = {

        light: document.getElementById("meta--themecolor-light"),
        dark: document.getElementById("meta--themecolor-dark")

    },
    msApplicationNavButton = {

        light: document.getElementById("meta--msapplicationnavbuttoncolor-light"),
        dark: document.getElementById("meta--msapplicationnavbuttoncolor-dark")

    },
    defaultThemeColor = {

        light: themeColor.light.getAttribute("content"),
        dark: themeColor.dark.getAttribute("content")

    },
    allowThemeColorUpdate = null;

// Update the theme colour
function updateThemeColor(lightColor = null, darkColor = lightColor, force = false) {

    if (force || document.documentElement.dataset.contentLoaded === "true") {

        // Handle the default theme colours
        if (lightColor == null) {

            lightColor = defaultThemeColor.light;
            darkColor = defaultThemeColor.dark;

        }

        // Update the meta tags
        [

            themeColor.light,
            msApplicationNavButton.light

        ].forEach(function(metaTag) {

            metaTag.setAttribute("content", lightColor);

        });
        [

            themeColor.dark,
            msApplicationNavButton.dark

        ].forEach(function(metaTag) {

            metaTag.setAttribute("content", darkColor);

        });

    } else {

        allowThemeColorUpdate = function() {

            updateThemeColor(lightColor, darkColor, true);

            allowThemeColorUpdate = null;

        };

    }

}