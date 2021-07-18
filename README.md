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

import { testState } from 'teststate';

const EXPECTED_VALUE = '...';

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
