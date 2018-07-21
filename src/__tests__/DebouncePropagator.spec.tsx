import * as React from 'react';
import { mount } from 'enzyme';

import { DebouncePropagator } from '../DebouncePropagator';


describe('Simple bootstrap tests', () => {
  it('can be created', () => {
    const ObjectPropagator = DebouncePropagator<object>({});
    expect(ObjectPropagator).not.toEqual(null);
  });
});

describe('Tests with dummy children', () => {
  it('can pass initial value', () => {
    const ValuePropagator = DebouncePropagator<object>({ value: 3 });

    let wrapper = mount(
      <ValuePropagator time={1} value={4}>
        {({ value }) => <span>{value}</span>}
      </ValuePropagator>,
    );

    wrapper = wrapper.update();

    const span = wrapper.find('span');
    expect(span.length).toBe(1); 
    expect(span.text()).toBe('3'); 
  });

  it('can pass new value after debounce time', async () => {
    const ValuePropagator = DebouncePropagator<object>({ value: 3 });

    let wrapper = mount(
      <ValuePropagator time={1} value={4}>
        {({ value }) => <span>{value}</span>}
      </ValuePropagator>,
    );

    await new Promise(resolve => setTimeout(resolve, 10));
    wrapper = wrapper.update();

    const span = wrapper.find('span');
    expect(span.length).toBe(1); 
    expect(span.text()).toBe('4'); 
  });
});
