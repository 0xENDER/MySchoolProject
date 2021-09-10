/*
    Credit: https://jsfiddle.net/uq2pLufn/3/
*/

function linkScrollbar() { // Link a scrollbar to the page

    // Get all the elements to start setting up the scrollbar

    var scrollbar = {
        container: document.getElementById('scrollbar'), // The handle container
        handle: document.getElementById('scrollbar--handle'), // The handle
        topButton: document.getElementById('scrollbar--top'), // The "scroll top" button
        bottomButton: document.getElementById('scrollbar--bottom'), // The "scroll bottom" button
        linkedElement: document.getElementById('page'), // The page content element
        interval: null,
        clickStart: null,
        clickEnd: null,
        moving: null
    };

    scrollbar.handle.refreshHeight = function() {
        scrollbar.handle.style.height = // Change the height of the scrollbar handle
            `${(scrollbar.linkedElement.clientHeight/scrollbar.linkedElement.scrollHeight)*100}%`;
        //      ^ The height of the content element  ^ The scroll-height of the content element
    };

    scrollbar.handle.refreshHeight();

    // Keep track of the top-position of the scrollbar handle
    scrollbar.linkedElement.onscroll = function() {
        scrollbar.handle.style.top =
            `${(scrollbar.linkedElement.scrollTop/scrollbar.linkedElement.scrollHeight)*100}%`;
        //      ^ The offset top value of the content element
    };


    // Watch out for any scroll-height changes
    var lastScrollHeight = scrollbar.linkedElement.scrollHeight;
    scrollbar.interval = setInterval(function() {
        if (scrollbar.linkedElement.scrollHeight != lastScrollHeight) {
            lastScrollHeight = scrollbar.linkedElement.scrollHeight;
            scrollbar.handle.refreshHeight();
            scrollbar.linkedElement.onscroll();
        }
    }, window.platform.intervalRefreshRate);

    var didClickStart = false, // Did the user click the handle?
        clickStartYPosition = 0, // The Y position of the mouse click
        clickStartHandleYPosition = 0; // The Y position of the scrollbar handle
    scrollbar.clickStart = function(e) {
        didClickStart = true; // The user did click the handle
        clickStartYPosition = e.pageY; // Save this Y position to get the offset of the mouse after moving
        clickStartHandleYPosition = scrollbar.handle.offsetTop;
        console.log("Start");
    };
    scrollbar.clickEnd = function() {
        if (didClickStart) { // If the mouse was down, and it's not now, then do this:
            didClickStart = false; // Set the click status to false
            clickStartYPosition = 0; // Reset the start Y position
            clickStartHandleYPosition = 0;
            console.log("End");
        }
    };
    scrollbar.moving = function(e) {
        if (didClickStart) { // If the mouse is down
            console.log(`${scrollbar.handle.offsetTop} ${clickStartYPosition - e.pageY} ${scrollbar.container.clientHeight}`);
            var mouseOffset = clickStartYPosition - e.pageY, // Get the clicking Y axis offset of the mouse
                mouseOffsetPercentage = ((clickStartHandleYPosition - mouseOffset) / scrollbar.container.clientHeight); // Get the scrollbar scroll offset as a percentage ("top-offset"/"scrollbar container height")
            console.log(`Move offset: ${mouseOffset} ${mouseOffsetPercentage * 100}`);
            scrollbar.linkedElement.scrollTo(0, mouseOffsetPercentage * scrollbar.linkedElement.scrollHeight);
            //scrollbar.handle.style.top = `${mouseOffsetPercentage}%`;
            // HandleTop = (topPosition/scrollHeight)*100
            // HandleTop = (topPosition/scrollHeight)*100
        }
    };

    scrollbar.handle.addEventListener("mousedown", scrollbar.clickStart); // Detect when the mouse is down
    scrollbar.handle.addEventListener("touchstart", scrollbar.clickStart); // Detect touch action start

    window.addEventListener('mousemove', scrollbar.moving);

    window.addEventListener("mouseup", scrollbar.clickEnd); // Detect when the mouse is up (globally)
    window.addEventListener("touchend", scrollbar.clickEnd); // Detect touch action end (globally)

    // scrollbar.linkedElement.scrollTo(0, yPosition);

    scrollbar.linkedElement.scrollbar = scrollbar; // Link this object to the page content element

}

function unlinkScrollbar(element) { // Unlink a scrollbar from the page

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

}