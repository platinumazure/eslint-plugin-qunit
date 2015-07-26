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
        "QUnit.test('name', function (assert) { var done; done = assert.async(); done(); });",

        // start/stop calls outside of test context should not affect count
        "start(); test('name', function () { stop(); start(); });",
        "stop(); test('name', function () { stop(); start(); });",
        "start(); asyncTest('name', function () { start(); });",
        "stop(); asyncTest('name', function () { start(); });",
        "start(); QUnit.test('name', function () { stop(); start(); });",
        "stop(); QUnit.test('name', function () { stop(); start(); });",
        "start(); QUnit.asyncTest('name', function () { start(); });",
        "stop(); QUnit.asyncTest('name', function () { start(); });",
        "QUnit.start(); test('name', function () { QUnit.stop(); QUnit.start(); });",
        "QUnit.stop(); test('name', function () { QUnit.stop(); QUnit.start(); });",
        "QUnit.start(); asyncTest('name', function () { QUnit.start(); });",
        "QUnit.stop(); asyncTest('name', function () { QUnit.start(); });",
        "QUnit.start(); QUnit.test('name', function () { QUnit.stop(); QUnit.start(); });",
        "QUnit.stop(); QUnit.test('name', function () { QUnit.stop(); QUnit.start(); });",
        "QUnit.start(); QUnit.asyncTest('name', function () { QUnit.start(); });",
        "QUnit.stop(); QUnit.asyncTest('name', function () { QUnit.start(); });",

        // assert.async() calls outside of test context should not matter
        "var done = assert.async(); QUnit.test('name', function (assert) {});",
        "var done = assert.async(); QUnit.test('name', function (assert) { done(); });",
        "var done1 = assert.async(); QUnit.test('name', function (assert) { var done2 = assert.async(); done2(); });"
    ],

    invalid: [
        // stop()/start()
        {
            code: "asyncTest('name', function () {});",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { stop(); });",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.asyncTest('name', function () {});",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function () { stop(); });",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "asyncTest('name', function () {});",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { QUnit.stop(); });",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.asyncTest('name', function () {});",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function () { QUnit.stop(); });",
            errors: [{
                message: "Need 1 more start() call",
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
        },

        // start/stop calls outside of test context should not affect count
        {
            code: "start(); asyncTest('name', function () {});",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "start(); test('name', function () { stop(); });",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "stop(); asyncTest('name', function () {});",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "stop(); test('name', function () { stop(); });",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },

        // assert.async() calls outside of test context should not matter
        {
            code: "var done = assert.async(); asyncTest('name', function () { done(); });",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "var done1 = assert.async(); QUnit.test('name', function (assert) { var done2 = assert.async(); done1(); });",
            errors: [{
                message: "Async callback \"done2\" is not called",
                type: "CallExpression"
            }]
        }
    ]

});
