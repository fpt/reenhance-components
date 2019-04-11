import * as React from 'react';
import { mount } from 'enzyme';

import { ObjectWatcher } from '../ObjectWatcher';


class PointClass {
  constructor() {
    this.x = 2;
    this.y = 3;
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }
}

describe('Simple bootstrap tests', () => {
  it('can be created', () => {
    const RefHolder = ObjectWatcher<React.RefObject<any>>(React.createRef());
    expect(RefHolder).not.toEqual(null);
  });
});

describe('Tests with dummy children', () => {
  it('can get ref object of children', () => {
    const refObject = React.createRef();
    const RefHolder = ObjectWatcher<React.RefObject<any>>(refObject, 'current');

    const mockChange = jest.fn();

    const wrapper = mount(
      <RefHolder onChange={() => mockChange()}>
        {ref => <img ref={ref} />}
      </RefHolder>,
    );

    const img = wrapper.find('img');
    expect(img.length).toBe(1);
    expect(mockChange.mock.calls.length).toBe(1);
    expect(img.instance()).toBe(refObject.current);
  });

  it('can watch object', () => {
    const pointObject = new PointClass();
    const PointWatcher = ObjectWatcher<PointClass>(pointObject, ['x', 'y']);

    const mockChange = jest.fn();

    const wrapper = mount(
      <PointWatcher onChange={() => mockChange()}>
        {obj => <div onClick={() => obj.setPos(4, 5)}><span>{obj.x}</span><pre>{obj.y}</pre></div>}
      </PointWatcher>,
    );

    let span = wrapper.find('span');
    expect(span.length).toBe(1);
    expect(span.text()).toBe('2');
    let pre = wrapper.find('pre');
    expect(pre.length).toBe(1);
    expect(pre.text()).toBe('3');

    wrapper.simulate('click');

    expect(mockChange.mock.calls.length).toBe(2);

    span = wrapper.find('span');
    expect(span.length).toBe(1);
    expect(span.text()).toBe('4');
    pre = wrapper.find('pre');
    expect(pre.length).toBe(1);
    expect(pre.text()).toBe('5');
  });
});
