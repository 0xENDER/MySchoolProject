## Minify the code in the "interface/" directory
#
#
## Copy the folders inside the "interface/" directory
echo "[Bundler] [Minify] Copying directories from the 'interface/' directory..."
cp -R "../interface/assets/" "apps_codebase"
cp -R "../interface/pages/" "apps_codebase"
cp -R "../interface/electron/" "apps_codebase"
#
## Copy the files inside the "interface/" directory
echo "[Bundler] [Minify] Copying files from the 'interface/' directory.."
cp "../interface/.htaccess" "apps_codebase"
cp "../interface/.server.test.connection" "apps_codebase"
cp "../interface/index.html" "apps_codebase"
cp "../interface/layout.html" "apps_codebase"
cp "../interface/manifest.webmanifest.json" "apps_codebase"
cp "../interface/package.json" "apps_codebase"
cp "../interface/package-lock.json" "apps_codebase"
cp "../interface/robots.txt" "apps_codebase"
cp "../interface/sitemap.xml" "apps_codebase"
cp "../interface/worker.js" "apps_codebase"
#
## Minify HTML code
echo "[Bundler] [Minify] Minifying HTML files..."
node "minifier/minifyHTML.js"
#
## Minify JavaScript code
echo "[Bundler] [Minify] Minifying JavaScript files..."
node "minifier/minifyJS.js"
#