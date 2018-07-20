import * as React from 'react';
import { render } from 'react-dom';

import { ObjectWatcher } from 'reenhance-components';


const RefWatcher = ObjectWatcher<React.RefObject<any>>(React.createRef());

export const DivRef: React.StatelessComponent<React.Props<{}>> = () => (
  <RefWatcher
    watch="current"
    onChange={(newValue: any, oldValue: any) => console.log('yay! ' + oldValue + ' -> ' + newValue)}
  >
    {(divRef: any) => (
      <div ref={divRef}>Hello ref.{divRef.current ? divRef.current.toString() : null}</div>
    )}
  </RefWatcher>
);


interface CounterState {
  value: number;
}
const CounterStateWatcher = ObjectWatcher<CounterState>({ value: 1 });

export const Counter: React.StatelessComponent<React.Props<{}>> = () => (
  <CounterStateWatcher watch="value">
    {(counter: CounterState) => (
      <div>
        Count is {counter.value}
        <button onClick={() => counter.value = counter.value + 1}>+</button>
      </div>
    )}
  </CounterStateWatcher>
);


const InputStateWatcher = ObjectWatcher({ value: '' });

export const InputWatcher = () => (
  <div>
    <InputStateWatcher watch="value">
      {(state) => (
        <div>
          Input: <input value={state.value} onChange={(e) => state.value = e.target.value} />
        </div>
      )}
    </InputStateWatcher>

    <InputStateWatcher watch="value">
      {(state) => (
        <div>
          Current: <span>{state.value}</span>
        </div>
      )}
    </InputStateWatcher>
  </div>
);

