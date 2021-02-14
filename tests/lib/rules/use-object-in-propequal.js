/**
 * @fileoverview Enforce use of objects as expected values in `assert.propEqual`
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/use-object-in-propequal"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function wrap(assertionCode, testName) {
    testName = testName || "Name";
    return `QUnit.test('${testName}', function (assert) { ${assertionCode} });`;
}

function createInvalid(assertionCode, invalidValue) {
    return {
        code: wrap(assertionCode),
        errors: [{
            messageId: "useObject",
            data: {
                value: invalidValue
            }
        }]
    };
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: { jsx: true }
    }
});

ruleTester.run("use-object-in-propequal", rule, {
    valid: [
        // Object expressions, identifiers, member expressions, and calls are fine
        wrap("assert.propEqual(actual, { foo: 'bar' });"),
        wrap("assert.propEqual(actual, someVar);"),
        wrap("assert.propEqual(actual, obj.prop);"),
        wrap("assert.propEqual(actual, func());"),
        wrap("assert.propEqual(actual, new Foo());"),

        // this is fine
        wrap("assert.propEqual(actual, this);"),

        // Global assertion
        wrap("propEqual(actual, { foo: 'bar' });"),

        // Not propEqual
        wrap("assert.deepEqual(actual, { foo: 'bar' });"),
        wrap("assert.deepEqual(actual, 0);"),
        wrap("assert.deepEqual(actual, -1);"),
        wrap("assert.deepEqual(actual, 0n);"),
        wrap("assert.deepEqual(actual, 'string');"),
        wrap("assert.deepEqual(actual, `template`);"),
        wrap("assert.deepEqual(actual, ['string']);"),
        wrap("assert.deepEqual(actual, true);"),
        wrap("assert.deepEqual(actual, false);"),
        wrap("assert.deepEqual(actual, null);"),
        wrap("assert.deepEqual(actual, /regex/);"),
        wrap("assert.deepEqual(actual, ++foo);"),
        wrap("assert.deepEqual(actual, foo++);"),
        wrap("assert.deepEqual(actual, --foo);"),
        wrap("assert.deepEqual(actual, foo--);"),
        wrap("assert.deepEqual(actual, <JSX />);")
    ],

    invalid: [
        createInvalid("assert.propEqual(actual, 0);", "0"),
        createInvalid("assert.propEqual(actual, -1);", "-1"),
        createInvalid("assert.propEqual(actual, 0n);", "0n"),
        createInvalid("assert.propEqual(actual, 'string');", "'string'"),
        createInvalid("assert.propEqual(actual, `template`);", "`template`"),
        createInvalid("assert.propEqual(actual, ['string']);", "['string']"),
        createInvalid("assert.propEqual(actual, true);", "true"),
        createInvalid("assert.propEqual(actual, false);", "false"),
        createInvalid("assert.propEqual(actual, null);", "null"),
        createInvalid("assert.propEqual(actual, /regex/);", "/regex/"),
        createInvalid("assert.propEqual(actual, ++foo);", "++foo"),
        createInvalid("assert.propEqual(actual, foo++);", "foo++"),
        createInvalid("assert.propEqual(actual, --foo);", "--foo"),
        createInvalid("assert.propEqual(actual, foo--);", "foo--"),
        createInvalid("assert.propEqual(actual, <JSX />)", "<JSX />")
    ]
});
