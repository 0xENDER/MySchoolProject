/*

    Manage the page's workload

*/

// Define the required variables for the loading system to work
var contentResourcesNumber = 0,
    loadedContentResourcesNumber = 0,
    didAlertAboutConnection = false,
    pageContentElement = document.getElementById("page"),
    coverLoadingIcon = document.getElementById("cover--loadingicon"),
    connectionAPI = null,
    pageHTMLContent = null,
    pageFlags = {

        endMessage: false,
        canUnload: true

    },
    unload = [],
    didFail = false;

// Wait for the main layout to finish loading
window.addEventListener('load', function() {

    // Load the rest of the CSS resources
    document.head.appendChild(document.createRange().createContextualFragment(`<link rel="stylesheet" href="./assets/styles/load.css" onload="document.documentElement.dataset.loaded = true; checkAgreement();">`));

    // Change the document dataset values
    document.documentElement.dataset.contentLoaded = false;

    // Show the loading icon
    setTimeout(function() {

        coverLoadingIcon.style.opacity = 1;

    }, 400);

});

// Set the window content load function
window.uncover = function() {

    // Scroll through the rubber space
    if (window.platform.rendering.isBlink && window.platform.hardware.hasTouchScreen) {

        pageContentElement.scrollTo({

            top: 80,
            left: 0,
            behavior: 'auto'

        });


    }

    // Run the initial events
    initialEvents();

    // Uncover the content
    document.documentElement.dataset.contentLoaded = true;

};

// Set the window content load function
window.load = function() {

    document.documentElement.dataset.extraContentLoaded = true;

    // If the window's status is set to "loaded", then the content should be uncovered!
    window.uncover();

};

// Check the user agreement
function checkAgreement() {

    if (localStorage.getItem("DidAcceptPopup") !== "true") { // Check if the user saw the terms and policies pop-up

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
                loadingReady();

            });

    } else {

        // Load the page content
        loadingReady();

    }

}

// Do all the necessary things to fully load the page
function loadingReady() {

    // Initialise the service worker
    if (!window.platform.isApp) {

        // Setup the service worker
        setupServiceWorker();

    }

    // Load the page content
    loadContent();

}

function loadContent() {

    // Update the connection API 
    connectionAPI = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    // Add internet status checker
    updateOnlineStatus(); // Check the page once it's loaded (for local apps)
    if ('connection' in navigator && String(connectionAPI.onchange) !== "undefined") { // Check if the connection API is available

        // Change the `onchange` function of the connection API
        connectionAPI.onchange = function() {

            // Check and update the API
            updateOnlineStatus();

        };

    } else { // If the connection API is not supported, use the old way of checking the user status.

        window.addEventListener("online", updateOnlineStatus);
        window.addEventListener("offline", updateOnlineStatus);

    }

    // Prepare the page content container
    pageContentElement.style.display = null;
    linkScrollbar(pageContentElement);

    // Call the loading function
    loadContentFromSrc();

}

// Load the page content from the specified source 
function loadContentFromSrc(src = null) {

    if (src == null) {

        // Check the request source URL
        if (window.platform.isApp && window.platform.more.isElectron) {

            // Send a request for the variable with the name of it
            window.api.send('variable-request', "lastRedirectURL");

            // Wait for the main process to send back the value of this variable
            window.api.receive('variable-reply', function(data) {

                window.location.lastRedirect = data;

                fetchContent(data.substring(data.indexOf("/page/")));

            });

        } else {

            // Use the current page URL as the source URL (Apache works fine on the server)
            fetchContent(window.location.pathname);

        }

    } else {

        fetchContent(src);

    }

}

