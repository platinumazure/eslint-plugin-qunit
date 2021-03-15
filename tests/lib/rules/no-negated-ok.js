/**
 * @fileoverview Forbid the use of negations in assert.ok/notOk.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-negated-ok"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Helper functions
//------------------------------------------------------------------------------

function wrap(code) {
    return `QUnit.test('test', function (assert) { ${code} });`;
}

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
        wrap("ok(foo)"),
        wrap("ok(foo, 'message')"),
        wrap("assert.ok(foo)"),
        wrap("assert.ok(foo, 'message')"),

        // notOk
        wrap("assert.notOk(foo)"),
        wrap("assert.notOk(foo, 'message')"),

        // double negation is allowed
        wrap("ok(!!foo)"),
        wrap("ok(!!foo, 'message')"),
        wrap("assert.ok(!!foo)"),
        wrap("assert.ok(!!foo, 'message')"),
        wrap("assert.notOk(!!foo)"),
        wrap("assert.notOk(!!foo, 'message')"),

        // quadruple negation is allowed (but seriously?)
        wrap("ok(!!!!foo)"),
        wrap("ok(!!!!foo, 'message')"),
        wrap("assert.ok(!!!!foo)"),
        wrap("assert.ok(!!!!foo, 'message')"),
        wrap("assert.notOk(!!!!foo)"),
        wrap("assert.notOk(!!!!foo, 'message')"),

        // global ok with negation is accepted since there is no notOk
        wrap("ok(!foo)"),
        wrap("ok(!foo, 'message')"),

        // no such thing as global notOk, but want to make sure we don't flag
        wrap("notOk(!foo)"),
        wrap("notOk(!foo, 'message')"),

        // only logical negation should be reported
        wrap("ok(-foo)"),
        wrap("ok(~foo)"),
        wrap("assert.ok(-foo)"),
        wrap("assert.ok(~foo)"),
        wrap("assert.notOk(-foo)"),
        wrap("assert.notOk(~foo)"),

        // no arguments
        wrap("ok()"),
        wrap("assert.ok()"),
        wrap("assert.notOk()"),

        // different assertions can have negation
        wrap("equal(!a, true)"),

        // unknown objects in path
        wrap("assert.ok.foo(!a)"),
        wrap("foo.assert.ok(!a)"),
        wrap("foo.assert.bar.ok(!a)"),
        wrap("foo.assert.bar.ok.baz(!a)")
    ],

    invalid: [
        // ok
        {
            code: wrap("assert.ok(!foo)"),
            output: wrap("assert.equal(foo, false)"),
            options: [{ fixToNotOk: false }],
            errors: [createError("assert.ok")]
        },
        {
            code: wrap("assert.ok(!foo)"),
            output: wrap("assert.notOk(foo)"),
            options: [{ fixToNotOk: true }],
            errors: [createError("assert.ok")]
        },
        {
            // fixToNotOk = true (implicit since this is the option's default)
            code: wrap("assert.ok(!foo)"),
            output: wrap("assert.notOk(foo)"),
            errors: [createError("assert.ok")]
        },

        // ok (with message)
        {
            code: wrap("assert.ok(!foo, 'message')"),
            output: wrap("assert.equal(foo, false, 'message')"),
            options: [{ fixToNotOk: false }],
            errors: [createError("assert.ok")]
        },
        {
            code: wrap("assert.ok(!foo, 'message')"),
            output: wrap("assert.notOk(foo, 'message')"),
            options: [{ fixToNotOk: true }],
            errors: [createError("assert.ok")]
        },
        {
            // fixToNotOk = true (implicit since this is the option's default)
            code: wrap("assert.ok(!foo, 'message')"),
            output: wrap("assert.notOk(foo, 'message')"),
            errors: [createError("assert.ok")]
        },

        // notOk
        {
            code: wrap("assert.notOk(!foo)"),
            output: wrap("assert.ok(foo)"),
            errors: [createError("assert.notOk")]
        },
        {
            code: wrap("assert.notOk(!foo, 'message')"),
            output: wrap("assert.ok(foo, 'message')"),
            errors: [createError("assert.notOk")]
        },

        // triple negation is not allowed
        {
            code: wrap("assert.ok(!!!foo)"),
            output: wrap("assert.equal(foo, false)"),
            options: [{ fixToNotOk: false }],
            errors: [createError("assert.ok")]
        },
        {
            code: wrap("assert.ok(!!!foo)"),
            output: wrap("assert.notOk(foo)"),
            options: [{ fixToNotOk: true }],
            errors: [createError("assert.ok")]
        },
        {
            // fixToNotOk = true (implicit since this is the option's default)
            code: wrap("assert.ok(!!!foo)"),
            output: wrap("assert.notOk(foo)"),
            errors: [createError("assert.ok")]
        },

        // triple negation is not allowed (with message)
        {
            code: wrap("assert.ok(!!!foo, 'message')"),
            output: wrap("assert.equal(foo, false, 'message')"),
            options: [{ fixToNotOk: false }],
            errors: [createError("assert.ok")]
        },
        {
            code: wrap("assert.ok(!!!foo, 'message')"),
            output: wrap("assert.notOk(foo, 'message')"),
            options: [{ fixToNotOk: true }],
            errors: [createError("assert.ok")]
        },
        {
            // fixToNotOk = true (implicit since this is the option's default)
            code: wrap("assert.notOk(!!!foo)"),
            output: wrap("assert.ok(foo)"),
            errors: [createError("assert.notOk")]
        },

        // triple negation is not allowed (with notOk)
        {
            code: wrap("assert.notOk(!!!foo, 'message')"),
            output: wrap("assert.ok(foo, 'message')"),
            errors: [createError("assert.notOk")]
        }
    ]

});
