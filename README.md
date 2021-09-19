# My School Project

> **Note:** all the crossed-out text/information is still not in use or necessary at the current development stage!

**Student:** Adel Sbeh

**Start Date:** September 8th 2021

**Finish Date:** -

**Project Idea:** Online Apps Store

**Project Description:** This is an online store for all kinds of programs. The website is gonna mainly offer normal apps and games. The user will have the option to sign in to manage the downloads history, requests, and payments.

## Planned Features

> **(!):** _This feature may not be achievable within the given period of time to work on this project._

- [ ] A fully optimised workload for desktops and mobile devices:
  - [ ] Cross-platfrom support for all modern browsers
  - [ ] A caching system (with service workers)
  - [ ] Desktop layout
  - [ ] Mobile devices layout
- [ ] Support the store on mutiple platforms:
  - [ ] The web
  - [ ] PWA (Progressive Web Application)
  - [ ] Windows (Electron)
  - [ ] Linux (Electron)
  - [ ] MacOS (Electron)
  - [ ] _~~Android (React)~~ **(!)**_
  - [ ] _~~iOS (React)~~ **(!)**_
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
- [ ] _A working developer console: **(!)**_
  - [ ] App analytics (app page visits, ownerships, downloads, _~~earnings~~ **(!)**_, used OS, etc.)
  - [ ] Comments and ratings mangement
  - [ ] App page and info management
  - [ ] _~~Policy Alerts~~ **(!)**_
  - [ ] _~~Teams (Invites, user permissions, and activity logs)~~ **(!)**_
  - [ ] _~~Payments Managment (Manage your earnings)~~ **(!)**_
  - [ ] _~~API access settings~~ **(!)**_
- [ ] _~~Store API & OAuth2 System:~~ **(!)**_
  - [ ] Enable access to the store updates API
  - [ ] _~~Enable access to the user apps ownership info through the OAuth2 system~~ **(!)**_
  - [ ] _~~Enable access to the user devices info through the OAuth2 system~~ **(!)**_

## Used Languages

- ~~*PHP* (Server-side scripting)~~
- *JavaScript* (Resource management, and server communication)
- *HTML* (Interface)
- *CSS* (Interface - styling)
- ~~*JSON* (API/Server outputs)~~
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

> **Note:** these instructions are written for Linux users. If you face any problem setting up the Development environment on Windows, you can always use the *Windows Linux Subsystem*!

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
```

Once you have everything set up properly, you can use this command to run the server:

```sh
sudo apachectl start
```

Note that you need to move the website code (inside `/interface/`) to your `/var/www/html/` directory.

### Native apps (Windows, Linux, and macOS apps)

If you wish to build the native apps of this codebase for Windows, Linux, or macOS, you need to install NodeJS and NPM:

```sh
sudo apt-get install nodejs
sudo apt-get install npm
```

Once you have everything set up properly, you can navigate to the `/interface/` directory and run this command:

```sh
npm start
```

## Apps Distribution

> **Note:** make sure that you've set up the development environment properly! Otherwise, the bundler will fail!

To make all the production-ready versions of the codebase, use the `build.sh` file. And, if you're on windows, use the *Windows Linux Subsystem* to execute this file.

## Credits

- *The icons: [Evericons](https://freebiesui.com/figma-freebies/figma-icons/460-free-minimalistic-icons/)*
- *The font: [Google Fonts](https://fonts.google.com)*
