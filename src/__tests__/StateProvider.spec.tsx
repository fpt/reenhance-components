import * as React from 'react';
import { shallow } from 'enzyme';

import { StateAndUpdater, StateProvider } from '../StateProvider';


describe('Simple bootstrap tests', () => {
  it('can be created', () => {
    const BooleanState = StateProvider<boolean>(false);
    expect(BooleanState).not.toEqual(null);
  });
});

describe('Parameter tests', () => {
  it('stores value (boolean)', () => {
    const BooleanState = StateProvider<boolean>(false);
    const wrapper = shallow(<BooleanState />);
    expect(wrapper.state('stateValue')).toEqual(false);

    wrapper.setState({ stateValue: true });
    expect(wrapper.state('stateValue')).toEqual(true);
  });

  it('stores value (string)', () => {
    const BooleanState = StateProvider<string>('foo');
    const wrapper = shallow(<BooleanState />);
    expect(wrapper.state('stateValue')).toEqual('foo');

    wrapper.setState({ stateValue: 'bar' });
    expect(wrapper.state('stateValue')).toEqual('bar');
  });
});
