# My School Project

**Student:** Adel Sbeh

**Start Date:** September 8th 2021

**Finish Date:** -

**Project Idea:** Online Apps Store

**Project Description:** This is an online store for all kinds of programs. The website is gonna mainly offer normal apps and games. The user will have the option to sign in to manage the downloads history, requests, and payments.

## Planned Features

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
  - [ ] _Android (React) **(!)**_
  - [ ] _iOS (React) **(!)**_
- [ ] A fully secure and fledged accounts system:
  - [ ] Email verification system
  - [ ] 2FA (Two factor authentication)
  - [ ] _OAuth2 Support **(!)**_
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
  - [ ] App analytics (app page visits, ownerships, downloads, earnings, used OS, etc.)
  - [ ] Comments and ratings mangement
  - [ ] App page and info management
  - [ ] _Policy Alerts **(!)**_
  - [ ] _Teams (Invites, user permissions, and activity logs) **(!)**_
  - [ ] _Payments Managment (Manage your earnings) **(!)**_
  - [ ] _API access settings **(!)**_
- [ ] _Store API & OAuth2 System: **(!)**_
  - [ ] Enable access to the store updates API
  - [ ] _Enable access to the user apps ownership info through the OAuth2 system **(!)**_
  - [ ] _Enable access to the user devices info through the OAuth2 system **(!)**_

**(!):** _This feature may not be achievable within the given period of time to work on this project._

## Used Languages

- *PHP* (Server-side scripting)
- *JavaScript* (Resource management, and server communication)
- *NodeJS* (Native apps management)
- *HTML* (Interface)
- *CSS* (Interface - styling)
- *JSON* (API/Server outputs)
- *Batch* (Build commands - On Windows)
- *Shell Script* (Build commands - On Linux-based/Unix-based systems)

## Server Requirements

- *Apache2 support*
- *PHP 7+ support*
- *MySQL support*
- _**At least** 5GB of storage (without acounting for the apps database)_
- *Mailing support*

## Hosting Locally

To host this locally, use an apache2 server:

```bat
sudo apachectl start
```

You also need to enable the use of `.htaccess` files. And, if you're on Windows, use the *Windows Linux Subsystem*.

## Apps Distribution

You can use the `build.bat`/`build.sh` files to build all the versions of this codebase.

## Credits

- *The icons: [Evericons](https://freebiesui.com/figma-freebies/figma-icons/460-free-minimalistic-icons/)*
- *The font: [Google Fonts](https://fonts.google.com)*
