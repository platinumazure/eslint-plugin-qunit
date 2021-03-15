# Disallow setup/teardown module hooks (no-setup-teardown)

:white_check_mark: The `"extends": "plugin:qunit/recommended"` property in a configuration file enables this rule.

:wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

QUnit supports two hooks at the module level: `beforeEach` and `afterEach`.
These hooks are run before and after each test, respectively. Before QUnit
1.16.0, these hooks were known as `setup` and `teardown`, which sometimes
caused ambiguity because it wasn't clear from the names whether these hooks
would run before/after each test, or before any tests/after all tests.

QUnit 2.0 will remove support for `setup` and `teardown` hooks. This rule can
be used to find module hooks with those names and rename them to `beforeEach`
and `afterEach`.

## Rule Details

The following patterns are considered warnings:

```js

QUnit.module('A module', {
    setup: function () {},
    teardown: function () {}
});

```

The following patterns are not warnings:

```js

QUnit.module('A module', {
    beforeEach: function () {},
    afterEach: function () {}
});

```

## When Not To Use It

If you are working in a codebase that does not need to conform to QUnit 2.0
APIs, this rule can be safely disabled.

## Further Reading

* [QUnit 2.0 upgrade guide: Module hooks](http://qunitjs.com/upgrade-guide-2.x/#rename-module-hooks)
