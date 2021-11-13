/*

    Manage the search bar

*/


// Get the needed elements
var searchButton = document.getElementById("button--search"),
    searchBackButton = document.getElementById("button--searchback"),
    searchVoiceButton = document.getElementById("button--searchvoice"),
    searchClearButton = document.getElementById("button--searchclear"),
    searchBar = document.getElementById("component--search"),
    searchContainer = document.getElementById("search--container"),
    isUsingSearch = false,
    searchVisible = false,
    previousSearchBarValue = "",
    searchLastThemeColor = null;

// Redirect to the search page
function startSearch(query) {

    if (window.platform.special.dynamic.isWindowSmall()) {

        window.history.replaceState("", "", "/page/search/#" + encodeURIComponent(query));
        window.location.dynamic.redirect("/page/search/", false);

    } else {

        window.location.dynamic.redirect("/page/search/#" + encodeURIComponent(query));

    }

    alert("Debug: " + query);

}

// Activate searching
function activateSearch() {

    // Update the page has to "search"
    window.location.hash = "search";

}

// Show the search interface
function showSearch() {

    if (searchLastThemeColor == null) {

        // Update the `searchLastThemeColor` variable
        searchLastThemeColor = {

            light: themeColor.light.getAttribute("content"),
            dark: themeColor.dark.getAttribute("content")

        };

        // Update the theme colour
        updateThemeColor(null, null, true);

    }

    // Update the `previousSearchBarValue` variable
    previousSearchBarValue = searchBar.value;

    // Check if this device has a small screen
    if (window.platform.special.dynamic.isWindowSmall()) {

        // Show the mobile search interface
        document.documentElement.dataset.usingSearch = true;
        searchContainer.style.display = null;

    } else {

        // Show the search container
        searchContainer.style.display = "block";

        // Update the `isUsingSearch` variable
        isUsingSearch = true;

    }

    // Make sure that the search bar is focused
    searchBar.focus();

    // Update the search interface visibility status
    searchVisible = true;

    // Make sure to update the search buttons
    updateSearchButtons();

}

// Hide the search interface
function hideSearch() {

    // Reset the theme colour
    if (searchLastThemeColor != null) {

        updateThemeColor(searchLastThemeColor.light, searchLastThemeColor.dark, true);

        // Update the `searchLastThemeColor` variable
        searchLastThemeColor = null;

    }

    // Update the `previousSearchBarValue` variable
    previousSearchBarValue = "";

    // Hide the mobile search interface
    document.documentElement.dataset.usingSearch = false;

    // Check if this device has a big screen
    if (!window.platform.special.dynamic.isWindowSmall()) {

        // Hide the search container
        searchContainer.style.display = null;

        // Update the `isUsingSearch` variable
        isUsingSearch = false;

    }

    // Update the search interface visibility status
    searchVisible = false;
    clickInside = true;

    // Make sure to un-focus the search input field
    searchBar.blur();

    // Make sure to update the search buttons
    updateSearchButtons();

}

// Update the search buttons
function updateSearchButtons(section = pageFlags.section) {

    if (window.platform.special.dynamic.isWindowSmall()) {

        if (section != "home") {

            searchBackButton.style.display = "block";
            searchButton.style.display = "none";

        } else {

            searchBackButton.style.display = null;
            searchButton.style.display = null;

        }

    }

    // Check if the search input box is empty
    if (searchBar.value != "") {

        searchVoiceButton.style.display = "none";
        searchClearButton.style.display = null;

        if (window.platform.special.dynamic.isWindowSmall()) {

            if (!searchVisible && pageFlags.section == "home") {

                searchBackButton.style.display = "block";
                searchButton.style.display = "none";

            }

        }

    } else {

        searchClearButton.style.display = "none";
        searchVoiceButton.style.display = null;

    }

}

// Handle the events of the search bar
searchBar.onmousedown = function() {

    // Check the screen size
    if (window.platform.special.dynamic.isWindowSmall()) {

        activateSearch();

    } else {

        showSearch();

    }

};
searchBar.addEventListener("touchstart", activateSearch, window.performanceVariables.objects.passiveEvent);
searchBar.oninput = function() {

    // Show the search interface
    if (!searchVisible) {

        showSearch();

    }

    // Update the search buttonss
    updateSearchButtons();

};
searchBar.onkeyup = function(event) {

    if (event.keyCode === 13) {

        event.preventDefault();
        startSearch(searchBar.value);

    }

};

// Handle the search button
function searchButtonClicked() {

    // Check the screen size
    if (window.platform.special.dynamic.isWindowSmall()) {

        // Show the search interface
        activateSearch();

    } else {

        // Check if the search input element has a valid value
        if (searchBar.value.replace(/\s/g, "") != "") {

            // Go to the search page
            startSearch(searchBar.value);

        } else {

            // Show the search interface
            showSearch();

        }

    }

}
searchButton.onmousedown = searchButtonClicked;
searchBackButton.onmousedown = function() {

    // Navigate back
    window.history.back();

    // Update the value of the search bar
    searchBar.value = previousSearchBarValue;

};

