/*

    Manage communication between pages

*/


// Define a global data variable
// NOTE: You need to manage data types and such stuff here! (Maybe create a TypedLocalStorage library)
window.temporaryData = {

    //
    currentData: {},

    // Add an item to the temporary data group
    setItem: function(name, data) {

        _LocalStorage.setItem("data-" + name, data);

    },

    // Get an item from the temporary data group
    getItem: function(name) {

        _LocalStorage.getItem("data-" + name);

    },

    // Remove an item from the temporary data group
    removeItem: function(name) {

        _LocalStorage.removeItem("data-" + name);

    }

};

// Get data from the last page
for (var item in _LocalStorage.all()) {

    if (item.indexOf("data-") == 0) {

        // Store the data
        window.temporaryData.currentData[item.substring(5)] = _LocalStorage.getItem(item);

        // Remove the item
        _LocalStorage.removeItem(item);

    }

}