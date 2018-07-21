import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { fn } from 'jest';

import { AsyncResolver } from '../AsyncResolver';


describe('Simple bootstrap tests', () => {
  it('can be created', () => {
    const ObjectResolver = AsyncResolver<object>('subject', {});
    expect(ObjectResolver).not.toEqual(null);
  });
});

describe('Initial props tests', () => {
  it('calls subject exactly once', () => {
    const ObjectResolver = AsyncResolver<object>('subject', {});

    const mockResolved = jest.fn();
    const wrapper = shallow(<ObjectResolver subject={() => new Promise(mockResolved)} />);
    expect(mockResolved.mock.calls.length).toBe(1);

    wrapper.setProps({ foo: 'bar' });
    expect(mockResolved.mock.calls.length).toBe(1);
  });

  it('calls subject everytime subject is changed', () => {
    const ObjectResolver = AsyncResolver<object>('subject', {});

    const mockResolved1 = jest.fn();
    const wrapper = shallow(<ObjectResolver subject={() => new Promise(mockResolved1)} />);
    expect(mockResolved1.mock.calls.length).toBe(1);

    const mockResolved2 = jest.fn();
    wrapper.setProps({ subject: () => new Promise(mockResolved2) });
    expect(mockResolved2.mock.calls.length).toBe(1);
  });
});

describe('Tests with dummy children', () => {
  it('can resolve subject and pass result to children', async () => {
    const ObjectResolver = AsyncResolver<object>('subject', { value: 3 });

    let wrapper = mount(
      <ObjectResolver subject={() => new Promise(resolve => resolve({ value: 4 }))}>
        {({ value }) => <span>{value}</span>}
      </ObjectResolver>,
    );

    await new Promise(resolve => setTimeout(resolve, 10));
    wrapper = wrapper.update();

    const span = wrapper.find('span');
    expect(span.length).toBe(1); 
    expect(span.text()).toBe('4'); 
  });
});
