/*

    Manage the react-based apps

*/


// Import the required modules
//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {

    StyleSheet,
    StatusBar

} from 'react-native';
import {

    WebView

} from 'react-native-webview';

// Collect some info about this device
var deviceInfo = {

    statusBar: {

        height: StatusBar.currentHeight

    }

};

// Define the app's interface
export default function App() {

    return (

        <WebView
            originWhitelist={['*']}
            source={{ uri: 'file:///android_asset/index.html' }}
            javaScriptEnabled={true}
            domStorageEnabled={true}

            style={styles.container}
        />

    );

}

// Styles
const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },

});
