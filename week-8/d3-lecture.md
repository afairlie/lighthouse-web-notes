# End-to-End Testing with Cypress

## Testing Moai vs Axe vs Tree, End-to-End

### Create a set of steps to test:

Visit/
Activate the robot
  click on the robot icon
verify that the robot color changes
  (will have class cheating, filter: saturate)
we want to click a button
  click on the axe button
show the result
  we lost, because computer is cheating

// (TDD) - process our app is not yet handling
Hide the buttons
  because game is over
Shows a restart button
  to restart the game

want to know not only that the html, but the visual sequence is working.

## Cypress

`npm install cypress`

add the script to package.json

`"cypress": "cypress open -P"`

add `cypress.json` to the project with 

```
host,
viewport width,
viewport height
```

- difference between cypress and jest: jest flow: render and test render, cypress: actually testing as a client via server.

**cypress > integration > gameSequenceWithCheating.js**
```
describe('Plays the game three times, should always lose since computer is cheating', () => {
  beforeEach(() => {
    cy.visit('/')

    cy
    .get('.game span')
    .first()
    .click()

    // alt syntax
    cy.get('.game span:first-of-type').click()
  })

  it('will give the win to the computer when we pick the axe', () => {
    cy
    .get('.game span')
    .first()
    .should('have.class', 'cheating')

    cy
    .get('.choices button')
    .eq(1)
    .click()

    cy.get('.result h2').should('have.text', 'Computer won')

  })

})
```

the should() syntax is really weird...
cypress by default some things may be async, it waits to see if it disappears

`type({enter})` - curly braces for special keys

relative vs absolute paths for visit: you can call `visit('/home')` (relative) or `visit('https://localhost:8000/home')` (absolute) - it knows if /home to run relative, but if you use https: it will run absolute

normally you have a dev version, staging version (should not crash, almost production), public verion

cypress documentation on API section of website
you can run or open cypress. Open is to view in browser, run is to see tests in console. CI is for continuous integration