
// spreading generic types are not possible in TS 2.x
// See https://github.com/Microsoft/TypeScript/issues/10727
export const merge: <A, B>(a: A, b: B) => A & B =
  <A, B>(a: A, b: B) =>
    Object.assign({}, a, b) as any;

export const merge3: <A, B, C>(a: A, b: B, c: C) => A & B & C =
  <A, B, C>(a: A, b: B, c: C) =>
    Object.assign({}, a, b, c) as any;
