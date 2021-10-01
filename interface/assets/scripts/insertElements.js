/*

    Manage inserting elements

*/

// Insert an element string into the page 
function insertStringAsElement(elementString, target, atStart = false) {

    // Convert the string into an element
    var element = document.createRange().createContextualFragment(elementString);
    if (element.children.length != 1) {

        throw new Error("Unexpected input! (You can only pass one top-parent element)");

    }
    element = element.children[0];

    // Insert the element inside the target
    (!atStart) ? target.appendChild(element): target.prepend(element);

    return element;

}