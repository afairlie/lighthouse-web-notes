# Class-Based React Components

Class components must have:
1. extension
2. render
  - `this` is the instance of the entire class (including super aka React). so in `render() {this.props}` is way to 
3. export
4. constructor 
  - have to call super to retrieve functionality from parent class (React?)
  - state goes in contructor. the state should usually be object
  - also need constructor for props

- always define arrow functions in react class functions.

- in class components, all state for a single component exists in one state. 

```
// BAD
printHello() {
  console.log(' :( ')
}

// GOOD
printHello = () => {
  console.log('Hello World!')
}
```

App.js
```
import React, {component} from 'react'
import Meme from './Meme.js'

const memeObj = {
  {meme: 'url'},
  {meme: 'url'},
  {meme: 'url'}
}

class App extends Component {
  constructor() {
    super();
    this.state = {List: memeObj}
  }

  componentDidMount() {
    console.log('loaded!')
  }

  componentWillMount() {
    console.log('WILL MOUNT')
  }

  render() {
    return (
      <div className="App">
        <h1>CLASS MEMES</h1>
      </div>
    );
  }
}

export default App;
```

Meme.js
```
import React, {Component} from 'react';

export default class Meme extends Component {
  constructor(props) {
    super(props)
    this.state = {name: 'Ariane', count: 0};
  }

  render() {
      return (
          <div>
              {this.props} // without 'this', props won't be found

              // state.name will stay the same while count goes up. You don't have to manage previous state (aka instead of setState(prev => ({...prev, count + 1})) in functional React)
              <h1>{this.state.name}</h1>

              <h4>{this.state.count}</h4>

              <button onClick={() => this.setState({count: this.state.count + 1})}>UP</button>
          </div>
      )
  }

}
```

useEffect waits for other things to render. useEffect replaced lifecycle methods in class components. 

- `componentDidMount`
- `componentWillMount`
- `componentDidUpdate`
- `componentWillUnmount`

can look up conversion chart: lifecycle methods to hooks - React documentation

next iteration for functional: react concurrent mode

## useEffect

- useEffect when something re-renders, if you put a state change in useEffect, you will infinite loop.