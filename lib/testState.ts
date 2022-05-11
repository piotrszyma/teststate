type TestStateFactory<T> = () => T;

interface DoneCallback {
  (...args: any[]): any;
  fail(error?: string | { message: string }): any;
}

interface ProvidesCallback {
  (cb: DoneCallback): any;
}

type HookFn = () => void;

// Extracted from @types/jest.
// TODO: Check compatibility with other test runners.
declare interface LifecycleHook {
  (fn: HookFn, timeout?: number): void;
}
export function testState<T>(
  factory: TestStateFactory<T>,
  beforeEach: LifecycleHook
): T {
  const state = factory();

  beforeEach(() => {
    const initState = factory();
    for (const key in state) {
      state[key] = initState[key];
    }
  });

  return state;
}