// Fetch the content
function fetchContent(sourceURLPathname) {

    fetch(window.platform.codebase.root + "pages" + sourceURLPathname.substring(sourceURLPathname.indexOf("page") + 4) + window.platform.codebase.index)
        .then(response => {

            if (response.ok) { // If the request was successful, inject the content to the page.

                // Read the response text
                response.text().then(data => {

                    // Check the "PAGE" element!
                    var pageElement = data.substring(0, data.indexOf("\n"));
                    if (pageElement.indexOf("<PAGE") == 0 && pageElement.indexOf(">") != -1) {

                        // Prepare the "PAGE" element for processing
                        pageElement = "<div id=\"system--pageElement\"" + pageElement.substring(5, pageElement.indexOf("/>")) + "></div>";

                        try {

                            // Convert the "PAGE" element into a HTML element
                            pageElement = (new DOMParser()).parseFromString(pageElement, 'text/html');
                            pageElement = pageElement.getElementById("system--pageElement");

                        } catch {

                            loadingFailed();

                        } finally {

                            // Update the page title
                            var pageTitle = pageElement.getAttribute("title");
                            if (pageTitle != null)
                                document.title = pageTitle + " | MyStore";

                            // Check the page requirements
                            pageFlags.endMessage = (pageElement.getAttribute("page-end") === "true");
                            pageFlags.canUnload = !(pageElement.getAttribute("can-unload") === "false");

                            // Update the current page links
                            if (pageFlags.canUnload && !window.location.dynamic.didLoadDynamically) {

                                var linkElements = document.getElementsByTagName("a");
                                for (var i = 0; i < linkElements.length; i++) {

                                    window.registerNewLink(linkElements[i]);

                                }

                            }

                            // Update the selected item in the "sections bar"
                            var selectedSectionsItem = document.getElementById("sections--" + pageElement.getAttribute("section"));
                            if (selectedSectionsItem != null)
                                selectedSectionsItem.classList.add("state--selected");

                            // Replace variables
                            data = data.substring(data.indexOf("\n")).replace(/\${(.*?)}/g, function(match, content) {

                                // Change all the letters to lower case
                                content = content.toLowerCase();

                                // Check what variable this one is
                                if (content == "pageurl") {

                                    return ((isApp) ? window.location.lastRedirect : window.location.href).replace("/page/", "/pages/").replace(/(.*)\/(.*?).html/g, function(match, start, end) {
                                        return start + "/";
                                    });

                                } else {

                                    // Unknown variable!
                                    loadingFailed();

                                }

                            });

                            // Get all requests
                            data = data.replace(/<request(.*?)>(.*?)<\/request>/g, function(match, attributes, innerContent) {

                                // Parse the attributes
                                attributes = document.createRange().createContextualFragment(`<div ${attributes}></div>`);
                                attributes = attributes.children[0].attributes;

                                // Check the request type
                                if (attributes.type != undefined) {

                                    // Get the request type and format
                                    var requestType = attributes.type.value.replace(/\s/g, ""),
                                        requestFormat = requestType.substring(requestType.indexOf("/") + 1);
                                    requestType = requestType.substring(0, requestType.indexOf("/"));

                                    try {

                                        if (requestType == "component") {

                                            // Check the component name
                                            if (attributes.get != undefined) {

                                                // Get the component
                                                if (requestFormat == "all") {

                                                    return `<link itemprop="pagecontent--component" rel="stylesheet" href="./components/${attributes.get.value}.css"><script itemprop="pagecontent--component" type="text/javascript" src="./components/${attributes.get.value}/${attributes.get.value}.js" defer></script>`;

                                                } else if (requestFormat == "js") {

                                                    return `<script itemprop="pagecontent--component" type="text/javascript" src="./components/${attributes.get.value}.js" defer></script>`;

                                                } else if (requestFormat == "css") {

                                                    return `<link itemprop="pagecontent--component" rel="stylesheet" href="./components/${attributes.get.value}.css">`;

                                                } else {

                                                    // Throw an error
                                                    throw new Error(`The component request format '${requestFormat}' is invalid!`);

                                                }

                                            } else {

                                                // Throw an error
                                                throw new Error(`A component request must be accompanied with a 'get' attribute!`);

                                            }

                                        } else if (requestType == "file") {

                                            // Check the file source
                                            if (attributes.src != undefined) {

                                                // Get the file
                                                if (requestFormat == "js") {

                                                    return `<script itemprop="pagecontent--script" type="text/javascript" src="${attributes.src.value}" defer></script>`;

                                                } else if (requestFormat == "css") {

                                                    return `<link itemprop="pagecontent--style" rel="stylesheet" href="${attributes.src.value}">`;

                                                } else {

                                                    // Throw an error
                                                    throw new Error(`The file request format '${requestFormat}' is invalid!`);

                                                }

                                            } else {

                                                // Throw an error
                                                throw new Error(`A file request must be accompanied with a 'src' attribute!`);

                                            }

                                        } else {

                                            // Throw an error
                                            throw new Error(`The request type '${requestType}' is invalid!`);

                                        }

                                    } catch (e) {

                                        // Invalid request type!
                                        loadingFailed();

                                        throw e;

                                    }

                                } else {

                                    // Unknown request type!
                                    loadingFailed();

                                    // Throw an error
                                    throw new Error("The request element requires the 'type' attribute to be present!");

                                }

                                // Check what variable this one is
                                if (attributes.get != undefined) {

                                    return `null`;

                                } else {

                                    // Unknown request!
                                    loadingFailed();

                                    // Throw an error
                                    throw new Error("Invalid request!");

                                }

                            });

                            // Assing important IDs
                            if (data.indexOf("<resources") != -1 && data.indexOf("<content") != -1) {

                                data = data.replace("<resources", "<div id=\"system--pageResources\"");
                                data = data.replace("</resources>", "</div>");
                                data = data.replace("<content", "<div id=\"system--pageContent\"");
                                data = data.replace("</content>", "<script itemprop=\"pagecontent--loadingscript\" type=\"text/javascript\">contentDOMLoaded();</script>\n</div>");

                            } else {

                                // All pages must have a <resources> element and a <content> element
                                loadingFailed();

                            }

                            // Create a document fragment
                            data = document.createRange().createContextualFragment(data);

                            // Get the number of required resources in this page (first line)
                            if (data.getElementById("system--pageResources") != null) {

                                contentResourcesNumber = data.getElementById("system--pageResources").childElementCount;

                            } else {

                                loadingFailed();

                            }

                            // Inject the resources into the page
                            var children = data.getElementById("system--pageResources").children;
                            for (var i = 0; i < children.length; i++) {

                                children[i].setAttribute("onload", "contentSourceLoaded();");
                                children[i].setAttribute("onerror", "loadingFailed('Page content resource failed to load');");

                            }
                            pageContentElement.append(data.getElementById("system--pageResources"));

                            // Prepare the page content for injection
                            if (data.getElementById("system--pageContent") != null) {

                                pageHTMLContent = data.getElementById("system--pageContent");

                            } else {

                                loadingFailed();

                            }

                            // If the number of required resources is 0, show the page content instantly!
                            if (contentResourcesNumber == 0)
                                contentLoaded();

                            // Delete the used variables
                            delete pageElement, pageTitle, selectedSectionsItem, children;

                        };


                    } else { // This is an invalid file!

                        loadingFailed();

                    }

                });

            } else
                loadingFailed();

        }).catch(function() {

            loadingFailed();

        });

}

