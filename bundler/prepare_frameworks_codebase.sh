## Manage the "bundler/builds/frameworks/" directory
#
#
## Organise the environment variables
DEBUG_MODE=$1
FRAMEWORK_ELECTRON=$2
FRAMEWORK_REACT=$3
#
## Copy the folders inside the "interface/" directory for Electron and React
echo "[Bundler] [Frameworks ~ Prepare Electron] Copying some folders from the codebase..."
cp -R "apps_codebase/assets/" "builds/frameworks/electron/"
cp -R "apps_codebase/pages/" "builds/frameworks/electron/"
cp -R "apps_codebase/electron/" "builds/frameworks/electron/"
echo "[Bundler] [Frameworks ~ Prepare React] Copying some folders from the codebase..."
cp -R "apps_codebase/assets/" "builds/frameworks/react/"
cp -R "apps_codebase/pages/" "builds/frameworks/react/"
cp -R "apps_codebase/react/" "builds/frameworks/react/"
#
## Copy the files inside the "interface/" directory for Electron and React
echo "[Bundler] [Frameworks ~ Prepare Electron] Copying some files from the codebase..."
cp "apps_codebase/layout.html" "builds/frameworks/electron/"
cp "apps_codebase/package.json" "builds/frameworks/electron/"
echo "[Bundler] [Frameworks ~ Prepare React] Copying some files from the codebase..."
cp "apps_codebase/layout.html" "builds/frameworks/react/"
cp "apps_codebase/package.json" "builds/frameworks/react/"
#
## Replace all the custom variables
echo "[Bundler] [Frameworks ~ Prepare Electron] Processing all the custom variables..."
node "variables/electron.js"
echo "[Bundler] [Frameworks ~ Prepare React] Processing all the custom variables..."
node "variables/react.js"
#