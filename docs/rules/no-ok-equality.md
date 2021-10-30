# Disallow equality comparisons in assert.ok/assert.notOk (no-ok-equality)

✅ The `"extends": "plugin:qunit/recommended"` property in a configuration file enables this rule.

🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

Equality comparisons in `assert.ok` or `assert.notOk` calls are not valuable
because if the assertion fails, QUnit cannot reveal any comparison information.
Instead, developers should use `assert.equal`, `assert.strictEqual`,
`assert.notEqual`, or `assert.notStrictEqual` to allow QUnit to track the
expected and actual values and show a useful diff. This makes test output much
easier to read.

## Rule Details

The following patterns are considered warnings:

```js

QUnit.test("Name", function (assert) { assert.ok(x === 1); });

QUnit.test("Name", function (assert) { assert.notOk(x === 1); });

QUnit.test("Name", function (assert) { assert.ok(x !== 1); });

QUnit.test("Name", function (assert) { assert.notOk(x !== 1); });

```

In addition, if `{ allowGlobals: true }` option is on (the default), the following patterns are also considered warnings:

```js

QUnit.test("Name", function () { ok(x === 1); });

QUnit.test("Name", function () { notOk(x === 1); });

QUnit.test("Name", function () { ok(x !== 1); });

QUnit.test("Name", function () { notOk(x !== 1); });

```

The previous patterns are not warnings if `{ allowGlobals: false }` is passed
in as an option.

The following patterns are not considered warnings:

```js

QUnit.test("Name", function (assert) { assert.ok(x); });

QUnit.test("Name", function (assert) { assert.ok(x > 1); });

QUnit.test("Name", function (assert) { assert.ok(x < 1); });

QUnit.test("Name", function (assert) { assert.ok(x >= 1); });

QUnit.test("Name", function (assert) { assert.ok(x <= 1); });

QUnit.test("Name", function (assert) { assert.ok(x instanceof Number); });

```

## Options

This rule takes an optional object containing:

* `allowGlobals` (boolean, default: true): Whether the rule should check global assertions

## When Not to Use It

It is best to enable this rule, but since it is possible to test a codebase
using equality comparisons in `assert.ok` and `assert.notOk` calls, this rule
can be disabled if enabling it would be too much of a pain.

## Further Reading

* [QUnit's Assertions](https://api.qunitjs.com/category/assert/)