// Show an error screen when a page fails to load
function loadingFailed(cause = null) {

    if (!didFail) {

        // Update the `didFail` variable
        didFail = true;

        // Change the page title
        document.title = "Error | MyStore";

        // Change the page content
        pageHTMLContent = document.createRange().createContextualFragment(`<div style="width: calc(100% - var(--global-sidesmargin) * 2); height: calc(100% - var(--global-sidesmargin) * 2); margin: var(--global-sidesmargin); display: flex; align-items: center; justify-content: center; text-align: center; flex-direction: column;"><svg width="36" height="36" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8ZM14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8ZM9.00361 10.9983H7.00295V6.99835H9.00361V10.9983ZM9.00066 4.99835C9.00066 5.55063 8.55279 5.99835 8.00033 5.99835C7.44786 5.99835 7 5.55063 7 4.99835C7 4.44606 7.44786 3.99835 8.00033 3.99835C8.55279 3.99835 9.00066 4.44606 9.00066 4.99835Z" fill="var(--colours-primary2)"/></svg><h2>Failed to load this page!</h2><h4>An error occurred whilst trying to load this page. This may be a temporary error, try again later.</h4></div><script type="text/javascript">contentDOMLoaded(); window.load();</script>`);

        // Show the error message
        contentLoaded();

    }

    // Report the failure cause
    if (cause != null) {

        throw new Error(cause);

    }

}

// Make the required changes once the content is fully loaded
function contentLoaded() {

    // Inject the page content
    if (pageHTMLContent != null) {

        pageContentElement.append(pageHTMLContent);

    }
    if (typeof window.oncontentinjection === "function") {

        window.oncontentinjection();

    }

}

function contentDOMLoaded() {

    if (typeof window.onpagecontentload === "function") {

        window.onpagecontentload();

    }

}

// Tell the content loader that one of the resources finished loading
function contentSourceLoaded() {

    // Check if all the resources were loaded successfully
    if (++loadedContentResourcesNumber == contentResourcesNumber)
        contentLoaded(); // If yes, then show the page content.

}

