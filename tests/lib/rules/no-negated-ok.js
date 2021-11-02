/**
 * @fileoverview Forbid the use of negations in assert.ok/notOk.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-negated-ok"),
    RuleTester = require("eslint").RuleTester,
    testUtils = require("../../testUtils");

//------------------------------------------------------------------------------
// Helper functions
//------------------------------------------------------------------------------

function createError(callee) {
    return {
        messageId: "noNegationInOk",
        data: {
            callee
        }
    };
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-negated-ok", rule, {

    valid: [
        // ok
        testUtils.wrap("ok(foo)"),
        testUtils.wrap("ok(foo, 'message')"),
        testUtils.wrap("assert.ok(foo)"),
        testUtils.wrap("assert.ok(foo, 'message')"),

        // notOk
        testUtils.wrap("assert.notOk(foo)"),
        testUtils.wrap("assert.notOk(foo, 'message')"),

        // double negation is allowed
        testUtils.wrap("ok(!!foo)"),
        testUtils.wrap("ok(!!foo, 'message')"),
        testUtils.wrap("assert.ok(!!foo)"),
        testUtils.wrap("assert.ok(!!foo, 'message')"),
        testUtils.wrap("assert.notOk(!!foo)"),
        testUtils.wrap("assert.notOk(!!foo, 'message')"),

        // quadruple negation is allowed (but seriously?)
        testUtils.wrap("ok(!!!!foo)"),
        testUtils.wrap("ok(!!!!foo, 'message')"),
        testUtils.wrap("assert.ok(!!!!foo)"),
        testUtils.wrap("assert.ok(!!!!foo, 'message')"),
        testUtils.wrap("assert.notOk(!!!!foo)"),
        testUtils.wrap("assert.notOk(!!!!foo, 'message')"),

        // global ok with negation is accepted since there is no notOk
        testUtils.wrap("ok(!foo)"),
        testUtils.wrap("ok(!foo, 'message')"),

        // no such thing as global notOk, but want to make sure we don't flag
        testUtils.wrap("notOk(!foo)"),
        testUtils.wrap("notOk(!foo, 'message')"),

        // only logical negation should be reported
        testUtils.wrap("ok(-foo)"),
        testUtils.wrap("ok(~foo)"),
        testUtils.wrap("assert.ok(-foo)"),
        testUtils.wrap("assert.ok(~foo)"),
        testUtils.wrap("assert.notOk(-foo)"),
        testUtils.wrap("assert.notOk(~foo)"),

        // no arguments
        testUtils.wrap("ok()"),
        testUtils.wrap("assert.ok()"),
        testUtils.wrap("assert.notOk()"),

        // different assertions can have negation
        testUtils.wrap("equal(!a, true)"),

        // unknown objects in path
        testUtils.wrap("assert.ok.foo(!a)"),
        testUtils.wrap("foo.assert.ok(!a)"),
        testUtils.wrap("foo.assert.bar.ok(!a)"),
        testUtils.wrap("foo.assert.bar.ok.baz(!a)"),

        // Boolean assertions, no negation
        testUtils.wrap("assert.true(foo)"),
        testUtils.wrap("assert.true(foo, 'message')"),
        testUtils.wrap("assert.false(foo)"),
        testUtils.wrap("assert.false(foo, 'message')")
    ],

    invalid: [
        // ok
        {
            code: testUtils.wrap("assert.ok(!foo)"),
            output: testUtils.wrap("assert.notOk(foo)"),
            errors: [createError("assert.ok")]
        },
        {
            code: testUtils.wrapArrow("assert.ok(!foo)"),
            output: testUtils.wrapArrow("assert.notOk(foo)"),
            parserOptions: { ecmaVersion: 6 },
            errors: [createError("assert.ok")]
        },

        // ok (with message)
        {
            code: testUtils.wrap("assert.ok(!foo, 'message')"),
            output: testUtils.wrap("assert.notOk(foo, 'message')"),
            errors: [createError("assert.ok")]
        },

        // notOk
        {
            code: testUtils.wrap("assert.notOk(!foo)"),
            output: testUtils.wrap("assert.ok(foo)"),
            errors: [createError("assert.notOk")]
        },
        {
            code: testUtils.wrap("assert.notOk(!foo, 'message')"),
            output: testUtils.wrap("assert.ok(foo, 'message')"),
            errors: [createError("assert.notOk")]
        },

        // triple negation is not allowed
        {
            code: testUtils.wrap("assert.ok(!!!foo)"),
            output: testUtils.wrap("assert.notOk(foo)"),
            errors: [createError("assert.ok")]
        },

        // triple negation is not allowed (with message)
        {
            code: testUtils.wrap("assert.notOk(!!!foo)"),
            output: testUtils.wrap("assert.ok(foo)"),
            errors: [createError("assert.notOk")]
        },

        // triple negation is not allowed (with notOk)
        {
            code: testUtils.wrap("assert.notOk(!!!foo, 'message')"),
            output: testUtils.wrap("assert.ok(foo, 'message')"),
            errors: [createError("assert.notOk")]
        },

        // true
        {
            code: testUtils.wrap("assert.true(!foo)"),
            output: testUtils.wrap("assert.false(foo)"),
            errors: [createError("assert.true")]
        },

        // false
        {
            code: testUtils.wrap("assert.false(!foo)"),
            output: testUtils.wrap("assert.true(foo)"),
            errors: [createError("assert.false")]
        }
    ]

});
