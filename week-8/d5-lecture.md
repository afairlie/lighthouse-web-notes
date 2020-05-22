# Ruby

### Comparing Ruby and JS
- When you learn a new language, need to consider the community
- mvc: model view controller
- javascript is a multi-paradigm language
- javascript was designed originally to be functional, but netscape was working with java (which is fully object oriented), so oo was incorporated
- rails is only for backend
- ruby: increase the developer productivity, simplified syntax
- rails, everything is an object. 
- rails is very opinionated, javascript is flexible
- rails great for prototyping an app
- Rails is synchronus
- ruby has rep of not scaling up

## Ruby Synctax

- Boolean
- String
- Hash (same as objects in JS)
- Arrays
- Integers
- Floats
- Symbols (symbols exist in ES6, but not often used. Used in Ruby a lot)

```
'hello' * 3
# output hello 3 times
```

Ruby convention: always use snake_case

difference between 'single' and "double" quote
  - you can only inject value with double quotes
  - single quote will give you string literal

```

```

`puts` is to print

### Iterators

```
1.upto(10) do |n|
  puts n
end
```

```
10.times do |n|
  puts n
end
```

```
(1..10).each do |n|
  puts n
end
```

```
(1..100).step 10 do |n|
  puts n
 end 
```

```
scrabble_words = ['quartzy', 'oxazepam', 'quiffy']

```

## Blocks

```
object.method do |param|
  puts param # console.logging param
end
```

- from `do` to `end` is block. oneliner block with `{}`
- functions are defined using def
- in ruby, the last line in a function has an implicit return
- can't pass block callback as variable

```
def multiples(upper_limit, &block) # &block === callback in js
  output_arr = []
  1.upto(upper_limit) do |nb|
    output_arr.push(block.call(nb))
  end

  # implicit return
  output_arr

end

multiples(5) {|n| n * 3}
```

NEWER SYNTAX = `yield` instead of `&block`
```
def multiples(upper_limit) # &block === callback in js
  output_arr = []
  1.upto(upper_limit) do |nb|
    output_arr.push(yield(nb))
  end

  # implicit return
  output_arr

end

multiples(5) {|n| n * 3} # {is what's yielded to}
```

## Arrays

```
[1, 2] + [3, 4] # output: [1, 2, 3, 4]
[1, 2] * 3 # output: [1, 2, 1, 2, 1, 2]
```

```
name = ['Ariane', 'Max']
name.each {|name| puts name} # output 
```

map or collect
```
numbers = [1, 2, 3, 4, 5]
numbers.map {|n| n * 3}
#output: [3, 6, 9, 12, 15]

numbers.map! {|n| n * 3}
# output will be same, but will also mutate original numbers array

```

bang: `!`
don't need ===, double == will still do strict equality.

```
numbers.reduce {|total, current| total += current}
```

```
numbers.shuffle 
```

## Hash

in ruby, an object is an instance of a class. hash is the equivalent of js object.

```
famous_painter = {
  first_name: 'Pablo',
  last_name: 'Picasso',
  date_of_birth: 1881,
  date_of_death: 1973
}

famous_painter[:first_name]

famous_painter.each do |key, val|
  puts key
  puts val
end
```

```
famous_painters = [{
  first_name: 'Pablo',
  last_name: 'Picasso',
  date_of_birth: 1881,
  date_of_death: 1973
},
{
  first_name: 'Pierre August',
  last_name: 'Renoir',
  date_of_birth: 1841,
  date_of_death: 1919
}
]

famous_painters[1][:first_name]

famous_painters.each do |painter|
  painter.each do |key, val|
    puts "#{key}, #{val}"
  end
end
```

## Example, Writing A Game

game.rb
```
require_relative './player'
class Game

  def initialize(name)
    @player1 = Player
    @player2 = P
```

player.rb
```

# instead of getters and setters:
attr_reader :name, :ap
# attr_writer #have none
attr_accessor :hp

def initialize(name)
  @name=name
  @hp=20
  @ap=10
end

# define get
def name
  @name
end

# define get
def hp
  @hp
end

# define put
def hp(points)
end

# define get
def ap
  @ap
end

def dead?
  # convention, if method return bool, define with '?' at end
end

```

