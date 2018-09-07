import * as React from 'react';
import { mount } from 'enzyme';
import { fn } from 'jest';

import { Compose } from '../Compose';
import { StateProvider, StateAndUpdater } from '../StateProvider';



describe('Parameter tests', () => {
  it('Can compose single states (string)', () => {
    const StringState = StateProvider<string>('hi');
    const wrapper = mount(
      <Compose>
        <StringState />
        {(s: StateAndUpdater<string>) => (
          <div>
            {s.state}
          </div>
        )}
      </Compose>
    );

    const div = wrapper.find('div');
    expect(div.length).toBe(1); 

    expect(div.text()).toBe('hi'); 
  });

  it('Can compose 2 states (boolean & number)', () => {
    const BooleanState = StateProvider<boolean>(true);
    const NumericState = StateProvider<number>(3);
    const wrapper = mount(
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

    const div = wrapper.find('div');
    expect(div.length).toBe(1); 

    expect(div.text()).toBe('true:3'); 
  });
});