// Check if you can connect to the server
function isOnline() {

    // Return a promise
    return new Promise((resolve, reject) => {

        if ('connection' in navigator && String(connectionAPI.onchange) !== "undefined") { // Check if the connection API is available

            if (!window.navigator.onLine) { // If it is avaliable, check if the user is even connected to a network

                // The user if offline!
                resolve(false);

            } else {

                // If the user is connected to a network, try to connect to the server of the store
                fetch(window.platform.server + "/.server.test.connection", { method: 'HEAD' }, ).then(function(response) {

                    // If the response was successful, then the user must be online. If not, then the user is offline.
                    resolve(response.ok);

                }).catch(function() {

                    // The user if offline!
                    resolve(false);

                });

            }

        } else if ('onLine' in navigator) { // If the connection API is not available, just check if the user is connected to a network or not.

            // If the user is connected to a network, then he could be online. If not, then he's offline.
            resolve(window.navigator.onLine);

        } else { // If you can't use the onLine API, then asume that the user is online.

            // The user *could* be online!
            resolve(true);

        }

    });

}

// Update the user connection status
function updateOnlineStatus() {

    // Check if the user is online
    isOnline().then(function(isOnline) {

        if (isOnline) {

            // If the user is online, hide any possible alerts caused by the connection checking process!
            if (didAlertAboutConnection)
                hideAlert();

        } else {

            // Use this variable to tell the next check that an alter was already shown
            didAlertAboutConnection = true;

            // Show an alert
            showAlert("Can't connect to the server!", " We're unable to connect to the server, please check your internet connection or try coming back later.", "Reload page", function() {

                // Reload the page
                window.location.pathname = window.location.pathname;

            }, "Ok", function() {

                // Hide the alert
                hideAlert();

                // Use this variable to tell the next check that the connection check does not have any active alerts
                didAlertAboutConnection = false;

            });

        }

    });

}

// Allow the page content to add "unload functions"
window.addUnloadObject = function(unloadFunction) {

    unload.push(unloadFunction);

};

// Unload the page content
window.unloadContent = function() {

    // Keep going through all the "unload objects"
    while (unload.length != 0) {

        // Remove the "unload object" from the `unload` array
        var object = unload.shift();

        // Check the object type
        if (typeof object == "function") {

            // Call the "unload function"
            object();

        }

        // Delete the object
        delete object;

    }

    // Reset the page flags
    pageFlags.endMessage = false;
    pageFlags.canUnload = true;

    // Reset the resources number
    contentResourcesNumber = 0;
    loadedContentResourcesNumber = 0;

    // Reset the page content
    didFail = false;
    pageHTMLContent = null;
    pageContentElement.innerHTML = "";

    // Reset the page loading events
    window.oncontentinjection = null;
    window.onpagecontentload = null;


    // Reset the loading screen
    document.documentElement.dataset.contentLoaded = false;
    document.documentElement.dataset.extraContentLoaded = false;
    coverLoadingIcon.style.opacity = null;
    var selectedSectionsItem = document.querySelector(".layout--sectionsbar-item.state--selected");
    if (selectedSectionsItem != null) {

        selectedSectionsItem.classList.remove("state--selected");

    }
    delete selectedSectionsItem;

};

// Define a new dynamic location object
window.location.dynamic = {

    // Redirect the page dynamically
    redirect(url) {

        // Check if the current page can be unloaded
        if (pageFlags.canUnload) {

            // Unload the page content
            window.unloadContent();

            // Dynamically load the new page content
            loadContentFromSrc(url);

            // Push the new URL state
            window.history.pushState("", "", url);

            // Change the value of `didLoadDynamically`
            this.didLoadDynamically = true;

        } else {

            // Redirect the page normally
            window.location.href = url;

        }

    },
    didLoadDynamically: false

};

// Register new <a> elements
window.registerNewLink = function(linkElement) {

    // Check if the current page can be unloaded
    if (pageFlags.canUnload) {

        // Add a "click" event listener to the link element
        linkElement.addEventListener("click", function(e) {

            // Prevent the page from redirecting
            e.preventDefault();

            // Dynamiclly change the page content
            var href = this.getAttribute("href");
            if (href != undefined && href != null) {

                window.location.dynamic.redirect(href);

            }

        });

    }

};