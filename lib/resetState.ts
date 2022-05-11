type SerializableObjVal = SerializableObj | string | number;

type SerializableObj = {
  [key in string]: SerializableObjVal;
};

let stateId = 0;
function genStateId(): number {
  stateId += 1;
  return stateId;
}

const STATE_ID_PROPERTY = "___testStateStateId";

let stateIdToState: Map<number, SerializableObj> = new Map();

function deepCopy<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

export function resetState(state: SerializableObj): void {
  if (STATE_ID_PROPERTY in state) {
    const stateId = (state as any)[STATE_ID_PROPERTY];
    const initState = deepCopy(stateIdToState.get(stateId));
    if (initState === undefined) {
      throw new Error("Failed to get initial state.");
    }

    for (const key in state) {
      state[key] = initState[key];
    }

    return;
  }

  const stateId = genStateId();
  stateIdToState.set(stateId, deepCopy(state));
  Object.defineProperty(state, STATE_ID_PROPERTY, {
    enumerable: false,
    writable: false,
    configurable: false,
    value: stateId,
  });
}
