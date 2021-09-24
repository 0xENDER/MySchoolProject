## Build the website for the web, Windows, Linux, MacOS, Android, and iOS
#
#
## Clear the generated files in the "/bundler/" directory
echo -e "\n[Bundler] Cleaning up the 'bundler/' directory..."
"./clean.sh"
#
## Prepare the bundler
echo -e "\n[Bundler] Preparing the bundler..."
"./install_node_modules.sh"
#
## Minify all the code in the "/interface/" directory
echo -e "\n[Bundler] Minifying the codebase..."
"./minify.sh"
#
## Manage "/builds/web/"
echo -e "\n[Bundler] Building the web codebase version..."
"./web.sh"
#
## Prepare the codebase for React and Electron
echo -e "\n[Bundler] Preparing the codebase for Electron and React..."
"./prepare_frameworks_codebase.sh"
#
## Build the codebase using Electron
echo -e "\n[Bundler] Building the codebase using Electron..."
"./electron.sh"
#
## Build the codebase using React
echo -e "\n[Bundler] Building the codebase using React..."
"./react.sh"
#