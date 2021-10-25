## Install all the required modules for the framework to work
#
#
## Organise the environment variables
DEBUG_MODE=$1
BUILD_ANDROID=$2
#
## Install normal modules
npm install expo
npm install expo-splash-screen
npm install expo-status-bar
npm install expo-updates
npm install react
npm install react-dom
npm install react-native
npm install react-native-gesture-handler
npm install react-native-reanimated
npm install react-native-safe-area-context
npm install react-native-screens
npm install react-native-web
npm install react-native-webview
#
## Install dev modules
npm install -D @babel/core@^7.12.9
#
## Move the files from the "react/" directory
mv "./react/*" "./"
#