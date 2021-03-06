## Manage the "bundler/builds/frameworks/" directory
#
#
## Organise the environment variables
DEBUG_MODE=$1
FRAMEWORK_ELECTRON=$2
LOCAL=$3
#
## Copy the folders inside the "interface/" directory for Electron
if [ $FRAMEWORK_ELECTRON -eq 1 ]; then
#
    echo "[Bundler] [Frameworks ~ Prepare Electron] Copying some folders from the codebase..."
    cp -R "apps_codebase/assets/" "builds/frameworks/electron/"
    cp -R "apps_codebase/pages/" "builds/frameworks/electron/"
    cp -R "apps_codebase/components/" "builds/frameworks/electron/"
    cp -R "apps_codebase/libraries/" "builds/frameworks/electron/"
    cp -R "apps_codebase/shared/" "builds/frameworks/electron/"
    cp -R "apps_codebase/electron/" "builds/frameworks/electron/"
#
fi
#
## Copy the files inside the "interface/" directory for Electron
if [ $FRAMEWORK_ELECTRON -eq 1 ]; then
#
    echo "[Bundler] [Frameworks ~ Prepare Electron] Copying some files from the codebase..."
    cp "apps_codebase/layout.html" "builds/frameworks/electron/"
    cp "apps_codebase/package.json" "builds/frameworks/electron/"
#
fi
#
## Replace all the custom variables
if [ $FRAMEWORK_ELECTRON -eq 1 ]; then
#
    echo "[Bundler] [Frameworks ~ Prepare Electron] Processing all the custom variables..."
    node "variables/electron.js" $LOCAL
#
fi
#