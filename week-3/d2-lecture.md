# CRUD - Create, Read, Update, Delete

## What is Express?

*Express is a framework.*

It simplifies our routing process.
it provides us with middleware - modules we add to extend functionality of Express

- endpoint is synonymous with route.

- `req` and `res` are objects with methods sent as params to our callback when we use Express methods

## EJS Embedded Javascript
*javascript embedded in HTML template file*

- `req.body` : body is an object passed to us by middleware ***body parser*** a module used by Express by `server.use(bodyParser.urlencoded({extended: true}));`

## Redirect with Express
`res.redirect` sends a response to the client, instructing the client: to issue another request to ex: /quotes route

- `templateVars{}` is used with render, *not* redirect. (You're not rendering a template, you're re-directing to an existing template with presumably, an html method ( ex. GET) that's already defined on the server)

### Example: organizing server content
```
// PACKAGES, TEMPLATES, MIDDLEWARE

// HELPER FUNCTIONS

// ROUTING/End Points

// (server listen)
```

### EXAMPLE - Editing: server.POST (workaround for .PUT) 

```
const updateQuote = (id, content) => {
  movieQuotesDb[id].quote = content;
}
```

```
app.post('/quotes/:id', (req, res) => {

  // Extract the quote id from the url
  const quoteId = req.params.id;

  // Extract the quote content from the form
  const content = req.body.quote_content;  

  // Update the quote in the db
  updateQuote(quoteId, content);

  // redirect to /quotes
  res.redirect('/quotes');

});
```

## EXAMPLE = Deleting

```
app.post('/quotes/:id/delete', (req, res) => {

  // access the id from the url
  const quoteId = req.params.id;

  // delete it from the db
  delete movieQuotesDb[quoteId];

  // redirect to /quotes
  res.redirect('/quotes');
});
```