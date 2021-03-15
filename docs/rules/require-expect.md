# Enforce that `expect` is called (require-expect)

:white_check_mark: The `"extends": "plugin:qunit/recommended"` property in a configuration file enables this rule.

QUnit's `assert.expect(...)` helps developers create tests that correctly fail
when their expected number of assertions are not called. QUnit will throw an
error if no assertions are called by the time the test ends unless a developer
also calls `assert.expect(0)`. QUnit also has a [configuration
option](https://api.qunitjs.com/QUnit.config/) to require `expect` for every
test. This rule checks for `expect` at linting time.

## Options

The "always" option requires that `expect` is called in each test.

The "except-simple" (**default**) option only requires an `expect` call when an assertion is
called inside of a block or when `assert` is passed to another function. The
rationale here is that by wrapping `assert` statements in conditional blocks
or callbacks, developers are at risk of creating tests that incorrectly pass
by skipping assertions.

The "never" option disallows any `expect` calls in tests. With improved
resiliancy in QUnit 2.0 for tracking asynchronous activity, projects may
prefer to discourage use of redundannt `assert.expect` calls in tests. This
option codifies such convention.

The "never-except-zero" option disallows `except` calls, except when used to
explicitly assert that a test performs no assertions, which would otherwise
be considered an error.

## Rule Details

### always

When using the "always" option, each test needs an expect call. So the
following would warn.

```js
test('name', function(assert) {
    assert.ok(true);
});
```

The following would not warn.

```js
test('name', function(assert) {
    assert.expect(1);
    assert.ok(true);
});

test('name', function() {
    expect(1);
    ok(true);
});
```

### except-simple

When using the **default** "except-simple" option, the following patterns are considered
warnings.

```js
test('name', function(assert) {
    if (someCondition) {
        assert.ok(true);
    }
});

test('name', function(assert) {
    maybeCallback(function() {
        assert.ok(true);
    });
});

test('name', function(assert) {
    var callback = function() {
        assert.ok(true);
    }
    callback();
});

test('name', function(assert) {
    maybeCallback(function() {
        assert.expect(2); // Must be called in the main test function.
        assert.ok(true);
    });
});

test('name', function(assert) {
    myCustomAssertionWrapper(assert);
});
```

The following patterns are not considered warnings when using the
"except-simple" option.

```js
test('name', function(assert) {
    assert.ok(true);
});

test('name', function() {
    ok(true);
});

test('name', function(assert) {
    assert.expect(2);

    if (true) {
        assert.ok(true);
        callMeBack(function() {
            assert.ok(true);
        });
    }
});

test('name', function() {
    expect(0);

    if (failureCondition) {
        ok(false);
    }
});

test('name', function(assert) {
    assert.expect(1);
    myCustomAssertionWrapper(assert);
});
```

### never

The following would warn.

```js
test('name', function(assert) {
    assert.expect(1);
    assert.ok(true);
});


test('name', function(assert) {
    assert.expect(0);
    myCustomFunction();
});
```

The following would not warn.

```js
test('name', function(assert) {
    assert.ok(true);
});
```

### never-except-zero

The following would warn.

```js
test('name', function(assert) {
    assert.expect(1);
    assert.ok(true);
});
```

The following would not warn.

```js
test('name', function(assert) {
    assert.ok(true);
});


test('name', function(assert) {
    assert.expect(0);
    myCustomFunction();
});
```

## When Not to Use It

1. If your tests have some logic that relies on an unpredictable number of
   assertions being called.

2. If you are confident with your assertion logic and don't want the overhead of
   calling `expect`.

## Further Reading

* [QUnit's Assertions](https://api.qunitjs.com/category/assert/)
