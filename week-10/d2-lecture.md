# Testing in Rails - Capybara

Capybara has its own domain specific language
ex: `expect(page) to have_button('save')`

`gem 'shoulda-matchers'`
make some tests simpler, because they will be one-liners
- need rspec for shoulda matchers

in rails helper (check this is correct configuration)
```
Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rspec
  end
end
```

=> any simple tests like: `presence_of` you can use shoulda matchers

always interact with your data via rails console
`rails c`
Car.all 

rails active record documentation for more queries

TESTING

`rails g rspec:feature cars`
=> create a feature folder under the spec folder, and it's going to create a cars_spec.rb

`js: true` in test method 

add conig to rails helper

change `config.use_transactional_fixtures` to `false`

always require rails helper
`!` if there is a problem, throw an error 
need db cleaner each time you run a test
  - support directory, look in documentation for configuration
to restrict scope (ex within the form) you can use "within"

```
require 'rails_helper'
require 'support/database_cleaner'

RSpec.feature 'Cars', type: :feature, js: true do
  before :each do
    Car.create! (etc etc etc)

    visit cars_path
  end

  scenario 'visit the homepage' do
    save_screenshot('homepage.png') # if you want to save screenshot over same file, name it
    expect(page).to have_text('All My Cars!')
  end

  scenario 'list all the cars' do
    save_screenshot('car_list.png')
    expect(page).to have_css('.car', count: 3)
    expect(page).to have_text('Toyota')
  end

  scenario 'it filters the cars according to the make' do
  # restrict scope
    within 'form' do
      select 'Dodge', from: 'make'
      click_button 'Search!'
    end
    save_screenshot('filtered_cars.png')
    expect(page).to have_css('.car', count: 1)
    expect(page).to have_text('Dodge Accord Hatchback XLE')
  end

end
```

`rspec spec/features`

to see the screen, in tmp folder, you'll have your screenshot

test db is different than development db

`rails c test` to run console in test environment

cars controller
```
def index
  @cars=Car.order(created_at: :desc)
  # for filtering
  @cars = Car.where(make: params[:make]) if params[:make].present
  @cars = Car.where(model: params[:model]) if params[:model].present
  @cars = Car.where(style: params[:style]) if params[:style].present
  @cars = Car.where(year: params[:year]) if params[:year].present
end
```
is equiv of if wrapper