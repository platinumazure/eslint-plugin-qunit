# Enforce use of objects as expected value in `assert.propEqual` (use-object-in-propequal)

The `assert.propEqual` assertion is for the strict-equality comparison of own-properties
of two objects. If the expected value is a string or other non-object, the assertion
result can be unexpected.

For string comparisons, `assert.strictEqual` should be used. For arrays,
`assert.deepStrictEqual` should be used.

## Rule Details

The following patterns are considered warnings:

```js
assert.propEqual(actual, 0);

assert.propEqual(actual, "foo");

assert.propEqual(actual, ["array"]);

assert.propEqual(actual, /regex/);
```

The following patterns are not considered warnings:

```js
assert.propEqual(actual, { foo: "bar" });

// Variables are not checked
assert.propEqual(actual, foo);
```

## When Not to Use It

This rule should be reasonably safe to use in all circumstances.

## Further Reading

[`assert.propEqual`](https://api.qunitjs.com/assert/propEqual/)
