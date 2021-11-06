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

    // Update the search buttons
    updateSearchButton();

    // Focus the input field
    searchBar.focus();

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

    // Create a new speech recognition object
    var recognition = new window.crossBrowser.speechRecognition.object(),
        finalResult = "",
        speechTimeout = null;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = navigator.language;
    recognition.maxAlternatives = 0;
    console.log(recognition);

    // Detect when the speech recognition object starts workings
    recognition.onstart = function() {

        showAlert("Listening...", "(This is a temporary behaviour)<br><br>`(prev: '" + finalResult + "')`");
        finalResult = "";
        speechTimeout = setTimeout(function() {

            // Stop listening
            recognition.stop();

            speechTimeout = true;

        }, 3000);

    };

    // Detect when the user stops talking
    recognition.onspeechend = function(event) {

        if (typeof speechTimeout == "number") {

            // Stop listening
            clearTimeout(speechTimeout);
            recognition.stop();

        }

    };

    // Detect when the speech recognition object finishes processing the user's speech
    recognition.onresult = function(event) {

        finalResult = event.results[0][0].transcript;

        showAlert("Listening...", "(This is a temporary behaviour)<br><br>`" + finalResult + "`");

        if (finalResult != "" && typeof speechTimeout == "number") {

            clearTimeout(speechTimeout);
            if (!event.results.isFinal) {

                speechTimeout = setTimeout(function() {

                    // Stop listening
                    recognition.stop();

                    speechTimeout = true;

                }, 2000);

            } else {

                // Stop listening
                recognition.stop();

                speechTimeout = true;

            }

        }

    };

    // Detect when the speech recognition process is done
    recognition.onend = function() {

        hideAlert();

        finalResult = finalResult.split(/\.|\,|\?|\!/g).filter(value => value != "").join("");
        searchBar.value = finalResult;
        updateSearchButton();
        showSearch();
        searchBar.focus();

    };

    recognition.onnomatch = function() {

        console.log("ERROR");

    };

    // Detect speech recognition errors
    recognition.onerror = function(e) {

        //
        alert("ERROR!");
        console.log("Oh no, an error!");

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