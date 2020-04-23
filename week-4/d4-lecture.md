# Responsive Design

Prioritize mobile-first design.

## Viewports

`<meta name="viewport" content="width=device-width, initial-scale=1.0">`

- the area on the device available to see your web app. 
- viewport varies with device

## Units

***Absolute & Relative length units***

- a pixel is the smallest unit you can have on your screen
- "pixel-perfect design" doesn't scale down well for mobile. 

### Relative Length Units

- `em` : depends on the size (ex. font-size) of the parent container
- `rem` : depends on the size (ex. font-size) of the root element
- `vw/h` : viewport width or height
- `%` : percent of the parent size (width, height, font-size)

### `em` vs `rem`

- Default font size for browsers: 16px
- in nested design, we may forget what the size is based on em.
- rem always relative to default font size
- typically we don't specify the default font-size of the root element     

if you did want to adjust :

```
html, body {
  font-size: <desired size>
}
```

## Alignment / Layout

### Floats

- designed to have image or text stand on its own
- floats only really present in legacy code
- clear floats: use on parent element (container) to return floats to flow of document

### Absolute Positioning

Absolute positioning has its uses (ex. Nav is appropriate use), but it takes the element out of regular float, and have to set z-index (to have it float above other elements in document flow).

### Flexbox

*Flex Container & Flex Items*

- provides a more efficient way to lay out, align, and distribute space among items in a container
- flex gives the container ability to manipulate items within
- always parent/child relationship
- **flex-direction:** changes main axis. *auto is ***row.****
- justify-content: on main axis. 
- example bug with flexbox: stretched image.
  - one fix: wrap image in `div` + `display: flex` for div.
  - `flex-grow` or `flex-shrink`
- further research into: <u>nested flexboxes</u>

protip: play flexbox froggy ;)

## Responsive Design in CSS

### Media-Queries 

*Applies specific CSS in specific contexts*

- `@media`
- Restricts the styling of some CSS in reponse to screen dims query
- Example queries: Max-Width, Min-Width, or Min/Max

Syntax:
```
@media only screen and (max-width: 600px) {
  // alternate styling for if screen is max 600 px
}
```

- `@media` is a way to set breakpoints. it overrides or adds to existing styling
- google media queries for standard devices (css-tricks). Maybe try google standard device sizes?
- typical to work with 3-5 breakpoints. Don't develop for specific devices, ballpark for a range of devices.

## Grid Systems

### Boostrap

- built on flexbox
- grid options specifies max container widths - good guide for industry standard device breakpoints
- built on 12 column max grid

Syntax
xs is default size in bootstrap
```
<div class='row'>
  <div class='col-12'>1 of 3</div>
  <div class='col-6'>2 of 3</div>
  <div class='col-6'>3 of 3</div>
</div>
```
Syntax: adding different view for devices w/ s dims (as defined in bootstrap containers)
```
<div class='row'>
  <div class='col-12 col-s-4'>1 of 3</div>
  <div class='col-6 col-s-4'>2 of 3</div>
  <div class='col-6 col-s-4'>3 of 3</div>
</div>
```

## SASS

*SASS gives you tools for more efficient CSS*

- file extension must be `.scss` ex. style.scss
- you can use variables, you can nest css, you can use partials, mixins
- read the guide!

### Variables

`$font-stack`

ex. `$font-stack: Arial, Helvetica`

implementation: `font-family: $font-stack;`

### Nesting

```
ul {
  // styling
  li {
    // equiv to ul li
  }
}
```

```
ul {
  &:hover {
    // equiv to ul:hover
  }
}
```

### Partials

*convention is to put _ for partials files*

Example file name: `_global.scss`

Importing partial file(s) to index.scss:

`@import '_global';`
