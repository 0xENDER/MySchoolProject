## Install all the required modules for the framework to work
#
#
## Organise the environment variables
DEBUG_MODE=$1
BUILD_ANDROID=$2
#
## Install normal modules
npm install expo@~43.0.0
npm install expo-splash-screen@~0.13.3
npm install expo-status-bar@~1.1.0
npm install expo-updates@~0.10.5
npm install react@17.0.1
npm install react-dom@17.0.1
npm install react-native@0.64.2
npm install react-native-gesture-handler@~1.10.2
npm install react-native-reanimated@~2.2.0
npm install react-native-safe-area-context@3.3.2
npm install react-native-screens@~3.8.0
npm install react-native-web@0.17.1
npm install react-native-webview
#
## Install dev modules
npm install -D @babel/core@^7.12.9
#