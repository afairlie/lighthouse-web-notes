# Security, REST, Modular Routing, Middleware

### Preamble - Notes on Submitting **TinyApp**
- read through list of required behavioiurs
- remove console logs
- put helpful comments (no excess)
- (review with mentor for blaring mistakes?)

### npm packages
- yarn is alternative to npm - less buggy
- bcrypt
- uuid
- cookieSession
- methodOveride *stretch middleware for TinyApp

## Security

### Hashing
Hashing vs Encryption - you can't go back to original version, encryption you can un-encrypt - ** RESEARCH THIS MORE

As computers become more powerful, they can break ecryption from sheet force

1. password + salt (extra chars)
2. mix all the chars
3. mix all the chars agian

### Hashing Passwords

*encrypt passwords before storing in database*

- vulnerability: if someone gains access to database, can read all passwords
- hash compares the values of hashed password
- tool: bcrypt

### Encryption: User ID in Cookies

- vulnerability: anyone can impersonate users if they guess right user ID
- tool: cookieSession 

```
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))
```

### HTTPS
** RESEARCH THIS MORE

use node HTTPS library to secure your app...

## REST
*Rest is a resource based route conventiona (pattern) to organize our url structure*

### REST Convention Guide
By following REST principles, it allows us to design our end points:

| Action                                | http verb | end point                |
| ------------------------------------- | --------- | ------------------------ |
| List all quotes                       | GET       | get '/quotes'            |
| Get a specific quote                  | GET       | get '/quotes/:id'        |
| Display the new form                  | GET       | get '/quotes/new         |
| Create a new quote                    | POST      | post '/quotes            |
| Display the form for updating a quote | GET       | get '/quotes/:id/update' |
| Update the quotes                     | PUT       | put '/quotes/:id         |
| Deleting a specific quote             | DELETE    | delete '/quotes:id'      |

Nested Resources

You may need to access a nested resources. For example, you need to create a new comment.

| Action               | http verb | end point                  |
| -------------------- | --------- | -------------------------- |
| Create a new comment | POST      | post '/quotes/:id/comments |

#### Example Exercise

	1.	The end-user wants to see a list of photos
	2.	The end-user wants to see a particular photo
	3.	The end-user wants to upload a new photo
	4.	The end-user wants to update an existing photo
	5.	The end-user wants to see a list of user profiles
	6.	The end-user wants to see a specific profile
	7.	The end-user wants to see a list of the photos for a specific profile

OUR GUESSES
- get /photos
- get /photos/:photoID
- post /new
- post /photos/:photoID
- get /users
- get /users/:userID
- get /users/:userID/photos

CORRECTED

*Tip: Read it backwards*

1. GET /photos
2. GET /photos/:id === backwards: I want to see the id of a certain photo from a list of photos
3. GET /photos/new - display the form to post new photo && POST /photos === post (new photo) to photos list
4. GET /photo && PUT /photos/:id
5. get /users
6. get /user/:id
7. get /users/id/photos

extra example: get /users/:id/photos/:id === get specific photo of specific user

## Routing Modules

Exporting modules as functions - RESEARCH THIS MORE

const dbHelpers = require('./helpers/dbHelpers')(movieQuotesDb, quoteComments, usersDb);

## Middleware
***middleware modifies request or response object***

Building our own middleware:

```
const logger = (req, res, next) => {

  console.log("req.body", req.body);
  req.secret = "my secret password is test!";
  next();
} 

app.use(logger);

```
In this example, every time a request is made to browser, its passed through logger middleware. the middleware: 
1. console.log(req.body), and attaches .sercret to req object.
2. the value of .secret is in this case 'my secret password...etc.'

* console.log is hardcoded, this would not be 

Ex. using logger => `console.log(req.secret);` 

=> would return **'my secret password is test!'** in terminal.

## Alternatives to Express


- Koa.js (Javascript) - https://koajs.com/
- Sinatra (Ruby) - http://sinatrarb.com/
- Flask (Python) - http://flask.pocoo.org/

Express is modelled around Sinatra