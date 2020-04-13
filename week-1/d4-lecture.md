# Lecture Day 4 - Functions, Call Back

## Function Expression vs Declaration

Expression - `const expressionEx = function() {}`

Declaration - `function declarationEx() {}` (?)

Technically there's no difference, but there's preference for expression.

The function declaration is foisted with name.

## First class object

An object with no restrictions on its creation, destruction, or usage. Ex, a function.

## Higher Order Function

A function that can accept another function as input parameters, or a function that returns another function

Can create a function in-line (as an arguments) of higher-order function.

## callBack function 

is a first class object that is passed around like any other value.

***MAP IS A GREAT EXAMPLE OF A CALLBACK FUNCTION***

[map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) takes an array and loops through it, returning a copy of that array. 

It takes an additional parameter that is a function to transform the original array as it's copying, so the copy returned by map can be transformed in any ways you can access the original array.

```
const update = (list, callback) => {
  // define placeholder for the output array
  const updatedList = [];

  // Loop through the list of items

  for (let item of list) {
    updatedList.push(callback(item)); // TRANSFORMATION function (callback - a function I define inline as argument, or define alone and include as argument) GOES HERE
  }

  // give back the transformed array - contains all the elements, but changed
  return updatedList;
};
```

DRY PRINCIPLE: *Don't Repeat Yourself*

### GOAL for Developers
*Highly modular code* with higher-order functions taking first class functions as callbacks.