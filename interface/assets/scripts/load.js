window.addEventListener('load', function() {
    document.documentElement.dataset.loaded = true;
    fetch("./test.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("page").innerHTML = data;
        });

});