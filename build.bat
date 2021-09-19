:: Build the website for the web, Windows, Linux, MacOS, Android, and iOS


:: Clear the "/builds/" directory
if exist "builds/" (

    rmdir /S /Q "builds/"

)

:: Recreate the "/builds/" directory
mkdir "builds/"
mkdir "builds/web/"
mkdir "builds/windows/"
mkdir "builds/linux/"
mkdir "builds/mac/"
mkdir "builds/android/"
mkdir "builds/ios/"

:: Update NPM packages
npm install

:: Manage "/builds/web/"
mkdir "builds/web/assets/"
mkdir "builds/web/pages/"
xcopy "assets" "builds/web/assets" /E
xcopy "pages" "builds/web/pages" /E
copy ".htaccess" "builds/web"
copy ".server.test.connection" "builds/web"
copy "index.html" "builds/web"
copy "layout.html" "builds/web"
copy "manifest.webmanifest.json" "builds/web"
copy "robots.txt" "builds/web"
copy "sitemap.xml" "builds/web"
copy "worker.js" "builds/web"
