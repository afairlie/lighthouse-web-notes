# Ajax

*Asynchronus Javascript and XML*

### Preamble

jQuery and React are libraries written in javascript used to manipulate the DOM

ajax has a very clean implementation in jQuery - it only takes 2 parameters
ajax is for datafetching 

Axios is a module for ajax. syntax similar to express. `axios.get()`

Ajax is the core functionality for many different fundamental web features
- infinite scroll
- paginated button (without the page reloading)
- notifications that are real-time (or they might use web sockets)
- autosuggest
- instant-messaging
- games with multi-player elements

## APIs & Fetching data across the internet

- HTTP only accepts data as strings
- JSON is a cerealized js object as a string. it's stringified (js) so it can be transferred over HTTP (only strings can be transferred over HTTP)
- API definition: the syntax you've designed for others to make use of your app
  - how you define your server routes is also an API
  - Literally just any programming interface is an API
- for a lot of APIs, you need an API key - so the API knows who you are, and the number of requests you make.

## jQuery

*jQuery is best used for network requests, and fetching data dynamically.*

- youmightnotneedjquery.com
- minified version of jquery: `src="https://code.jquery.com/jquery-3.4.1.min.js"` - can't use this if need debugging options
- if we use jQuery to fetch an object, it comes with a lot of additional methods, which is why the `$variableName` convention is used.
- jQuery - userful methods: `.ajax`, `.val()`, `.append`

HTML setup
```
<body>
<div id='app'>
<!-- our js-generated code will be injected here -->
</div>
</body>
```

- typically we want js to run only once user clicks somewhere, so document.ready is not always necessary

```
// jQuery doc.ready syntax
$(document).ready(() => {

})

// vanilla js for same functionality
document.addEventListener('DOMContentLoaded', () => {

})
```

## jQuery: Ajax & Promises

`$.ajax()`

- many apis will take one argument, which will be an object. ie: in below, we set preferences via the object argument to Ajax.
- type and dataType default to GET and JSON respectively, but for maintainability and readability, better to include them.

```
$(document).ready(() => {
  console.log('page is loaded');

  const datalessResponse = $.ajax({
    url: 'http://www.reddit.com/r/dogpictures.json',
    type: 'GET',
    dataType: 'JSON'
  })
  .then((promiseResponse) => {
    console.log(promiseResponse);
  })
  .catch(rejectedError) => {
    console.warn(rejectedError);
  })

  console.log(datalessReponse);
})
```

### Promises

- javascript promises will always return either data, or an error: resolved, or rejected respectively.
- the promise doesn't necessarily have data until it's resolved or rejected.

`.then`
`.catch`
`.always` (will always go, whether returns resolved or rejected)

### Alternative to Document.Ready

HTML - bind js function to button

```
<button onclick="fetchAndRenderRedditPosts()">Fetch Reddit posts!</button>
```

JS
```
const getUserInput = () => {
  return $('#subreddit-input').val();
}

const fetchAndRenderReditPosts = () => {
  $.ajax({
    url: `http://www.reddit.com/r/${getUserInput()}.json`,
    type: 'GET',
    dataType: 'JSON'
  })
  .then((response) => {
    const renderedPosts = formatRedditPosts(response.data.children);

    $('#app').append(renderedPosts);
  })
  .catch(error) => {
    console.warn(error);
  })
}

const formatRedditPosts = (posts) => {
  const markupArray = [];

  for (const post of posts) {
    const {title, permalink, thumbnail} = post.data;
    
    markupArray.push(`
    <a href='https://www.redit.com${permalink}' title='Open ${title}in a new tab!' target='_blank'><img alt='${title}' src='$thumbnailUrl'/></a>
    `)
  }

  return markupArray.join('');
}
```

### HTML Formatting Tips & Accessibility

- you should never have an `<a>` tag without a title, and `<img>` with alt, for accessibility.
- you'll almost always either have no target, or open in a new tab with `_blank`
- set the correct input types ie: `type='text'`, `type='tel'`

### re: Class or ID Naming Conventions 

Refer to Google's HTML and CSS style guide - they control traffic of the internet
they strongly encourage you to ***kebab-case*** ex `subreddit-input`

## Refactoring App (Replacing Hardcoded Functionality)

HTML
```
    <header>
      <input type="text" id="subreddit-input" />
      <button onclick="fetchAndRenderRedditPosts()">Fetch Reddit posts!</button>
    </header>
```

JS
```
const getUserInput = () => {
  return $('#subreddit-input').val();
}

const fetchAndRenderReditPosts = () => {
  $.ajax({
    url: `http://www.reddit.com/r/${getUserInput()}.json`,
    type: 'GET',
    dataType: 'JSON'
  })
  // .then(REFER TO ABOVE!)
    .catch((error) => {
      const errorMessage = `
        <div class="error">
          <h1>Whoops, something went wrong!</h1>
          <p>Please try a different subreddit or call support at 967-1111</p>
        </div>
      `;

      $("#app").append(errorMessage);
    });
```

### Final Thoughts

- don't console.log errors in your app because you're giving hackers a lot of information
- when you're working with an API, work atomically, make sure each step works as you expect!