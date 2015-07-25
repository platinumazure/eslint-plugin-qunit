/**
 * @fileoverview Ensure async hooks are resolved in QUnit tests.
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

eslintTester.addRuleTest("lib/rules/resolve-async", {

    valid: [
        "test('name', function () { stop(); start(); });",
        "asyncTest('name', function () { start(); });",
        "QUnit.test('name', function () { stop(); start(); });",
        "QUnit.asyncTest('name', function () { start(); });"
    ],

    invalid: [
        {
            code: "asyncTest('name', function () {});",
            errors: [{ message: "" }]
        }
    ]

});
