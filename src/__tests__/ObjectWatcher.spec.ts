import * as React from 'react';
import { ObjectWatcher } from '../ObjectWatcher';

describe('Simple bootstrap tests', () => {
  it('can be created', () => {
    const RefHolder = ObjectWatcher<React.RefObject<any>>(React.createRef());
    expect(RefHolder).not.toEqual(null);
  });
});
