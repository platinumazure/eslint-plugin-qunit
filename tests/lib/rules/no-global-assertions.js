/**
 * @fileoverview Forbid the use of global QUnit assertions.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-global-assertions"),
    RuleTester = require("eslint").RuleTester,
    testUtils = require("../../testUtils");


//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

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
        testUtils.wrap("assert.ok(true);"),
        testUtils.wrap("assert.equal(a, b);"),
        testUtils.wrap("assert.false(foo);"),
        testUtils.wrap("assert.strictEqual(a, b);"),
        testUtils.wrap("assert.deepEqual(a, b);"),
        testUtils.wrap("assert.propEqual(a, b);"),
        testUtils.wrap("assert.notEqual(a, b);"),
        testUtils.wrap("assert.notStrictEqual(a, b);"),
        testUtils.wrap("assert.notDeepEqual(a, b);"),
        testUtils.wrap("assert.notPropEqual(a, b);"),
        testUtils.wrap("assert.raises(function () {}, TypeError);"),
        testUtils.wrap("assert.throws(function () {}, TypeError);"),
        testUtils.wrap("assert.true(foo);"),
        testUtils.wrap("assert.expect(1);"),

        // Global overridden by local import/declaration.
        {
            code: "var strictEqual = require('foo'); strictEqual();",
            globals: { strictEqual: true }
        },

        // Intentionally not covered by this rule
        testUtils.wrap("expect(1);")
    ],

    invalid: [
        {
            code: testUtils.wrap("ok(true);"),
            globals: { ok: true },
            errors: [createError("ok")]
        },
        {
            code: testUtils.wrap("equal(a, b);"),
            globals: { equal: true },
            errors: [createError("equal")]
        },
        {
            code: testUtils.wrap("strictEqual(a, b);"),
            globals: { strictEqual: true },
            errors: [createError("strictEqual")]
        },
        {
            code: testUtils.wrap("deepEqual(a, b);"),
            globals: { deepEqual: true },
            errors: [createError("deepEqual")]
        },
        {
            code: testUtils.wrap("propEqual(a, b);"),
            globals: { propEqual: true },
            errors: [createError("propEqual")]
        },
        {
            code: testUtils.wrap("notEqual(a, b);"),
            globals: { notEqual: true },
            errors: [createError("notEqual")]
        },
        {
            code: testUtils.wrap("notStrictEqual(a, b);"),
            globals: { notStrictEqual: true },
            errors: [createError("notStrictEqual")]
        },
        {
            code: testUtils.wrap("notDeepEqual(a, b);"),
            globals: { notDeepEqual: true },
            errors: [createError("notDeepEqual")]
        },
        {
            code: testUtils.wrap("notPropEqual(a, b);"),
            globals: { notPropEqual: true },
            errors: [createError("notPropEqual")]
        },
        {
            code: testUtils.wrap("raises(function () {}, TypeError);"),
            globals: { raises: true },
            errors: [createError("raises")]
        },
        {
            code: testUtils.wrap("throws(function () {}, TypeError);"),
            globals: { throws: true },
            errors: [createError("throws")]
        }
    ]
});
