## Manage the "bundler/builds/web/" directory
#
#
## Organise the environment variables
DEBUG_MODE=$1
LOCAL=$2
#
## Prepare all the folders
mkdir "builds/web/store/"
mkdir "builds/web/accounts/"
#
## Copy the required folders from the codebase for the "web version"
echo "[Bundler] [Web] Copying some folders from the codebase..."
cp -R "apps_codebase/assets/" "builds/web/store/"
cp -R "apps_codebase/pages/" "builds/web/store/"
cp -R "apps_codebase/components/" "builds/web/store/"
cp -R "apps_codebase/accounts/." "builds/web/accounts"
#
## Copy the required files from the codebase for the "web version"
echo "[Bundler] [Web] Copying some files from the codebase..."
cp "apps_codebase/.htaccess" "builds/web/store/"
cp "apps_codebase/connection.server.test" "builds/web/store/"
cp "apps_codebase/index.html" "builds/web/store/"
cp "apps_codebase/layout.html" "builds/web/store/"
cp "apps_codebase/manifest.webmanifest" "builds/web/store/"
cp "apps_codebase/robots.txt" "builds/web/store/"
cp "apps_codebase/worker.js" "builds/web/store/"
#
## Generate the sitmap
echo "[Bundler] [Web] Generating the sitemap..."
node "sitemap.js"
#
## Replace all the custom variables
echo "[Bundler] [Web] Processing all the custom variables..."
node "variables/web.js" $LOCAL
#