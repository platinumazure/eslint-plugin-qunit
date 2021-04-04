# Enforce use of objects as expected value in `assert.propEqual` (require-object-in-propequal)

:white_check_mark: The `"extends": "plugin:qunit/recommended"` property in a configuration file enables this rule.

The `assert.propEqual` assertion is for the strict-equality comparison of own-properties
of two objects. If the expected value is a string or other non-object, the assertion
result can be unexpected.

For string comparisons, `assert.strictEqual` should be used. For arrays,
`assert.deepEqual` should be used.

## Rule Details

The following patterns are considered warnings:

```js
assert.propEqual(actual, 0);

assert.propEqual(actual, "foo");

assert.propEqual(actual, `foo`);

assert.propEqual(actual, /regex/);
```

The following patterns are not considered warnings:

```js
assert.propEqual(actual, { foo: "bar" });

assert.propEqual(actual, ["array"]);

// Variables are not checked
assert.propEqual(actual, foo);
```

## When Not to Use It

This rule should be reasonably safe to use in all circumstances.

## Further Reading

[`assert.propEqual`](https://api.qunitjs.com/assert/propEqual/)
