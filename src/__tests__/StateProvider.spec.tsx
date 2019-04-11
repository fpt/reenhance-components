import * as React from 'react';
import { shallow, mount } from 'enzyme';

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

describe('Tests with dummy children', () => {
  it('passes state and setState', () => {
    const BooleanState = StateProvider<string>('foo');

    const wrapper = mount(
      <BooleanState>
        {props => <div props={props} />}
      </BooleanState>,
    );

    let div = wrapper.find('div');
    expect(div.length).toBe(1);

    let stateProps = div.props().props;
    expect(stateProps.state).toBe('foo');

    stateProps.setState('bar');
    wrapper.update();

    div = wrapper.find('div');
    stateProps = div.props().props;
    expect(stateProps.state).toBe('bar');
  });
});
