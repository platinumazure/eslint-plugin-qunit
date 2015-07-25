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
        "QUnit.asyncTest('name', function () { start(); });",
        "test('name', function (assert) { var done = assert.async(); done(); });",
        "QUnit.test('name', function (assert) { var done = assert.async(); done(); });",
        "test('name', function (assert) { var done; done = assert.async(); done(); });",
        "QUnit.test('name', function (assert) { var done; done = assert.async(); done(); });"
    ],

    invalid: [
        {
            code: "asyncTest('name', function () {});",
            errors: [{
                message: "Need 1 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { stop(); });",
            errors: [{
                message: "Need 1 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.asyncTest('name', function () {});",
            errors: [{
                message: "Need 1 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function () { stop(); });",
            errors: [{
                message: "Need 1 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function (assert) { var done = assert.async(); });",
            errors: [{
                message: "Async callback \"done\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function (assert) { var done = assert.async(); });",
            errors: [{
                message: "Async callback \"done\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function (assert) { var done; done = assert.async(); });",
            errors: [{
                message: "Async callback \"done\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function (assert) { var done; done = assert.async(); });",
            errors: [{
                message: "Async callback \"done\" is not called",
                type: "CallExpression"
            }]
        }
    ]

});
