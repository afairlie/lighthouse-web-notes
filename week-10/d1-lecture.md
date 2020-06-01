# Rails Review

## Rails is a Framework for Ruby

- A collection of libraries that work together
- Rails favours convention over configuration: it provides abstraction and encourages readable code
- ex: you don't have to configure routes

### Useful Libraries in Rails

- Active Record ORM: Object Relational Mapper
  - makes interaction with data in DB much easier
- ActionMailer -> 
- ActionPack -> Router
- ActionCale -> WebSocket
plus many more

Rails framework compared with Express Library: Express has the basics, and you extend the library.

### OOP

- if you don't follow the object oriented paradigm, ruby will complain

### MVC

- Model, View, Controller
- MVC is the most commonly used pattern in web app development

Benefits: 
  - more structured. For an app, 20% is building, 80% maintaining. The MVC pattern makes maintenance much easier

## Demo: Creating a Movie App

`rails new movie_app --database=postgresql -T -no-rdoc -no-ri`

(when we create our final project: `rails new name_app --api --database=PostgreSQL -T --no-rdoc --nori `)

`rails g model Movie title description image_url director date_release:date runtime_in_minutes:integer`

`rake db:create`
`rake db:migrate`

check schema file to see 

`rails c` - an interface where you can look at your model

create controller
`rails g controller Movie`

create routes resource(s)

rake routes

create view

in `application.html.erb`
`<% yield %>` is related to blocks. it yields to your views

movies > index.html.erb

<%= render @movies %>

movies > _movie.html.erb

<li>movie.title</li>

routes:
`link_to, movie_path(movie)` 

movies_controller.rb

```
def show 
  @movie = Movie.find(params[:id])
  raise
end
```
in the browser, when you `raise`, you have a console that lets you access the state of the page at that time. So in this case, you could use `raise` to check the value of @movie, to ensure it's finding the movie in DB with proper params id.

### create a form

movies > new.html.rb
```
<%= for_with model: @movie do |f| %>
  <div class='form-group'>
    <%= f.label :title %>
    <%= f.text_field :title %>
  </div>

  <%= f.submit 'Add New Movie' %>
<% end %>
```

what is the @movie object?

in movie_controller.rb

```
def new 
  @movie = Movie.new
end
```

on submit - you have to define the movie params method
```
def create
  @movie = Movie.new(movie_params)
  raise
  if @movie.save # save will check validation rules in model.rb
    redirect_to movies_path
  else
    render :new
  end
end

private

def movie_params
  params.require(:movie).permit(
    :title,
    :description,
    :image_url,
    :director,
    :release_date,
    :runtime_in_minutes
  )
end
```

see in params after raise, id will be nil because the movie isn't added to db until save method called

When you have linked tables, ex: `Reviews` belong_to `Movies`, (a movie can have many reviews)

you can access reviews via the movie object, ex: `@reviews = @movie.reviews` in `show_controller.rb`

in render > show > _show.html.rb

`<%= render @reviews %>`