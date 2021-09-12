var sectionsitems = document.getElementsByClassName("layout--sectionsbar-item");

function selectItem(element) {
    for (var i = 0; i < sectionsitems.length; i++) {
        sectionsitems[i].classList.remove("state--selected");
    }
    element.classList.add("state--selected");
}

for (var i = 0; i < sectionsitems.length; i++) {
    sectionsitems[i].addEventListener("click", function() {
        selectItem(this);
    });
}