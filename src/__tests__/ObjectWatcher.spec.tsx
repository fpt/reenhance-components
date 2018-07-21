import * as React from 'react';
import { mount } from 'enzyme';

import { ObjectWatcher } from '../ObjectWatcher';


describe('Simple bootstrap tests', () => {
  it('can be created', () => {
    const RefHolder = ObjectWatcher<React.RefObject<any>>(React.createRef());
    expect(RefHolder).not.toEqual(null);
  });
});

describe('Tests with dummy children', () => {
  it('can get ref object of children', () => {
    const refObject = React.createRef();
    const RefHolder = ObjectWatcher<React.RefObject<any>>(refObject);

    const mockChange = jest.fn();

    const wrapper = mount(
      <RefHolder watch="current" onChange={() => mockChange()}>
        {ref => <img ref={ref} />}
      </RefHolder>,
    );

    const img = wrapper.find('img');
    expect(img.length).toBe(1); 
    expect(mockChange.mock.calls.length).toBe(1);
    expect(img.instance()).toBe(refObject.current); 
  });
});
