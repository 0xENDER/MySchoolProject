## Build the native Electron apps
#
#
## Organise the environment variables
DEBUG_MODE=$1
BUILD_WINDOWS=$2
BUILD_LINUX=$3
BUILD_MAC=$4
#
## Navigate to the framework's build directory
cd "builds/frameworks/electron/"
#
## Install all the NodeJS modules
"./electron/build.sh" $DEBUG_MODE $BUILD_WINDOWS $BUILD_LINUX $BUILD_MAC

#
## Navigate back to the bundler's main directory
cd "../../../"
#