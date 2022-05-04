type TestStateFactory<T> = () => T;

interface DoneCallback {
  (...args: any[]): any;
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

export function testState<T>(
  factory: TestStateFactory<T>,
  beforeEach: Lifecycle
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

let stateId = 0;
function genStateId(): number {
  stateId += 1;
  return stateId;
}

const STATE_ID_PROPERTY = "___testStateStateId";

let initialStates: Map<number, any> = new Map();

export function resetState<T extends object>(state: T): void {
  if (STATE_ID_PROPERTY in state) {
    const stateId = (state as any)[STATE_ID_PROPERTY];
    const initState = initialStates.get(stateId);

    for (const key in state) {
      state[key] = initState[key];
    }

    return;
  }

  const stateId = genStateId();
  initialStates.set(stateId, JSON.parse(JSON.stringify(state)));
  Object.defineProperty(state, STATE_ID_PROPERTY, {
    enumerable: false,
    writable: false,
    configurable: false,
    value: stateId,
  });
}
