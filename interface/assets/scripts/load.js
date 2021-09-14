// Define the required variables for the loading system to work
var contentResourcesNumber = 0,
    loadedContentResourcesNumber = 0;

// Wait for the main layout to finish loading
window.addEventListener('load', function() {

    // Change the document dataset values
    document.documentElement.dataset.loaded = true;
    document.documentElement.dataset.contentloaded = false;

    // Wait before loading the content
    setTimeout(function() {

        // Fetch the content
        fetch("./test.html")
            .then(response => {
                if (response.status === 200) { // If the request was successful, inject the content to the page.

                    response.text().then(data => {

                        // Get the number of required resources in this page (first line)
                        contentResourcesNumber = Number(data.substring(0, data.indexOf("\n")));

                        // Reset the `loadedContentResourcesNumber` variable
                        loadedContentResourcesNumber = 0;

                        // Inject the content into the page (without the first line)
                        document.getElementById("page").innerHTML = data.substring(data.indexOf("\n"));

                        // If the number of required resources is 0, show the page content instantly!
                        if (contentResourcesNumber == 0)
                            contentLoaded();

                    });

                } else
                    alert("[ERROR] Failed to load the page!"); // Alert the user that the content wasn't loaded successfully!
            });

    }, window.platform.special.maxOptionalTimeoutDely);

});

// Make the required changes once the content is fully loaded
function contentLoaded() {

    document.documentElement.dataset.contentloaded = true;
    linkItemsFunctions();

}

// Tell the content loader that one of the resources finished loading
function contentSourceLoaded() {

    if (++loadedContentResourcesNumber == contentResourcesNumber)
        contentLoaded();

}