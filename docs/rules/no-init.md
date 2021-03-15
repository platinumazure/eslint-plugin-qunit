# Disallow use of QUnit.init (no-init)

:white_check_mark: The `"extends": "plugin:qunit/recommended"` property in a configuration file enables this rule.

Early versions of QUnit exposed the `QUnit.init()` function, which allowed
consumers to reinitialize the QUnit test runner. This has been discouraged for
a long time since QUnit now automatically invokes this method as needed. In
QUnit 2.0, the function will be removed from the public API.

This rule will detect and report calls to `QUnit.init()`.

## Rule Details

The following patterns are considered warnings:

```js

QUnit.init();

```

The following patterns are not warnings:

```js

QUnit.init;  // Only attempting to invoke the function is reported

```

## When Not To Use It

This rule can be disabled if there are tests that rely on this functionality and
there are no plans to migrate to QUnit 2.0. For the other 99.9% of use cases,
use of this rule is *highly* recommended.

## Further Reading

* [QUnit Upgrade Guide: Stop using `QUnit.init`](http://qunitjs.com/upgrade-guide-2.x/#stop-using-qunit-init-no-replacement)
