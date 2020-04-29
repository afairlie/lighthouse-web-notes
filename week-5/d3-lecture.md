# SQL From our App

## Migrating and Seeding Tables
- standard to DROP TABLE before CREATE TABLE - <u>in development data </u>
- DON'T DROP PRODUCTION TABLES. 

### Data Types
- SERIAL auto-incrementing, INT 
- TEXT has maximum 65,000 (?) VARCHAR(225) max 225
- `table_id INT REFERENCES <table>(id)`

## JS Interact with Database - PostgreSQL
- Client asks for requests
- PostgreSQL is a data server - SERVER
- psql is a PostgreSQL interactive terminal - CLIENT
- what are other clients for PostgreSQL? 
	- ***Node PostgreSQL***

## **Node PostgreSQL** Module

- `npm install pg` install the package
- `const { [Pool,] Client } = require('pg')` use the package in your program
- Pool is if you want to have multiple queries, client is 1 to 1 relationship
- `const client = new Client()`
- `client.connect()` what db do you want to connect to though?
- params you need for new client: {user, host, database, password, port}
```
const client = new Client({
user: 'francis',
host: 'localhost',
database: '<animalcrossing>',
password: 'francis',
port: 5432 // default for PostgreSQL
})
```

```
client.connect()
	.then((client) => {
		console.log('hey I'm connected!');
})
	.then(() => client.query('SELECT * FROM islands ORDER BY turnip_price DESC LIMIT 1'))
	.then(dbResponse => console.log( dbResponse.rows))
	.then(() => client.end())
```
- `client.query` returns a promise
- needs to be in a specified order, but the functions are not synchronis
- ***rows*** and ***rowCount*** important properties of result object.
- when you ask for rows, it will always return an array (list) because even if the 
- include `LIMIT 1` even if you access the result with `dbRes.rows[0]` because although they're equivalent, if you include `LIMIT 1`, you're asking db to do less work.
- for security, you also want to db to handle most of the query, because the more data you return to the client to handle, the more it becomes possible for the client to manipulate or access the data in a way you don't want.
- always validate your response before you return it to your client, so you're not returning "undefined"

## Parametized Queries 

- avoid sql injection vulnerabilities
- we can destructure arrays as well as objects ex: `const [,,name, birthday, has_vehicle, island_id]= process.argv; return {name, birthday, has_vehible, island_id};`

```
const query = `INSERT INTO residents (name, birthday, has_vehicle, island_id) VALUES ($1, $2, $3, $4)`
const values = extractUserValues()
client.connect().then() => client.query(query, values)
``` 
- you can separate `query` and `values` when using client.query with pg module

## Working with Express and PG

```
client
.connect()
.then(() => {
     app.listen(port, () => {
	console.log('server and db ready')
     })
})
```

- build helper functions for queries like fetchIslands() and fetchResidents() that return the query promise 
- when you export, you would receive error client is not defined. the solution is a CLOSURE

## Closures

***closures are a higher order function that returns a function based on the*** <u>context</u> ***given by the parent***

- it's technically not binding (when we talk about binding, we're talking about .this)
- only have to define data context one time 
- easier to refactor
- organization
- save yourself from user error
- higher order functions create and return a function, or receive a function as a parameter

```
const countdownFactory = (time) => {
const countdown = () => {
	for (let i = time; i > 0; i--) {
	console.log(`${i} remaining`)
	}
     }
return countdown;

}

const countdownFrom10 = countdownFactory(10);
console.log(countdownFrom10())
// would console.log 10 remaining, 9 remaining, etc.
```
- wrap dbHelpers = (client) with client as parameter (give client as context to db helpers
- inside dbhelpers , they know what client is now
- return {fetchisland fetchresidents}
- after client exists, execute dbHelpers function after execute new Client() 
	- dbHelpers(client) 
- need to extract the helper functions with client bound to them from the first dbhelpers funciton
	- const {fetchIslands, fetchResidents} = dbHelpers(client)

## .env

- .env are variables in your environment
- `process.env.DBUSER, process.env`
- by default in your system you do have environment variables, but you can explicitly set them by creating a .env file.
- .env is in .gitignore
- .env.example file to
- also put in API keys 
