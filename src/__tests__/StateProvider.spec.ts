import { StateAndUpdater, StateProvider } from '../StateProvider';

describe('Simple bootstrap tests', () => {
  it('can be created', () => {
    const BooleanState = StateProvider<boolean>(false);
    expect(BooleanState).not.toEqual(null);
  });
});
