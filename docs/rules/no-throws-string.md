# Disallow assert.throws() with block, string, and message args (no-throws-string)

:white_check_mark: The `"extends": "plugin:qunit/recommended"` property in a configuration file enables this rule.

QUnit 2.0 has deprecated the `assert.throws(block, string, message)` form of
`assert.throws()`. This rule can be used to flag uses of the deprecated form
and convert them to use a regular expression or some other predicate.

## Rule Details

The following patterns are considered warnings:

```js

QUnit.test('test', function (assert) {
    assert.throws(function () {
        // code
    }, "error message", "An error should have been thrown");
});

```

The following patterns are not warnings:

```js

QUnit.test('test', function (assert) {
    assert.throws(function () {
        // code
    }, /error message/, "An error should have been thrown");
});

QUnit.test('test', function (assert) {
    assert.throws(function () {
        // code
    }, "An error should have been thrown");
});

QUnit.test('test', function (assert) {
    assert.throws(function () {
        // code
    }, function (err) { return true; }, "An error should have been thrown");
});

```

## When Not To Use It

This rule can be safely disabled if you are not using QUnit 2.0.

## Further Reading

* [Replace assert.throws(block, string, message) with assert.throws(block, regexp, message)](http://qunitjs.com/upgrade-guide-2.x/#replace-assert-throws-block-string-message-with-assert-throws-block-regexp-message)
