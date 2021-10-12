## Minify the code in the "interface/" directory
#
#
## Organise the environment variables
DEBUG_MODE=$1
#
## Copy the `interface` directory
echo "[Bundler] [Minify] Copying the 'interface/' directory..."
cp -a "../interface/." "apps_codebase/"
cp -a "../accounts_server/." "apps_codebase/accounts"
#
## Minify files only if debug mode is off
if [ $DEBUG_MODE -eq 0 ]; then
#
    ## Minify HTML code
    echo "[Bundler] [Minify] Minifying HTML files..."
    node "minifier/minifyHTML.js"
    #
    ## Minify JavaScript code
    echo "[Bundler] [Minify] Minifying JavaScript files..."
    node "minifier/minifyJS.js"
    #
    ## Minify CSS code
    echo "[Bundler] [Minify] Minifying CSS files..."
    node "minifier/minifyCSS.js"
    #
    ## Minify JSON code
    echo "[Bundler] [Minify] Minifying JSON files..."
    node "minifier/minifyJSON.js"
    #
    ## Minify images
    #echo "[Bundler] [Minify] Minifying images..."
    #node "minifier/minifyImages.js"
#
fi
#