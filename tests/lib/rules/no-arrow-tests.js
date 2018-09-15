/**
 * @fileoverview Forbid arrow functions as QUnit test/module callbacks.
 * @author Kevin Partington
 * @copyright 2016 Kevin Partington. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-arrow-tests"),
    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-arrow-tests", rule, {

    valid: [
        // tests
        "QUnit.test('test', function (assert) { assert.ok(true); });",
        "QUnit.test('test', function () { ok(true); });",
        "QUnit.asyncTest('test', function (assert) { assert.ok(true); });",
        "QUnit.asyncTest('test', function () { ok(true); });",
        "test('test', function (assert) { assert.ok(true); });",
        "test('test', function () { ok(true); });",
        "asyncTest('test', function (assert) { assert.ok(true); });",
        "asyncTest('test', function () { ok(true); });",

        // modules
        "QUnit.module('module', { setup: function () {} });",
        "QUnit.module('module', { teardown: function () {} });",
        "QUnit.module('module', { beforeEach: function () {} });",
        "QUnit.module('module', { afterEach: function () {} });",
        "module('module', { setup: function () {} });",
        "module('module', { teardown: function () {} });",
        "module('module', { beforeEach: function () {} });",
        "module('module', { afterEach: function () {} });",

        // not actually module hooks
        {
            code: [
                "var a = {",
                "    setup: () => {},",
                "    teardown: () => {},",
                "    beforeEach: () => {},",
                "    afterEach: () => {}",
                "};"
            ].join("\n"),
            parserOptions: { ecmaVersion: 6 }
        }
    ],

    invalid: [
        // tests
        {
            code: "QUnit.test('test', (assert) => { assert.ok(true); });",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "noArrowFunction",
                type: "ArrowFunctionExpression"
            }]
        },
        {
            code: "QUnit.test('test', () => { ok(true); });",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "noArrowFunction",
                type: "ArrowFunctionExpression"
            }]
        },
        {
            code: "QUnit.asyncTest('test', (assert) => { assert.ok(true); });",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "noArrowFunction",
                type: "ArrowFunctionExpression"
            }]
        },
        {
            code: "QUnit.asyncTest('test', () => { ok(true); });",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "noArrowFunction",
                type: "ArrowFunctionExpression"
            }]
        },
        {
            code: "test('test', (assert) => { assert.ok(true); });",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "noArrowFunction",
                type: "ArrowFunctionExpression"
            }]
        },
        {
            code: "test('test', () => { ok(true); });",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "noArrowFunction",
                type: "ArrowFunctionExpression"
            }]
        },
        {
            code: "asyncTest('test', (assert) => { assert.ok(true); });",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "noArrowFunction",
                type: "ArrowFunctionExpression"
            }]
        },
        {
            code: "asyncTest('test', () => { ok(true); });",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "noArrowFunction",
                type: "ArrowFunctionExpression"
            }]
        },

        // modules
        {
            code: "QUnit.module('module', { setup: () => {} });",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "noArrowFunction",
                type: "ArrowFunctionExpression"
            }]
        },
        {
            code: "QUnit.module('module', { teardown: () => {} });",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "noArrowFunction",
                type: "ArrowFunctionExpression"
            }]
        },
        {
            code: "QUnit.module('module', { beforeEach: () => {} });",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "noArrowFunction",
                type: "ArrowFunctionExpression"
            }]
        },
        {
            code: "QUnit.module('module', { afterEach: () => {} });",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "noArrowFunction",
                type: "ArrowFunctionExpression"
            }]
        },
        {
            code: "module('module', { setup: () => {} });",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "noArrowFunction",
                type: "ArrowFunctionExpression"
            }]
        },
        {
            code: "module('module', { teardown: () => {} });",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "noArrowFunction",
                type: "ArrowFunctionExpression"
            }]
        },
        {
            code: "module('module', { beforeEach: () => {} });",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "noArrowFunction",
                type: "ArrowFunctionExpression"
            }]
        },
        {
            code: "module('module', { afterEach: () => {} });",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "noArrowFunction",
                type: "ArrowFunctionExpression"
            }]
        }
    ]
});
