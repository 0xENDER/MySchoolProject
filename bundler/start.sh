## Build the website for the web, Windows, Linux, MacOS, and Android
#
#
## Organise the environment variables
DEBUG_MODE=$1
BUILD_WEB=$2
BUILD_WINDOWS=$3
BUILD_LINUX=$4
BUILD_MAC=$5
BUILD_ANDROID=$6
LOCAL=$7
FRAMEWORK_ELECTRON=$(expr $BUILD_WINDOWS + $BUILD_LINUX + $BUILD_MAC)
USE_FRAMEWORKS=0
if [ $FRAMEWORK_ELECTRON -gt 0 ]; then
#
    FRAMEWORK_ELECTRON=1
    USE_FRAMEWORKS=1
#
else
#
    FRAMEWORK_ELECTRON=0
#
fi
###### if [ $DEBUG_MODE -eq 1 ]; then
###### #
######     echo "[DEBUG] Local: $LOCAL"
######     echo "[DEBUG] Web: $BUILD_WEB"
######     echo "[DEBUG] Windows: $BUILD_WINDOWS"
######     echo "[DEBUG] Linux: $BUILD_LINUX"
######     echo "[DEBUG] macOS: $BUILD_MAC"
######     echo "[DEBUG] Android: $BUILD_ANDROID"
######     echo "[DEBUG] Electron: $FRAMEWORK_ELECTRON"
###### #
###### fi
#
## Clear the generated files in the "/bundler/" directory
echo -e "\n[Bundler] Cleaning up the 'bundler/' directory..."
"./clean.sh" $DEBUG_MODE $BUILD_WEB $BUILD_WINDOWS $BUILD_LINUX $BUILD_MAC $BUILD_ANDROID $FRAMEWORK_ELECTRON
#
## Prepare the bundler
if [ -d "node_modules/" ]; then
#
    echo -e "\n[Bundler] The bundler is ready..."
#
else
#
    echo -e "\n[Bundler] Preparing the bundler..."
    "./install_node_modules.sh" $DEBUG_MODE
#
fi
#
## Minify all the code in the "/interface/" directory
echo -e "\n[Bundler] Minifying the codebase..."
"./minify.sh" $DEBUG_MODE
#
## Manage "/builds/web/"
if [ $BUILD_WEB -eq 1 ]; then
#
    echo -e "\n[Bundler] Building the web codebase version..."
    "./web.sh" $DEBUG_MODE $LOCAL
#
fi
#
## Prepare the codebase for Electron
if [ $USE_FRAMEWORKS -eq 1 ]; then
#
    echo -e "\n[Bundler] Preparing the codebase for Electron..."
    "./prepare_frameworks_codebase.sh" $DEBUG_MODE $FRAMEWORK_ELECTRON $LOCAL
#
fi
#
## Build the codebase using Electron
if [ $FRAMEWORK_ELECTRON -eq 1 ]; then
#
    echo -e "\n[Bundler] Building the codebase using Electron..."
    "./electron.sh" $DEBUG_MODE $BUILD_WINDOWS $BUILD_LINUX $BUILD_MAC
#
fi
#
## Build the codebase for Android
if [ $BUILD_ANDROID -eq 1 ]; then
#
    echo -e "\n[Bundler] Building the codebase for Android..."
    "./android.sh" $DEBUG_MODE
#
fi
#
## Inform the user that the build is done
echo -e "\n[Bundler] All the builds are finished!"
#