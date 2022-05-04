# teststate 🧪

Create immutable test state reinitialized after each test case with type inference.


## How to use this library?

```ts
// (1) import testState method from teststate module.
import { testState } from "teststate";

const EXPECTED_VALUE = "...";

describe("test fooMethod", () =>
  // (2) Declare state, pass a callback that builds state to be recreated between each tests.
  const state = testState(() => {
    const foo = fooFactory();
    return { foo };
  }, beforeEach);

  it("returns bar", () => {
    // (3) Use state inside test methods.
    const result = fooMethod(state.foo);

    expect(result).toBe(EXPECTED_VALUE);
  });
});
```

## Why should I use this library?

Normally, when you define some state in `beforeEach` hook, you do:

```ts
describe("tests", () => {
  let foo: null | SomeType = null;

  beforeEach(() => {
    foo = createSomeTypeInstance();
  });

  it("passes the test", () => {
    // here foo can be SomeType | null
  });
});
```

With `teststate`, `foo` is always of type `SomeType` and can be accessed via `state.foo`.

```ts
describe("tests", () => {
  const state = testState(() => {
    return {
      foo: createSomeTypeInstance(),
    };
  }, beforeEach);

  it("passes the test", () => {
    // here state.foo must be SomeType
  });
});
```

