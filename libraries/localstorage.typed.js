/*

    This is a library that enables you to save typed data!

*/


// Isolate the library's functions
(function() {

    // Create a new typed item string
    function createItemString(item, expiration = null) {

        // Prepare the item string variable (<Creation Date>;<Expiration Date>;<Data Type>;<Item Data>)
        var itemString = "",
            itemType = typeof item;

        // Save the item's time timestamp
        itemString += `${String((new Date()).getTime())};`;

        // Save the expiration date
        itemString += `${(expiration != null) ? String((new Date()).getTime() + (expiration * 1000)) : "false"};`

        // Check the item's type
        if (itemType == "undefined" || itemType == "function" || itemType == "symbol") {

            // Do not allow undefined items or functions!
            throw new Error(`The type '${itemType}' is not allowed!`);

        } else if (itemType == "boolean" || itemType == "bigint" || itemType == "number") {

            // Save the item's type
            itemString += `${itemType};`;

            // Save the item's data
            itemString += String(item);

        } else if (itemType == "string") {

            // Save the item's type
            itemString += "string;";

            // Save the item's data
            itemString += item;

        } else if (itemType == "object") {

            // Save the object's type
            itemString += "object";

            // Check if this object is supported by the JSON API
            var itemJSONString;
            try {

                itemJSONString = JSON.stringify(item);

            } catch {

                // Throw an error
                throw new Error(`This object ('${String(item)}') is not supported!`);

            } finally {

                // Mark this object as "JSON-parsable"
                itemString += ":JSON;";

                // Save the object's data
                itemString += itemJSONString;

            }

        } else {

            // Throw an error
            throw new Error(`The type '${typeof item}' is not supported!`);

        }

        // Delete used variables
        delete itemType;

        // Return the item's string
        return itemString;

    }

    // Parse a typed item string
    function parseItemString(string, id) {

        // Prepare the output variable
        var item,
            stringDataObject = string.split(";"),
            stringData = {

                creation: stringDataObject.shift(),
                expiration: stringDataObject.shift(),
                type: stringDataObject.shift(),
                data: stringDataObject.shift()

            };

        // Check the expiration date
        if (stringData.expiration != "false") {

            if (Number(stringData.expiration) - (new Date()).getTime() < 0) {

                // Remove this item
                localStorage.removeItem(id);

                // Return nothing
                return undefined;

            }

        }

        // Check the item's type
        if (stringData.type == "boolean") {

            item = Boolean(stringData.data);

        } else if (stringData.type == "bigint") {

            item = BigInt(stringData.data);

        } else if (stringData.type == "number") {

            item = Number(stringData.data);

        } else if (stringData.type == "string") {

            item = stringData.data;

        } else if (stringData.type.indexOf("object") == 0) {

            if (stringData.type == "object:JSON") {

                item = JSON.parse(stringData.data);

            } else {

                throw new Error("Incorrect object data type!");

            }

        } else {

            throw new Error("A corrupt typed data item has been detected!");

        }

        // Delete used variables
        delete stringDataObject, stringData;

        // Return the item's value
        return item;

    }

    // Define the global `_LocalStorage` object
    window._LocalStorage = {

        /// The prefix of the items
        prefix: "__typed_",

        // Set an item
        setItem(name, item, expiration = null) {

            // Catch any error
            try {

                // Save the item
                localStorage.setItem(this.prefix + name, createItemString(item, expiration));

            } catch (e) {

                // Report the error
                console.error(e);

                // Tell the user that this item was not stored
                return false;

            } finally {

                // Tell the user that this item was stored successfully
                return true;

            }

        },

        // Get an item
        getItem(name) {

            // Catch any error
            try {

                // Get the item
                var item = localStorage.getItem(this.prefix + name);
                item = (item == null) ? undefined : item;
                if (item != undefined) {

                    item = parseItemString(item, this.prefix + name);

                    if (item == undefined) {

                        return undefined;

                    }

                } else {

                    return undefined;

                }

            } catch (e) {

                // Report the error
                console.error(e);

                // Tell the user that this item was not stored
                return undefined;

            } finally {

                // Tell the user that this item was stored successfully
                return item;

            }

        },

        // Remove an item
        removeItem(name) {

            try {

                // Save the item
                localStorage.removeItem(this.prefix + name);

            } catch (e) {

                // Report the error
                console.error(e);

                // Tell the user that this item was not stored
                return false;

            } finally {

                // Tell the user that this item was stored successfully
                return true;

            }

        },

        // Clear the typed database items
        clear() {

            // Go through the local storage
            for (var item in localStorage) {

                // Check if this item has the current prefix
                if (item.indexOf(this.prefix) == 0) {

                    // Remove the item
                    localStorage.removeItem(item);

                }

            }

        },

        // Get all items
        all() {

            // Define the output variables
            var output = {},
                length = 0;

            // Go through the local storage
            for (var item in localStorage) {

                // Check if this item has the current prefix
                if (item.indexOf(this.prefix) == 0) {

                    // Add this item to the output
                    var itemData = this.getItem(item.substring(this.prefix.length));
                    if (itemData != undefined) {
                        output[item.substring(this.prefix.length)] = itemData;
                    }
                    delete itemData;

                    // Update the length
                    length++;

                }

            }

            // Update the length
            output.length = length;

            // Return the output
            return output;

        }

    };

})();