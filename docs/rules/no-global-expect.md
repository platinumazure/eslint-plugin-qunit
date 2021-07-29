# Disallow global expect (no-global-expect)

✅ The `"extends": "plugin:qunit/recommended"` property in a configuration file enables this rule.

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

* [QUnit 2.x Migration Guide (Globals)](http://qunitjs.com/upgrade-guide-2.x/#removed-globals)
