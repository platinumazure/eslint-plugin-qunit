# Disallow global expect (`qunit/no-global-expect`)

✅ This rule is enabled in the `recommended` [config](https://github.com/platinumazure/eslint-plugin-qunit/blob/master/README.md#configurations).

<!-- end rule header -->

QUnit 2.0 is deprecating and removing the global `expect` function. This rule will warn when the global `expect` function is used.

## Rule Details

The following pattern is considered a warning:

```js

expect(1);

```

The following pattern is not considered a warning:

```js

assert.expect(1);

```

## When Not to Use It

This rule can be safely disabled if you want to tolerate global expect calls, especially if your codebase does not use QUnit 2.0 syntax yet.

## Further Reading

* [QUnit 2.x Migration Guide (Globals)](https://qunitjs.com/upgrade-guide-2.x/#removed-globals)
