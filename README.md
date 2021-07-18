# teststate

Create immutable test state reinitialized after each test case with type inference.

## Install

### Using npm

```
npm install teststate
```

### Using yarn

```
yarn add --dev teststate
```

## Example

```ts
import { testState } from "teststate";

const EXPECTED_VALUE = "...";

describe("test fooMethod", () => {
  const state = testState(() => {
    const foo = fooFactory();
    return { foo };
  }, beforeEach);

  it("returns bar", () => {
    const result = fooMethod(state.foo);

    expect(result).toBe(EXPECTED_VALUE);
  });
});
```

## Why this library?

Normally, when you define some state in `beforeEach` hook, you do:

```ts
let foo: null | SomeType = null;

beforeEach(() => {
  foo = createSomeTypeInstance();
});
```

Then in test you need to make sure `foo !== null`

With `teststate`, `foo` is always not null and can be accessed via `state.foo` as `SomeType`
