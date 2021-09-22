## Clear the generated files in the "bundler/" directory
#
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
mkdir "builds/web/"
mkdir "builds/windows/"
mkdir "builds/linux/"
mkdir "builds/mac/"
mkdir "builds/android/"
mkdir "builds/ios/"
mkdir "builds/frameworks/"
mkdir "builds/frameworks/electron"
mkdir "builds/frameworks/react"
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