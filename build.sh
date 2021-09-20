## Build the website for the web, Windows, Linux, MacOS, Android, and iOS

## Clear the generated files in the "/bundler/" directory
"./bundler/clean.sh"

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

## Minify all the code in the "/interface/" directory
"./minify.sh"

## Manage "/builds/web/"
"./web.sh"
