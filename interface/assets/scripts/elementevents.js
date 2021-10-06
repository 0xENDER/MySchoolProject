/*

    Add custom element events

*/

// Assign the default values
Element.prototype.onvisible = null;
Element.prototype.__previousVisibleStatus = false;

// Is the element in the view port?
function isInViewport(element) {

    var rect = element.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );

}

// Update the visibility status of elements
function updateElementsVisibility(parent) {

    // Keep looping through the children of each child
    for (var i = 0; i < parent.children.length; i++) {

        // Fire the `onvisible` event
        if (parent.children[i].onvisible != null && isInViewport(parent.children[i])) {

            // Check if the event has already been fired!
            if (!parent.children[i].__previousVisibleStatus) {

                // Update the "previous visible status" variable
                parent.children[i].__previousVisibleStatus = true;

                // Fire the `onvisible` event
                parent.children[i].onvisible();

            }

        } else if (parent.children[i].onvisible != null) {

            // Update the "previous visible status" variable
            parent.children[i].__previousVisibleStatus = false;

        }

        // Scan the children of this element
        updateElementsVisibility(parent.children[i]);

    }

}

// Attach the event listeners
pageContentElement.addEventListener("scroll", function(e) {

    updateElementsVisibility(e.target);

}, (window.performanceVariables.supportsPassiveEvent) ? {

    passive: true

} : false);

// The initial event listeners
function initialEvents() {

    updateElementsVisibility(pageContentElement);

}