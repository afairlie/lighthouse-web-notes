# Interview

## Takeaways

### 1. Revisit definitions for: 
  - what is JSON?
    A text template (syntax) for request/response in various languages to file or web protocol (?)
  - order sync with async code executes, REMEMBER: ***all sync code on stack executes (must be cleared from stack) before any async code will be pushed from queue to stack.***

### 2. Ask better questions. Don't make assumptions in questions. 
  - in exercise: recreate forEach() function - I made assumption it had to mutate array it loops (which it did not). 

### 3. Explain your code incrementally:
  - forEach exercise: created the function properly, didn't write the example properly. 
    => Had I explained *how* the forEach function I wrote was working before I created my use case, I would have realized my original use case wouldn't implement callback correctly.