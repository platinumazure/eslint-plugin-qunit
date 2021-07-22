# Disallow binary logical expressions in assert arguments (no-assert-logical-expression)

✅ The `"extends": "plugin:qunit/recommended"` property in a configuration file enables this rule.

Generally, it is not a good idea to use logical expressions as assertion arguments. Logical-and assertions can be broken down into multiple assertions, while logical-or assertions may be indicative of uncertainty or nondeterminism in a test.

## Rule Details

The following patterns are considered warnings:

```js

assert.ok(foo && bar);

assert.ok(foo || bar);

```

The following patterns are not warnings:

```js

// Multiple assertions for logical-and cases
assert.ok(foo);
assert.ok(bar);

// More deterministic test expectation: maybe only foo should be true here
assert.ok(foo);

```

## When Not To Use It

This rule can be safely disabled if you do not care about the quality of test assertions and the determinism of tests.
