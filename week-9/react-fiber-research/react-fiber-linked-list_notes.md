## Notes On: *React's Usage of Linked List in Fiber to Walk Component Tree*

Source (Oct. 2018): [In-Depth Dev](https://indepth.dev/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-to-walk-the-components-tree/)


- "the mechanism of change detection is often referred to as reconciliation or rendering, and Fiber is its newest implementation"
- fiber has two major phases: reconciliation/render and commit.
- reconciliation/render is when React walks the tree of components

Is this in order or just a random list of stuff fiber algorithm does??
    - updates state and props,
    - calls lifecycle hooks,
    - retrieves the children from the component,
    - compares them to the previous children,
    - and figures out the DOM updates that need to be performed.
The type of work that needs to be done depends on the react element... (aka class or function) and also react's fiber algorithm doesn't only work for the DOM. 


- Concurrent React: *Time-slicing* and *Suspense*
- concurrent react is non-blocking
  
  Refer to: https://twitter.com/acdlite/status/1056612147432574976?source=post_page---------------------------
  
  Talk: https://www.youtube.com/watch?v=ByBPyMBTzM0 

features include: 
  - non-blocking rendering
  - applying updates based on the priority
  - pre-rendering content in the background
(how are these all implemented?)

### The Problem Fiber Solves

- "When dealing with UIs, the problem is that if too much work is executed all at once, it can cause animations to drop frames…"
  NEED TO UNDERSTAND FRAMES MORE

- "if React is going to walk the entire tree of components synchronously and perform work for each component, it may run over 16 ms available for an application code to execute its logic. And this will cause frames to drop causing stuttering visual effects."

- So, React borrowed an implementation from newer browsers: `requestIdleCallback` "used to queue a function to be called during a browser's idle periods." 

```
requestIdleCallback((deadline)=>{
    console.log(deadline.timeRemaining(), deadline.didTimeout)
});
```
"If I now open the console and execute the code above, Chrome logs `49.9 false`. It basically tells me that I have 49.9 ms to do whatever work I need to do and I haven’t yet used up all allotted time, otherwise the `deadline.didTimeout` would be `true`."

THIS PART IS IMPORTANT:
**in order to leverage `requestIdleCallback` React had to break work into incremental units**
=> "from the synchronous recursive model that relied on the built-in stack to an asynchronous model with linked list and pointers."

"Fiber is re-implementation of the stack, specialized for React components. You can think of a single fiber as a virtual stack frame."
  WHAT DOES THIS MEAN?

### React V1 Reconciliation: Synchronus, Recursive Traversal

with this [Tree](/docs/example-tree.png)

order of execution would be: `a1, b1, b2, c1, d1, d2, b3, c2`

"A recursive approach is intuitive and well-suited for walking the trees. But as we discovered, it has limitations. The biggest one is that we can’t break the work into incremental units. We can’t pause the work at a particular component and resume it later."

Question: Why can't it be interrupted?
You can't interrupt a recursive algorithm because the algorithm literally doesn't know where it is in the structure (I think?)

```
walk(a1);

function walk(instance) {
    doWork(instance);
    const children = instance.render();
    children.forEach(walk);
}

function doWork(o) {
    console.log(o.name);
}
```

### Linked-List Traversal

The linked list keeps track of: 

child — reference to the first child
sibling — reference to the first sibling
return — reference to the parent

Fiber is the representation of a React Element that keeps a queue of work to do. 

Fiber Node

```
class Node {
    constructor(instance) {
        this.instance = instance;
        this.child = null;
        this.sibling = null;
        this.return = null;
    }
}
```

The Traversal Algorithm
(parent first, depth-first implementation)

```
function walk(o) {
    let root = o;
    let current = o;

    while (true) {
        // perform work for a node, retrieve & link the children
        let child = doWork(current);

        // if there's a child, set it as the current active node
        if (child) {
            current = child;
            continue;
        }

        // if we've returned to the top, exit the function
        if (current === root) {
            return;
        }

        // keep going up until we find the sibling
        while (!current.sibling) {

            // if we've returned to the top, exit the function
            if (!current.return || current.return === root) {
                return;
            }

            // set the parent as the current active node
            current = current.return;
        }

        // if found, set the sibling as the current active node
        current = current.sibling;
    }
}
```