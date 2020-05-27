`bin/rake routes`
=> inspect rest patterns

## Setting up “articles” mvc

1. `bin/rails generate controller articles`
=> adding a controller (routes?)

2. `bin/rails generate model Article title:string text:text`
=> adding a model for ORM

3. `bin/rake db:migrate`
=> runs migration (can only do this after generate model)

## Setting up “comments” mvc
(note, doing this in different order than articles)

1. `bin/rails generate model Comment commenter:string body:text article:references`
=> Executes:
Running via Spring preloader in process 19974
      invoke  active_record
      create    db/migrate/20200527133859_create_comments.rb => in db > migrate 
				=> auto-generates migration to create table. You can edit if needed before you execute migration?
      create    app/models/comment.rb 
				=> because article:references, comments belong_to article. validation can be added here.
      invoke    test_unit
      create      test/models/comment_test.rb
      create      test/fixtures/comments.yml

### FILE PATH AND PURPOSE

db/migrate/20140120201010_create_comments.rb
Migration to create the comments table in your database (your name will include a different timestamp)

app/models/comment.rb
The Comment model

test/models/comment_test.rb
Testing harness for the comments model

test/fixtures/comments.yml
Sample comments for use in testing


2. `bin/rake db:migrate`
=> Executes:
Running via Spring preloader in process 20241
== 20200527133859 CreateComments: migrating ===================================
-- create_table(:comments)
   -> 0.0044s
== 20200527133859 CreateComments: migrated (0.0045s) ==========================

=> have to edit article.rb model to include `has_many :comments` to complete one to many relationship between article and comments. 

=> `@article.comments` would now return comments belonging to that article instance variable)

3. routes.rb
```
resources :articles do
  resources :comments
end
```
=> add comments resources. comments are a nested-resource of articles aka /article/id

4. `bin/rails generate controller Comments`
=> Executes:
Running via Spring preloader in process 20423
      create  app/controllers/comments_controller.rb => route/rendering
      invoke  erb
      create    app/views/comments
      invoke  test_unit
      create    test/controllers/comments_controller_test.rb
      invoke  helper
      create    app/helpers/comments_helper.rb
      invoke    test_unit
      invoke  assets
      invoke    coffee
      create      app/assets/javascripts/comments.coffee
      invoke    scss
      create      app/assets/stylesheets/comments.scss

### FILE DIRECTORY AND PURPOSE

app/controllers/comments_controller.rb
The Comments controller

app/views/comments/
Views of the controller are stored here

test/controllers/comments_controller_test.rb
The test for the controller

app/helpers/comments_helper.rb
A view helper file

app/assets/javascripts/comment.js.coffee
CoffeeScript for the controller

app/assets/stylesheets/comment.css.scss
Cascading style sheet for the controller

## MVC FLOW

	1.	The browser issues a request for the /users URL.
	2.	Rails routes /users to the index action in the Users controller.
	3.	The index action asks the User model to retrieve all users (User.all).
	4.	The User model pulls all the users from the database.
	5.	The User model returns the list of users to the controller.
	6.	The controller captures the users in the @users variable, which is passed to the index view.
	7.	The view uses embedded Ruby to render the page as HTML.
	8.	The controller passes the HTML back to the browser.5