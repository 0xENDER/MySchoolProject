/*

    Manage the FTP server connection

*/


// Get the required modules
const jsftp = require("jsftp");

// Define the required variables
var ftpConnection = null,
    openConnection = function(host, username, password, port) {

        // Open a new connection
        var connection = new jsftp({

            host: host,
            user: username,
            pass: password,
            port: port

        });

        // Print the system information
        console.log(`Connected to an FTP server!\nSystem Info: ${connection.system}`);

        // Print the main directory
        ftp.list(".", (error, resource) => {

            // Check if the process failed
            if (error) {

                throw error;

            } else {

                // Print the data
                console.log("\t" + resource);

            }

        });

        // Return the connection object
        return connection;

    },
    closeConnection = function(callback) {

        // Check if there is an open connection
        if (ftpConnection != null) {

            // Close the connection
            ftpConnection.raw("quit", (error, data) => {

                // Check if there is an error!
                if (error) {

                    throw error;

                } else {

                    console.log("Closed an FTP connection!");

                }

                // Change the value of `ftpConnection`
                ftpConnection = null;

                // Call the `callback` function
                callback({

                    error: error,
                    didRun: true,
                    data: data

                });

            });

        } else {

            callback({

                error: false,
                didRun: false,
                data: null

            });

        }

    };

// Define the module object
module.exports = {

    // Open a connection
    openConnection: function(host, username, password, port, callback) {

        // Check if the required FTP is present
        if (ftp.host != null && ftp.username != null && ftp.password != null) {

            // Check if there is a connection already opened
            if (ftpConnection != null) {

                ftpConnection.raw("quit", (error, data) => {

                    // Check if there is an error!
                    if (error) {

                        throw error;

                    }

                    // Open the new connection
                    ftpConnection = openConnection(host, username, password, port);

                    // Run the callback function
                    callback({

                        error: error,
                        didRun: true,
                        data: data

                    });

                });

            } else {

                // Open the new connection
                ftpConnection = openConnection(host, username, password, port);

                // Run the callback function
                callback({

                    error: false,
                    didRun: true,
                    data: null

                });

            }

        }

    },

    // Close a connection
    closeConnection: function(callback) {

        if (ftpConnection != null) {

            // Close the connection
            closeConnection(callback);

        } else {

            // Run the callback function
            callback({

                error: false,
                didRun: false,
                data: null

            });

        }

    },

    // Run a command
    runCommand: function(command, callback) {

        // Check if there is an open connection
        if (ftpConnection != null) {

            // Run the command
            ftpConnection.raw(command, (error, data) => {

                // Run the callback function
                callback({

                    error: error,
                    didRun: true,
                    data: data

                });

            });

        } else {

            // Call the `callback` function
            callback({

                error: false,
                didRun: false,
                data: null

            });

        }

    },

    // Upload a file
    uploadFile: function(path, destination, callback) {

        // Check if there is an open FTP connection
        if (ftpConnection != null) {

            // Upload the file
            ftpConnection.put(path, destination, (error) => {

                // Run the callback function
                callback({

                    error: error,
                    didRun: true,
                    data: null

                });

            });

        } else {

            // Run the callback function
            callback({

                error: false,
                didRun: false,
                data: null

            });

        }

    },

    // Delete a file
    deleteFile: function(path, callback) {

        //
        throw new Error("NOT READY YET!!!");

    },

    // List files
    listFiles: function(path, callback) {

        // Check if there is an open FTP connection
        if (ftpConnection != null) {

            // Run the list command
            ftp.ls(path, (error, resources) => {

                // Check if the process failed
                if (error) {

                    throw error;

                }

                console.log("The main directory:");

                // Call the `callback` function
                callback({

                    error: error,
                    didRun: true,
                    data: resources

                });

            });

        } else {

            // Call the `callback` function
            callback({

                error: false,
                didRun: false,
                data: null

            });

        }

    },

    // List the files one by one
    listFilesSeparately(path, callback) {

        // Get the files list
        this.listFiles(path, function(output) {

            // Check if there was an error
            if (output.error || !output.didRun) {

                // Call the `callback` function
                callback({

                    error: output.error,
                    didRun: output.didRun,
                    data: null

                });

            } else {

                // Go through all the files
                output.data.forEach(function(file) {

                    // Call the `callback` function
                    callback({

                        error: false,
                        didRun: true,
                        data: file

                    });

                });

            }

        });

    }

};