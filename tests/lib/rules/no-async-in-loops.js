/**
 * @fileoverview Forbid the use of async within loops.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require("eslint").linter,
    ESLintTester = require("eslint-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);

eslintTester.addRuleTest("lib/rules/no-async-in-loops", {

    valid: [
        // stop()/start()
        "test('name', function () { stop(); start(); });",
        "asyncTest('name', function () { stop(); start(); });",

        // assert.async()
        "test('name', function (assert) { var done = assert.async(); });",
        "asyncTest('name', function (assert) { var done = assert.async(); });"
    ],

    invalid: [
        // stop()
        {
            code: "test('name', function () { while (false) stop(); });",
            errors: [{
                message: "Unexpected stop() in while loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { while (false) { stop(); } });",
            errors: [{
                message: "Unexpected stop() in while loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { do stop(); while (false); });",
            errors: [{
                message: "Unexpected stop() in do-while loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { do { stop(); } while (false); });",
            errors: [{
                message: "Unexpected stop() in do-while loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (;;) stop(); });",
            errors: [{
                message: "Unexpected stop() in for loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (;;) { stop(); } });",
            errors: [{
                message: "Unexpected stop() in for loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (i in x) stop(); });",
            errors: [{
                message: "Unexpected stop() in for-in loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (i in x) stop(); });",
            errors: [{
                message: "Unexpected stop() in for-in loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (i of x) stop(); });",
            ecmaFeatures: { forOf: true },
            errors: [{
                message: "Unexpected stop() in for-of loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (i of x) stop(); });",
            ecmaFeatures: { forOf: true },
            errors: [{
                message: "Unexpected stop() in for-of loop",
                type: "CallExpression"
            }]
        },

        // QUnit.stop()
        {
            code: "test('name', function () { while (false) QUnit.stop(); });",
            errors: [{
                message: "Unexpected stop() in while loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { while (false) { QUnit.stop(); } });",
            errors: [{
                message: "Unexpected stop() in while loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { do QUnit.stop(); while (false); });",
            errors: [{
                message: "Unexpected stop() in do-while loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { do { QUnit.stop(); } while (false); });",
            errors: [{
                message: "Unexpected stop() in do-while loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (;;) QUnit.stop(); });",
            errors: [{
                message: "Unexpected stop() in for loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (;;) { QUnit.stop(); } });",
            errors: [{
                message: "Unexpected stop() in for loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (i in x) QUnit.stop(); });",
            errors: [{
                message: "Unexpected stop() in for-in loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (i in x) QUnit.stop(); });",
            errors: [{
                message: "Unexpected stop() in for-in loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (i of x) QUnit.stop(); });",
            ecmaFeatures: { forOf: true },
            errors: [{
                message: "Unexpected stop() in for-of loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (i of x) QUnit.stop(); });",
            ecmaFeatures: { forOf: true },
            errors: [{
                message: "Unexpected stop() in for-of loop",
                type: "CallExpression"
            }]
        },

        // start()
        {
            code: "test('name', function () { while (false) start(); });",
            errors: [{
                message: "Unexpected start() in while loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { while (false) { start(); } });",
            errors: [{
                message: "Unexpected start() in while loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { do start(); while (false); });",
            errors: [{
                message: "Unexpected start() in do-while loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { do { start(); } while (false); });",
            errors: [{
                message: "Unexpected start() in do-while loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (;;) start(); });",
            errors: [{
                message: "Unexpected start() in for loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (;;) { start(); } });",
            errors: [{
                message: "Unexpected start() in for loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (i in x) start(); });",
            errors: [{
                message: "Unexpected start() in for-in loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (i in x) start(); });",
            errors: [{
                message: "Unexpected start() in for-in loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (i of x) start(); });",
            ecmaFeatures: { forOf: true },
            errors: [{
                message: "Unexpected start() in for-of loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (i of x) start(); });",
            ecmaFeatures: { forOf: true },
            errors: [{
                message: "Unexpected start() in for-of loop",
                type: "CallExpression"
            }]
        },

        // QUnit.start()
        {
            code: "test('name', function () { while (false) QUnit.start(); });",
            errors: [{
                message: "Unexpected start() in while loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { while (false) { QUnit.start(); } });",
            errors: [{
                message: "Unexpected start() in while loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { do QUnit.start(); while (false); });",
            errors: [{
                message: "Unexpected start() in do-while loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { do { QUnit.start(); } while (false); });",
            errors: [{
                message: "Unexpected start() in do-while loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (;;) QUnit.start(); });",
            errors: [{
                message: "Unexpected start() in for loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (;;) { QUnit.start(); } });",
            errors: [{
                message: "Unexpected start() in for loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (i in x) QUnit.start(); });",
            errors: [{
                message: "Unexpected start() in for-in loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (i in x) QUnit.start(); });",
            errors: [{
                message: "Unexpected start() in for-in loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (i of x) QUnit.start(); });",
            ecmaFeatures: { forOf: true },
            errors: [{
                message: "Unexpected start() in for-of loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (i of x) QUnit.start(); });",
            ecmaFeatures: { forOf: true },
            errors: [{
                message: "Unexpected start() in for-of loop",
                type: "CallExpression"
            }]
        },

        // assert.async()
        {
            code: "test('name', function () { while (false) assert.async(); });",
            errors: [{
                message: "Unexpected assert.async() in while loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { while (false) { assert.async(); } });",
            errors: [{
                message: "Unexpected assert.async() in while loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { do assert.async(); while (false); });",
            errors: [{
                message: "Unexpected assert.async() in do-while loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { do { assert.async(); } while (false); });",
            errors: [{
                message: "Unexpected assert.async() in do-while loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (;;) assert.async(); });",
            errors: [{
                message: "Unexpected assert.async() in for loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (;;) { assert.async(); } });",
            errors: [{
                message: "Unexpected assert.async() in for loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (i in x) assert.async(); });",
            errors: [{
                message: "Unexpected assert.async() in for-in loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (i in x) assert.async(); });",
            errors: [{
                message: "Unexpected assert.async() in for-in loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (i of x) assert.async(); });",
            ecmaFeatures: { forOf: true },
            errors: [{
                message: "Unexpected assert.async() in for-of loop",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { for (i of x) assert.async(); });",
            ecmaFeatures: { forOf: true },
            errors: [{
                message: "Unexpected assert.async() in for-of loop",
                type: "CallExpression"
            }]
        }
    ]

});
