# React Work Tags

Source: https://github.com/facebook/react/blob/340bfd9393e8173adca5380e6587e1ea1a23cefa/packages/shared/ReactWorkTags.js?source=post_page---------------------------#L29-L28

 const FunctionalComponent = 0;
 const FunctionalComponentLazy = 1;
 const ClassComponent = 2;
 const ClassComponentLazy = 3;
 const IndeterminateComponent = 4; // Before we know whether it is functional or class
 const HostRoot = 5; // Root of a host tree. Could be nested inside another node.
 const HostPortal = 6; // A subtree. Could be an entry point to a different renderer.
 const HostComponent = 7;
 const HostText = 8;
 const Fragment = 9;
 const Mode = 10;
 const ContextConsumer = 11;
 const ContextProvider = 12;
 const ForwardRef = 13;
 const ForwardRefLazy = 14;
 const Profiler = 15;
 const PlaceholderComponent = 16;