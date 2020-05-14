# Custom Hooks

- The point of a custom hook is that it has reusable logic you can use in many components
- custom hooks are a convention. React tracks 'use' functions 
- components are functions. think about what the responsibility of each component is ie:
  - Search form has state and setState for search
    - itemList maps the props passed to it by search
      - item is the render 
- when you use state inside a custom hook, it makes new state for a custom call

### Rules of Hooks

1. You can only call hooks from the top level of a function component or a custom hook
  - CANNOT be called in React class components, loops, if statements, regular functions, or event handlers
2. a custom hook MUST start with the keyword "use"
  - this is how React determines that your function is a custom hook
  - a custom hook can call other custom or built-in hooks

### Why Custom Hooks?

- DRY to keep your code modular
- separating logic

### Where?
- Hooks folder

### When? 
- Request logic 
- event logic
- reusable 

```
function App () {
  const [count, setCount] = useState(0);

  return (
    <div className=App>
      <h1>Hello World</h1>
      <h2>{count}</h2>
      <button onClick={() => setCount(count +1)}>+1</button>
      <button onClick={() => setCount(count +1)}>+1</button>
    </div>
  )
}
```

making the count useState into a custom hook

mkdir hooks > useCount.js

```
const useCount = (defaultCount) => {
  const [count, setCount] = useState(defaultCount);

  const incrementer = () => setCount(count + 1);
  const decrementer = () => setCount(count - 1);

  return {count, incrementer, decrementer};
}

export default useCount;
```

in app.js

```
import useCount from './hooks/useCount';
function App () {
  const {count, incrementer, decrementer} = useCount(0);
  // way to rename key in object destructure count: count2
  const {count: count2, incrementer: incrementer2, decrementer: decrementer2} = useCount(100);

  return (
    <div className=App>
      <h1>Hello World</h1>
      <h2>{count}</h2>
      <button onClick={incrementer}>+1</button>
      <button onClick={decrementer}>-1</button>
      <h2>{count2}</h2>
      <button onClick={incrementer2}>+1</button>
      <button onClick={decrementer2}>-1</button>
    </div>
  )
}
```

- hooks have access to React's internal lifecycle. There are a few cases where a react Component will re-render
- React.strictMode: instead of updating once, it update twice. The purpose: if you run the exact same update twice, you want to know if you see the same thing
- when you call a useState function, it tells react: you need to re-render this component if the value of useState changes
- re-render calls a function again when state or props change

## Testing Hooks

*** Lookup the dev dependencies installed (test-libraries)

hooks > \__tests__ > useMousePosition.test.js

useMousePosition.test.js (also App.test.js somewhere else...)
```
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import {fireEvent, render } from '@test-library/react';
// act import from where?
import useMousePosition from '../useMousePosition.js'
// don't have to import jest, just install
import App from '../../App';

test('it should have default values', () => {
  const { result } = renderHook(() => useMousePosition())

  expect(result.current.x).toBe(0);
  expect(result.current.y).toBe(0);
});

test('it should return current x and y mouse positions', () => {
  const { result } = renderHook(() => useMousePosition())
  const { getByText } = render(<App />);

  // need to make a synthetic mouse movement
  fireEvent(getByText(/HelloWorld/i))
  new MouseEvent('mousemove', {
    bubbles: true, // needed for synthetic 
    clientX: 200,
    clientY: 200
  })

  expect(result.current.x).toBe(200);
  expect(result.current.y).toBe(200);
})
```
### CUSTOM HOOK
useMousePosition.js
```
const useMousePosition = () => {
  const [coords, setCoords] = useState({x: 0, y: 0});

  // if you only need to add an event listener once and not update that listener on every render = useEffect with [] dependency
  useEffect(() => {
    const mouseMove = (event) => {
      // when I get a mousemovemnt, set the state to 

      const x = event.clientX;
      const y = event.clientY;
      setCoords(x, y)
    }
    document.addEventListener('mousemove', mouseMove)
    // have to unmount to stop listener when component unmounts
    return () => {
      document.removeEventListener('mousemove', mouseMove)
    }
  }, [])

  return coords;
}

export default useMousePostion;
```

***mount and unmount means: is the component on the page?***

## useMemes

```
import {useEffect, useState} form 'react';
import axios from 'axios';

const useMemes = () => {
  const [memes, setMemes] - useState([]);

  const formattedMemes = (data) => {
    return data.map((d) => {
      return {url: d.data.url, title: d.data.title, id: d.data.id}
    })
  }

  useEffect(() => {
    axios.get(`http://reddit.com/${search}`)
    .then((res) => {
      const fMemes = formattedMemes(res.data.data.children)
      setMemes(fMemes)
      })
    .catch(e => console.log('error!'))
  }, [])



}

export default useMemes;
```

```
import React from 'react';
import useMemes from '../hooks/useMemes';

const MemeList = () => {
  const {memes} = useMemes();

  return (
    <div>
    // map and render <Meme url={}/>
    </div>
  )
}
export default Memelist'
```

```
import React from 'react';

const Meme = ({url, title}) => {
  return (
    <li>
    <h3>{title}</h3>
    <img src={url}/>
    </li>
  )
}

export default Meme
```