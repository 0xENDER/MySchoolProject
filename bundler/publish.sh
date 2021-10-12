## Publish the website's content
#
#
## Organise the environment variables
DEBUG_MODE=$1
LOCAL=$2
#
## Prepare the publisher
if [ -d "node_modules/" ]; then
#
    echo -e "\n[Publisher] The publisher is ready..."
#
else
#
    echo -e "\n[Publisher] Preparing the publisher..."
    "./install_node_modules.sh" $DEBUG_MODE
#
fi
#
## Clear the "/public/" directory
echo -e "\n[Publisher] Cleaning up the 'public/' directory..."
"./publish/clean.sh" $DEBUG_MODE $LOCAL
#
## EXIT!
echo -e "\n[Publisher] [Error] NOT READY YET!"
#