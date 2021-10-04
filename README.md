# My School Project

> **Note:** All the crossed-out text/information is not in use/necessary at the current development stage!

**Student:** Adel Sbeh

**Starting Date:** September 8th 2021

**Finishing Date:** -

**Project Name:** MyStore

**Project Idea:** A cross-platform apps store

**Project Description:** This project idea is an online store that offers all kinds of programs. The store will mainly be able to host apps and games packages. Users can sign in to manage the downloads history and payments. In addition to this, there will be lots of features that make the user and developer experience much more appealing.

## Planned Features

> **(!):** _This feature may not be achievable within the given period of time to work on this project._

- [ ] A fully optimised workload for desktops and mobile devices:
  - [x] Support for all chromium-based browsers
  - [ ] Support for all firefox-based browsers
  - [ ] Support for the Safari browser
  - [ ] A caching system (with service workers)
  - [x] Desktop layout
  - [ ] Mobile devices layout
- [ ] Support the store on mutiple platforms:
  - [x] The web
  - [ ] PWA (Progressive Web Application)
  - [ ] Windows (Electron)
  - [ ] Linux (Electron)
  - [ ] MacOS (Electron)
  - [ ] _~~Android (React)~~ **(!)**_
  - [ ] _~~iOS (React)~~ **(!)**_
- [ ] A built-in package management and installation system
  - [ ] Create an installation package for apps (`.mypack` or something like that)
  - [ ] _~~Verify the app developer~~ **(!)**_
- [ ] A fully secure and fledged accounts system:
  - [ ] Email verification system
  - [ ] 2FA (Two factor authentication)
  - [ ] _~~OAuth2 Support~~ **(!)**_
- [ ] Apps Ownership and downloads History Syncing:
  - [ ] Ownership syncing for free and paid apps
  - [ ] Downloads history syncing
- [ ] A working system-dependent and user-preferences-wary suggestions system:
  - [ ] A suggestions algorithm
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

## Used Languages

- ~~*PHP* (Server-side scripting)~~
- *JavaScript* (Resource management, and server communication)
- *HTML* (Interface)
- *CSS* (Interface - styling)
- *JSON* (API/Server outputs, and manifests)
- ~~*MySQL script* (Database management)~~
- *Shell Script* (Build commands)

## Used Technologies

- *Apache2* (Website directories management)
- *NodeJS* (Native apps management, and bundling)
- *Electron* (Windows, Linux, and macOS native apps)
- ~~*React* (Android, and iOS native apps)~~

## Server Requirements

- *Apache2 support*
- ~~*PHP 7+ support*~~
- ~~*MySQL support*~~
- _**At least** 5GB of storage (without acounting for the apps database)_
- *Mailing support*

## The Development Environment

> **Note:** these instructions are written for Linux users. If you face any problem setting up the Development environment on Windows, you can always use the *Windows Subsystem for Linux*!

### Localhost

If you wish to host the website locally, you need to make sure that you have apache2 enabled on your local server:

```sh
sudo apt-get install apache2
```

Also, make sure that all the directories that you're gonna work with have these permissions in the `/etc/apache2/apache2.conf` file:

```config
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

Once you have everything set up properly, you can use this command to run the server:

```sh
sudo apachectl start
```

If you wish to change the default directory of the server, do this:

```sh
cd /etc/apache2/sites-available
sudo nano 000-default.conf
```

And change the `DocumentRoot` value!

Note that you need to move the website code (inside `/bundler/builds/web/`) to your `/var/www/html/` directory or your `DocumentRoot` directory.

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

You will need to install `electron-builder` if you wish to build any of the native apps for Windows, Linux, or macOS:

```sh
sudo npm install -g electron-builder
```

#### Build the Windows app on Linux

You need to install *Wine* on your system so you can build windows apps. You can follow [these instructions](https://computingforgeeks.com/how-to-install-wine-on-kali-linux-and-debian-64-bit/) to get it to work.

## Apps Distribution

To make all the production-ready versions of the codebase, use the `./build` file.

> The estimated build time of the current version of the bundler is 9 minutes!

The available build flags are:

- `-debug`: Show debug messages
- `-all`: Create all the builds for all platforms (Web, Windows, Linux, macOS, Android, iOS)
- `-desktop`: Create all the builds for desktop devices (Windows, Linux, macOS)
- `-mobile`: Create all the builds for mobile devices (Android, iOS)
- `-web`: Create a web build
- `-windows`: Create a Windows build
- `-linux`: Create a Linux build
- `-mac`: Create a macOS build
- `-android`: Create an Android build
- `-ios`: Create an iOS build

If you face any problem whist building a native app for Windows, macOS, or Linux, make sure that you have [the proper enviromnet setup for `electron-builder`](https://www.electron.build/multi-platform-build.html)!

## Licensing

This project is licensed under an [Attribution-NonCommercial-ShareAlike 4.0 International license](https://creativecommons.org/licenses/by-nc-sa/4.0/)!

However, there is a restriction that applies to this repository. If you live in Israel/Palestine, you are **not** allowed to use this project, or *any* parts of this codebase, as/for your school assignment(s). Also, you're **not** allowed to identify this project as your own. That is a temporary restriction that ends **August 1st, 2022**.

## Credits

- *The icons: [Evericons](https://freebiesui.com/figma-freebies/figma-icons/460-free-minimalistic-icons/)*
- *The font: [Google Fonts](https://fonts.google.com)*

## More To Read

[Apps Submission Requirements](./docs/apps_submission.md)

[Page Content Documentation](./docs/page_content.md)
