# Data Modelling

### Types of Databases (Other Than Relational like Psql)
- Container relationships: mongo-db
- to store cache: redis

## ERD

*A way to design/store data in a graphical way*

- ERD represents one instance of an entity, so ie: Island, Resident, Recipe (singular)
- Primary Key (PK) is unique identifier
- Foreign Key (FK) connects tables: convention to use _ for FK ie: island.id = resident.island_id

## Normalization

*ensure data organization is simplest, non-redundant version*

- don't rename entities/variables in 

## Types

- types are "strongly typed", they can't be changed
- `INTEGER`, `VARCHAR`, `TEXT`, `BOOLEAN`, `DATE`, `TIMESTAMP`, `TIMESTAMPZ` are common types
- INTEGER vs FLOAT - float = decimal
- storing currency values: ie = total_price_in_cents: 499
- storing in int instead of float, because it also takes less memory
- VARCHAR() because it can be smaller, it makes for a more efficient database.
- TEXT = 65,000.
- PSQL specifically VARCHAR() is as performant as TEXT, you can 
- primary key column: always use `id`, and then `SERIAL PRIMARY KEY NOT NULL` (serial is auto-incrementing)
- what is signed or unsigned version. signed is with a sign ie: negative value. unsigned is a regular number.

## One to One vs One to Many

- two foreign keys !== many to many relationship
- when do you know ie: a resident has a recipe (when multiple residents can have multiple recipes - many to many)
- don't call middle table combo of two joining entities. use name to define when 
- resident < -- > recipe box < -- > recipe
- middle table always includes primary key and two foreign keys
- usually, it indicates you're just missing a table in your 

### ERD Tools

- Diagrams.net (drawio)
- don't start with diagrams because it's more picky. thinking/conceptual phase should be on paper

### (Midterm Advice)
- intake user stories for app
- create ERD and revise, to find the best database option
- best ERD addresses what your app should and should not do, should or should not have.