# Cookies and User Authentication

### Preamble
- Tip: browse the internet with dev-tools open: a way to optimize your leisure time
- TCP has constant connection, whereas HTTP has no ongoing connection with client, it operates with requests and responses. Web-sockets are a way to keep 
- when we do something like user-authentication, the server can't remember you.

***So, how can we store information for the user while they're browsing?***

## Cookies
*Cookies are one (not the only) option for solving HTTP's stateless-ness.* 
- the browser is a GET machine. *POST is only done through HTML form, or javascript.*
- ***Don't store sensitive information in cookies (for user, or server info). They're not secure.***
- manipulating cookies: devtools > cookies && elements tab to get around ie: paywalls.

## Tools, Templates, Security
- **Express Generator Package:** `install --global express-generator`
  - when setup, set `express . -- view=ejs` (check syntax for this.)
- Ruby: erb is ejs equivalent
- Shopify uses *liquid* templating language
- Privacy in browsing: cookies & privacy are directly related. Reco: **winscribe vpn**
- ***HTTPS*** encrypts the body in all requests. DON'T ENTER INFO ON A FORM THAT ISN'T HTTP**S**.
- on public wifi - use VPN. 
- VPN - anyone monitoring network sees that you're making requests to your VPN provider.

## Express Setup
- cookies are expressed by the browser as a concatenated string.
- we don't write custom cookie parsers, so cookie parser is the industry standard package

package.json:
```
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "ejs": "~2.6.1",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "morgan": "~1.9.1",
    "nodemon": "1.0.0"
  }
```
- ***never edit package-lock.json***

- `app.set` is how we feed configuration values for express.

- `.cookies` is an object that's auto-generated for us on every request
.cookies is because of cookie-parser. `.cookie` is built in to express, and will return cookie string, unparsed. 

- **morgan** automatically logs requests to server.

## Routing Modules

- create 'Routes' directory > create < route >.js files here
- express.router is a module that allows us to **create route modules.**


ROUTING SETUP in server.js

```
const indexRouter = require("./routes/index");
app.use("/", indexRouter);
```

ROUTER SETUP in ex. => index.js
```
const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "LHL Cookie Party 🍪" });
});

module.exports = router;
```
## Cookie Demo 1 - Language Option Cookie
*choose-language*

IMPORT in server.js
```
const languageRouter = require("./routes/languages");

app.use("/", languageRouter);
```

router/languages.js
```
const express = require("express");
const router = express.Router();

const availableLanguages = ["english", "french"];

/* GET home page. */
router.get("/", (req, res) => {
  // object deconstruct: variable name === obj.key name.
  const { language } = req.cookies;

  if (language && availableLanguages.includes(language)) {
    res.render(language);
  } else {
    res.render("choose-language");
  }
});

router.get("/lang/:language", (req, res) => {
  res.cookie("language", req.params.language);
  res.redirect("/");
});

module.exports = router;
```

### Cookie Demo 2 - User Auth Cookie

IMPORT in server.js
```
const userAuthRouter = require("./routes/userAuth");

app.use("/auth", userAuthRouter);
```

routes/userAuth.js
```
const express = require("express");
const router = express.Router();

const usersDb = [
  { username: "mlaws", password: "123" },
  { username: "maya", password: "chimken" },
];

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = usersDb.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    res.cookie("isAuthenticated", "true");
    res.cookie("currentUser", user.username);
    res.redirect("/auth/treasure");
  }

  res.send(user);
});

router.get("/treasure", (req, res) => {
  if (req.cookies.isAuthenticated) {
    res.render("treasure", { currentUser: req.cookies.currentUser });
  } else {
    res.redirect("/auth/login");
  }
});
module.exports = router;

```
### Closing
- cookies for persisting data
- separated routes
- (frontend dev is voice and watches, not just pixels)