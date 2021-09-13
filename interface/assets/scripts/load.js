var contentResourcesNumber = 0,
    loadedContentResourcesNumber = 0;

window.addEventListener('load', function() {
    document.documentElement.dataset.loaded = true;
    document.documentElement.dataset.contentloaded = false;

    setTimeout(function() {
        fetch("./test.html")
            .then(response => {
                if (response.status === 200) {
                    response.text().then(data => {
                        contentResourcesNumber = Number(data.substring(0, data.indexOf("\n")));
                        loadedContentResourcesNumber = 0;
                        document.getElementById("page").innerHTML = data.substring(data.indexOf("\n"));
                        if (contentResourcesNumber == 0)
                            contentLoaded();
                    });
                } else
                    alert("[ERROR] Failed to load the page!");
            });
    }, window.platform.special.maxOptionalTimeoutDely);

});

function contentLoaded() {
    document.documentElement.dataset.contentloaded = true;
}

function contentSourceLoaded() {
    if (++loadedContentResourcesNumber == contentResourcesNumber)
        contentLoaded();
}