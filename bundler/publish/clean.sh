## Clear the "publish_tmp/" directory
#
#
## Organise the environment variables
DEBUG_MODE=$1
#
## Clear the "/builds/" directory
if [ -d "publish_tmp/" ]; then
#
    echo "[Bundler] [Clean] Deleting the 'publish_tmp/' directory..."
    rm -rf "publish_tmp/"
#
fi
#
## Recreate the "/builds/" directory
echo "[Bundler] [Clean] Preparing the 'publish_tmp/' directory..."
mkdir "publish_tmp/"
#