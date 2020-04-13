- to use a callback with a function, you need to understand the behaviour of the function that receives the callback as an argument, so you can understand how the callback function must behave in response to it.

- Higher-Order functions are any functions which operate on other functions.

- Higher-Order functions are a major aspect of Functional Programming.

- a callback function will "call back" a higher order function with whatever the callback function returns 

A DIFFERENT WAY OF TESTING WITH FUNCTIONS!!!
but result of function in variable.

```
let result = findKey({
  "Blue Hill": { stars: 1 },
  "Akaleri":   { stars: 3 },
  "noma":      { stars: 2 },
  "elBulli":   { stars: 3 },
  "Ora":       { stars: 2 },
  "Akelarre":  { stars: 3 }
}, x => x.stars === 2) // => "noma"

console.log(result);
assertEqual(result, "noma")
```