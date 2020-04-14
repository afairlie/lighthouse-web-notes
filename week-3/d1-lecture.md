# Web Servers

## HTTP Review

- HTTP runs on top of TCP
- HTTPS is conceptually the same, except that the content is encrypted by TLS
  - It's transparent at the HTTP level

### Anatomy of an HTTP Request

```
GET /maps HTTP/2.0
User-Agent: Chrome 80
Cookie: chocolate chips

```

### Anatomy of an HTTP Response

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 14
Date: Mon, 20 Jan 2020 17:07:16 GMT
Connection: keep-alive

<html><body><!-- Some HTML content... --></body></html>
```

### Create Server from HTTP Package

```
const http = require("http");

const PORT = 9001; // IT'S OVER 9000!!!
```
the server you create is saved in server object.
```
const server = http.createServer((request, response) => {
```
request sent by client, HTTP will parse it into object
```
	console.log(request);
```

  server finished preparing response, sends response.

```
	response.end("Don't forget to tip your server");
});
```

create a listen event for server through specified port, callback to handle the listening event. 

(in this case, console.log is logging the ENTIRE server object)
```
server.listen(PORT, () => console.log("Server is listening", server));
```
### HTTP Request (Methods)
- GET
- POST
- DELETE
- PUT

### HTTP Routing

Routing creates the paths of a project (website).

```
const server = http.createServer((request, response) => {
	console.log(`path : ${request.url} method: ${request.method}`);

	const urls = {
		"/chicken": "Chickens are cool",
		"/": "Welcome !",
		"/tip": "Thankyou for the tip",
    "/random": randomFunction()
	};

	response.end(urls[request.url]);
});
```

## Express Routing

*Express is a framework that works with HTTP package*

```
const express = require('express');
const server = express();
const port = 3000;

server.get('/', (req, res) => res.sent('Hello World!'));
```
`server.get` is an event handler - when the server gets a request that is a *GET* method with the url of '/chicken'
```
server.get('/chicken', (req, res) => res.sent(`Muahaha you ${req.method} the chicken`))

server.liste(port, () => {
  console.log(`Example server listening at http://localhost:${port}`);
})
```
Express has all same methods as HTTP: 

- `server.get()`
- `server.post()`
- `server.put()`
- `server.delete()`

### Request Parameters

```
server.get('/student/:student_id', (req, res) => 
{
  const students = {
    1: 'Andrew',
    2: 'Isabella'
    3: 'Amro'
  };
```
students[param] (as below) will send ie: Isabella if http://localhost:3000/student/2
```
  res.send(students[req.params.student_id]);
});
```

### Params with Express
```
server.get('/urls/:shortURL', (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };

  res.render('urls_show', templateVars);
})
```
## Middlewares (in Express)

*functions handling behaviour between request and response*

- Man in the Middle attacks, can listen to the client requests (before HTTPS this was issue ie. public )

```
const myLogger = function(req, res, next) {
  console.log('LOGGED', req.url);
  next();
}

const redirector = (req, res, next) => {
  if (req.url.includes('student')) {
    console.log(req.url)
    next();
  } else {
    res.redirect('/student')
  }
}
```
`server.use` is to use functions in the server.

```
server.use(myLogger);
server.use(redirector);
```

## Server-Side Rendering with Template

### Using EJS Templates

* `server.set('view engine', 'ejs');`

* setup 'views' folder in project folder.
* file type is .ejs
* `<% %>` //  function/behaviour (ie. to loop through )
* `<%= %>` // output value (on web page)

### Template Example 1

in .js file:
```
server.set('view engine', 'ejs');

server.get("/team1", (req, res) => {
	const faveFoods = {
		isabella: "sushi",
		neihy: "bananas",
		ariane: "avocado",
	};

	const templateVars = {
		faveFoods
	};

	res.render("favorite_foods", templateVars);
});
```

in .ejs template:
```
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Favorite Food</title>
	</head>
	<body>
		<h1>Favorite foods !</h1>
		<ul>
			<li>Hey hey</li>
			<li><%= faveFoods.neihy %></li>
			<li><%= faveFoods.ariane %></li>
			<li><%= faveFoods.isabella %></li>
		</ul>
	</body>
</html>
```

### Template Example 2

in .js server
```
// Team 2

let favHobbies = ["reading", "walking", "guitar playing"];

server.get("/team2", function (req, res) {
	const templateVars = {
		list: favHobbies,
		title: "Hobbies",
	};

	res.render("favorite_arrays", templateVars);
});

// Team 3

const moveList = ["The Intouchables", "Benchwarmers", "Hanna"];

server.get("/team3", (req, res) => {
	const templateVars = {
		list: moveList,
		title: "Movies",
	};
	res.render("favorite_arrays", templateVars);
});
```

in favorite_arrays.ejs

```
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Favorite Food</title>
	</head>
	<body>
		<h1>Favorite <%= title %> !</h1>
		<ul>
			<li>Hey hey</li>
			<% for(const fav of list) { %>
			<li><%= fav %></li>
			<% } %>
		</ul>
	</body>
</html>

```