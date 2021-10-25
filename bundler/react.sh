## Build the native React apps
#
#
## Organise the environment variables
DEBUG_MODE=$1
BUILD_ANDROID=$2
#
## Navigate to the framework's build directory
cd "builds/frameworks/react/"
#
## Install all the shared NodeJS modules
"./shared/build.sh" $DEBUG_MODE
#
## Install all the NodeJS modules
"./react/build.sh" $DEBUG_MODE $BUILD_ANDROID
#
## Navigate back to the bundler's main directory
cd "../../../"
#
## <string>
echo "[Error] The React builder isn't ready yet!"
#