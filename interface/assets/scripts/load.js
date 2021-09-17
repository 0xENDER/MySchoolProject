/*

    Manage the page's workload

*/

// Define the required variables for the loading system to work
var contentResourcesNumber = 0,
    loadedContentResourcesNumber = 0,
    pageContentElement = document.getElementById("page");

// Wait for the main layout to finish loading
window.addEventListener('load', function() {

    // Change the document dataset values
    document.head.appendChild(document.createRange().createContextualFragment(`<link rel="stylesheet" href="./assets/styles/load.css" onload="document.documentElement.dataset.loaded = true; checkAgreement();">`));
    document.documentElement.dataset.contentloaded = false;

});

// Check the user agreement
function checkAgreement() {

    if (localStorage.getItem("DidAcceptPopup") !== "true") { // Check if the user saw the terms and policies pop-up

        setTimeout(function() {

            // Make sure you have the user's agreement before loading the content of the page!
            showAlert("User Agreement",
                `By using this website, or any offered services on it, you automatically agree on and oblige to follow our <a href="./">Terms and Conditions</a>, <a href="./">Privacy Policy</a>, and <a href="./">Cookie Policy</a>.`,
                "Ok",
                function() {

                    // Save the data that the user did see the pop-up
                    localStorage.setItem("DidAcceptPopup", true);

                    // Hide the alert screen
                    hideAlert();

                    // Load the page content
                    loadContent();

                });

        }, 250);

    } else {

        // Load the page content
        loadContent();

    }

}

function loadContent() {

    // Prepare the page content container
    pageContentElement.style.display = null;
    linkScrollbar(pageContentElement);

    // Fetch the content
    fetch("pages" + window.location.pathname.substring(5))
        .then(response => {

            if (response.ok) { // If the request was successful, inject the content to the page.

                response.text().then(data => {

                    // Check the "PAGE" element!
                    //<!PAGE ...>
                    var pageElement = data.substring(0, data.indexOf("\n"));
                    if (pageElement.indexOf("<PAGE") == 0 && pageElement.indexOf(">") != -1) {

                        // Prepare the "PAGE" element for processing
                        pageElement = "<div id=\"pageElement\"" + pageElement.substring(5, pageElement.indexOf("/>")) + "></div>";

                        try {

                            // Convert the "PAGE" element into a HTML element
                            pageElement = (new DOMParser()).parseFromString(pageElement, 'text/html');
                            pageElement = pageElement.getElementById("pageElement");

                        } catch {

                            loadingFailed();

                        } finally {

                            // Get the number of required resources in this page (first line)
                            contentResourcesNumber = Number(pageElement.getAttribute("resources"));

                            // Reset the `loadedContentResourcesNumber` variable
                            loadedContentResourcesNumber = 0;

                            // Update the page title
                            var pageTitle = pageElement.getAttribute("title");
                            if (pageTitle != null)
                                document.title = pageTitle + " | MyStore";

                            // Update the selected item in the "sections bar"
                            var selectedSectionsItem = document.getElementById("sections--" + pageElement.getAttribute("section"));
                            if (selectedSectionsItem != null)
                                selectedSectionsItem.classList.add("state--selected");

                            // Inject the content into the page (without the first line)
                            pageContentElement.append(document.createRange().createContextualFragment(data.substring(data.indexOf("\n"))));

                            // If the number of required resources is 0, show the page content instantly!
                            if (contentResourcesNumber == 0)
                                contentLoaded();

                        };


                    } else { // This is an invalid file!

                        loadingFailed();

                    }

                });

            } else
                loadingFailed();

        }).catch(function(error) {

            loadingFailed();

        });

}

// Show an error screen when a page fails to load
function loadingFailed() {

    // Change the page title
    document.title = "Error | MyStore";

    // Change the page content
    pageContentElement.innerHTML = `<div style="width: calc(100% - var(--global-sidesmargin) * 2); height: calc(100% - var(--global-sidesmargin) * 2); margin: var(--global-sidesmargin); display: flex; align-items: center; justify-content: center; text-align: center; flex-direction: column;">
                                        <svg width="36" height="36" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8ZM14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8ZM9.00361 10.9983H7.00295V6.99835H9.00361V10.9983ZM9.00066 4.99835C9.00066 5.55063 8.55279 5.99835 8.00033 5.99835C7.44786 5.99835 7 5.55063 7 4.99835C7 4.44606 7.44786 3.99835 8.00033 3.99835C8.55279 3.99835 9.00066 4.44606 9.00066 4.99835Z" fill="var(--colours-primary2)"/></svg>
                                        <h2>Failed to load this page!</h2>
                                        <h4>An error occurred whilst trying to load this page. This may be a temporary error, try again later.</h4>
                                    </div>`;

    contentLoaded();

}

// Make the required changes once the content is fully loaded
function contentLoaded() {

    document.documentElement.dataset.contentloaded = true;
    //linkItemsFunctions(); // Not needed anymore!

}

// Tell the content loader that one of the resources finished loading
function contentSourceLoaded() {

    if (++loadedContentResourcesNumber == contentResourcesNumber)
        contentLoaded();

}