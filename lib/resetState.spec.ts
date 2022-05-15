import { resetState } from "./resetState";

it("sets state id to identify state", () => {
  const state = {
    a: 1,
    b: 2,
    c: 3,
  };

  resetState(state);

  expect((state as any)["___testStateStateId"]).toBeDefined();
});

it("sets state id as non enumerable", () => {
  const state = {
    a: 1,
    b: 2,
    c: 3,
  };

  resetState(state);

  expect(Object.keys(state)).toEqual(["a", "b", "c"]);
});

it("clears state on subsequent resetState calls", () => {
  const state = {
    a: 1,
    b: 2,
    c: 3,
  };

  resetState(state);

  state.a = 2;

  resetState(state);

  expect(state.a).toEqual(1);
});

it("can be used for multiple states", () => {
  const stateA = { a: 1 };
  const stateB = { b: 2 };

  resetState(stateA);

  stateA.a = 2;

  resetState(stateA);

  resetState(stateB);

  stateB.b = 1;

  resetState(stateB);

  expect(stateA).toStrictEqual({ a: 1 });
  expect(stateB).toStrictEqual({ b: 2 });
});

it("can be used for array", () => {
  const stateWithArray = {
    a: [
      { b: 1, c: 4 },
      { b: 2, c: 2 },
    ],
  };

  resetState(stateWithArray);

  stateWithArray.a = [];

  resetState(stateWithArray);
});

it("can be used with undefined", () => {
  const state: Record<string, number | undefined> = { a: undefined };

  resetState(state);
  state.a = 1;

  resetState(state);

  expect(state.a).toBeUndefined();
});

// @ts-expect-error
resetState({value: new Date()})

// @ts-expect-error
resetState({value: new Object()})

class Dummy {}
// @ts-expect-error
resetState({value: new Dummy()})
