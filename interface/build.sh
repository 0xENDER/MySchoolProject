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

## Manage "/builds/web/"
mkdir "builds/web/assets/"
mkdir "builds/web/pages/"
cp -R "assets" "builds/web/assets"
cp -R "pages" "builds/web/pages"
cp ".htaccess" "builds/web"
cp ".server.test.connection" "builds/web"
cp "index.html" "builds/web"
cp "layout.html" "builds/web"
cp "manifest.webmanifest.json" "builds/web"
cp "robots.txt" "builds/web"
cp "sitemap.xml" "builds/web"
cp "worker.js" "builds/web"
