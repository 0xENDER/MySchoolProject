# Typed `localStorage`

The typed `localStorage` library is used to store data with the type of this data, the creation date, and expiration date of it.

The supported data types for in this library are:

- `BigInt`
- `Number`
- `String`
- `Boolean`
- `Object`
  1. Arrays
  2. JSON objects
  3. `null`
  4. Any object that is supported by the `JSON.parse` function

> You can use the `_LocalStorage` object to interact with this library.

## The `prefix` variable

The `prefix` variable is used in the name of typed-items in the normal `localStorage`. You can change it at any time, but it's not recommended that you do so. The default value of the `prefix` variable is `__typed_`.

```js
console.log(window._LocalStorage.prefix); // Will print `__typed_`
```

## The `setItem` function

You can use the `setItem` function to add a new item to the typed `localStorage`!

```js
window._LocalStorage.setItem("MyItem", {

    something: false,
    ye: 58

});
```

You can also set your item to expire in a certain given amount of time (in seconds).

```js
window._LocalStorage.setItem("MyItem", {

    something: false,
    ye: 58

}, 60);
```

## The `getItem` function

You can use the `getItem` function to get an item from the typed `localStorage`. If you request an item that does not exist, you will receive the value `undefined`.

```js
window._LocalStorage.getItem("MyItem");
```

## The `removeItem` function

You can use the `removeItem` function to remove an item from the typed `localStorage`.

```js
window._LocalStorage.removeItem("MyItem");
```

## The `clear` function

You can use the `clear` function to remove all the typed items from your `localStorage`.

```js
window._LocalStorage.clear();
```

## The `all` function

You can use the `all` function to get all the typed items from your `localStorage`.

```js
window._LocalStorage.all();
```
