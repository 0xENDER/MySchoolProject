## Build the website for the web, Windows, Linux, MacOS, Android, and iOS


## Clear the "/builds/" directory
if [ -d "builds/" ]; then

    rm -rf "builds/"

fi

## Recreate the "/builds/" directory
mkdir "builds/"
mkdir "builds/web/"
mkdir "builds/windows/"
mkdir "builds/linux/"
mkdir "builds/mac/"
mkdir "builds/android/"
mkdir "builds/ios/"

## Update NPM packages
npm install
