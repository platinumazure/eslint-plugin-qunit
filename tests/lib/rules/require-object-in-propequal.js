/**
 * @fileoverview Enforce use of objects as expected values in `assert.propEqual`
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/require-object-in-propequal"),
    RuleTester = require("eslint").RuleTester,
    testUtils = require("../../testUtils");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function createInvalid(assertionCode, invalidValue) {
    return {
        code: testUtils.wrap(assertionCode),
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

ruleTester.run("require-object-in-propequal", rule, {
    valid: [
        // Object expressions/array expressions
        testUtils.wrap("assert.propEqual(actual, { foo: 'bar' });"),
        testUtils.wrap("assert.propEqual(actual, ['string']);"),

        // Identifiers, member expressions, calls, and new expressions are fine
        testUtils.wrap("assert.propEqual(actual, someVar);"),
        testUtils.wrap("assert.propEqual(actual, obj.prop);"),
        testUtils.wrap("assert.propEqual(actual, func());"),
        testUtils.wrap("assert.propEqual(actual, new Foo());"),

        // this is fine
        testUtils.wrap("assert.propEqual(actual, this);"),

        // Global assertion
        testUtils.wrap("propEqual(actual, { foo: 'bar' });"),

        // Not propEqual
        testUtils.wrap("assert.deepEqual(actual, { foo: 'bar' });"),
        testUtils.wrap("assert.deepEqual(actual, 0);"),
        testUtils.wrap("assert.deepEqual(actual, -1);"),
        testUtils.wrap("assert.deepEqual(actual, 'string');"),
        testUtils.wrap("assert.deepEqual(actual, `template`);"),
        testUtils.wrap("assert.deepEqual(actual, true);"),
        testUtils.wrap("assert.deepEqual(actual, false);"),
        testUtils.wrap("assert.deepEqual(actual, null);"),
        testUtils.wrap("assert.deepEqual(actual, /regex/);"),
        testUtils.wrap("assert.deepEqual(actual, ++foo);"),
        testUtils.wrap("assert.deepEqual(actual, foo++);"),
        testUtils.wrap("assert.deepEqual(actual, --foo);"),
        testUtils.wrap("assert.deepEqual(actual, foo--);"),
        testUtils.wrap("assert.deepEqual(actual, <JSX />);"),

        testUtils.wrap("assert.deepEqual(actual, 0n);"),

        testUtils.wrap("assert.propEqual(actual, foo?.bar);"),
        testUtils.wrap("assert.propEqual(actual, foo?.bar?.());")
    ],

    invalid: [
        createInvalid(testUtils.wrap("assert.propEqual(actual, 0);"), "0"),
        createInvalid(testUtils.wrapArrow("assert.propEqual(actual, 0);"), "0"),
        createInvalid(testUtils.wrap("assert.propEqual(actual, -1);"), "-1"),
        createInvalid(testUtils.wrap("assert.propEqual(actual, 'string');"), "'string'"),
        createInvalid(testUtils.wrap("assert.propEqual(actual, `template`);"), "`template`"),
        createInvalid(testUtils.wrap("assert.propEqual(actual, true);"), "true"),
        createInvalid(testUtils.wrap("assert.propEqual(actual, false);"), "false"),
        createInvalid(testUtils.wrap("assert.propEqual(actual, null);"), "null"),
        createInvalid(testUtils.wrap("assert.propEqual(actual, /regex/);"), "/regex/"),
        createInvalid(testUtils.wrap("assert.propEqual(actual, ++foo);"), "++foo"),
        createInvalid(testUtils.wrap("assert.propEqual(actual, foo++);"), "foo++"),
        createInvalid(testUtils.wrap("assert.propEqual(actual, --foo);"), "--foo"),
        createInvalid(testUtils.wrap("assert.propEqual(actual, foo--);"), "foo--"),
        createInvalid(testUtils.wrap("assert.propEqual(actual, <JSX />)"), "<JSX />"),
        createInvalid(testUtils.wrap("assert.propEqual(actual, 0n);"), "0n")
    ]
});
