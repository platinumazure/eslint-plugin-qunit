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

function wrap(assertionCode, testName = "Name") {
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
        wrap("assert.false(foo);"),
        wrap("assert.strictEqual(a, b);"),
        wrap("assert.deepEqual(a, b);"),
        wrap("assert.propEqual(a, b);"),
        wrap("assert.notEqual(a, b);"),
        wrap("assert.notStrictEqual(a, b);"),
        wrap("assert.notDeepEqual(a, b);"),
        wrap("assert.notPropEqual(a, b);"),
        wrap("assert.raises(function () {}, TypeError);"),
        wrap("assert.throws(function () {}, TypeError);"),
        wrap("assert.true(foo);"),
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
            globals: { ok: true },
            errors: [createError("ok")]
        },
        {
            code: wrap("equal(a, b);"),
            globals: { equal: true },
            errors: [createError("equal")]
        },
        {
            code: wrap("strictEqual(a, b);"),
            globals: { strictEqual: true },
            errors: [createError("strictEqual")]
        },
        {
            code: wrap("deepEqual(a, b);"),
            globals: { deepEqual: true },
            errors: [createError("deepEqual")]
        },
        {
            code: wrap("propEqual(a, b);"),
            globals: { propEqual: true },
            errors: [createError("propEqual")]
        },
        {
            code: wrap("notEqual(a, b);"),
            globals: { notEqual: true },
            errors: [createError("notEqual")]
        },
        {
            code: wrap("notStrictEqual(a, b);"),
            globals: { notStrictEqual: true },
            errors: [createError("notStrictEqual")]
        },
        {
            code: wrap("notDeepEqual(a, b);"),
            globals: { notDeepEqual: true },
            errors: [createError("notDeepEqual")]
        },
        {
            code: wrap("notPropEqual(a, b);"),
            globals: { notPropEqual: true },
            errors: [createError("notPropEqual")]
        },
        {
            code: wrap("raises(function () {}, TypeError);"),
            globals: { raises: true },
            errors: [createError("raises")]
        },
        {
            code: wrap("throws(function () {}, TypeError);"),
            globals: { throws: true },
            errors: [createError("throws")]
        }
    ]
});
