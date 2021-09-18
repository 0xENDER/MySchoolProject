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
