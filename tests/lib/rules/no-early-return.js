/**
 * @fileoverview prevent early return in a QUnit test
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-early-return"),
    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-early-return", rule, {
    valid: [
        // Inside nested function (assertions outside of nested function)
        "QUnit.test('a test', function (assert) { function foo() { return; } assert.ok(true); });",
        "QUnit.test('a test', function (assert) { (function () { return; })(); assert.ok(true); });",
        {
            code: "QUnit.test('a test', function (assert) { () => { return; }; assert.ok(true); });",
            parserOptions: { ecmaVersion: 6 }
        },

        // Inside nested function (assertions inside nested function before return)
        "QUnit.test('a test', function (assert) { function foo() { assert.ok(true); return; } });",
        "QUnit.test('a test', function (assert) { (function () { assert.ok(true); return; })(); });",
        {
            code: "QUnit.test('a test', function (assert) { () => { assert.ok(true); return; }; });",
            parserOptions: { ecmaVersion: 6 }
        },

        // Conditially run tests are okay
        "QUnit[shouldRunTest() ? 'test' : 'skip']('a test', function (assert) { assert.ok(true); });",
        "if (shouldRunTest()) { QUnit.test('a test', function (assert) { assert.ok(true); }); }",

        // Return statement outside of test is fine
        "(function () { return true; }());"
    ],

    invalid: [
        {
            code: "QUnit.test('a test', function (assert) { if (true) return; assert.ok(true); });",
            errors: [{
                message: "Do not return early from a QUnit test.",
                type: "ReturnStatement"
            }]
        },

        // Return in nested function before assertion is considered early return
        {
            code: "QUnit.test('a test', function (assert) { setTimeout(function () { if (true) return; assert.ok(true); }, 0); });",
            errors: [{
                message: "Do not return early from a QUnit test.",
                type: "ReturnStatement"
            }]
        },
        {
            code: "QUnit.test('a test', function (assert) { setTimeout(function () { assert.ok(true); if (true) return; assert.ok(true); }, 0); });",
            errors: [{
                message: "Do not return early from a QUnit test.",
                type: "ReturnStatement"
            }]
        },

        // Report errors in multiple scopes with assertions
        {
            code: "QUnit.test('a test', function (assert) { setTimeout(function () { return; assert.ok(true); }, 0); return; assert.ok(true); });",
            errors: [{
                message: "Do not return early from a QUnit test.",
                type: "ReturnStatement",
                line: 1,
                column: 67
            }, {
                message: "Do not return early from a QUnit test.",
                type: "ReturnStatement",
                line: 1,
                column: 99
            }]
        }
    ]
});
