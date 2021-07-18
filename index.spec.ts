import { testState } from ".";

describe("testState", () => {
  const state = testState(() => {
    return {
      a: 1,
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
});
