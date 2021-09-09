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
        linkedElement: document.getElementById('page') // The page content element
    };

    scrollbar.handle.style.height = // Change the height of the scrollbar handle
        `${(scrollbar.linkedElement.clientHeight/scrollbar.linkedElement.scrollHeight)*100}%`;
    //      ^ The height of the content element  ^ The scroll-height of the content element
    scrollbar.linkedElement.onscroll = function() {
        scrollbar.handle.style.top =
            `${(scrollbar.linkedElement.scrollTop/scrollbar.linkedElement.scrollHeight)*100}%`;
        //      ^ The offset top value of the content element
    };

    // scrollbar.linkedElement.scrollTo(0, yPosition);

    scrollbar.linkedElement.scrollbar = scrollbar; // Link this object to the page content element

}

function unlinkScrollbar(element) { // Unlink a scrollbar from the page

    delete element.scrollbar.linkedElement.onscroll, element.scrollbar;

}