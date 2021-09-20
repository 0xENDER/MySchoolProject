## Clear the generated files in the "bundler/" directory


## Clear the "/builds/" directory
if [ -d "bundler/builds/" ]; then

    rm -rf "bundler/builds/"

fi

## Recreate the "/builds/" directory
mkdir "bundler/builds/"
mkdir "bundler/builds/web/"
mkdir "bundler/builds/windows/"
mkdir "bundler/builds/linux/"
mkdir "bundler/builds/mac/"
mkdir "bundler/builds/android/"
mkdir "bundler/builds/ios/"

## Clear the "/apps_codebase/" directory
if [ -d "bundler/apps_codebase/" ]; then

    rm -rf "bundler/apps_codebase/"

fi

## Recreate the "/apps_codebase/" directory
mkdir "bundler/apps_codebase/"
