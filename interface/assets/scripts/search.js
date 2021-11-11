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
    searchVisible = false;

// Show the search interface
function showSearch() {

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

}

// Hide the search interface
function hideSearch() {

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

    // Make sure to un-focus the search input field
    searchBar.blur();

}

// Update the search button (the voice input and clear buttons)
function updateSearchButton() {

    // Check if the search input box is empty
    if (searchBar.value != "") {

        searchVoiceButton.style.display = "none";
        searchClearButton.style.display = null;


    } else {

        searchClearButton.style.display = "none";
        searchVoiceButton.style.display = null;

    }

}

// Handle the events of the search bar
searchBar.onmousedown = showSearch;
searchBar.ontouchstart = showSearch;
searchBar.onkeyup = function() {

    // Check if the search bar is focused
    if (document.activeElement == searchBar) {

        // Show the search interface
        showSearch();

        // Update the search buttons
        updateSearchButton();

    } else {

        // Hide the mobile search interface
        document.documentElement.dataset.usingSearch = false;

    }

};
searchBar.onkeydown = function() {

    // Check if the search bar is focused
    if (document.activeElement == searchBar) {

        // Update the search buttons
        updateSearchButton();

    }

};
searchButton.onmousedown = showSearch;
searchBackButton.onmousedown = hideSearch;

// Clear the content of the search input box when the clear button is clicked
searchClearButton.onmousedown = function() {

    // Update the value of the search bar input box
    searchBar.value = "";

    // Focus the input field
    searchBar.focus();

    // Update the search buttons
    updateSearchButton();

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

        if (isUsingSearch) {

            // Check if this click was outside the search container
            if (!clickInside) {

                hideSearch();
                clickInside = true;

            } else {

                clickInside = false;

            }

        }

    }, window.performanceVariables.objects.passiveEvent);

}

// Keep the search input box focused
searchBar.onblur = function(e) {

    if (searchVisible) {

        searchBar.focus();

    }

};

// Check if this device/browser supports voice input
if (window.crossBrowser.speechRecognition.supported) {

    // Create a new speech recognition object, and its corresponding variables
    var recognition = new window.crossBrowser.speechRecognition.object(),
        finalResult = null,
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
        updateSearchButton();
        showSearch();

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

    };

} else {

    // Update the voice input button
    searchVoiceButton.style.opacity = "0.2";
    searchVoiceButton.style.cursor = "not-allowed";

}