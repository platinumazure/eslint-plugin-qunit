# Forbid the use of QUnit.only (no-only)

`QUnit.only` is useful for restricting a test run to just one test while developing, but committing a test file using this function to a repository is dangerous because it will ensure that the rest of the test suite is not run.

## Rule Details

The following patterns are considered warnings:

```js

QUnit.only('Name', function () { });

```

The following patterns are not considered warnings:

```js

QUnit.test('Name', function () { });

```

## When Not to Use It

If your development pipeline would make running this rule annoying, it could be safely disabled. However, it would be a good idea to ensure that this rule is run in continuous integration at the very least.

## Further Reading

* [QUnit.only](https://api.qunitjs.com/QUnit.only/)
