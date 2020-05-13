# Data Fetching & Other Side Effects

### Preamble
- in functional programming, a function relies only on input params and no global scope.
- all data should be controlled by React, otherwise, we're modifying DOM directly, which is not recommended
- React manages virtual Dom. It renders virtual state and then renders useEffect after.
- React manages the execution stack now, instead of the browser

### Examples of Side Effects
- set Timeout
- modifying DOM elements not controlled by React
- a network request
- Connection to a socket server
- Adding and removing event listeners
- Logging to the console

### React component flow
1. Mounting (rendering)
2. Updating (updating state)
3. Unmounting (removing component?)

## useEffect

- side effects are not desirable, but sometimes necessary
- in React, useEffect hook is a way for the framework to better handle side effects
- useEffect executes after a component renders. This way, it won't have an impact on rendering.
- useEffect receives two params: a function, and an array of dependencies.
the array invokes side effects. 
- the useEffect can be used once, or reinvoked many times, and the array controls that.
- empty array means execute useEffect once
- TYPICAL USECASE OF USEEFFECT IS NETWORK REQUEST
  - example: if you send request to backend, you want to populate state with that result
  - on scheduler, you're going to request data from backend, and useState to update data?
    - is this because we're usually manipulating data with client, but sometimes, we'll have to request more or different data from outside the "React DOM"?

## Example: Simple useEffect

```
import React, {useEffect} from 'react';

export default function Example(props) {
  const [msg, setMsg] = useState('the effects re-execute each time msg is set')

  useEffect (() => {
    console.log('executing the side effect')
    // this is a side effect because you're modifying the dom directly
    document.title = msg;
  }, [msg])

}
```

- msg is added to array as dependency, useEffect is monitoring the dependency

### Example: Controlled Input and useEffect Tweeter

- create controlled (what?) with useState
- useEffect for char output?

```
const MAX_COUNT = 140;
const [text, setText] = useState('');
const [counter, setCounter] = useState(MAX_COUNT);
const [errorMsg, setErrMsg] = useState(null);

// every time we change the counter, because counter is a dependency of useEffect
useEffect(() => {
  console.log('updating title with counter')
  document.title = counter;
}, [counter]);

const validateTweet = content => {
  if (content.length <= 0) {
    setErrMsg('Please write a tweet before submitting');
    return false;
  }

  if (content.length > MAX_COUNT) {
    setErrMsg('Please provide tweet with less than 140 characters');
    return false;
  }

  return true;
}

const handleSubmit = event => {
  event.preventDefault();
  
  if(validateTweet(text)) {
    // tweetSubmit func doesn't exist, but in theory
    tweetSubmit(text);
    setText('');
  }
}

<h4>{errorMsg}</h4>

// capture tweet text
<Form onSubmit={handleSubmit}/>

// tweet text input
<textarea
  value={text}
  onChange={event => event.target.value}
  onKeyUP={event => setCounter(MAX_COUNT - text.length)}

/>

// output char count
<span>{counter}</span>
```

### State Batch Updates

- when you update state, it's async
- React batches state updates

so:

WILL UPDATE +1
```
() => {
  setCount(counter + 1);
  setCount(counter + 1);
  setCount(counter + 1);
}
```

WILL UPDATE +3
```
() => {
  setCount(counter => counter + 1);
  setCount(counter => counter + 1);
  setCount(counter => counter + 1);
}
```

## Simulate API Request

(using setTimeout)
- because Async happens outside React?

```
const [user, setUser] = useState(null);

useEffect(() => {
  console.log('Executing use effect')

  setTimeout(() => {
    console.log('Changing username to Bob')
    // username Bob will appear after 3 secs
    setUser('Bob');
  }, 3000)
})

<h1>Hello {user && user}</h1>
```
### useEffect Dependencies

- React maintains the virtual DOM
  - React has a virtual DOM because writing to the DOM is a slow operation.
  - at one point, React will say: it's time to render the Real DOM, and it will compare what has been changed (shallow compare). For this process to happen, it needs to control what's
  - if we're manipulating the real DOM before React can compare, React flow will be disrupted 
  - React says: you have a side effect, I will execute it after I render my virtual DOM.
- useEffect, in essence, is listening for React renders
- if no dependency array, useEffect will be invoked after EVERY render. This is a problem because ie: if useEffect was executing network request, it would request at EVERY render.
- can have multiple useEffects

```
useEffect(() => {
  console.log(`you clicked: ${counter} times`)
}, [counter])


useEffect(() => {
  console.log(`You changed the username to: {username}`)
}, [username])
```

### Preferred way to set state

`setState(counter => counter + 1)`
because you're passing an anonymous function which will always point to a different place in memory, and 

### useEffect API (Network) Request

RULES
1. don't call hooks inside loops, conditions, or nested functions
2. only call hooks inside functions
3. you can't control useEffect conditionally

```
const [contributors, setContribs] = useState(null)
const [loading, setLoading] = useState(true)

useEffect(() -> {
  axios({
    method: 'GET',
    url: 'https:api.github.com/whatever'
  })
  .then(result => {
    // store this data in a state - so when it comes in, react will render
    setContribs(result.data);
    setLoading(false);
  })
  .catch(err => console.log(err))
}, [])

const contribList = contributors.map(contribObj => <li>{contribObj.login}</li>)

return <ul>{loading ? <li>...loading</li> : contribList}</ul>
```

## useEffect Dependency Array

- no array : invoke each time any render happens
- empty array : invoke once (always use this with network request)
- array with dependency : invoke each time dependency is rendered