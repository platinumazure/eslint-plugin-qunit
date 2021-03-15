# Disallow QUnit.push (no-qunit-push)

:white_check_mark: The `"extends": "plugin:qunit/recommended"` property in a configuration file enables this rule.

When writing custom assertions, the proper way to log an assertion result
used to be calling `QUnit.push()` with the assertion result data. However, in
order to allow for better control of test context, `QUnit.push` has been
deprecated (to be removed in 2.0) and the correct way to log the assertion
result is to call `this.pushResult()` from within the assertion function.

## Rule Details

The following patterns are considered warnings:

```js

QUnit.push(result, actual, expected, message);

```

The following patterns are not warnings:

```js

this.pushResult({
    result: result,
    actual: actual,
    expected: expected,
    message: message
});

```

## When Not To Use It

This rule may be safely disabled if you are working in a legacy codebase that
will not be migrated to QUnit 2.0.

## Further Reading

* [QUnit.push()](http://api.qunitjs.com/QUnit.push/)
