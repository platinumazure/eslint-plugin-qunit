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
        "QUnit.test('a test', function (assert) { function foo() { return; } });",
        "QUnit.test('a test', function (assert) { (function () { return; })(); });",
        {
            code: "QUnit.test('a test', function (assert) { () => { return; }; });",
            parserOptions: { ecmaVersion: 6 }
        },
        "QUnit[shouldRunTest() ? 'test' : 'skip']('a test', function () {});",
        "if (shouldRunTest()) { QUnit.test('a test', function () {}); }"
    ],

    invalid: [
        {
            code: "QUnit.test('a test', function () { return; });",
            errors: [{
                message: "Do not return early from a QUnit test.",
                type: "ReturnStatement"
            }]
        }
    ]
});
