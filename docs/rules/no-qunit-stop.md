# Disallow QUnit.stop (no-qunit-stop)

:white_check_mark: The `"extends": "plugin:qunit/recommended"` property in a configuration file enables this rule.

QUnit's handling of asynchronous tests used to be via tracking a global
semaphore and not starting a test until the previous test had decremented the
semaphore. However, in order to avoid tests interfering with each other,
`QUnit.stop()` (and also `QUnit.start()`) have been deprecated (to be removed
in 2.0) and have been replaced with `assert.async()`.

## Rule Details

The following patterns are considered warnings:

```js

QUnit.stop();

QUnit.stop(2);

```

The following patterns are not warnings:

```js

var done = assert.async():

```

## When Not To Use It

This rule may be safely disabled if you are working in a legacy codebase that
will not migrate to QUnit 2.0.

## Further Reading

* [QUnit.stop()](http://api.qunitjs.com/QUnit.stop/)
