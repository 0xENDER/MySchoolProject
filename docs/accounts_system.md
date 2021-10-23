# Accounts System Documentation

The store requires an accounts system to work. And the page needs to communicate with the server accross platforms.

## The Sign In/Up Page Events

The sign in and sign up pages always send event messages to the opener of the window. No other window is allowed to to interfer with the opened communication session between the sign in/up window and its opener.

This communication session is done using the messages browser APIs ([postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) and [onmessage](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onmessage)). The messages that are sent by the sign in/up page include one object. This object contains a `data` variable, and a `type` variable. The `type` variable specifiys the type of the event. All the available event types are:

- `loaded` - Fires when the window APIs are loaded
- `closed` - Fires when the window APIs are loaded
- `failed` - Fires when an error occures in the sign in/up page
- `signed-in` - Fires when the user has successfully signed in to their account
- `authenticated` - Fires when the user authenticates the request

> Note that the maximum duration of a communication session is 4 minutes for each page/redirect!

## The `accounts.api` Library

You can use the `accounts.api` library to communicate with the accounts system! The `accounts.api` library adds a new object to the page, with the name of `accountsSystemAPI`.

### The `openRequest` function

You can use the `openRequest` function to open a sign in request. You can pass the configurations object to customise the page to fit your app, or to specify the data that your app requires access to.

```js
window.accountsSystemAPI.openRequest({

    //...

});
```

### The `onFailure` event function

The function you assign to the `onFailure` variable will always be called when an error occures in the sign in window.

### The `onConnected` event function

The function you assign to the `onConnected` variable will always be called when the sign in window has successfully been opened and loaded.

```js
window.accountsSystemAPI.onConnected = function(){

    alert("Connected!");

};
```

### The `onClose` event function

The function you assign to the `onClose` variable will always be called when the sign in window gets closed.

```js
window.accountsSystemAPI.onClose = function(event){

    alert("Closed!");

};
```

### The `onSignIn` event function

The function you assign to the `onSignIn` variable will always be called when the user has successfully signed in to their account.

> Note that this does not mean you can access to the user's data. The user needs to authenticate your request first!

```js
window.accountsSystemAPI.onSignIn = function(event){

    alert("Signed In!");

};
```

### The `onAuth` event function

The function you assign to the `onAuth` variable will always be called when the user authenticates your request.

> It's always better to wait for this function to get called, unless the origin of your server turns out to be the same as the server's. (In which case, you'd already have access to the user's data)

```js
window.accountsSystemAPI.onAuth = function(event){

    alert("Authenticated!");

};
```
