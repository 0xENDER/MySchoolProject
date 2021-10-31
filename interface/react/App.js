// --@react
/*

    Manage the react-based app

*/


// Get the required modules
//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview'

// Collect some info about this device
var deviceInfo = {

    statusBar: {

        height: StatusBar.currentHeight

    }

};

//  Set the default export object
export default function App() {

    return (

        <WebView
            originWhitelist={['*']}
            source={{ uri: 'file:///android_asset/layout.html' }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            style={styles.container}
        />

    );

}

// Stylesheets
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});
