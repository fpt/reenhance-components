import { DebouncePropagator } from '../DebouncePropagator';

describe('Simple bootstrap tests', () => {
  it('can be created', () => {
    const ObjectPropagator = DebouncePropagator<object>({});
    expect(ObjectPropagator).not.toEqual(null);
  });
});
