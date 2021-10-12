## Publish the website's content
#
#
## Organise the environment variables
DEBUG_MODE=$1
#
## Clear the "/publish_tmp/" directory
echo -e "\n[Publisher] Cleaning up the 'publish_tmp/' directory..."
"./publish/clean.sh" $DEBUG_MODE $INTERFACE $SERVER $DATABASES
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
## EXIT!
echo -e "\n[Publisher] [Error] NOT READY YET!"
#