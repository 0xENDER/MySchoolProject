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
- ***(!)*** `page-end`: Whether the page should include a page end message
  All the possible values are: `true`, and `false`.(The default value is `false`)
- `can-unload`: Whether this page is set up to be unloaded dynamically
  All the possible values are: `true`, and `false`. (The default value is `true`)

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
