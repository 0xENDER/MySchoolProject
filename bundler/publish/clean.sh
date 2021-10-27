## Clear the "publish_tmp/" directory
#
#
## Organise the environment variables
DEBUG_MODE=$1
LOCAL=$2
#
## Clear the "/builds/" directory
if [ -d "public/" ]; then
#
    echo "[Publisher] [Clean] Deleting the 'public/' directory..."
    rm -rf "public/"
#
fi
#
## Recreate the "/builds/" directory
echo "[Publisher] [Clean] Preparing the 'public/' directory..."
mkdir "public/"
#
## Rebuild the web build
echo "[Publisher] [Clean] Generating a new web build..."
"./start.sh" $DEBUG_MODE 1 0 0 0 0 $LOCAL
#
## Copy the required files from the 'builds/' directory
echo -e "\n[Publisher] [Clean] Copying the required files from the 'builds/' directory..."
cp -a "builds/web/store/." "public/store_subdomain"
cp -a "builds/web/accounts/." "public/accounts_subdomain"
#