// Clear the content of the search input box when the clear button is clicked
searchClearButton.onmousedown = function() {

    // Update the value of the search bar input box
    searchBar.value = "";

    // Focus the input field
    searchBar.focus();

    // Update the search buttonss
    updateSearchButtons();

};

// Hide the menu on blur (desktop/big screens)
if (!window.platform.special.dynamic.isWindowSmall()) {

    // Define a variable to keep track of the clicks
    var clickInside = true;

    // Detect clicks inside the search container
    searchContainer.addEventListener("mousedown", function() {

        clickInside = true;

    }, window.performanceVariables.objects.passiveEvent);

    // Detect clicks outside the whole page
    window.addEventListener("mousedown", function() {

        // Check if the user is using the search bar
        if (isUsingSearch) {

            // Check if this click was outside the search container
            if (!clickInside) {

                // Hide the search container
                hideSearch();

            } else {

                clickInside = false;

            }

        }

    }, window.performanceVariables.objects.passiveEvent);

}

// Keep the search input box focused
searchBar.onblur = function(e) {

    // Check if the search UI is visible
    if (searchVisible) {

        // Focus the search bar
        searchBar.focus();

    }

};

// Check if this device/browser supports voice input
if (window.crossBrowser.speechRecognition.supported) {

    // Create a new speech recognition object, and its corresponding variables
    var recognition = new window.crossBrowser.speechRecognition.object(),
        finalResult = "",
        speechTimeout = null;

    // Configure the speech recognition object
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 4;

    // Detect when the speech recognition object starts workings
    recognition.onstart = function() {

        // Reset the `finalResult` variable
        finalResult = "";

        // Show the voice input UI
        showAlert("Listening...", "(This is a temporary behaviour)<br><br>`(prev: '" + finalResult + "')`");

    };

    // Detect when the user starts talking
    recognition.onspeechstart = function(event) {

        // Check if the speech timeout wasn't triggered
        if (typeof speechTimeout == "number") {

            // Stop the speech timeout
            clearTimeout(speechTimeout);

        }

        // Start a new speech timeout
        speechTimeout = setTimeout(function() {

            // Stop listening
            recognition.stop();

            // Update the speech timeout variable status
            speechTimeout = true;

        }, 5000);

    };

    // Detect when the user stops talking
    recognition.onspeechend = function(event) {

        // Check if the speech timeout wasn't triggered
        if (typeof speechTimeout == "number") {

            // Stop listening
            clearTimeout(speechTimeout);

            // Start a new speech timeout
            speechTimeout = setTimeout(function() {

                // Stop listening
                recognition.stop();

                // Update the speech timeout variable status
                speechTimeout = true;

            }, 1000);

        }

    };

    // Detect when the speech recognition object finishes processing the user's speech
    recognition.onresult = function(event) {

        // Create an object to keep track of the best result
        var result = {

            text: "",
            confidence: 0

        };

        // Go through the results
        for (var i = 0; i < event.results.length; i++) {

            for (var i2 = 0; i2 < event.results[i].length; i2++) {

                // Check if the result is not empty
                if (event.results[i][i2].transcript != "") {

                    // Check if this result is the best so far
                    if (event.results[i][i2].confidence >= result.confidence) {

                        // Update the best result object
                        result.text = event.results[i][i2].transcript;
                        result.confidence = event.results[i][i2].confidence;

                    }

                }

            }

        }

        // Update the final results
        finalResult =
            (result.confidence == event.results[0][0].confidence && result.confidence == 0) ? // Check if the confidence metric is working
            event.results[0][0].transcript : // Choose the first result if the confidence metric isn't working
            result.text; // Keep the best result

        // Update the voice input UI
        showAlert("Listening...", "(This is a temporary behaviour)<br><br>`" + finalResult + "`");

        // Check if the speech timeout wasn't triggered and if the result is final
        if (finalResult != "" && typeof speechTimeout == "number" && event.results.isFinal) {

            // Stop the speech timeout
            clearTimeout(speechTimeout);

            // Stop listening
            recognition.stop();

            // Update the speech timeout variable status
            speechTimeout = true;

        }

    };

    // Detect when the speech recognition process is done
    recognition.onend = function() {

        // Stop the speech timeout
        clearTimeout(speechTimeout);

        // Hide the voice input UI
        hideAlert();

        // Filter the final result
        finalResult = finalResult.split(/\.|\,|\?|\!/g).filter(value => value != "").join("");

        // Update the search bar and its value
        searchBar.value = finalResult;
        updateSearchButtons();
        if (!searchVisible) {

            showSearch();

        }

    };

    // Detect when the speech recognition service returns a final result with no significant recognition
    recognition.onnomatch = function() {

        alert("No match");

    };

    // Detect speech recognition errors
    recognition.onerror = function(e) {

        alert("Error!");

    };

    // Detect when the voice input button is clicked
    searchVoiceButton.onmousedown = function() {

        // Start listening
        recognition.start();

        // Update the click status
        clickInside = false;

    };

} else {

    // Update the voice input button
    searchVoiceButton.style.opacity = "0.2";
    searchVoiceButton.style.cursor = "not-allowed";

}