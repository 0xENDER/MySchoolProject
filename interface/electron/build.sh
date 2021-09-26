## Install all the required modules for the framework to work
#
#
## Organise the environment variables
DEBUG_MODE=$1
BUILD_WINDOWS=$2
BUILD_LINUX=$3
BUILD_MAC=$4
#
## Install normal modules
npm install fs
npm install v8-compile-cache
#
## Install dev modules
npm install -D electron@latest
#
## Build scripts
if [ $BUILD_WINDOWS -eq 1 ]; then
#
    if [ $DEBUG_MODE -eq 0 ]; then
    #
        sudo electron-builder --win
    #
    else
    #
        sudo electron-builder --dir --win
    #
    fi
#
fi
if [ $BUILD_LINUX -eq 1 ]; then
#
    if [ $DEBUG_MODE -eq 0 ]; then
    #
        sudo electron-builder --linux
    #
    else
    #
        sudo electron-builder --dir --linux
    #
    fi
#
fi
if [ $BUILD_MAC -eq 1 ]; then
#
    if [ $DEBUG_MODE -eq 0 ]; then
    #
        sudo electron-builder --mac
    #
    else
    #
        sudo electron-builder --dir --mac
    #
    fi
#
fi
## Move the output
if [ $DEBUG_MODE -eq 0 ]; then
#
    if [ $BUILD_WINDOWS -eq 1 ]; then
    #
        mv "dist/%{{global:appInfo.name}}% %{{global:codebase.version}}%.exe" "../../windows/"
        mv "dist/%{{global:appInfo.name}}% Setup %{{global:codebase.version}}%.exe" "../../windows/"
        mv "dist/%{{global:appInfo.name}}%-%{{global:codebase.version}}%-win.7z" "../../windows/"
        mv "dist/%{{global:appInfo.name}}%-%{{global:codebase.version}}%-win.tar.xz" "../../windows/"
        mv "dist/%{{global:appInfo.name}}%-%{{global:codebase.version}}%-win.zip" "../../windows/"
    #
    fi
    if [ $BUILD_LINUX -eq 1 ]; then
    #
        mv "dist/%{{global:appInfo.name}}%-%{{global:codebase.version}}%.AppImage" "../../linux/"
        mv "dist/%{{global:appInfo.name}}%_%{{global:codebase.version}}%_amd64.deb" "../../linux/"
        mv "dist/%{{global:appInfo.name}}%-%{{global:codebase.version}}%.7z" "../../linux/"
        mv "dist/%{{global:appInfo.name}}%-%{{global:codebase.version}}%.tar.xz" "../../linux/"
        mv "dist/%{{global:appInfo.name}}%-%{{global:codebase.version}}%.zip" "../../linux/"
    #
    fi
    if [ $BUILD_MAC -eq 1 ]; then
    #
        mv "dist/%{{global:appInfo.name}}%-%{{global:codebase.version}}%-mac.7z" "../../mac/"
        mv "dist/%{{global:appInfo.name}}%-%{{global:codebase.version}}%-mac.tar.xz" "../../mac/"
        mv "dist/%{{global:appInfo.name}}%-%{{global:codebase.version}}%-mac.zip" "../../mac/"
    #
    fi
#
fi
#