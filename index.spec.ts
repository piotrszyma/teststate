import { testState, resetState } from ".";

describe("testState", () => {
  const state = testState(() => {
    return {
      a: 1,
      mutableArray: [0, 1],
      mutableObject: {
        name: "John",
        age: 68,
      },
    };
  }, beforeEach);

  it("recreates state after each test case 1", () => {
    expect(state.a).toEqual(1);

    state.a = 2;

    expect(state.a).toEqual(2);
  });

  it("recreates state after each test case 2", () => {
    expect(state.a).toEqual(1);

    state.a = 3;

    expect(state.a).toEqual(3);
  });

  it("has clean state initially", () => {
    expect(state.a).toEqual(1);
  });

  it("recreates state.array after mutating it - case 1", () => {
    expect(state.mutableArray).toEqual([0, 1]);
    state.mutableArray.push(5);

    expect(state.mutableArray).toEqual([0, 1, 5]);
  });

  it("recreates state.array after mutating it - case 2", () => {
    expect(state.mutableArray).toEqual([0, 1]);
    state.mutableArray.push(3);

    expect(state.mutableArray).toEqual([0, 1, 3]);
  });

  it("recreates state.object after mutating it - case 1", () => {
    expect(state.mutableObject).toEqual({ name: "John", age: 68 });
    state.mutableObject.age = 69;

    expect(state.mutableObject).toEqual({ name: "John", age: 69 });
  });

  it("recreates state.object after mutating it - case 2", () => {
    expect(state.mutableObject).toEqual({ name: "John", age: 68 });
    state.mutableObject.name = "Anna";

    expect(state.mutableObject).toEqual({ name: "Anna", age: 68 });
  });
});

describe("resetState", () => {
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

  it("resets mutated array in state", () => {
    const state = {
      mutableArray: [0, 1],
    };
    resetState(state);

    state.mutableArray.push(5);
    resetState(state);

    expect(state.mutableArray).toEqual([0, 1]);
  });

  it("resets mutated object in state", () => {
    const state = {
      mutableObject: {
        name: "John",
        age: 68,
      },
    };
    resetState(state);

    state.mutableObject.age = 69;
    resetState(state);

    expect(state.mutableObject.age).toEqual(68);
  });

  it("can hande function in state", () => {
    const returnStringFunction = () => "Hello world";
    const state = {
      func: returnStringFunction,
    };

    resetState(state);  // initial resetState
    resetState(state);  // retrieve object via resetState

    expect(state.func()).toEqual("Hello world");
  })
});
