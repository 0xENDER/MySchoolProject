## Build the website for the web, Windows, Linux, MacOS, Android, and iOS


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

## Go to the "bundler" folder
cd "bundler/"

## Manage "/builds/web/"
"./web.sh"
