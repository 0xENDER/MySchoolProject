## Manage the "bundler/builds/web/" directory


## Copy the required folders from the codebase for the "web version"
cp -R "../interface/assets" "builds/web"
cp -R "../interface/pages" "builds/web"

## Copy the required files from the codebase for the "web version"
cp "../interface/.htaccess" "builds/web"
cp "../interface/.server.test.connection" "builds/web"
cp "../interface/index.html" "builds/web"
cp "../interface/layout.html" "builds/web"
cp "../interface/manifest.webmanifest.json" "builds/web"
cp "../interface/robots.txt" "builds/web"
cp "../interface/sitemap.xml" "builds/web"
cp "../interface/worker.js" "builds/web"
