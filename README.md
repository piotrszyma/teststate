# teststate [![npm](https://img.shields.io/npm/v/teststate.svg)](https://www.npmjs.com/package/vue) [![Download](https://img.shields.io/npm/dm/teststate)](https://www.npmjs.com/package/teststate)

Create immutable test state reinitialized after each test case with type inference.

## Getting Started

Please follow the documentation at [piotrszyma.github.io/teststate](https://piotrszyma.github.io/teststate/)

## Install

### Using npm

```
npm install teststate
```

### Using yarn

```
yarn add --dev teststate
```

## How to use this library?

Use `testState` method when your test state is built from some complex types / factory methods.

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

Use `resetState` method when your test state consist only primitive types and can be serialized.

```ts
// (1) import resetState method from teststate module.
import { resetState } from "teststate";

const EXPECTED_VALUE = "...";

describe("test fooMethod", () =>
  // (2) Declare state.
  const state = {
    foo: 1,
  }

  // (3) Call `resetState` in `beforeEach` method.
  beforeEach(() => resetState(state));

  it("returns bar", () => {
    // (4) Use state inside test methods.
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

With `teststate`, `foo` is always of type `SomeType` and can be accessed via `state.foo`.
