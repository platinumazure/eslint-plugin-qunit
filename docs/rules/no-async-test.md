# Disallow the use of asyncTest or QUnit.asyncTest (no-async-test)

:white_check_mark: The `"extends": "plugin:qunit/recommended"` property in a configuration file enables this rule.

QUnit 2.0 is deprecating `QUnit.asyncTest()` in favor of `assert.async()` within tests. This rule will flag `asyncTest` and `QUnit.asyncTest` calls and recommend that you use `assert.async()` instead.

## Rule Details

The following patterns are considered warnings:

```js

asyncTest("Asynchronous test", function () { });

QUnit.asyncTest("Asynchronous test", function () { });

```

The following patterns are not considered warnings:

```js

test("Synchronous test", function () { });

test("Asynchronous test", function (assert) {
    var done = assert.async();
    done();
});

QUnit.test("Synchronous test", function () { });

QUnit.test("Asynchronous test", function (assert) {
    var done = assert.async();
    done();
});

```

## When Not to Use It

This rule can be safely disabled if you want to tolerate asynchronous test declarations, especially if your codebase does not use QUnit 2.0 syntax yet.

## Further Reading

* [QUnit 2.x Migration Guide (Replace asyncTest)](http://qunitjs.com/upgrade-guide-2.x/#replace-asynctest-with-qunit-test-and-assert-async)
