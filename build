## Build the website for the web, Windows, Linux, MacOS, Android, and iOS
#
#
## Navigate to the "bundler" folder
cd "bundler/"
#
## Clear the generated files in the "/bundler/" directory
echo "[Bundler] Cleaning up the 'bundler/' directory..."
"./clean.sh"
#
## Prepare the bundler
echo "[Bundler] Preparing the bundler..."
"./install_node_modules.sh"
#
## Minify all the code in the "/interface/" directory
echo "[Bundler] Minifying the codebase..."
"./minify.sh"
#
## Manage "/builds/web/"
echo "[Bundler] Building the web codebase version..."
"./web.sh"
#