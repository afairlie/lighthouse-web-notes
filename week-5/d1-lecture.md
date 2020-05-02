# Databases

Preamble: 

Client is the front-end, server is the logic, database only communicates with the server. 

It's extremenly insecure for client to communicate directly with database.

## psql - PostgreSQL

- `psql`
- `\du` - display users
- `\l` - list of databases
- `\c` - connect to database
- `\dt` - overview of tables in a specific database
- `\q` - quit psql or `ctrl d`
- `\i` - include `<filename>`

### Ownership/Permissions

- Usually you will not have Superuser on the database. 

- Owner of the database: if you are not the owner of a database, you won't see it, you won't be able to alter it, etc. UNLESS YOU ARE A SUPERUSER - you won't see superusers in production usually, because it's extremely unsafe. 

### ERD
- if a table has a relationship 1 to many ie: 1 user has many URLs, the URLs table will always have a foreign key, which is the first 

## Queries
- queries don't manipulate data, it just manipulates the view
- you must write a `;` at the end of every query
- ***convention*** is to use caps for KEYWORDS and lower for tables/variables.
- can think of SELECT as "show" or "display" a variable
- 

- `SELECT * FROM users;` - select everything from users table
- `SELECT [users.]email FROM users;` - select email in users
- `SELECT email, password FROM users;` - select email and passwords from users
- `SELECT * FROM users WHERE id = 5;` - select all from user 5
- `SELECT * FROM users WHERE id = 5 OR id = 6;` - select all from user 5 and 6
- `SELECT long_url FROM urls WHERE user_id = 1 AND favorite = 't';` - show only long urls of user 1 and favourited
- `SELECT long_url FROM urls WHERE long_url LIKE '%.ca';` - show long_urls that end in .ca

### Joining Tables - SQL JOINS

**`FROM urls JOIN users ON urls.user_id = users.id`**

- you can join data together base on specific columns. if the user_id on the urls table matches the id on the users table. user_id is a **foreign key entity**
- convention to specify table name for clarity, but if there are ie: two id variables and don't specify table.variable, receive error "id is ambiguous"
- you can join with "false" connections ie: you could join urls.id = users.id, they aren't actually associated, but the database would return it.

- `SELECT users.id, urls.user_id, users.email, urls.long_url  FROM urls JOIN users ON urls.user_id = users.id;` - show user id (from both users and urls tales), their emials, and the long url, join the variables based on id from users table (primary key), and user_id from urls table (foreign key)

**`RIGHT JOIN`**

- `SELECT users.id, urls.user_id, users.email, urls.long_url  FROM urls RIGHT JOIN users ON urls.user_id = users.id;` - show all users, even if they don't have data in urls table

### Aggregate Functions

**`GROUP BY`**

- `SELECT users.email, COUNT(urls.long_url) FROM users JOIN urls ON users.id = urls.user_id GROUP BY users.email;` - how many urls does each user have?

**`HAVING`**

- `SELECT users.email, COUNT(urls.long_url) FROM users JOIN urls ON users.id = urls.user_id GROUP BY users.email HAVING COUNT(urls.long_url) > 3;` - show long_url count by user, if count is over 3

### STRETCH

```
SELECT users.id, users.email,
  (SELECT count(*) FROM urls where favorite = true AND urls.user_id = users.id) as "favorited",
  (SELECT count(*) FROM urls where favorite = false AND urls.user_id = users.id) as "regular"
FROM users
JOIN urls on users.id = urls.user_id
GROUP BY users.email, users.id;
```
### Closing Notes

- ORM is a visualizer - postico (elephant icon)
