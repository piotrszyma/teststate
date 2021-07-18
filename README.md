# teststate

Create immutable test state reinitialized after each test case with type inferece.

## Example

```ts

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
