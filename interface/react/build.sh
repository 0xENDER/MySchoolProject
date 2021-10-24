## Install all the required modules for the framework to work
#
#
## Organise the environment variables
DEBUG_MODE=$1
BUILD_ANDROID=$2
BUILD_IOS=$3
#
## Install normal modules
npm install expo #~43.0.0
npm install expo-status-bar #~1.1.0
expo install react
expo install react-dom
expo install react-native
expo install react-native-web
expo install react-native-webview
#
## Install dev modules
npm install -D @babel/core #^7.12.9
#
## Copy the app files inside the `react/` directory
cp -R "react/app/." "./"
#