# Immutable Update Patterns

### Preamble
- React Employs Unidirectional Data Flow
- Explicit Mutations: you have to call a function to change a state, and it will trigger re-render
- React is a Javascript-First Paradigm

## Example: Building To-Do List

- ***In React, state is the single source of truth.*** State = state of Data (ex. what items are in to-do list)
- useState is a **hook**, built into React
  - you can define your own hooks
  - `const [currentStateVar, setStateFunction] = useState()`;
  - currentStateVar could be any datatype ie: bool, arr, arr (of objs), etc.
  - setStateFunction will mutate the state. convention is to call it setVarName
  - put unique identifier key in outer most element. Parent list component should assign key=id to child component via props. Don't need to (or shouldn't) explicitly declare ID in child component.
- A form is ***controlled input*** 
  - When you have ex: a form in React, you have to 
  1. useState: `const [text, setText] = useState('')`
  2. event handler `<input {...props/attr} value=(text) onChange=(event => setText(event.target.value)/>`
  3.
  ```
  const handleSubmit => {
    event.preventDefault(); 
    // create new <ToDoItem>
    // setToDo(<ToDoItem>, ...ToDos)
    }
  ```
- push is a mutable function: it will change the state of the array it pushes to. Other examples: push, pop, anything that modifies original structure. PUSH WON't TRIGGER RE-RENDER of COMPONENT

## Immutability

- strings are immutable
- arrays are mutable
- any method or function that doesn't modify array is immutable: <b>slice, concat, map, filter create new arrays</b>
- React shallowCompare when deciding if it should re-render a component
- you always have to pass in a new copy of variable to useState (or any hook that triggers render) because React is comparing by reference - shallow compare (it asks: is the new variable referencing the same variable as before (I think?)). React does not deep compare (which would ask: is each value of a variable exactly the same?)
- so it does matter what you pass back in your copy, because React will re-render whatever you pass back, if it does not reference what was already in state

Benefits of immutable data structure:
- more predictable
- state changes can be compared
- mutable introduces a lot of bugs that are harder to track down
- ***immutable data structure is a concept of functional programming.***

## Unidirectional Data Flow
- to update the state of a parent in a child, you pass a function from parent down to child through props. It's like a callback.