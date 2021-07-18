type TestStateFactory<T> = () => T;

interface DoneCallback {
    (...args: any[]): any
    fail(error?: string | { message: string }): any;
}

interface ProvidesCallback {
    (cb: DoneCallback): any;
}

// Extracted from @types/jest.
// TODO: Check compatibility with other test runners.
interface Lifecycle {
    (fn: ProvidesCallback): any;
}

export function testState<T extends { [key in string]: any }>(
  factory: TestStateFactory<T>,
  beforeEach: Lifecycle,
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
