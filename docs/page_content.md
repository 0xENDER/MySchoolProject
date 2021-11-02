# Page Content Documentation

> ***(!)***: This means that the provided information is not correct according to the latest version of this codebase.

You can find all the technical details for how the page content should be loaded here.

## The main `PAGE` element

This element should always be present in the first line of the document, without any other element in that same line.

```html
<PAGE section="..." title="..." page-end="..." can-unload="..." />
```

- `section`: The section this page belongs to.
  All the possible values are: `home`, `games`, `apps`, `library`, and `help`.
- `title`: The title of the page.
  (If you pass the value `test`, the final title format would be `test | MyStore`)
- `can-unload`: Whether this page is set up to be unloaded dynamically
  All the possible values are: `true`, and `false`. (The default value is `true`)
- ***(!)*** `page-end`: Whether the page should include a page end message
  All the possible values are: `true`, and `false`.(The default value is `false`)
- `requires-account`: Whether the page needs the user to be signed in
  All the possible values are: `true`, and `false`.(The default value is `false`)

## The `resources` element

The resources element is strictly only used for the `request` elements, `link` elements, and `script` elements.

```html
<resources>

    <!-- Your resource requests should go here! -->

</resources>
```

> Note: You can only have one `resources` element inside your page! If you add more than one `resources` element, only the first one will be used.

## The `request` element

The `request` element enables you to request resources properly.

```html
<resources>

    <!-- You can request CSS and JS file -->
    <request type="file/css" src="..."></request>
    <request type="file/js" src="..."></request>

    <!-- You can request components -->
    <request type="component/js" get="..."></request>
    <request type="component/css" get="..."></request>
    <request type="component/all" get="..."></request>

</resources>
```

### The `file` type

```html
<request type="file/..." src="..."></request>
```

The `file` type is used to call files. The supported formats for this type are:

- `js`: Calls a `js` file from the specified `src`
- `css`: Calls a `css` file from the specified `src`

### The `component` type

```html
<request type="component/..." get="..."></request>
```

The `component` type is used to call component. The supported formats for this type are:

- `js`: Calls a `js` component from the `/components` directory
- `css`: Calls a `css` component from the `/components` directory
- `all`: Calls a component that consists of `js` and `css` from the `/components` directory

This is the component path that gets called according to your `get` attribute:

```js
`/components/${attr(get)}.${callFormat}`
```

## The `content` element

All the elements that you'd typically use inside the `body` element should be used here! (expect for the `script` element, as it's limited to the `resources` element)

```html
<content>

    <!-- The page content -->

</content>
```

> Note: You can only have one `content` element inside your page! If you add more than one `content` element, only the first one will be used.

## Loading content in JavaScript

Every page needs to have a loading script. The loading script is used to ignite the loading chain of the page's content. There are several functions that you can use:

### The `uncover` function

The `uncover` function is used to tell the page that your content can be visible to the user now.

```js
window.uncover();
```

### The `load` function

The `load` function is used to tell the page that your content has fully finished loading.

```js
window.load();
```

### Content injection event

The `contentinjection` event fires when your page content has been injected into the page. This event is useful when your scripts include DOM-related tasks.

```js
window.oncontentinjection = function() {

    // Do some stuff
    ...

    // Uncover the content
    window.uncover();

};
```

### Content loading event

The `pagecontentload` event fires when your page content has been fully loaded. (that includes scripts and stylesheets)

```js
window.onpagecontentload = function() {

    // Do some stuff
    ...

    // Load the whole page
    window.load();

};
```

### Unload list

The unload list is used to point to global objects, functions, and variables that need to be unloaded once the page is unloaded.

```js
var myObject = {...};
window.unloading.add("myObject");
```

You can cancel the removal of an object using the `remove` function:

```js
window.unloading.remove("myObject");
```

### Unload functions

Unload functions are functions that are used to do some tasks before unloading the page.

> Note: these functions are meant to remove DOM events that can still affect the main layout once the page is unloaded.

```js
window.unloading.append(function() {

    // Do some stuff
    ...

});
```

### Registering new links

You need to register new `<a>` elements that are embedded into the page after the `uncover` function is executed.

```js
var myLink = document.getElementById("myLink");
window.registerNewLink(myLink);
```

### Forbidden global names

There are some forbidden global names, as the website's main scripts use these names. These names are:

`uncover`, `load`, `platform`, `api`, `updateScrollbar`, `didFail`, `unloading`, `unloadContent`, and `location.dynamic`.

And you're not allowed to change the value of the website's main functions that are made to help the page content load. (e.g. `registerNewLink`)
