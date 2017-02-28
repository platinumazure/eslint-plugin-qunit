# Forbid identical test and module names (no-identical-names)

Having identical names for two different tests or modules may create
confusion. For example, when a test with the same name as another test
in the same module fails, it is harder to know which one failed and
thus harder to fix.

## Rule Details

This rule looks at the name of every test and module. It will report
when two modules or two tests within a module have the same name.

The following patterns are considered warnings:

```js
module("module1");
test("it1", function() {});
test("it1", function() {});
```

```js
module("module1");
test("it1", function() {});

module("module1");
test("it2", function() {});
```

The following patterns are not considered warnings:

```js
module("module1");
test("it1", function() {});

module("module2");
test("it1", function() {});
```

## When Not to Use It

If you are using nested modules you should not use this rule, as it does
not support nested modules yet.

## Further Reading

* [QUnit.test()](http://api.qunitjs.com/QUnit.test/)
* [QUnit.module()](http://api.qunitjs.com/QUnit.module/)
