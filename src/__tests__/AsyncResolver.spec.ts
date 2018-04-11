import { AsyncResolver } from '../AsyncResolver';

describe("Simple bootstrap tests", () => {
  it('can be created', () => {
    const ObjectResolver = AsyncResolver<object>({});
    expect(ObjectResolver).not.toEqual(null);
  });
});
