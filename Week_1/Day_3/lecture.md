# Day 3 Lecture - Objects
*Lecturer: Martin Laws*

## Javascript Data Types

### Ints/Numbers
Numbers are limited to a max decimal point in js, store numbers without decimal points ie $100.00 would be stored as 10000 (cents) not 100.00 (dollars). 

**Find the lowest common denominator and create conversion functions when necessary (secs, cm, not minutes, meters)**

### Arrays
Good for storing a list of same data types ie:
``` const array = [1, 2, 3]; ``` NOT ``` const array = [1, "hello", true]; ```

### Loops
- FOR... *OF* - returns each **value** of array
- FOR... *IN* - returns each **index** of array
- .entries() - [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries) (advanced iteration method)
  ``` 
  for (const [index, value] of array.entries()) {
    console.log(index, value);
  }
  ```
## Objects

### '.'
universal lookup (?) in js.

### *this*
references the parent object.
  ex. ***this.firstName*** instead of person.firstName (hardcoded)

## Iterating Over Objects

For..in works to loop over object (returns key). You can use this[key] to lookup value in separate function.

### OBJECT
```
const person = {
  firstName: "Martin",
  lastName: "Laws",
  heightInCm: 188
};
```

### FOR...IN

*to access key, then use this[key] for value.*
```
for (const key in person) {
   console.log(`${key}: ${person[key]}`);
 }
```
### OBJECT.KEYS(objectName) - returns array of keys
```
const keys = Object.keys(person);
```
then loop array of keys to use FOR...OF loop on object
```
for (const key of keys) {
  console.log(person[key]);
}
```
### OBJECT.VALES(objectName) - returns array of values
```
const values = Object.values(person);
console.log(values);
```
---

## Some Other Notes

- Software + Ethics: Uncle Bob on Clean Code (uses mostly Java and Python examples)
- Blue Dot: Canadian software company tracking Covid - data visualization
- Suggestion  - Find a developer font!
  - recursive mono
  - firacode
  - dank mono (?)

- VS Code Themes: Night Owl designed by Sarah Drasner (follow her on Twitter, definitive voice in front-end dev)