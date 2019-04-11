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

describe('Tests with dummy children', () => {
  it('calls subject exactly once', () => {
    const ObjectResolver = AsyncResolver<object>('subject', {});

    const mockResolved = jest.fn();
    let wrapper = mount(
      <ObjectResolver subject={() => new Promise(mockResolved)}>
        {({ value }) => <span>{value}</span>}
      </ObjectResolver>,
    );

    wrapper = wrapper.update();
    expect(mockResolved.mock.calls.length).toBe(1);

    wrapper.setProps({ foo: 'bar' });
    expect(mockResolved.mock.calls.length).toBe(1);
  });

  it('calls subject everytime subject is changed', () => {
    const ObjectResolver = AsyncResolver<object>('subject', {});

    const mockResolved1 = jest.fn();
    let wrapper = mount(
      <ObjectResolver subject={() => new Promise(mockResolved1)}>
        {({ value }) => <span>{value}</span>}
      </ObjectResolver>,
    );

    wrapper = wrapper.update();
    expect(mockResolved1.mock.calls.length).toBe(1);

    const mockResolved2 = jest.fn();
    wrapper.setProps({ subject: () => new Promise(mockResolved2) });
    expect(mockResolved2.mock.calls.length).toBe(1);
  });

  it('pass initial value to children', () => {
    const ObjectResolver = AsyncResolver<object>('subject', { value: 3 });

    let wrapper = mount(
      <ObjectResolver subject={() => new Promise(resolve => setTimeout(() => resolve({ value: 4 }), 0))}>
        {({ value }) => <span>{value}</span>}
      </ObjectResolver>,
    );

    wrapper = wrapper.update();

    const span = wrapper.find('span');
    expect(span.length).toBe(1);
    expect(span.text()).toBe('3');
  });

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

  it('can pass parameter to subject', async () => {
    const ObjectResolver = AsyncResolver<object>('add', { value: 3 });

    let wrapper = mount(
      <ObjectResolver subject={({ add }) => new Promise(resolve => resolve({ value: 4 + add }))} add={5}>
        {({ value }) => <span>{value}</span>}
      </ObjectResolver>,
    );

    await new Promise(resolve => setTimeout(resolve, 10));
    wrapper = wrapper.update();

    let span = wrapper.find('span');
    expect(span.length).toBe(1);
    expect(span.text()).toBe('9');

    wrapper.setProps({ add: 7 });
    await new Promise(resolve => setTimeout(resolve, 10));
    wrapper = wrapper.update();

    span = wrapper.find('span');
    expect(span.length).toBe(1);
    expect(span.text()).toBe('11');
  });
});
