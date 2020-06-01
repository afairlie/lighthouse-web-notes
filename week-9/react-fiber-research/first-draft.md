# To Understand React Fiber, You Need to Know About Threads

A brief introduction to (some) React Fiber fundamentals, and the CS concepts that it's modelled on.

### A Little Background
  
  It's important to understand that I'm approaching this topic as a total beginner. When I worked on my first React project, I felt this very strong desire to understand how React works. I think intuitively I could feel how powerful React was, but intellectually I wanted to understand WHY we need React for modern development and what powers it "under the hood". So, this article aims to make sense of that.

  I relied heavily on the following sources to write this article: 
  
  Lin Clark's [A Cartoon Intro to Fiber](https://www.youtube.com/watch?v=ZCuYPiUIONs)
  
  Philip Roberts [What The Heck Is the Event List Anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
  
  Max Koretskyi's [The how and why on React’s usage of linked list in Fiber to walk the component’s tree](https://indepth.dev/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-to-walk-the-components-tree/)
  
  Andrew Clark's [React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture?source=post_page---------------------------)
  
Understanding this article hinges on the following concepts: (Cooperative) Scheduling, Threads, and Linked Lists. I've added those and a couple other terms to an appendix, and you can refer to them when you need!

## So starting at the beginning, what is React, and what is React Fiber?

  React is a javascript library that helps developers build complex, modern UIs.

  Fiber refers to React's data structure/architecture. Fiber made it possible for React to implement a new reconciliation algorithm. It improves perceived performance for complex React applications.
  
### What?

  Ok yeah, that was a mouthful.

## What is a reconciliation algorithm?

  When we talk about reconciliation in the context of the browser, we're trying to reconcile what's currently rendered on the page, and what should/will be rendered next.

  The DOM - the Document Object Model - is a browser interface that allows programs and scripts to maniputale what's rendered on a web page. The DOM can be manipulated using vanilla JS but libraries like React aim to make manipulation easier. 

  As UIs have become more complex, rendering and the data that's required for it has been broken into smaller and smaller components. On a modern web app (say Facebook) if you click on a button, it's not likely that as a user you expect to navigate to a whole other page. It's more likely that when you click a button to like a post you expect to see the number of likes go up, or as you type a new post, you expect to see your words appear on the page.

  Rendering your words live as you type them is actually easily done without any JS at all, but the problem is that again, as the user, when you submit that post, you expect to see it on that same page along with all the other posts that were already there, plus you expect to see when someone else likes a different post, or another user posts to your timeline, etc etc, and suddenly, using the DOM to keep track of those small components and the state of their data becomes very complicated.

### So how did React make it easier to render these smaller components? 
  
  Instead of having to tell the browser HOW to get from one render to the next, React made it so developers could simply declare what they wanted the next render to look like, and React would make it so!

  To do this, React created a component tree, and when it was notified that a change needed to be rendered, React would traverse the tree telling the DOM to render specific nodes that needed to be added or updated. What's important to understand here is how React was traversing the component tree and updating the DOM before Fiber. 
  
  "React implemented a recursive algorithm that would call mount component or update component on the DOM until it got to the bottom of the tree." - Lin Clark

  Before Fiber, React didn't separate the process of reconciliation, and rendering to the DOM. As a result, the "main thread" - which schedules rendering - would get stuck at the bottom of the call stack, containing the mount and update frames from React. In other words, React was relying entirely on the browser to manage render scheduling, and it was calling the DOM to render synchronously.

  This first version of React's reconciliation algorithm was retroactively termed the 'Stack Reconciler', which illustrates how it operated. 

### What did it mean for the main thread to get stuck at the bottom of the call stack?

  It meant that if, for instance, a node needed to be changed but React hadn't completed traversing the tree from a previous call to render, then it wouldn't be able to handle that change until it had *completed* traversal of the full tree.

  The Fiber architecture was created because the recursive algorithm couldn't be interrupted. Without the option to interrupt reconciliation, a full traversal had to be done before another change could be added to the stack, effectively blocking any other (potentially higher priority) changes from being made.

## Enter Fiber. 

  The Fiber architecture can solve blocking (and a host of other problems) because when it was implemented Fiber made it possible to split reconciliation and rendering to the DOM into two separate phases. 
  
  Phase 1 is called Reconciliation/Render.
  Phase 2 is called Commit.

  Admittedly, it's a bit confusing that rendering is referred to in phase one, but let's iron that out. 
  
  In phase one, React is called to render new and/or updated components (it can also perform other types of work that I won't get into). React will schedule the work to be done (changes to be rendered) by creating a list of changes (called an effect list) that will be executed in the commit phase. React will fully compute this list of changes before the second phase is executed.

  In the second, Commit phase, React actually tells the DOM to render the effect list created in phase one.

  What's really important to understand here, is that the Reconciliation/Render phase can be interrupted, but the Commit phase cannot, and it's only in the Commit phase that React will actually render to the DOM. 
  
  Fiber makes it possible for the reconciliation algorithm to walk to component tree using a singly linked list tree traversal algorithm. (see appendix).

  ### How does Fiber help to break down reconciliation?

  Ok, now we're getting to the good stuff. 

  Basically, a Fiber is a node that represents a unit of work. A Fiber is React's version of a thread, which is "the smallest sequence of programmed instructions that can be managed independently by a scheduler." (see appendix for longer definition.)

  React creates two Fiber instances, the `current` instance, and the `workInProgress` instance. The `current` instance is built on first render, and has a one-to-one relationship with the React component tree. When a new render is called, React will start work on the new `workInProgress` instance using the reconciliation algorithm to walk the component tree and find where changes must be made. 

  React leverages the asynchronus model of "cooperative scheduling" (see appendix) in order to build the `workInProgress` tree.

  Modern browsers (like Chrome) have an API called `requestIdleCallback`, that allows web apps to schedule work when there's free time at the end of a stack frame, or when the user is inactive (React uses a polyfill when browsers don't offer this API).

  When React is called to render and start reconciliation, it checks in with the main thread to know how much time it has to do its work. React does a unit of work, then checks in with the main thread again, and repeats this process until it has completed the `workInProgress` tree.

  As I understand, Chrome's implementation of the `requestIdleCallback` API will grant as much as 50 ms to React to do it's work, but React will check in with the main thread after it's done work for each Fiber.
  
  If at some point React checks in and the main thread has new work to be done (maybe the user clicks a button), React will complete the work in the time it was originally given, but then yield to the main thread and drop the work it was doing to pick up the new work from the browser. Once it completes that new work, React will restart the work it was trying to complete before.

  In order for this to be effective, React has to set priority levels for different types of work. 

  (image of priorities)

  Here is where things become a little fuzzy for me. Concurrent React is still in the experimental phase. As I understand, the implementation of the Fiber architecture makes it possible for the React team to create features that would be build on this cooperative scheduling model like Time-Slicing and Suspense, but it's not entirely clear to me how well developed React scheduling is right now. I'd seek to answer this question next in my research. 

  ## So What did we learn?

  React Fiber is not, as I had orginally understood, the React reconciliation algorithm itself. Fiber is a single unit of the datastructure that enables more complex reconciliation algorithms such as cooperative scheduling. 

### Finally, a quick note on rendering and frames
  Apparently, the browser wants to render 60 frames per second, that's one frame every 15 ms. Prior to this article, I hadn't thought much about the pace at which the browser renders, and I hadn't thought at all of rendering in terms of frame units. This is probably something I should have already understood, but in any case, it gives me a whole other avenue area to dive into, as I begin to create more complex UIs myself.

  I welcome corrections to this article because I'm well aware my understanding is in no way complete, and probably incorrect in some cases.