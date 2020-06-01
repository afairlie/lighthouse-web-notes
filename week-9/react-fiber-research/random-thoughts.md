# Random Thoughts

question: does React make painting the DOM less expensive?

THE WORK LOOP - Lin Clark talk.

2 phases: reconciliation, and commit. FIBER IS A RECONCILIATION ALGORITHM that relies on requestIdleCallback (was react possible before requestIdleCallback, then? Yes I guess, cause they make a polyfill?)... actually, it relies on cooperative scheduling

What is the "main thread"? this is a browser thing?

Without understanding how it needs to work, you tell react what you want to do, react sets priorities (with fiber algorithm) and works with main thread (cooperatively).

Maybe central idea to understand is cooperative scheduling - how modern browsers and react are leveraging it? And then the next step to understand is HOW does react prioritize things?

Is fiber a 3 pointer linked list? I don't think so. I guess it's doubly linked tho? Actually, it doesn't go backwards, it always goes forewards.. mm, it does return actually. 

**"So how does React implement the algorithm to walk the tree without recursion? It uses a singly linked list tree traversal algorithm. It makes it possible to pause the traversal and stop the stack from growing."**

is useEffect passing to the browser api to handle?

Why is painting to the DOM expensive?

## Fundamental Concepts - Draft

To understand Fiber, you need to understand threads.

Have to understand:
  - Linked Lists
  - Scheduling (Cooperative), Processes, Threads
    - Specific to this, understand in web context - requestIdleCallback, and the way React Fiber and JS/DOM threads work?
    - In this case, I think I do really need to know about the event loop
  - JS Runtime - Event Loops and Frames
  - request Idle callback

The relationship between React Fiber and the DOM -> they're doing **cooperative scheduling**
  Things to learn about this: 
    - Read that article about fiber principles by Seb Mackage
    - understand more about the "main thread" (DOM)
    - there's the browser event loop (javascript - is this the "main thread"), and the react work loop (fiber ?? - really not sure about this)
    - watch that video about js event loop. DONE
    - learn more about `requestIdleCallback` and the React implementation of it

React Fiber is a reconciliation algorithm, it keeps track of the elements that need to be painted (commited?) to the DOM, but it is not those elements itself (confirm this.)
    - return to lin clarks analogy about you, react, main thread

React's reconciliation algorithm used to use the synchronus, recursive model, this could not be interrupted (why? refer to notes). V2 implementation of the reconciliation algorithm is Fiber, which is a Linked list algorithm (doubly linked?)
    - read cmu linked list
    - read wikipedia linked list

Understanding Threads and scheduling!

### Outline

Explain my background and intent for the article
  - coming from no cs degree
  - keen enthusiasm for React
  - want to understand how it works!
  - this article is heavily built on three resources: Lin Clark talk, Philip Roberts (event loop), and Max Koretskyi (fiber linked list)

So what is React, and what is React Fiber?

  - React is a javascript framework that helps developers build complex, modern UIs
  - Fiber is the V2 reconciliation algorithm for React. It improves perceived performance for complex React applications.

OK, so what is a reconciliation algorithm (and how does it improve perceived performance)?

First, we need to understand the problem reconciliation solves.

  - how the browser renders with vanilla js
  - (jquery helps to manipulate the DOM, but you stil have to tell it exactly how to do it, and store state in DOM nodes - IS THIS TRUE??)
  - the problem v1 solved was that developers could tell react what they wanted rendered next, instead of having to tell the browser HOW they wanted to get from one render to the next.
    - (how did v1 do this?) v1 was retroactively named the stack reconciler - "It recursively calls mount component or update component until it gets to the bottom of the tree... The main thread gets stuck at the bottom of this call stack."
    - I don't understand exactly how it worked, but I think React was still defering to the DOM for scheduling. So it would go down the tree recursively and say: oh, this is different, DOM: update it!, and this is different, DOM: update it!, etc.
  - v2 solves a very different problem than v1: janky rendering and blocking.
  - (the revelation of v2 is that the reconciliation algorithm can be useful in more contexts than just the browser. )
  - v2 is an abstraction that separates the original process into two phases: reconciliation/render - keeping track of WHAT needs to be rendered/updated, and commit - telling whatever renderer (in our case the DOM) how to do it. In React
  - CHECK THIS: it's a bit confusing that reconciliation/render are used interchangeably. But what you need to understand is that there's the render method in react, that triggers reconciliation, but it's the reconciliation process that will decide when a commit is made, and commits are when things are actually rendered to the DOM (IS THIS TRUE??)

One of the challenges in writing this article
  - understanding Frames and render
  - 60 frames per second. 1 frame every 15 ms. (?)
  - as a new developer, thinking about these concepts is shifting the way I think about UIs
  (it's very interesting that these are terms I would associate with video games. UX has these kind of entertainment concerns - but that's a whole other article)
  - you can also flood the async queue, and although React can't really stop you from doing that (like if you add too many triggers on a listener that runs all the time) - Fiber does manage priorities so it might be able to .. MM I dunno if any of this is true. WHERE DOES FIBER schedule cooperatively WITH THE DOM?

ANYWAY, HOW does Fiber improve perceived performance? Basically: how does Fiber work?
  - the Fiber reconciliation algorithm leverages the singly-linked-list datastructure model. It uses it to traverse 
  - A FIBER, is a plain JS object - it has a one-to-one relationship with a DOM instance
  - it knows how to work with the browser, and set priorities accordingly (specific to the browser - maybe on cell priorities have to be ordered differently depending how cells render, but you still have to traverse and schedule, you just might schedule with different priorities?)