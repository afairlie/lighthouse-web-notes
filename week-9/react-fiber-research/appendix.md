# Appendix

### Scheduling
In computing, scheduling is the method by which work is assigned to resources that complete the work. The work may be virtual computation elements such as threads, processes or data flows, which are in turn scheduled onto hardware resources such as processors, network links or expansion cards.

A scheduler is what carries out the scheduling activity. Schedulers are often implemented so they keep all computer resources busy (as in load balancing), allow multiple users to share system resources effectively, or to achieve a target quality of service. Scheduling is fundamental to computation itself, and an intrinsic part of the execution model of a computer system; the concept of scheduling makes it possible to have computer multitasking with a single central processing unit (CPU).
  Terms: workers, threads, single or multi-threads
  Source: [Wikipedia](https://en.wikipedia.org/wiki/Scheduling_(computing))

### Threads
In computer science, a thread of execution is the smallest sequence of programmed instructions that can be managed independently by a scheduler, which is typically a part of the operating system. The implementation of threads and processes differs between operating systems, but in most cases a thread is a component of a process. Multiple threads can exist within one process, executing concurrently and sharing resources such as memory, while different processes do not share these resources. In particular, the threads of a process share its executable code and the values of its dynamically allocated variables and non-thread-local global variables at any given time.

  Source: [Wikipedia](https://en.wikipedia.org/wiki/Thread_(computing))
  See Also: [Specific to React - Fiber Principles](https://github.com/facebook/react/issues/7942?source=post_page---------------------------)

What is Heap vs Stack? Heap is memory, stack is function frames

### Cooperative Scheduling
Cooperative multitasking, also known as non-preemptive multitasking, is a style of computer multitasking in which the operating system never initiates a context switch from a running process to another process. Instead, **processes voluntarily yield control *periodically* or when idle or logically blocked in order to enable multiple applications to be run concurrently.** 

This type of multitasking is called "cooperative" because *all programs must cooperate for the entire scheduling scheme to work.* In this scheme, the process scheduler of an operating system is known as a cooperative scheduler, having its role reduced down to starting the processes and letting them return control back to it voluntarily.
    
  Source: [Wikipedia](https://en.wikipedia.org/wiki/Cooperative_multitasking)
    
  Another Source: https://www.rapitasystems.com/blog/cooperative-and-preemptive-scheduling-algorithms


### Linked Lists
A linked list is a linear data structure where each element is a separate object.

Source: https://www.cs.cmu.edu/~adamchik/15-121/lectures/Linked%20Lists/linked%20lists.html

### `requestIdleCallback`

If you append elements to the DOM while the user happens to be tapping on a button, your web app can become unresponsive, resulting in a poor user experience. In the same way that requestAnimationFrame allowed apps to schedule animations properly and maximize the chances of hitting 60fps, requestIdleCallback will schedule work when there is free time at the end of a frame, or when the user is inactive. This means that there’s an opportunity to do your work without getting in the user’s way.

Source: https://developers.google.com/web/updates/2015/08/using-requestidlecallback?source=post_page---------------------------

