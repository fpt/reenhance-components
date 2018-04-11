reenhance-components
============

A collection of React components which enhance children by providing Async/State functionality in JSX/TSX.

Works well when you create a component which has some local states (e.g. radio group, toggle show/hide) or needs to show contents from API without propagating to global state (e.g. suggest, preview).

---

## What is this?

This module provides components which can ennhance their children into stateful, data-feeded components.

They are neither HoCs or interactive components but components based on 'Function as a child component' pattern to enhance their children by encapsulating them on JSX/TSX.

## Documentation

Each components must be instantiated with initial props/state beforehand.

### AsyncResolver

#### Props

| Property | Type | Description |
|:---|:---|:---|
| subject | Function | An async function which returns promise to resolve |
| (other props) | any | Arguments to subject |

#### Arguments of children

| Property | Type | Description |
|:---|:---|:---|
| props | object | Resolved object from result of subject |

#### Example

```js
const asyncFetch =
  ({ query }) =>
    fetch(queryToUrl(query))
      .then(res => res.json())
      .catch(err => ({ error: err.toString() }));

const AlbumsAsyncResolver = AsyncResolver({ resultCount: 0, results: [] });

const Albums = ({ query }) => (
  <AlbumsAsyncResolver subject={asyncFetch} query={query} >
    {(props) => (
      ...
    )}
  </AlbumsAsyncResolver>
);
```

### StateProvider

#### Props

nothing

#### Arguments of children

| Property | Type | Description |
|:---|:---|:---|
| state | object | Current state object |
| setState | Function | An updater for state. Takes new state as its argument |

#### Example

```js
const ToggleState = StateProvider(false);

const Toggle = () => (
  <ToggleState>
    {({ state, setState }) => (
      ...
    )}
  </ToggleState>
);
```

## FAQ

- Q: Is this an alternative to Redux?  
A: No. This module doesn't provide global state or flow pattern.
- Q: Should I use this instead of Redux?  
A: It depends. If the state or API response is local and per-instance, probably this module fits well.
- Q: Is this better than HoCs?  
A: Not sure. I think they are almost same. 😉
- Q: Can I rename arguments, 'state' and 'setState' of StateProvider?  
A: Rename them in destructuring like `({ state: isOpen, setState: setIsOpen })`.

## For contributors

This project aims these characteristics.

* declarative
* separation of view and logic
* can coexist with other modules
* works well with TypeScript
