## Clear the generated files in the "bundler/" directory


## Clear the "/builds/" directory
if [ -d "bundler/builds/" ]; then

    rm -rf "bundler/builds/"

fi

## Clear the "/apps_codebase/" directory
if [ -d "bundler/apps_codebase/" ]; then

    rm -rf "bundler/apps_codebase/"

fi