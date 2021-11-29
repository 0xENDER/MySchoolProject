# My School Project

> **Note:** All the crossed-out text/information is not in use/necessary at the current development stage!

**Student:** Adel Sbeh

**Starting Date:** September 8th 2021

**Finishing Date:** -

**Project Name:** MyStore

**Project Idea:** A cross-platform apps store

**Project Description:** This project is an online store that offers all kinds of programs across platforms. The store will mainly be able to host apps and games packages. Users can sign in to manage the downloads history and payments. In addition to this, there will be lots of features that will make the users' and developers' experience much more appealing.

## Planned Features

> **(!):** _This feature may not be achievable within the given period of time to work on this project._
>
> **(\*):** _Not fully tested._

- [ ] A fully optimised workload for desktops and mobile devices:
  - [x] Support for all chromium-based browsers
  - [x] Support for all firefox-based browsers  **(\*)**
  - [x] Support for the Safari browser **(\*)**
  - [x] A caching system (with service workers) **(\*)**
  - [x] Desktop layout
  - [ ] Mobile devices layout
  - [ ] Optimise for low-performing devices
- [ ] Keep track of the user experience (Analytics)
  - [ ] Detect loading problems and report them to the server
  - [ ] _~~Check how the user interacts with pages~~ **(!)**_
- [ ] Support the store on mutiple platforms:
  - [x] The web
  - [x] PWA (Progressive Web Application) **(\*)**
  - [ ] Windows (Electron)
  - [ ] Linux (Electron)
  - [ ] _~~MacOS (Electron)~~ **(!)**_
  - [ ] Android (WebView-based)
- [ ] Apps and Games compatibility checks
  - [ ] Add mandatory compatibility metrics
  - [ ] Add preferred compatibility metrics
  - [ ] Add optional compatibility metrics
  - [ ] Organise all the avaliable compatibility metrics into two categories: reliable, and experimental!
- [ ] _~~A built-in package management and installation system~~ **(!)**_
  - [ ] _~~Create an installation package for apps (`.mypack` or something like that)~~ **(!)**_
  - [ ] _~~Verify the app developer~~ **(!)**_
- [ ] A fully secure and fledged accounts system:
  - [ ] Email verification system
  - [ ] 2FA (Two factor authentication)
  - [ ] _~~OAuth2 Support~~ **(!)**_
- [ ] Apps Ownership and downloads History Syncing:
  - [ ] Ownership syncing for free and paid apps
  - [ ] Downloads history syncing
- [ ] A working system-dependent and user-preferences-wary suggestions system:
  - [ ] _~~A suggestions algorithm~~ **(!)**_
  - [ ] Categorises blocking
  - [ ] Categorises preferences
- [ ] An abuse report system:
  - [ ] Abuse reporting for apps
  - [ ] Abuse reporting for comments
  - [ ] Abuse reporting for ratings
- [ ] A feedback system:
  - [ ] Comments
  - [ ] Ratings
- [ ] _~~A working developer console~~: **(!)**_
  - [ ] App analytics (app page visits, ownerships, downloads, _~~earnings~~ **(!)**_, used OS, etc.)
  - [ ] Comments and ratings mangement
  - [ ] App page and info management
  - [ ] _~~Policy Alerts~~ **(!)**_
  - [ ] _~~Teams (Invites, user permissions, and activity logs)~~ **(!)**_
  - [ ] _~~Payments Managment (Manage your earnings)~~ **(!)**_
  - [ ] _~~API access settings~~ **(!)**_
- [ ] _~~Store API & OAuth2 System~~: **(!)**_
  - [ ] Enable access to the store updates API
  - [ ] _~~Enable access to the user apps ownership info through the OAuth2 system~~ **(!)**_
  - [ ] _~~Enable access to the user devices info through the OAuth2 system~~ **(!)**_
- [ ] _~~A rewards and points system~~: **(!)**_
  - [ ] _~~Add a rewards program for apps and games~~ **(!)**_
  - [ ] _~~Add a rewards currency~~ **(!)**_
- [ ] _~~A gift cards system~~: **(!)**_
  - [ ] _~~Add a gift cards generator~~ **(!)**_
  - [ ] _~~Add a "buy as a gift" option~~ **(!)**_
  - [ ] _~~Add a code redemption page~~ **(!)**_
