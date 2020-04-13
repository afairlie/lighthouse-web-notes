# Lecture W02D04 - Exception (Error) Handling + Callbacks vs. Promises

## Callbacks

```
const upperCaseAsync = (inputStr, callback) => {

  setTimeout(() => {
    callback(inputStr.toUpperCase());
  }, 3000);
};

upperCaseAsync('Sponge Bob', (upperCaseName) => console.log(upperCaseName));
```

## Exception Handling - Errors

```
const printName = name => {

  console.log('SpongeBob');

  // simulate throwing error
  throw new Error("Bob you're not allowed!");

}

try {
  printName('Sponge Bob')
} catch(err) {
  console.log("Error:", err.message);
} 

console.log("Continue Execution");
```

### Exception Handling - try{} catch{}
*(doesn’t work with async functions)*
```
try {
function()
} catch(err) {
console.log(err) // error will be of that 
}
// … the program will continue after.
```


** use this synctax instead of console.log to throw an error with sync functions:

`throw new Error(‘error text here’);`

### Example: why try/catch doesn't work w/ async

```
const upperCaseAsync = (inputStr, callback) => {

  console.log("Before setiTimeout"); //1
  

  setTimeout(() =>{ // 2

    callback(inputStr.toUpperCase()) // 7
    undeclared; // triggering an error // 8
  }, 3000)


  console.log("After SetTimeout"); //3

  return undefined; // 4
  

};

try {
  upperCaseAsync('Sponge Bob', (upperCaseName) => console.log(upperCaseName)); // 5
} catch(err) {
  console.log("Error:", err);  
}

console.log("Continue Execution"); //6 
```

## Async errors

Callback responsible for handling error:
convention: when we deal with err param for callback in async function, error is always the first parameter

```
const upperCaseAsync = (inputStr, callback) => {

  setTimeout(() => {
    // simulate an error
    const error = false; // trigerring an error

    if (error) {
      // error
      callback("Error: Bob you're not allowed!", null);

    } else {
      // no error
      callback(null, inputStr.toUpperCase());
    }


  }, 3000);


  // next statement
  // return undefined

};

upperCaseAsync('Sponge Bob', (err, upperCaseName) => {
 
  if (err) {
    console.log(err)
    return;
  }
 
  console.log(upperCaseName);
});

// continue here
```

## Promises
*use* ***resolve, reject***

`.then` 

resolve = behaviour if there is no error

`.catch` 

reject = behaviour if there is an error

### HOW TO: call a function with a PROMISE

```
upperCaseAsync(stringParam).then(result => {
  console.log(result) // stringParam mutated by upperCaseAsync function
})
.catch(err => console.log(err));
```

promises only work with async functions - you can't use a promise in place of a callback on sync function (ex. .map)

### Promises can be CHAINED

```
upperCaseAsync('stringParam')
.then((name) => {
  console.log(`first log: ${name}`);
  return name; // passing the name variable to the second .then, below.
})
.then((name) => {
  console.log(`second log: ${name}`);
})
.catch(err => console.log(err));
```
`.then` chain call and return implicit.
```
const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
}
```

### `Promise.all`

```
Promise.all([getUser(), getGreeting(), getUser()])
.then(result => {
console.log(`${result[0]} says: ${result[1]} ${result[2]}`)
})
.catch(err => console.log(err))
```

// results will return in an array