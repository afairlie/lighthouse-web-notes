# Advanced React Topics

### Preamble
- React is a single page applicaiton
- no multi-page support
- everything happens inside of app
- state and props: state --> drill into components --> x --> y --> z
- there is a package to solve issue of "no multi-page support"

## Multi-Page React: React Router

Create multi-page applications in SPA

`npm install react-router dom`

Optional directory structure:
src - Components: individual components
    - Pages: essentially view templates

### Example: Building Basic Setup

- [React Router Documentation](https://reacttraining.com/react-router/web/example/basic)
- the page doesn't refresh, but it sends you to different routes
- ie: url.com/home --> url.com/about
- With React Router, you have frontend and backend routing. Ie your frontend route will direct you to a component, you'll make an axios request to server with that component to fetch data from that same route
- More options: nesting, redirects (auth)

```
import React from 'react';
import Dogs from './Pages/Dogs'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

function App(){
  return (
    <Router>
      <nav>
      // these are <a> tags (inspect to see). Link to="" controls our route
        <Link to="">Home</Link>
        <Link to="/dogs">Dogs</Link>
        <Link to="/cats">Cats</Link>
      </nav>
      // switch controls our render
      <Switch>
        < Route>
        // have to include exact because otherwise 
          <Home exact path='/' />
        </Route>
        <Route path='/dogs'>
          <Dogs />
        </Route>
        <Route path='/cats'>
          <h1>Cats</h1>
        </Route>
      </Switch>
    </Router>
  )
}
```

## `createContext` Hook: State Management

- [`createContext` Documentation](https://reactjs.org/docs/hooks-reference.html#usecontext)
- Redux and Mobix used to be for state management
- React built their own global state management system
- If you put something into context, it's globally accessible
- valuable tip: "context is primarily used when some data needs to be accessible by MANY components at different nesting levels. Apply it sparingly because it makes component reuse more difficult"
- context is a way to share state
- context + reducer = redux
- createContext, export, useContext import to components where you want to use ([state, setState] = useContext(GlobalContext);). ALWAYS WRAP COMPONENTS THAT WANT TO USE THE GLOBAL STATE
- Wrap. setState
- Make your own context file, you don't have to keep it in App. But otherwise, this is good resource: https://www.freecodecamp.org/news/react-context-in-5-minutes/

**GlobalContext.js**
```
import React, {createContext, useState} = 'react';

// step 1: make a default state for context
const GlobalContext = createContext({count: 0});

// step 2: the context that we created has a method, called Provider. Provider is a component. (in Redux it's called a wrapper)
// wrap everything you want to share with this provider
export function GlobalContextProvider(props) {
  const [state, setState] = useState({count: 0});

  return (
    // value={state, useState} makes it so you can destructure
    <GlobalContext.Provider value={state, useState}>
      // whatever we pass in here will share {count: 0} (or whatever it's updated to(?))
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalContext

```

**in App.js**
```
import {GlobalContextProvide} from './Context/GlobalContext'
// step 3: wrap all the components you want to share the state(context) with.
<GlobalContextProvider>
  <Switch>
    < Route>
    // have to include exact because otherwise 
      <Home exact path='/' />
    </Route>
    <Route path='/dogs'>
      <Dogs />
    </Route>
    <Route path='/cats'>
      <h1>Cats</h1>
    </Route>
  </Switch>
</GlobalContextProvider>
```

**Home.js**
```
import React, {useContext} from 'react';
import GlobalContext from '../Context/GlobalContext';

export default function Home(props) {
  const [state, setState] = useContext(GlobalContext);
  // lots of stuff in global context object
  console.log(GlobalContext);
  // will log: {count: 0}
  console.log(state)
  return <div>
    <h1>Homepage</h1>
    <h4>the counter is {state.count}</h4>
    // when count button increases count state, any component that uses that context will have access to the updated count.
    <button onClick={() => setState(prev => {...prev, count: prev.count +1 })}>click me</button>
  </div>
}
```

## Reducer

const [state, dispatch] = useReducer(reducer, initialState);

- someone clicks button to run dispatch
- when dispatch runs, it runs the reducer function you pass
- in different cases (the type of dispatch you pass), the reducer will take different actions.
reducer takes a copy of state, and do something 
- reducers prevent you from accidentally mutating your state (how?)
- main benefit: all of your functionality to mutate is in one reducer.

## Styled-Components

- you only get css on a need-to-know basis
- cross compatible with frameworks like boostrap, material design, whatever.
- ask Martin about how people are using styled components in the wild.
- library file, exports for different buttons. 

### Problem: button won't be green, and text will be white on all.

**app.css**
```
button {
  background-color: red;
}
```
**index.css**
```
button {
  background-color: green;
  color: white;
}
```

### Solution: Styled-Components Package

```
import React, {useContext} from 'react';
import styled from 'styled-components';
import {AcceptButton} = ''

const Button = styled.button`
  background-color: green;
  color: white;
  padding: 8px;
  box-shadow: 3px 4px 3px 4px;
`

export default function Home(props) {
  const [state, setState] = useState('')

  return <div>
    <h1>Homepage</h1>
    // inspect class name, it's auto-generated - it guarantees that no class will be repeated.
    <Button onClick={() => console.log('clicked!')}>click me</Button>
    <AcceptButton/>
  </div>
}
```

## React Libraries

React has a ton of libraries: https://www.codeinwp.com/blog/react-ui-component-libraries-frameworks

**Material UI** - Popular Components Library
Read about PWA, if you use create-react-app and deploy in mobile view, you can create a cross-compiled app for your phone.