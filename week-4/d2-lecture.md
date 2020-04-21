# Client Side Javascript

## BOM & DOM
*Browser Object Model* & *Document Object Model*

<br>

### BOM
---

### Examples of Browser Object Model:

`window.innerWidth` - returns browser window width

`window.innerHeight` - returns " " height

---

`window.location()`

`window.history()` - browser history

`window.back()` - browser back page

`window.forward()` - browser forward page

---

`navigator.userAgent` - browser that you're using

```
navigator.geolocation.getCurrentPosition(() => {position.coords.latitude, position.coords.latitude}
```
get location of user.

<br>


### DOM
---

`window.document`

`document.querySelector('#id')` - use same selectors as CSS. QuerySelector always only give you the first element.

`document.querySelectorAll('.class')` - retrieves all elements of that class

<br>

### Creating a new element in JS and adding it to DOM


 `liTag = document.createElement('li');` - but it's not yet connected to the DOM.
 
 `liTag.textContent = 'Play with CSS';`

 `const ulTag = document.querySelector('#idOfExisitingElement')` existing `<ul>`.

`ulTag.appendChild(liTag);` - liTag list item now added to ulTag list on DOM

<br>

### Difference between single page or multi-page apps

Multi-page: 

- each time you send a request, you receive a new page response or redirect; The server sends the client the html doc to render.

Single page: 

- Client only dealing with index.html file for rendering.
- any other requests going to backend server, retrieving data as json.
- data converted to array of objects, and add those 

- generated dynamically by the client

- backend only sending you the data, not the html page. you create the element on the fly, creating the HTML elements out of the data object sent to you by server.

<br>


## JS: Events

---

*Javascript is event-based*

`monitorEvents(document)` - monitor events anywhere on document.

But we only want to listen for particular events.

[MDN Events](https://developer.mozilla.org/en-US/docs/Web/Events) - full list of events

```
const logSubmit = function(eventObject) {
  console.log(eventObject)
  };

const form = document.getElementById('form');

// prevents the form from being submitted
event.preventDefault();

form.addEventListener('submit', logSubmit);

const newToDo = event.target.elements.todo // todo is name of input box element in form

const todoContent = newTodo.value;

//
const li = document.createElement('li');
li.textContent = todoContent;

// access ul element on dom
const ul = document.getElementById('todos');

// adds new list item to ul on dom.
ul.appendChild(li);

// clear value for input
newTodo.value = '';

// returns focus to input after submit and clear
newTodo.focus();
```

***CAUTION:*** **arrow functions affect `this` keyword so that it will not act as you expect. USE function() declaration**

## JQuery

---

Some Notes and History:

- Originally for maintainability: compatibility of one code base across browsers.
- React is overtaking jQuery, but jQuery still used in many code bases


### DOM traversing

deal with parent/child relationships on the DOM.

HTML
```

<section class='alien-section'>
  <div>
  <button class='alien-btn'></button>
  </div>
  <div>
  <p class='talk'></p>
  </div>
</section>
<section class='alien-section'>
  <div>
  <button class='alien-btn'></button>
  </div>
  <div>
  <p class='talk'></p>
  </div>
</section>
```

JS

```
// ensure the DOM is fully loaded

$(document).ready(function() {
$('.alient-btn').on('click', function(event) {

  // check if we're targeting the correct element
  console.log(this);

  // .closest and .find are jQuery methods to traverse DOM
  const ancestor = $(this).closest('.alien-section');
  const talk = ancestor.find('.talk');

  $('.talk').append('💬')
})
})
```

### jQuery: create new element

You have to use angle brackets to create new element on DOM, otherwise you will be accessing an exisiting element with that tag on the DOM (if it exists).

`const $article = $('<article>').addClass('exampleClass');` 

`const $h2 = $('<h2>').text('example text ${injectedVariable}');` 

- `$` at front of variable is a *convention* to indicate it's a jQuery element.

- `.append` & `.prepend` to add elements as children to other elements

- append from within. ie: if you have a `<span>` inside a `<p>` inside a `div`, append span to p, and then p to `<div`

- can chain `.append`

```
// JS - jQuery
p.append(span)
div.append(p);

// HTML
<div>
  <p><span></span></p>
</div>

```

### jQuery Loop

(see Dom's pet.js example for this loop!)