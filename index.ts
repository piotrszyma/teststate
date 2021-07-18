type TestStateFactory<T> = () => T;

export function testState<T extends { [key in string]: any }>(
  factory: TestStateFactory<T>,
  beforeEach: (cb: () => void) => void
): T {
  const state =  factory();

  beforeEach(() => {
    const initState = factory();
    for (const key of Object.keys(state)) {
      state[key as keyof typeof state] = initState[key];
    }
  });
  return state;
}
