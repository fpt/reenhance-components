reenhance-components
============

[![CircleCI](https://circleci.com/gh/fpt/reenhance-components/tree/master.svg?style=shield)](https://circleci.com/gh/fpt/reenhance-components/tree/master)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

A collection of React components which provide various functionality to child components in JSX/TSX.
By using Render Props pattern, those components can be adopted declaratively just by surrounding children.

Works well when you create component which have some local states (e.g. radio group, toggle show/hide) or needs to show contents from APIs without propagating to global state (e.g. suggest, preview).

## Installation and Usage

### ES6/TS via npm

```sh
npm install reenhance-components
```

### CDN

For CDN, you can use [unpkg](https://unpkg.com/):
https://unpkg.com/reenhance-components/umd/index.min.js

The global namespace is `ReenhanceComponents`:

```js
const { StateProvider, AsyncResolver, DebouncePropagator, ObjectHolder } = ReenhanceComponents;
```

## Documentation

Each components must be instantiated with initial parameters before using them in JSX/TSX.

### AsyncResolver

Resolves async function and passes its result to children as props.

#### Parameters

| Property | Type | Required | Description |
|:---|:---|:---|:---|
| distinctKey | string | N | Name of prop to detect changes. Subject function is evaluated everytime value of the prop is changed. The default is 'subject'. |
| initialProps | object | N | Initial props for children |

#### Props

| Property | Type | Required | Description |
|:---|:---|:---|:---|
| subject | Function | Y | An async function which returns promise to resolve |
| (other props) | any | N | Arguments of subject |

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

const AlbumsAsyncResolver = AsyncResolver('query', { resultCount: 0, results: [] });

const Albums = ({ query }) => (
  <AlbumsAsyncResolver subject={asyncFetch} query={query} >
    {(props) => (
      ...
    )}
  </AlbumsAsyncResolver>
);
```

### StateProvider

Provides local state and updater to children as its props.

#### Parameters

| Property | Type | Required | Description |
|:---|:---|:---|:---|
| initialState | any | Y | Initial state |

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

### DebouncePropagator

Debounces props propagation for given milliseconds.

See [Debounce of ReactiveX docs](http://reactivex.io/documentation/operators/debounce.html) for more details.

#### Parameters

| Property | Type | Required | Description |
|:---|:---|:---|:---|
| initialProps | object | Y | Initial props for children |

#### Props

| Property | Type | Required | Description |
|:---|:---|:---|:---|
| time | number | Y | Debounce time in milliseconds |
| (other props) | any | N | Properties to propagete to children |

#### Arguments of children

| Property | Type | Description |
|:---|:---|:---|
| props | object | Resolved object from result of subject |

#### Example

```js
const SuggestDebounce = DebouncePropagator({ status: 'loading' });

const Suggest = ({ query }) => (
  <SuggestDebounce time={'200'} query={query}>
    {({ query, status }) => ( // Propagation of 'query' is debounced in 200ms
      ...
    )}
  </SuggestDebounce>
);
```

### ObjectWatcher

Watches a property of an object and passes the latest value as an argument to children.

#### Parameters

| Property | Type | Required | Description |
|:---|:---|:---|:---|
| targetObject | object | Y | Immutable object to watch its property change |

#### Props

| Property | Type | Required | Description |
|:---|:---|:---|:---|
| watch | string | string[] | Y | Name(s) of property to watch |
| onChange | function | N | Called when the value of watching props is changed. Call signature is (newValue: any, oldValue: any, propName: string) => void |

#### Arguments of children

| Property | Type | Description |
|:---|:---|:---|
| (any) | object | Proxied targetObject  |

#### Example

```js
const RefWatcher = ObjectWatcher(React.createRef());

const DivRef = () => (
  <RefWatcher watch="current">
    {divRef => (
      <div ref={divRef}>Hello ref.{divRef.current ? divRef.current.toString() : null}</div>
    )}
  </RefWatcher>
);
```

### Compose (beta)

Composes multiple Components which have Render Props as their child.

#### Props

| Property | Type | Required | Description |
|:---|:---|:---|:---|
| children[i] | Component | Y | A component which have Render Props as their child. |
| children[n - 1] | Component | Y | A render function which receives all props from preceding components |

#### Example

```js
const BooleanState = StateProvider<boolean>(true);
const NumericState = StateProvider<number>(3);

const MultiStateDiv = () => (
  <Compose>
    <BooleanState />
    <NumericState />
    {(b: StateAndUpdater<boolean>, n: StateAndUpdater<number>) => (
      <div>
        {b.state.toString()}:{n.state}
      </div>
    )}
  </Compose>
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
- Q: Why `StateProvider` passes the state as a property of object? It's confusing.  
A: One reason is for renaming. Another reason is `state` and `setState` are inseparatable in `StateProvider`. Try `ObjectWatcher` if you really don't want to use `setState`.
- Q: Why don't you make `AjaxResolver`? It will be convenient.
A: Requesting Ajax causes dependency to other APIs like `fetch`, `fetchJsonp`, `Axios`, etc. This module is intended to solve only common part of problems.

## For contributors

This project aims these characteristics.

* declarative
* separation of view and logic
* can coexist with other modules
* works well with TypeScript
