## React Documentation - Reconciliation

Source: [React Documentation](https://reactjs.org/docs/reconciliation.html)

### The Diffing Algorithm

- "when diffing two trees, React first *compares the two root elements*"
- "Going from `<a>` to `<img>`, or from `<Article>` to `<Comment>`, or from `<Button>` to `<div>` - any of those will lead to a full rebuild."

Any components below the root will also get unmounted and have their state destroyed. For example, when diffing:

```
<div>
  <Counter />
</div>

<span>
  <Counter />
</span>
```

This will destroy the old Counter and remount a new one.


### Recursing On Children

React will match the two `<li>first</li>` trees, match the two `<li>second</li>` trees, and then insert the `<li>third</li>` tree.
If you implement it naively, inserting an element at the beginning has worse performance. For example, converting between these two trees works poorly:

```
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```
React will mutate every child instead of realizing it can keep the `<li>Duke</li>` and `<li>Villanova</li>` subtrees intact. This inefficiency can be a problem.

***keys solve this problem.***

- The key only has to be unique among its siblings, not globally unique.

### See [Tradeoffs](https://reactjs.org/docs/reconciliation.html#tradeoffs) documentation re heuristics and current implementation

-  "In the current implementation, you can express the fact that a subtree has been moved amongst its siblings, but you cannot tell that it has moved somewhere else. The algorithm will rerender that full subtree."