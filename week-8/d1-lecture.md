# Unit & Integration Testing

### Preamble
- Testing is making sure that something works
- Is storybook testing? Storybook is scaffolding and building of the app. If you wanted to start testing, you would scaffold the components with storybook. It's an aid to testing
- Types of testing: 
  - static test
  - unit test
  - integration testing
  - end to end
- Typescript: is for static testing. It can force types. ie: if let bob = 5 (initialized as int), it will throw an error if you later declare bob = 'five'
  - typescript is ***strongly typed***
  - vscode is built using typescript

## Example: Building Rock Paper Scissors App

### Writing Tests

- Either 1. Write test and code, 2. code and write test
- writing tests first helps to define what you want your app and functions to do.
- Jest is included in create-react-app package. Jest works with React, Angular, Vue, and others (agnostic)

### Example: Writing First Tests

helperts.test.js
```
// import helper functions

test('Computer picks perfect opposite', () => {
  const treeOpposite = punishingPlayerForBeingLucky('🌴')
  const moaiOpposite = punishingPlayerForBeingLucky('🗿')
  const axeOpposite = punishingPlayerForBeingLucky('🗡')

  expect(treeOpposite).toBe('🗡')
  expect(moaiOpposite).toBe('🌴')
  expect(axeOpposite).toBe('🗿')
})

test('Will return one item based on a number between 1 & 3', () => {
  const tree = punishingPlayerForBeingLucky('🌴')
  const moai = punishingPlayerForBeingLucky('🗿')
  const axe = punishingPlayerForBeingLucky('🗡')

  expect(tree).toBe('🌴')
  expect(moai).toBe('🗿')
  expect(axe).toBe('🗡')
})
```
### To Check Coverage
- `npm run test -- --coverage`
- the reason to check coverage is to make sure our tests our meaningful

### Writing Tests for React
- [**Testing Library**](https://testing-library.com/)
  - has libraries for specific frameworks ie: react

App.test.js
```
import App from './App'
import React from 'react'
// install testing library in project
import {render, fireEvent} from '@testing-library/react'
import '@testing-libary/jest-dom/extend-expect'

// testing a feature:
test('Change the cheating state when the robot is being clicked', () => {
  // if console.log(render(<App />)) shows testing api
  // when we render we can't access state
  const {getByText} = render(<App />)
  const robot = getByText('🤖')

  fireEvent.click(robot)
  expect(robot).toHaveClass('cheating')

  fireEvent.click(robot)
  expect(robot).not.toHaveClass('cheating')
})

test('If player plays against the cheating robot, they will lose', () => {
  // click on the robot to activate cheating
  // click on a choice
  // confirm robot won

  const {getByText, getByTestId} = render(<App />)
  const robot = getByText('🤖')
  fireEvent.click(robot)

  fireEvent.click(getByText('🌴'))

  exepect(getByTestId('result'))
  // getByText is returning true, don't have to 'expect' true
  getByText('Computer won')
  // punishingPlayer will run, and validate result will run
  
})

```

- a state is the only way to toggle class on robot
- we are testing the painted DOM, not the React virtual DOM
- testId is an id assigned by Testing Library for testing (html attribute) 

App.js
```
function App() {
  const [cheating, setCheating] = useState(false)
  const [playerChoice, setPlayerChoice] = useState(null)
  const [result, setResult] = usesState(null)

  useEffect(() => {
    if(playerChoice){
      let computerResult;
      if (cheating){
        computerResult = punishingPlayerForBeingLucky(playerChoice)
      } else {
        computerResult = choooseItemRandomlyIGuess(Math.floor(Math.random() + 2))
      }
      setResult(validateREsult(playerChoice, computerResult))
    }
  }, [playerChoice])

  return (
    <div className='App'>
      <h1>Welcome to Moai vs Axe vs Tree</h1>
      <section className='game'>
        <span 
        onClick={event => setCheating(!cheating)}
        className={cheating ? 'cheating' : undefined}
        >🤖</span>
        <span>🤦‍♀️</span>
      </section>
      <section>
      <button onClick={() => setPlayerChoice('🌴')}>🌴</button>
      <button onClick={() => setPlayerChoice('🗡')}>🗡</button>
      <button onClick={() => setPlayerChoice('🗿')}>🗿</button>
      </section>
      {result && 
        <section data-testid='result'>
          {result === 'Won' && <h2>Human won, for now.</h2>}
          {result === 'Lost' && <h2>Computer won</h2>}
          {result === 'Tied' && <h2>They tied</h2>}
        </section>
      }
    </div>
  )
}
```

### Mocking

`import axiosMock from 'axios'`

```
axiosMock.get.mockResolvedValueONce({
  data: {greeting: 'hello there'}
})
```