# JS Event Loop

The JS Runtime - V8 is the runtime inside Chrome

HEAP
The heap is where memory allocation happens. 

STACK
The stack is where your stack frames are.

In the browser, there are also Web APIs like the DOM

the calback queue

and the event loop

---

JS has a single-threaded run-time
has one call stack
can do one thing at a time

### The Call Stack

The call stack is a data-structure that records where in the program we are

Step into a function - we push something onto the stack. If we return something from a function, we pop off the top of the stack

### Blocking

Blocking is basically a function that is slow. Things that are slow and on the stack are blocking.

Blocking is a problem because we are running code in browsers:

If the code blocks the call stack, the user can't click anything (and in fact the browser can't do anything - like render the first button un-clicking)

The browser would know you were clicking things, and execute after. 

Functions in the browser and node are all asynchronus so they're not blocking.

### Async

Async callbacks yield to the browser queue? 

### Concurrency
The browser is more than just runtime. 

browser Web apis are like threads. You can't access them like threads, you can just make calls to them, and those pieces of the browser are aware the concurrency kicks in.

setTimeout is handled by web api

when the web apis are done, they push your callback onto the task queue

### The Event Loop

Look at stack and task queue, if the stack is emoty it takes the first thing on the queue, and pushes it onto the stack

the stack is javascript land, in V8, so the event loop is passing handling back to js

### Loup - Visualize the JS runtime at runtime

(what is a shim?)

setTimeout is not a guarantee, it's a minimum time to run

### Callbacks

Can be any funtion that calls 

### Rendering

The Browser is constrained by what you're doing in JS
60 frames a second - every 16.6 ms

it can't actually render until the stack is clear

the render is like a callback

the render is given a higher priority than your callbacks

### Don't block the event loop 

Don't put slow code on the stack because if you do the browser can't do what it needs to do (which is manage slow code with APIs/queue/event loop) and create a fluid UI

image processing or animating too many things can get sluggish if you don't queue up that code

### Animations

Animations can get sluggish if you're not careful about how you queue up code.

We can see this with scroll handlers. Presume they trigger on every frame (every 16 ms)

So you may not block the stack, but you may flood the queue

There are ways you can debounce this - ex: lets only do this slow work every few seconds or until the user stops scrolling for some amount of time.

### Rendering Takeaway

The renderer is blocked by call stack, but the callback queue defers to the renderer. 

@24:00 is the key thing to understand about order of execution