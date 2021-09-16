/*
// Get the required elements in the side/bottom bar
var sectionsitems = document.getElementsByClassName("layout--sectionsbar-item");

// Select one of the side/bottom bar options/items
function selectItem(element) {

    for (var i = 0; i < sectionsitems.length; i++) {

        sectionsitems[i].classList.remove("state--selected");

    }

    element.classList.add("state--selected");

}

// Link the "selectItem" function to the items in the side/bottom bar
function linkItemsFunctions() {

    for (var i = 0; i < sectionsitems.length; i++) {

        sectionsitems[i].addEventListener("click", function() {

            selectItem(this);

        });

    }

}
*/