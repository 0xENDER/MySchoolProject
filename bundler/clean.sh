## Clear the generated files in the "bundler/" directory
#
#
## Organise the environment variables
DEBUG_MODE=$1
BUILD_WEB=$2
BUILD_WINDOWS=$3
BUILD_LINUX=$4
BUILD_MAC=$5
BUILD_ANDROID=$6
FRAMEWORK_ELECTRON=$7
USE_FRAMEWORKS=0
if [ $FRAMEWORK_ELECTRON -eq 1 ]; then
#
    USE_FRAMEWORKS=1
#
fi
#
## Clear the "/builds/" directory
if [ -d "builds/" ]; then
#
    echo "[Bundler] [Clean] Deleting the 'builds/' directory..."
    rm -rf "builds/"
#
fi
#
## Recreate the "/builds/" directory
echo "[Bundler] [Clean] Preparing the 'builds/' directory..."
mkdir "builds/"
if [ $BUILD_WEB -eq 1 ]; then
#
    mkdir "builds/web/"
#
fi
if [ $BUILD_WINDOWS -eq 1 ]; then
#
    mkdir "builds/windows/"
#
fi
if [ $BUILD_LINUX -eq 1 ]; then
#
    mkdir "builds/linux/"
#
fi
if [ $BUILD_MAC -eq 1 ]; then
#
    mkdir "builds/mac/"
#
fi
if [ $BUILD_ANDROID -eq 1 ]; then
#
    mkdir "builds/android/"
#
fi
if [ $USE_FRAMEWORKS -eq 1 ]; then
#
    mkdir "builds/frameworks/"
#
fi
if [ $FRAMEWORK_ELECTRON -eq 1 ]; then
#
    mkdir "builds/frameworks/electron"
#
fi
#
## Clear the "/apps_codebase/" directory
if [ -d "apps_codebase/" ]; then
#
    echo "[Bundler] [Clean] Deleting the 'apps_codebase/' directory..."
    rm -rf "apps_codebase/"
#
fi
#
## Recreate the "/apps_codebase/" directory
echo "[Bundler] [Clean] Preparing the 'apps_codebase/' directory..."
mkdir "apps_codebase/"
#