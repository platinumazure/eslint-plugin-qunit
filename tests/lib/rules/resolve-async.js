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
        // stop()/start()
        "test('name', function () { stop(); start(); });",
        "asyncTest('name', function () { start(); });",
        "QUnit.test('name', function () { stop(); start(); });",
        "QUnit.asyncTest('name', function () { start(); });",
        "test('name', function () { QUnit.stop(); QUnit.start(); });",
        "asyncTest('name', function () { QUnit.start(); });",
        "QUnit.test('name', function () { QUnit.stop(); QUnit.start(); });",
        "QUnit.asyncTest('name', function () { QUnit.start(); });",

        // assert.async()
        "test('name', function (assert) { var done = assert.async(); done(); });",
        "QUnit.test('name', function (assert) { var done = assert.async(); done(); });",
        "test('name', function (assert) { var done; done = assert.async(); done(); });",
        "QUnit.test('name', function (assert) { var done; done = assert.async(); done(); });"
    ],

    invalid: [
        // stop()/start()
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
            code: "asyncTest('name', function () {});",
            errors: [{
                message: "Need 1 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { QUnit.stop(); });",
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
            code: "QUnit.test('name', function () { QUnit.stop(); });",
            errors: [{
                message: "Need 1 more start() calls",
                type: "CallExpression"
            }]
        },

        // Multiple start() calls needed
        {
            code: "asyncTest('name', function () { stop(); });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { stop(); stop(); });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { QUnit.stop(); stop(); });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.asyncTest('name', function () { stop(); });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function () { stop(); stop(); });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function () { stop(); QUnit.stop(); });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "asyncTest('name', function () { QUnit.stop(); });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { QUnit.stop(); QUnit.stop(); });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.asyncTest('name', function () { QUnit.stop(); });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function () { QUnit.stop(); QUnit.stop(); });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "CallExpression"
            }]
        },

        // assert.async()
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
        },

        // Multiple assert.async() calls
        {
            code: "test('name', function (assert) { var done1 = assert.async(), done2 = assert.async(); done1(); });",
            errors: [{
                message: "Async callback \"done2\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function (assert) { var done1 = assert.async(), done2 = assert.async(); });",
            errors: [{
                message: "Async callback \"done1\" is not called",
                type: "CallExpression"
            }, {
                message: "Async callback \"done2\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function (assert) { var done1 = assert.async(), done2 = assert.async(); done1(); });",
            errors: [{
                message: "Async callback \"done2\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function (assert) { var done1 = assert.async(), done2 = assert.async(); });",
            errors: [{
                message: "Async callback \"done1\" is not called",
                type: "CallExpression"
            }, {
                message: "Async callback \"done2\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function (assert) { var done1, done2; done1 = assert.async(); done2 = assert.async(); done1(); });",
            errors: [{
                message: "Async callback \"done2\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function (assert) { var done1, done2; done1 = assert.async(); done2 = assert.async(); });",
            errors: [{
                message: "Async callback \"done1\" is not called",
                type: "CallExpression"
            }, {
                message: "Async callback \"done2\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function (assert) { var done1, done2; done1 = assert.async(); done2 = assert.async(); done1(); });",
            errors: [{
                message: "Async callback \"done2\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function (assert) { var done1, done2; done1 = assert.async(); done2 = assert.async(); });",
            errors: [{
                message: "Async callback \"done1\" is not called",
                type: "CallExpression"
            }, {
                message: "Async callback \"done2\" is not called",
                type: "CallExpression"
            }]
        }
    ]

});
