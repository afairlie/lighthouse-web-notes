# Component-Base UI with React

### Preamble
- React is a Library, but especially at first, you have to follow the rules and treat it more like a framework.

## How does React Work
- there's a bunch of libraries. You write functions in a particular way, and it's compiled and sent to browser in form it can understand
- what does React use under the hood? Babel, and Webpack
- Babel is a translator from modern js to 
- Webpack packages modules all together. 
- you can configure webpack to compile Vue and Angular
- Basic template: create-react-app
- you don't *need* storybook to use React, but it helps to develop in isolation. To mockup components. 
- npx -p @storybook @storybook.cli sb init (automatically configures)

## Scheduler Project Setup
- main app lives in Components folder, and app.js
- going to be running 2 commands: 
  - npm start = start your react app (runs web-pack)
  - npm run storybook
    - Stories directory holds storybook files. always end in .stories.js
    - in storybook directory, main.js refers to stories directory

### Storybook File Setup

```
import React from 'react'
import {storiesOf} from '@storybook/react';

storiesOf('TEST', module)
  .add('ttt', () => <p>test</p>)
```

- `storiesOf()` to write story
- `.add()` lets us render multiple things on a page to see how they operate
- `'TEST'` is module (?)
- `'ttt'` is object (?)

fun fact: Reddit is written in React

## React Component Example: Memeitem.js

- Rule 1: Always import React from 'react'; Babel and web-pack know to translate and compile that file
- Rule 2: make sure you have a function that is capitalized. Suggested convention: name function the same as 
- Rule 3: function must return HTML or JSX
- Rule 4: You must 'export default' the function you just made
- Rule 5: always wrap your JSX into 1 parent tag (if not done, will receive: 'parsing error: Adjacent JSX elements must be wrapped in an enclosing tag')

```
function MemeItem() {
  <div>
  <h1>Hello World</h1>
  </div>
}

export default MemeItem;
```

- .stories.js file of same name: `import MemeItem form '../Component/MemeItem';`

```
import React from 'react';
import {storiesOf} from '@storybook/react';
import MemeItem form '../Component/MemeItem';

storiesOf('TEST', module)
  .add('ttt', () => <MemeItem/>)
```
- MemeItem.js `function MemeItem()` is defining the component
- `<MemeItem/>` is invoking the component

### CSS with React
- Memeitem.css (no real naming convention, but you can name same as component .js filename)
- import to Memeitem.js (make sure to include .css on import)
- class is a React default key word, so use className for css .class styling
```
.card {
  background-color: black;
  color: white;
  margin: 2px;
}
```
## React Props

***Props is a way to pass any sort of value to your component.***

Props is an object.

`const title = 'funny meme 2020';`
`const meme = 'http://meme.com'`

`<MemeItem title={title} url={meme}>` is essentially equivalent to `memeItem(title, url)`

when `function MemeItem()` = 

```
export default function MemeItem(props) {
  const {title, url} = props;

  <div className='card'>
  <h4>{title}</h4>
  <img className='meme-img' src={url}>
  </div>
}
```

### Conditional Rendering

**Option 1:** Short Circuit Conditional (if 1 option, hierarchical)

`{props.url && <img className='' src={props.url}/>}`

**Option 2:** Ternary (if 2+ render options)

`props.title ? props.title : 'Meme is empty!'`

**Example:** conditional CSS .className

`<div className={props.title ? 'card' : 'err'}/>`

(where .card and .err are different styling.)

## Render Loop
- in react, you can define HTML as variables

```
const Memes = [
  {title: tite1, url: 'http://meme1.com'},
  {title: tite2, url: 'http://meme2.com'},
  {title: tite3, url: 'http://meme3.com'}
];

<MemeList list={Memes}/>
```

when

```
import MemeItem from './MemeItem';

export default function MemeList(props) {
  const {list} = props;
  return list.map(meme => {
    return <MemeItem title={meme.title} url={meme.url}/>;
  })
}
``` 

## Output Capture with React: `useState()`
Render change

```
export default function MemeItem(props) {
  const {title, url} = props;

  function clickMe() {
    console.log('clicked!!!')
  }

  <div className='card'>
  <h4>{title}</h4>
  <img className='meme-img' src={url}>
  // passing a reference of a function, and onClick, function executes
  <button onClick={clickMe}>CLICK ME</button>
  </div>
}
```

- values that you want to display on the screen need to be declared in specific way
- useState is a way to declare a variable, except when that variable changes, it tells react to re-render 

`const [num, changeNum] - useSate();`

returns two variable: 
num = your state
changeNum = function to change your state
useState accepts 1 param, the beginning state

***don't change state directly, you always want to make a duplicate of the state before you mutate***

```
export default function MemeItem(props) {
  const [num, changeNum] - useSate(0);

  function clickMe() {
    console.log('clicked!!!')
    changeNum(num+1)
  }

  <div className='card'>
  // state of num starts at 0, when invoke changeNum(), useState renders() item that changed
  <h1>{num}</h1>
  // passing a reference of a function, and onClick, function executes
  <button onClick={clickMe}>CLICK ME</button>
  </div>
}
```

to update a component from a different component, pass a function as a prop to the component (check this is correct)