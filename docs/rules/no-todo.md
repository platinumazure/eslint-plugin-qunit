# Disallow QUnit.todo (no-todo)

`QUnit.todo` is useful for testing code that is under development. However, leaving tests as todo in perpetuity is a bad practice, as the test ceases to provide any use in ensuring correctness of your code. Marking tests as todo should be done sparingly.

## Rule Details

The following patterns are considered warnings:

```js

QUnit.module.todo('Name', function() { });

QUnit.test.todo('Name', function() { });

QUnit.todo('Name', function() { });

module.todo('Name', function() { });

test.todo('Name', function() { });

todo('Name', function() { });

```

The following patterns are not considered warnings:

```js

QUnit.module.test('Name', function() { });

QUnit.test('Name', function() { });

module.test('Name', function() { });

test('Name', function() { });

```

## When Not to Use It

If your development pipeline would make running this rule annoying, it could be safely disabled. However, it would be a good idea to ensure that this rule is run in continuous integration at the very least.

## Further Reading

* [QUnit.todo](https://api.qunitjs.com/QUnit/test.todo/)
