/*

    Manage the `pagecontent` layout scrollbar

*/

function linkScrollbar() { // Link a scrollbar to the page

    // Get all the elements to start setting up the scrollbar
    var scrollbar = {

        mainContainer: document.getElementById('component--scrollbar'), // The whole scrollbar container
        container: document.getElementById('scrollbar'), // The handle container
        handle: document.getElementById('scrollbar--handle'), // The handle
        topButton: document.getElementById('scrollbar--top'), // The "scroll top" button
        bottomButton: document.getElementById('scrollbar--bottom'), // The "scroll bottom" button
        linkedElement: document.getElementById('page'), // The page content element
        interval: null, // The interval id
        clickStart: null, // The "clickStart" function
        clickEnd: null, // The "clickEnd" function
        moving: null // The "moving" function

    };

    // Define a function that can change the handle size to fit the scrolling height
    scrollbar.handle.refreshHeight = function() {

        scrollbar.handle.style.height = // Change the height of the scrollbar handle
            `${(scrollbar.linkedElement.clientHeight/scrollbar.linkedElement.scrollHeight)*100}%`;
        //      ^ The height of the content element  ^ The scroll-height of the content element
        if (Math.abs(scrollbar.handle.clientHeight - scrollbar.container.clientHeight) < 2) {

            scrollbar.mainContainer.style.opacity = 0;

        } else {

            scrollbar.mainContainer.style.opacity = null;

        }

    };

    // Run this function (it has to be loaded at the start first)
    scrollbar.handle.refreshHeight();

    // Add a function that will update the scrollbar in case of any changes in the page size
    function updateScrollbar() {

        // Update the height of the linked element
        linkedElementHeight = scrollbar.linkedElement.clientHeight;

        // Update the height of the scrollbar handle
        scrollbar.handle.refreshHeight();

        // Update the scrollbar handle's position
        scrollbar.linkedElement.onscroll();

        // Update the saved position of the handle position
        clickStartHandleYPosition = scrollbar.handle.offsetTop;

    }

    // Keep track of the top-position of the scrollbar handle
    scrollbar.linkedElement.onscroll = function() {

        // Update the position of the scrollbar handle
        scrollbar.handle.style.top =
            `${(scrollbar.linkedElement.scrollTop/scrollbar.linkedElement.scrollHeight)*100}%`;
        //      ^ The offset top value of the content element

        // Update the rubber scroll effect
        if (window.platform.rendering.isBlink && window.platform.hardware.hasTouchScreen) {

            document.documentElement.dataset.rubberTop = !(scrollbar.linkedElement.scrollTop > 120);
            document.documentElement.dataset.rubberBottom = !(scrollbar.linkedElement.scrollTop < scrollbar.linkedElement.scrollHeight - scrollbar.linkedElement.clientHeight - 120);

        }

    };

    // Define check variables
    var didClickStart = false, // Did the user click the handle?
        clickStartYPosition = 0, // The Y position of the mouse click
        clickStartHandleYPosition = scrollbar.handle.offsetTop; // The Y position of the scrollbar handle

    // "The handle has been clicked!"
    scrollbar.clickStart = function(e) {

        didClickStart = true; // The user did click the handle
        clickStartYPosition = e.pageY; // Save this Y position to get the offset of the mouse after moving
        clickStartHandleYPosition = scrollbar.handle.offsetTop;

    };

    // "The handle click is done!"
    scrollbar.clickEnd = function() {

        if (didClickStart) { // If the mouse was down, and it's not now, then do this:

            didClickStart = false; // Set the click status to false
            clickStartYPosition = 0; // Reset the start Y position
            clickStartHandleYPosition = scrollbar.handle.offsetTop;

        }

    };

    // Scroll through the page content using an offset in the scrollbar
    function scrollToOffset(offset, isSmooth) { // Scroll in the page content

        var mouseOffsetPercentage = (offset / scrollbar.container.clientHeight); // Get the scrollbar scroll offset as a percentage ("top-offset"/"scrollbar container height")

        scrollbar.linkedElement.scrollTo({

            top: mouseOffsetPercentage * scrollbar.linkedElement.scrollHeight,
            left: 0,
            behavior: isSmooth ? 'smooth' : 'auto'

        });

    }

    // Scroll through the pahe content using an offset in the page scroll hight
    function scrollToOffsetPx(offset, isSmooth) {

        // Use the `scrollTo` function to scroll through the linked element
        scrollbar.linkedElement.scrollTo({

            top: scrollbar.linkedElement.scrollTop + offset,
            left: 0, // Never scroll on the X axis
            behavior: isSmooth ? 'smooth' : 'auto'

        });

    }

    // "The handle is being moved!"
    scrollbar.moving = function(e) {

        if (didClickStart) { // If the mouse is down

            // Scroll to the current offset
            scrollToOffset(clickStartHandleYPosition - clickStartYPosition + e.pageY);

        }

    };

    // Watch out for any container resize events and scroll-height changes
    var linkedElementHeight = scrollbar.linkedElement.clientHeight,
        lastScrollHeight = scrollbar.linkedElement.scrollHeight;

    // Start an interval loop to keep track of the scrollbar
    scrollbar.interval = setInterval(function() {

        // If the linked element's scroll-height has changed, update the scrollbar!
        if (scrollbar.linkedElement.scrollHeight != lastScrollHeight) {

            lastScrollHeight = scrollbar.linkedElement.scrollHeight;
            updateScrollbar();

        } else if (scrollbar.linkedElement.clientHeight != linkedElementHeight) { // If the linked element's height has changed, update the scrollbar!

            linkedElementHeight = scrollbar.linkedElement.clientHeight;
            updateScrollbar();

        }

    }, window.platform.special.intervalRefreshRate);

    // Set up the scrollbar handle events
    scrollbar.handle.addEventListener("mousedown", scrollbar.clickStart, { passive: true }); // Detect when the mouse is down
    window.addEventListener('mousemove', scrollbar.moving, { passive: true }); // Detect when the mouse movies
    window.addEventListener("mouseup", scrollbar.clickEnd, { passive: true }); // Detect when the mouse is up (globally)

    // Set up the scrollbar container events
    scrollbar.container.addEventListener("mousedown", function(e) {

        if (!didClickStart) {

            scrollToOffset(e.offsetY - (scrollbar.handle.clientHeight / 2), true);

        }

    }, {

        passive: true

    });

    // Set up the top & bottom buttons events
    var didClickTop = false,
        didClickBottom = false,
        topTimeout = null,
        bottomTimeout = null,
        topInterval = null,
        bottomInterval = null;

    // The top button (click-start)
    scrollbar.topButton.addEventListener("mousedown", function() {

        if (!didClickTop && !didClickBottom) {

            didClickTop = true;
            didClickBottom = false;
            scrollToOffsetPx(-window.platform.special.scrollSpace, true);

            topTimeout = setTimeout(function() {

                scrollToOffsetPx(-window.platform.special.scrollSpace, false);

                topInterval = setInterval(function() {

                    scrollToOffsetPx(-window.platform.special.scrollSpace, false);

                }, window.platform.special.intervalRefreshRate);

            }, window.platform.special.scrollLockPeriod);

        }

    }, {

        passive: true

    });

    // The bottom button (click-start)
    scrollbar.bottomButton.addEventListener("mousedown", function() {

        if (!didClickBottom && !didClickTop) {

            didClickBottom = true;
            didClickTop = false;
            scrollToOffsetPx(window.platform.special.scrollSpace, true);

            bottomTimeout = setTimeout(function() {

                scrollToOffsetPx(window.platform.special.scrollSpace, false);

                bottomInterval = setInterval(function() {

                    scrollToOffsetPx(window.platform.special.scrollSpace, false);

                }, window.platform.special.intervalRefreshRate);

            }, window.platform.special.scrollLockPeriod);

        }

    }, {

        passive: true

    });

    // The top and bottom buttons (click-end)
    window.addEventListener("mouseup", function() {

        if (didClickTop) { // Check if this is the scrollbar "top button"

            didClickTop = false;
            clearTimeout(topTimeout);

            if (topInterval != null)
                clearInterval(topInterval);

            topTimeout = null;
            topInterval = null;

        } else if (didClickBottom) { // Check if this is the scrollbar "bottom button"

            didClickBottom = false;
            clearTimeout(bottomTimeout);

            if (bottomInterval != null)
                clearInterval(bottomInterval);

            bottomTimeout = null;
            bottomInterval = null;

        }

    }, {

        passive: true

    });

    scrollbar.linkedElement.scrollbar = scrollbar; // Link this object to the page content element

}