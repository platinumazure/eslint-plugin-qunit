/**
 * @fileoverview Forbid the use of global QUnit assertions.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-global-assertions"),
    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function wrap(assertionCode, testName) {
    testName = testName || "Name";
    return `QUnit.test('${testName}', function (assert) { ${assertionCode} });`;
}

function createError(assertion) {
    return {
        messageId: "unexpectedGlobalAssertion",
        data: {
            assertion
        }
    };
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-global-assertions", rule, {
    valid: [
        wrap("assert.ok(true);"),
        wrap("assert.equal(a, b);"),
        wrap("assert.strictEqual(a, b);"),
        wrap("assert.deepEqual(a, b);"),
        wrap("assert.propEqual(a, b);"),
        wrap("assert.notEqual(a, b);"),
        wrap("assert.notStrictEqual(a, b);"),
        wrap("assert.notDeepEqual(a, b);"),
        wrap("assert.notPropEqual(a, b);"),
        wrap("assert.raises(function () {}, TypeError);"),
        wrap("assert.throws(function () {}, TypeError);"),
        wrap("assert.expect(1);"),

        // Global overridden by local import/declaration.
        {
            code: "var strictEqual = require('foo'); strictEqual();",
            globals: { strictEqual: true }
        },

        // Intentionally not covered by this rule
        wrap("expect(1);")
    ],

    invalid: [
        {
            code: wrap("ok(true);"),
            errors: [createError("ok")],
            globals: { ok: true }
        },
        {
            code: wrap("equal(a, b);"),
            errors: [createError("equal")],
            globals: { equal: true }
        },
        {
            code: wrap("strictEqual(a, b);"),
            errors: [createError("strictEqual")],
            globals: { strictEqual: true }
        },
        {
            code: wrap("deepEqual(a, b);"),
            errors: [createError("deepEqual")],
            globals: { deepEqual: true }
        },
        {
            code: wrap("propEqual(a, b);"),
            errors: [createError("propEqual")],
            globals: { propEqual: true }
        },
        {
            code: wrap("notEqual(a, b);"),
            errors: [createError("notEqual")],
            globals: { notEqual: true }
        },
        {
            code: wrap("notStrictEqual(a, b);"),
            errors: [createError("notStrictEqual")],
            globals: { notStrictEqual: true }
        },
        {
            code: wrap("notDeepEqual(a, b);"),
            errors: [createError("notDeepEqual")],
            globals: { notDeepEqual: true }
        },
        {
            code: wrap("notPropEqual(a, b);"),
            errors: [createError("notPropEqual")],
            globals: { notPropEqual: true }
        },
        {
            code: wrap("raises(function () {}, TypeError);"),
            errors: [createError("raises")],
            globals: { raises: true }
        },
        {
            code: wrap("throws(function () {}, TypeError);"),
            errors: [createError("throws")],
            globals: { throws: true }
        }
    ]
});
