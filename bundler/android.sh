## Build the Android app
#
#
## Organise the environment variables
DEBUG_MODE=$1
#
## Navigate to the Android build directory
cd "builds/android/"
#
## Copy the Android "app" native code from the "interface/" directory
echo "[Bundler] [Android] Copying the Android project folder from the codebase..."
mkdir "project-unpacked/"
cp -R "../../apps_codebase/android/." "./project-unpacked/."
#
## Copy the folders inside the "interface/" directory to the Android assets directory
echo "[Bundler] [Android] Copying some folders from the codebase..."
cp -R "../../apps_codebase/assets/" "./project-unpacked/app/src/main/assets/"
cp -R "../../apps_codebase/pages/" "./project-unpacked/app/src/main/assets/"
cp -R "../../apps_codebase/components/" "./project-unpacked/app/src/main/assets/"
cp -R "../../apps_codebase/libraries/" "./project-unpacked/app/src/main/assets/"
#
## Copy the files inside the "interface/" directory to the Android assets directory
echo "[Bundler] [Android] Copying some files from the codebase..."
cp "../../apps_codebase/layout.html" "./project-unpacked/app/src/main/assets/"
#
## Replace all the custom variables
# if [ $FRAMEWORK_ELECTRON -eq 9999 ]; then
# #
    # echo "[Bundler] [Android] Processing all the custom variables..."
    # node "../../variables/android.js" $LOCAL
# #
# fi
#
## Build the apk
echo "[Bundler] [Android] Build the Android project..."
cd "project-unpacked/"
./gradlew assembleDebug
cd "../"
mv "./project-unpacked/app/build/outputs/apk/debug/app-debug.apk" "./"
#
## Navigate back to the bundler's main directory
cd "../../"
#