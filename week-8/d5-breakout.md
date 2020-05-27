# Breakout

- benchmarker compares frameworks: https://github.com/the-benchmarker/web-frameworks
- flask is express for python
- brackets are optional

## Ruby == OOP

game_demo.rb
```
class Human
  attr_accessor :name, :age
  def initialize
  # have to make methods to make variables accessible
    @name = 'Ariane'
    @age = 28
  end
end

a = Human.new
b = Human.new

puts a # <Human:0x000559ac77>
a.name = 'Ariane Fairlie'
```

## Inheritance

- the child class will get everything from parent class, plus child can define own things

```
class Knight < Human
attr_accessor :weapon, :armor
# in other oop, like java, you HAVE to def, no shorthand (like attr_accessor) for method definition
  def initialize
    super() #re-initializes parent methods
    @weapon = 'Paintbrush'
    @armor = 'Tough Skin'
  end
end

a = Knight.new
puts a.name # output 'Ariane'
```
Terms:
classes
initializers
accessors and mutators, getters and setters

`gem install <package>`

debugging package: `gem install byebug`
alt op: `gem install pry`

byebug commands
`byebug` insert in line where you want to stop
