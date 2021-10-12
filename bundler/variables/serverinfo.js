/*

    Manage the server info

*/


// Define the module object
module.exports = function(content, configuration) {

    // Replace the server variables
    return content.replace(/%%(.*?)%%/g, function(data, variable) {

        console.log(configuration);

        // Go through the possible variables
        if (variable == "HOST") {

            // Return the host variable
            return configuration.hostAddress;

        } else if (variable == "PROTOCOL") {

            // Return the protocol variable
            return configuration.hostProtocol;

        } else {

            // Return an error
            throw new Error(`Unknown server variable! ("${variable}")`);

        }

    });

}