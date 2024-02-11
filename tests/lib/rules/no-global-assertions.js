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
            assertion,
        },
    };
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-global-assertions", rule, {
    valid: [
        testUtils.wrapInTest("assert.ok(true);"),
        testUtils.wrapInTest("assert.equal(a, b);"),
        testUtils.wrapInTest("assert.false(foo);"),
        testUtils.wrapInTest("assert.strictEqual(a, b);"),
        testUtils.wrapInTest("assert.deepEqual(a, b);"),
        testUtils.wrapInTest("assert.propEqual(a, b);"),
        testUtils.wrapInTest("assert.notEqual(a, b);"),
        testUtils.wrapInTest("assert.notStrictEqual(a, b);"),
        testUtils.wrapInTest("assert.notDeepEqual(a, b);"),
        testUtils.wrapInTest("assert.notPropEqual(a, b);"),
        testUtils.wrapInTest("assert.raises(function () {}, TypeError);"),
        testUtils.wrapInTest("assert.throws(function () {}, TypeError);"),
        testUtils.wrapInTest("assert.true(foo);"),
        testUtils.wrapInTest("assert.expect(1);"),

        // Global overridden by local import/declaration.
        {
            code: "var strictEqual = require('foo'); strictEqual();",
            globals: { strictEqual: true },
        },

        // Intentionally not covered by this rule
        testUtils.wrapInTest("expect(1);"),
    ],

    invalid: [
        {
            code: testUtils.wrapInTest("ok(true);"),
            globals: { ok: true },
            errors: [createError("ok")],
        },
        {
            code: testUtils.wrapInTest("equal(a, b);"),
            globals: { equal: true },
            errors: [createError("equal")],
        },
        {
            code: testUtils.wrapInTest("strictEqual(a, b);"),
            globals: { strictEqual: true },
            errors: [createError("strictEqual")],
        },
        {
            code: testUtils.wrapInTest("deepEqual(a, b);"),
            globals: { deepEqual: true },
            errors: [createError("deepEqual")],
        },
        {
            code: testUtils.wrapInTest("propEqual(a, b);"),
            globals: { propEqual: true },
            errors: [createError("propEqual")],
        },
        {
            code: testUtils.wrapInTest("notEqual(a, b);"),
            globals: { notEqual: true },
            errors: [createError("notEqual")],
        },
        {
            code: testUtils.wrapInTest("notStrictEqual(a, b);"),
            globals: { notStrictEqual: true },
            errors: [createError("notStrictEqual")],
        },
        {
            code: testUtils.wrapInTest("notDeepEqual(a, b);"),
            globals: { notDeepEqual: true },
            errors: [createError("notDeepEqual")],
        },
        {
            code: testUtils.wrapInTest("notPropEqual(a, b);"),
            globals: { notPropEqual: true },
            errors: [createError("notPropEqual")],
        },
        {
            code: testUtils.wrapInTest("raises(function () {}, TypeError);"),
            globals: { raises: true },
            errors: [createError("raises")],
        },
        {
            code: testUtils.wrapInTest("throws(function () {}, TypeError);"),
            globals: { throws: true },
            errors: [createError("throws")],
        },
    ],
});
