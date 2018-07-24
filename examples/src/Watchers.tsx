import * as React from 'react';
import { render } from 'react-dom';

import { ObjectWatcher } from 'reenhance-components';


const RefWatcher = ObjectWatcher<React.RefObject<any>>(React.createRef(), 'current');

export const DivRef: React.StatelessComponent<React.Props<{}>> = () => (
  <RefWatcher
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
const CounterStateWatcher = ObjectWatcher<CounterState>({ value: 1 }, 'value');

export const Counter: React.StatelessComponent<React.Props<{}>> = () => (
  <CounterStateWatcher>
    {(counter: CounterState) => (
      <div>
        Count is {counter.value}
        <button onClick={() => counter.value = counter.value + 1}>+</button>
      </div>
    )}
  </CounterStateWatcher>
);


const InputStateWatcher = ObjectWatcher({ value: '' }, 'value');

export const InputWatcher = () => (
  <div>
    <InputStateWatcher>
      {state => (
        <div>
          Input: <input value={state.value} onChange={e => state.value = e.target.value} />
        </div>
      )}
    </InputStateWatcher>

    <InputStateWatcher>
      {state => (
        <div>
          Current: <span>{state.value}</span>
        </div>
      )}
    </InputStateWatcher>
  </div>
);