- [ ] _~~A marketing plan~~: **(!)**_
  - [ ] _~~Create a store policy for payments and profit cuts~~ **(!)**_
  - [ ] _~~Create a video ad for the store~~ **(!)**_
  - [ ] _~~Create an ad for the store~~ **(!)**_

## Used Languages

- ~~*PHP* (Server-side scripting)~~
- *Java* (Android native app)
- *JavaScript* (Resource management, and server communication)
- *HTML* (Interface - structure)
- *CSS* (Interface - styling)
- *JSON* (API/Server outputs, and manifests)
- ~~*MySQL script* (Database management)~~
- *Shell Script* (Build commands)

## Used Technologies

- [*Apache2*](https://httpd.apache.org/) (Website directories management)
- [*NodeJS*](https://nodejs.org/) (Native desktop apps management, and bundling)
- [*Electron*](https://www.electronjs.org/) (Windows, Linux, and macOS native apps)

## Used Tools and Resources

- *[Visual Studio Code](https://code.visualstudio.com/)*
- *[Android Studio](https://developer.android.com/studio)*
- *[Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)* (performance testing and debugging)
- *[web.dev](https://web.dev/)* (performance testing, and web vitals improvement)
- *[PWABuilder](https://www.pwabuilder.com/)* (PWA testing)
- *[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web)* (APIs status, references, and cross-browser compatibility/support)

## Server Requirements

- *Apache2 support*
- ~~*PHP 7+ support*~~
- ~~*MySQL support*~~
- _**At least** 1GB of storage (without acounting for the apps database)_
- *Mailing support*
- *HTTPS support* (lots of web APIs and features are only accessible to websites that use the `HTTPS:` protocol. The website won't work properly if the user is connected using a different protocol)

## Personal/Local Machine Requirements

It's recommended that you have at least 6 GBs of RAM, and a CPU with four cores in order to build the codebase for Android, Windows, Linux, and the web. Any machine with specis less than the ones provided above could take a significantly long time to finish builds.

## Getting Started & The Development Environment

Before you follow any of these instructions, make sure to configure your server settings in the [`server.config.jsonc`](./server.config.jsonc) file. Read the provided instructions within the `server.config.jsonc` file and follow them carefully, and watch out for any server credentials leaks when you upload your files online or share them with others.

> **Note:** these instructions are written for Linux users. If you face any problem setting up the Development environment on Windows, you can always use the *Windows Subsystem for Linux*!

### Localhost

If you wish to host the website locally, you need to make sure that you have apache2 enabled on your local server:

```sh
sudo apt-get install apache2
sudo apt-get install apache2-utils
```

Also, make sure that all the directories that you're gonna work with have these permissions in the `/etc/apache2/apache2.conf` file:

```xml
<Directory /MY_DIRECTORY>

    Options FollowSymLinks
    AllowOverride All
    Require all granted

</Directory>
<Location /MY_DIRECTORY>

    CacheEnable disk
    CacheHeader on
    CacheDefaultExpire 800
    CacheMaxExpire 6400000
    CacheIgnoreNoLastMod On
    ExpiresActive on
    ExpiresDefault A300

</Location>
```

And that you have all these modules enables:

```sh
sudo a2enmod cache
sudo a2enmod cache_disk
sudo a2enmod expires
sudo a2enmod headers
sudo a2enmod rewrite
```

Once you have everything set up properly, you can use this command to run the server:

```sh
sudo apachectl start
```

If you wish to change the default directory of the server, do this:

```sh
cd /etc/apache2/sites-available
sudo nano 000-default.conf
```

And make sure to replace its content with this:

```xml
# The store subdomain (store.*)
<VirtualHost *:80>

    ServerAdmin webmaster@localhost
    DocumentRoot .../bundler/public/store_subdomain
    ServerName store.localhost

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>

# The accounts subdomain (accounts.*)
<VirtualHost *:80>

    ServerAdmin webmaster@localhost
    DocumentRoot .../bundler/public/accounts_subdomain
    ServerName accounts.localhost

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>
```

> Note that you will need to move the website code (inside `/bundler/builds/web/`) to your `/var/www/html/` directory or your `DocumentRoot` directory, if you do not change your website settings.

### Building

If you wish to build any version of this codebase, you need to install NodeJS (latest) and NPM:

```sh
sudo apt-get install nodejs
sudo apt-get install npm
```

If you already have nodejs installed, but it's not the latest version, use these commands:

```sh
sudo npm install -g n
sudo n latest
```

### Native apps (Windows, Linux, and macOS apps)

You will need to install `electron-builder` if you wish to run or build any of the native apps for Windows, Linux, or macOS:

```sh
sudo npm install -g electron-builder
```

#### Build the Windows app on Linux

You need to install *Wine* on your system so you can build windows apps. You can follow [these instructions](https://computingforgeeks.com/how-to-install-wine-on-kali-linux-and-debian-64-bit/) to get it to work.

### The Native app for Android (OUTDATED!!!)

You will need to install `expo-cli` if you wish to run or build any of the native apps for Android or iO:

```sh
sudo npm install --g expo-cli
```

## Apps Distribution

To make all the production-ready versions of the codebase, use the `./build` file.

```sh
./build <flag> <flag>...
```

> The estimated build time of the current version of the bundler is 9 minutes!

The available build flags are:

- `-debug`: Show debug messages
- `-local`: Tells the builder that your server is hosted locally (on `localhost`)
- `-all`: Create all the builds for all platforms (Web, Windows, Linux, macOS, Android)
- `-desktop`: Create all the builds for desktop devices (Windows, Linux, macOS)
- `-mobile`: Create all the builds for mobile devices (Android)
- `-web`: Create a web build
- `-windows`: Create a Windows build
- `-linux`: Create a Linux build
- `-mac`: Create a macOS build
- `-android`: Create an Android build

You can also use the Node Package Manager to run the build command for specific platforms:

- Use `npm start` to run the website locally
- Use `npm run web` to build the website for production
- Use `npm run android` to build the Android app for production
- Use `npm run windows` to build the Windows app for production
- Use `npm run linux` to build the Linux app for production
- Use `npm run mac` to build the MacOS app for production
- Use `npm run desktop` to build all the desktop apps for production
- Use `npm run mobile` to build all the mobile apps for production

> Note that we do not offer the option to build an iOS app for the codebase because it'd be useless. (Apps can't install other apps on iOS)

If you face any problem whist building a native app for Windows, macOS, or Linux, make sure that you have [the proper enviromnet setup for `electron-builder`](https://www.electron.build/multi-platform-build.html)!

## Publishing (the website) - ***NOT READY!***

You can use the `./publish` command to publish the website to the FTP server of your choice in the `server` data file.

```sh
./publish <flag> <flag>...
```

The available flags are:

- `-debug`: Show debug messages
- `-local`: Tells the publisher that your server is hosted locally (on `localhost`)

You can also use the `npm run publish` command to publish the website online.

## Licensing

This project is licensed under an [Attribution-NonCommercial-ShareAlike 4.0 International license](https://creativecommons.org/licenses/by-nc-sa/4.0/)!

However, there is a restriction that applies to this repository. If you live in Israel/Palestine, you are **not** allowed to use this project, or *any* parts of this codebase, as/for your school assignment(s). Also, you're **not** allowed to identify this project as your own. That is a temporary restriction that ends **August 1st, 2022**.

## Credits

The icons: [Evericons](http://www.evericons.com/)

The font: [Google Fonts](https://fonts.google.com) - [Daniel Johnson](https://fonts.google.com/?query=Daniel%20Johnson) (Principal design), and [Cyreal](https://fonts.google.com/?query=Cyreal).

## Notes

- This codebase still uses the [User Agent string](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent) to identify and collect some basic information about the users' devices. It's not recommended for developers to use the User Agent string nowadays. However, I am still going to use it because the current replacement APIs for the User Agent string are not good enough to get all the information needed for the website to work properly.
- This codebase uses the [`SpeechRecognition` API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition). As of the 12th of November 2021, this API is still marked as experimental. This API can be a bit laggy on desktop devices, and its cross-browser support is quite poor.
- This codebase uses the [`stack`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack) property of the [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) type. This is a non-standard property. (*I decided to use this property because almost all browsers do fully support it, but with minor differences.*)
- This codebase uses the [`userAgentData`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgentData) object. This is still an experimental feature, and it has poor cross-browser support. (*If a browser doesn't support this object, the platform detector will fallback to the User Agent string!*)
- The search voice input option is going to be disabled when using the Electron-based version of the codebase. (*Read issue [#18](/../../issues/18) for more info*)

## More To Read

[Apps Submission Requirements](./docs/apps_submission.md)

[Page Content Documentation](./docs/page_content.md)

[Accounts System Documentation](./docs/accounts_system.md)

[Typed `LocalStorage` Documentation](./docs/typed_localstorage.md)
