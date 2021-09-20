## Clear the generated files in the "bundler/" directory
#
#
## Clear the "/builds/" directory
if [ -d "builds/" ]; then

    rm -rf "builds/"

fi
#
## Recreate the "/builds/" directory
mkdir "builds/" 
mkdir "builds/web/" 
mkdir "builds/windows/" 
mkdir "builds/linux/" 
mkdir "builds/mac/" 
mkdir "builds/android/" 
mkdir "builds/ios/" 
#
## Clear the "/apps_codebase/" directory
if [ -d "apps_codebase/" ]; then

    rm -rf "apps_codebase/"

fi
#
## Recreate the "/apps_codebase/" directory
mkdir "apps_codebase/"
#