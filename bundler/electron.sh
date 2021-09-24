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
"./electron/install_modules.sh"
#
## Navigate back to the bundler's main directory
cd "../../../"
#
## <string>
echo "[Error] The Electron builder isn't ready yet!"
#