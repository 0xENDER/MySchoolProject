window.addEventListener('load', function() {
    document.documentElement.dataset.loaded = true;
    document.documentElement.dataset.contentloaded = false;
    fetch("./test.html")
        .then(response => {
            if (response.status === 200) {
                response.text().then(data => document.getElementById("page").innerHTML = data);
                document.documentElement.dataset.contentloaded = true;
            } else
                alert("[ERROR] Failed to load the page!");
        });

});