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

## Notes on Testing:
Compass W08D01 - [Testing React](https://web.compass.lighthouselabs.ca/days/w08d1/activities/1044)

Think about ***"recipes"*** for testing. What combination of libraries, queries, and assertions do you need to test something is working the way you (and the user) expect?

The 3 phases of testing are:

1. Initialize the component that we would like to test.
2. Trigger the change that executes the unit.
3. Verify that the unit produced the expected result.

OR

1. Setup
2. Change
3. Verify

Basic tests might describe all three phases with a single line of code. More complex tests will include multiple lines to set the initial state of a test. We can also use the expect function a few times in the same test to verify more than one behaviour within a single test.

The frameworks & libraries we are using are: `jest`, `react-testing-library`, and `jest-dom-testing-library`

EXAMPLE

### `setupTests.js`
(import for every test doc, connected how? Is Jest set to listen for this?)
```
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
```

### `Button.test.js`
```
import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Button from "components/Button";

afterEach(cleanup);

it("renders its `children` prop as text", () => {
  // render the button component, deconstruct the react-testing-library object that's returned and extract the getByText method
  const { getByText } = render(<Button>Default</Button>);
  // getByText queries the button DOM node (aka access the rendered component on the DOM using the getByText method). the ability to call getByText is provided by testing-library jest-dom extend 
  // expect is a jest matcher, toBeInTheDocument is a jest-dom matcher
  expect(getByText("Default")).toBeInTheDocument();
});
```

### dom-testing-library

A query is a combination of a query variant and a query type. The query we want to use is `getByText`. The variant is `getBy` and the type is `ByText`.

[Guide to Choosing Queries](https://testing-library.com/docs/guide-which-query)

### Example Assertions 
*examples of different assertions that we can make about the nodes returned by queries*

- `expect(getByText("Default")).toHaveClass("button");`
- `expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");`
- `expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");`

In the final example above, we use a query called ByTestId. This is the equivalent to querySelector("[data-testid=student-name-input]") and it requires us to alter the JSX to include a data-testid prop. If there is no reliable way to query for a node then attaching the data-testid prop provides a good compromise. Sometimes we need to change our code to improve its testability.

### Mock Functions

[`jest.fn()`](https://jestjs.io/docs/en/mock-functions)

There are two primary uses of mocks that we will explore to learn unit and integration testing.

1. We can capture the different calls made to the function and the arguments for each call.
2. We can configure the function to return any value that we want for the specific test.

```
it("calls the function", () => {
 const fn = jest.fn();
 fn();
 expect(fn).toHaveBeenCalledTimes(1);
});
```

```
it("calls the function with specific arguments", () => {
 const fn = jest.fn();
 fn(10);
 expect(fn).toHaveBeenCalledWith(10);
});
```

```
it("uses the mock implementation (returns what we expect)", () => {
 const fn = jest.fn((a, b) => 42);
 fn(1, 2);
 expect(fn).toHaveReturnedWith(42);
});
```