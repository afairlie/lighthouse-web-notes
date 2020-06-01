# Intro to Fiber - Lin Clark

### What does Fiber do?

It improves perceived performance for complex React applications

### What is Fiber?

Fiber is the new reconciliation algorithm for React

when React first came out, the killer feature was the virtual DOM. Instead of telling the browser HOW to go from the previous version of your app to the next version, you could just tell React what the next version should look like.

This was also useful for harware, vr, and native apps

Renderers are pluggable, but there's only one core reconciliation algorithm. 

### What makes the reconciler fluid?

There are high and low priority updates. A high priority update is ex: when you're typing. Low priority is things coming in on the server, ex: liking a post

### Building a Website Analogy

Need to make react updates and css animations, browser re-sizes work better together. 

Your code is the project lead. It only has one worker to build the website, the main thread. It does DOM, JS, Layout. As long as it spends time doing JS, it can't do layout. 

***React knows how to work better with the main thread.*** 

It knows exactly how the main thread works, and it can make the main thread more efficient by minimizing and batching DOM changes. 

React teaches the technical lead (Fiber) some basic project management skills, like how to split up work, and prioritize work. It also gives the technical lead a watch so it can see how much time has passed.

### How did this change how the reconciler works?

Elements are what your components hands off during render (or setState?) to tell React what it should build

React creates instances as a way of managing what the previous state was, what the next state is, and what changes it needs to make

the dom nodes are what React uses to tell the browser what it needs to do

### The Stack Reconciler

It recursively calls mount component or update component until it gets to the bottom of the tree. 

The main thread gets stuck at the bottom of this call stack.

Fiber makes it possible for the main thread to compute a small part of the tree, and then come back up to see if it has other work to do. It keeps track of where it is in the tree is through a data-structure called a fiber. 

The Stack Reconciler (retroactively named) - used the stack to keep track of where it was in the tree?

### Fiber Reconciler

Fiber is just a plain JS object. It has a one-to-one relationship with an instance. Fiber is a single linked list node. 

The first Fiber in the tree is the HostRoot - it's the container that you inject your React component into

