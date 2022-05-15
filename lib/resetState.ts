type SerializableObjVal =
  | SerializableObj
  | string
  | number
  | boolean
  | null
  | SerializableObjVal[];

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

function deepCopy(v: SerializableObj): SerializableObj {
  // TODO: Recursively clone deeply.
  return JSON.parse(JSON.stringify(v)) as SerializableObj;
}

function objectStateInitialized(obj: SerializableObj): boolean {
  return STATE_ID_PROPERTY in obj;
}

function resetToInitialState(obj: SerializableObj): void {
  const stateId = (obj as any)[STATE_ID_PROPERTY];
  const initState = deepCopy(stateIdToState.get(stateId) ?? {});
  if (initState === undefined) {
    throw new Error("Failed to get initial state.");
  }

  for (const key in obj) {
    obj[key] = initState[key];
  }
}

function setInitialState(obj: SerializableObj): void {
  const stateId = genStateId();
  stateIdToState.set(stateId, deepCopy(obj));
  Object.defineProperty(obj, STATE_ID_PROPERTY, {
    enumerable: false,
    writable: false,
    configurable: false,
    value: stateId,
  });
}

export function resetState(obj: SerializableObj): void {
  if (objectStateInitialized(obj)) {
    resetToInitialState(obj);
  } else {
    setInitialState(obj);
  }
}
