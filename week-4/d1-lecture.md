# CSS (+ HTML)

### Preamble: Role of HTML, CSS, Javascript

HTML is the content -  the *structure* - of the document.  

CSS is *styling*.

Javascript is *interactivity*. Originally created for the browser (front-end), but now it operates in back-end as well (node).

### HTML & CSS are *Markup Languages*

HTML is a markup language, it's not programming because there are no conditions, variables, operations. 

CSS is also markup, not programming.

---

## HTML

---

### TAGS

`<head>` is instructions for the browser: everything the browser needs to prepare the page.

`<body>` is what is shown in the browser. Content.

***Symantic Tags***: act as divs, but the names provide information about content of tag.

```
<body>
  <header></header>
  <main>
    <section>
      <h1></h1>
      <p></p>
    </section>
    <aside>
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </aside>
  </main>
</body>
```

`<h1>` is the title of the section. So don't use `<h2>` as title in tag section:

```
<main>
  <h1>Main Title</h1>
  <h2>Subtitle of Main</h2>
  <section>
    <h1>Section Title</h1>
  </section>
</main>
```

***Don't change your html for CSS***
If it doesn't make sense structurally, change the HTML. If it doesn't make sense stylistically, change your css.

Tags are self-closing. The browser will try to close them for you if you forget.

Best way to debug HTML is:
- proper indentation
- modular (sm files). Use partials. ie: Header in a partial.
- symantic tags

### ATTRIBUTES

```
<input type='text' id='name' name='name' placeholder='Entrez votre nom'>
```
An input element, denoted with `<input>` tag, and defined by attributes such as `type='text'`.

<input type='text' id='name' name='name' placeholder='Entrez votre nom'>

### Fundamental Symantic Tags of HTML
*use these!*

- header
- nav
- main
- articule
- aside
- footer
- section

---

## CSS

---

### Selectors

Make paragraph element text color red:
```
p {
  color:red;
}
```

***Pseudo-selector***

ie: first child of paragraph tags.
```
p:first-of-type{
  color:red;
}
```

***Cascade priority can be superceded by specificity.***

```
selector > p:first-of-type {
  color:blue;
}

p:first-of-type {
  color:red;
}
```
`selector >` is more specific than "all" `p:first of type`. So `first-of-type` paragraph in selectors will be blue, even though red is lower in style sheet.

Also: `#id` trumps almost all other style instructions

inline style trumps any stylesheet. Avoid using inline style for this reason, and also because it's undesirable to mix style and content for maintainability.

---

### Box Model

```
// the element
img {
  width:300px;
}
// the space between element and border
.padding {
 padding: 50px;
}
// the size of the border
.border {
  border: 1px;
}
// the margin outside the border
.margin {
  margin: 20px;
}
```
Always use ***border-box***

Reason: width/height of element dictates size, don't have to calculate width/height + padding

```
.baseSizeOnBox {
  box-size: border-box;
}
```
`*` operator is select all element

Reset
```
*{
  box-sizing: border-box;
  margin:0;
  padding:0;
}
```
***Browsers have default styles.*** 

So clear browser default styles.

### CSS Reset

**\*\* Normalize.CSS** 

Using Normalize, your CSS will be styled the same in every browser.

Install, or use CDN:

`<link href='<CDN address for Normalize.css>'>`

Put stylesheet templates before your own CSS stylesheet.

### CSS shorthand

- `margin: 10px;`  - all four sides
- `margin: 10px 20px;` - top/down, left/right
- `margin: 10px 20px 30px` - top, left/right, bottom
- `margin: 10px 20px 30px 40px` top, right, bottom, left

Also valid:
`margin-top`, `margin-bottom`, `margin-left`, `margin-right` (but why would you?)

Use <u>classes</u> to group elements together:

```
.people li.student {
  border: 1px solid red;
}
```

`.people li.student` will access class people, element li with the class student

if you put ' ' space between selectors (in this example between `li` and `.student`), you'd be selecting .student one element level down from `li`, **not** `li` elements *with* the class of student.

---

### Status Classes

When different types of elements share the same purpose ie: they have an error status. 

HTML
```
<button class='error'>I AM AN ERROR</button>

<p class='error'>Message of the error</p>
```

CSS
```
button.error {
  background-color: red;
}

p.error {
  color: red;
}
```
RENDERED

<button class='error' style='background-color: red;'>I AM AN ERROR</button>

<p class='error' style='color:red;'>Message of the error</p>

---

The trick to writing good CSS:
write bad CSS first and refactor. (lol)

In Bootstrap, HTML is serving CSS.

When you write CSS to serve HTML, you can't reuse your CSS, but it keeps HTML clean.

---

### Hierarchy of Precision in CSS

- inline
- id
- class
- element

You can read css selectors backwords or forwards.

### Display Property

Options for Display

- display: block;
- display: inline;
- display: inline-block;

Example: Paragraphs default display as block. `display: inline;`

```
span{
  display: inline-block;
  width: 50%;
}
```

***Inline elements can't specify width***, use `inline-block` to specify width for inline.

Be aware that ie: `li` elements have the dashes, which are not included in width calc for inline-block. So if you wanted two li elements taking 50% of display, you'd have to specify width 47% (+/-)

Alignment Options Beyond `display`:

- `flex`
- `grid` (still in production, not compatible with all browsers.)

---

Notes on `Float`:

***Float is deprecated.***

Float removes the element from sizing. Use Flex instead.

```
.clearFix::after{
  constent:'';
  clear:both;
  display:table;
}
```