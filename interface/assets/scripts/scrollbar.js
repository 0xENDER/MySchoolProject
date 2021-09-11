/*

    This files manages the `pagecontent` layout scrollbar

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

    scrollbar.handle.refreshHeight();

    function updateScrollbar() {
        linkedElementHeight = scrollbar.linkedElement.clientHeight;
        scrollbar.handle.refreshHeight();
        scrollbar.linkedElement.onscroll();
        clickStartHandleYPosition = scrollbar.handle.offsetTop;
    }

    // Keep track of the top-position of the scrollbar handle
    scrollbar.linkedElement.onscroll = function() {
        scrollbar.handle.style.top =
            `${(scrollbar.linkedElement.scrollTop/scrollbar.linkedElement.scrollHeight)*100}%`;
        //      ^ The offset top value of the content element
    };

    var didClickStart = false, // Did the user click the handle?
        clickStartYPosition = 0, // The Y position of the mouse click
        clickStartHandleYPosition = scrollbar.handle.offsetTop; // The Y position of the scrollbar handle

    scrollbar.clickStart = function(e) {
        didClickStart = true; // The user did click the handle
        clickStartYPosition = e.pageY; // Save this Y position to get the offset of the mouse after moving
        clickStartHandleYPosition = scrollbar.handle.offsetTop;
    };

    scrollbar.clickEnd = function() {
        if (didClickStart) { // If the mouse was down, and it's not now, then do this:
            didClickStart = false; // Set the click status to false
            clickStartYPosition = 0; // Reset the start Y position
            clickStartHandleYPosition = scrollbar.handle.offsetTop;
        }
    };

    function scrollToOffset(offset, isSmooth) { // Scroll in the page content
        var mouseOffsetPercentage = (offset / scrollbar.container.clientHeight); // Get the scrollbar scroll offset as a percentage ("top-offset"/"scrollbar container height")
        scrollbar.linkedElement.scrollTo({
            top: mouseOffsetPercentage * scrollbar.linkedElement.scrollHeight,
            left: 0,
            behavior: isSmooth ? 'smooth' : 'auto'
        });
    }

    scrollbar.moving = function(e) {
        if (didClickStart) { // If the mouse is down
            scrollToOffset(clickStartHandleYPosition - clickStartYPosition + e.pageY);
        }
    };

    // Watch out for any container resize events and scroll-height changes
    var linkedElementHeight = scrollbar.linkedElement.clientHeight,
        lastScrollHeight = scrollbar.linkedElement.scrollHeight;
    scrollbar.interval = setInterval(function() {
        if (scrollbar.linkedElement.scrollHeight != lastScrollHeight) {
            lastScrollHeight = scrollbar.linkedElement.scrollHeight;
            updateScrollbar();
        }
        if (scrollbar.linkedElement.clientHeight != linkedElementHeight) {
            linkedElementHeight = scrollbar.linkedElement.clientHeight;
            updateScrollbar();
        }
    }, window.platform.special.intervalRefreshRate);

    // Set up the scrollbar handle events
    scrollbar.handle.addEventListener("mousedown", scrollbar.clickStart, { passive: true }); // Detect when the mouse is down
    //scrollbar.handle.addEventListener("touchstart", scrollbar.clickStart, { passive: true }); // Detect touch action start
    window.addEventListener('mousemove', scrollbar.moving, { passive: true }); // Detect when the mouse movies
    //window.addEventListener('touchmove', scrollbar.moving, { passive: true }); // Detect when the touch position changes
    window.addEventListener("mouseup", scrollbar.clickEnd, { passive: true }); // Detect when the mouse is up (globally)
    //window.addEventListener("touchend", scrollbar.clickEnd, { passive: true }); // Detect touch action end (globally)

    // Set up the scrollbar container events
    scrollbar.container.addEventListener("mousedown", function(e) {
        if (!didClickStart) {
            scrollToOffset(e.offsetY - (scrollbar.handle.clientHeight / 2), true);
        }
    }, { passive: true });

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
            scrollToOffset(scrollbar.handle.offsetTop - window.platform.special.scrollSpace, true);
            topTimeout = setTimeout(function() {
                scrollToOffset(scrollbar.handle.offsetTop - 4, false);
                topInterval = setInterval(function() {
                    scrollToOffset(scrollbar.handle.offsetTop - 4, false);
                }, window.platform.special.intervalRefreshRate);
            }, window.platform.special.scrollLockPeriod);
        }
    }, { passive: true });

    // The bottom button (click-start)
    scrollbar.bottomButton.addEventListener("mousedown", function() {
        if (!didClickBottom && !didClickTop) {
            didClickBottom = true;
            didClickTop = false;
            scrollToOffset(scrollbar.handle.offsetTop + window.platform.special.scrollSpace, true);
            bottomTimeout = setTimeout(function() {
                scrollToOffset(scrollbar.handle.offsetTop + 4, false);
                bottomInterval = setInterval(function() {
                    scrollToOffset(scrollbar.handle.offsetTop + 4, false);
                }, window.platform.special.intervalRefreshRate);
            }, window.platform.special.scrollLockPeriod);
        }
    }, { passive: true });

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
    }, { passive: true });

    scrollbar.linkedElement.scrollbar = scrollbar; // Link this object to the page content element

}

// There's no need for this function now
/*function unlinkScrollbar(element) { // Unlink a scrollbar from the page

    // Clear all interval loops
    clearInterval(element.scrollbar.interval);

    // Delete all the event listeners
    scrollbar.handle.removeEventListener("mousedown", element.scrollbar.clickStart);
    scrollbar.handle.removeEventListener("touchstart", element.scrollbar.clickStart);
    window.removeEventListener('mousemove', element.scrollbar.moving);
    window.removeEventListener("mouseup", element.scrollbar.clickEnd);
    window.removeEventListener("touchend", element.scrollbar.clickEnd);

    // Delete attached variables
    delete element.scrollbar.linkedElement.onscroll, // Delete the `onscroll` event function
        element.scrollbar.handle.refreshHeight, // Delete the handle `refreshHeight` function
        element.scrollbar; // Delete the `scrollbar` object

}*/