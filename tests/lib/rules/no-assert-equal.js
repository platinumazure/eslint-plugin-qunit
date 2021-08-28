/**
 * @fileoverview Forbid the use of assert.equal and suggest other assertions.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-assert-equal"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-assert-equal", rule, {
    valid: [
        "QUnit.test('Name', function (assert) { assert.strictEqual(a, b); });",
        "QUnit.test('Name', function (assert) { assert.deepEqual(a, b); });",
        "QUnit.test('Name', function (assert) { assert.propEqual(a, b); });",
        "QUnit.test('Name', function (foo) { foo.strictEqual(a, b); });",
        "QUnit.test('Name', function (foo) { foo.deepEqual(a, b); });",
        "QUnit.test('Name', function (foo) { foo.propEqual(a, b); });",
        "QUnit.test('Name', function (assert) { strictEqual(a, b); });",
        "QUnit.test('Name', function (assert) { deepEqual(a, b); });",
        "QUnit.test('Name', function (assert) { propEqual(a, b); });",
        "QUnit.test('Name', function () { strictEqual(a, b); });",
        "QUnit.test('Name', function () { deepEqual(a, b); });",
        "QUnit.test('Name', function () { propEqual(a, b); });",

        // global `equal` but not within test context
        {
            code: "equal(a, b);",
            globals: { equal: true }
        },

        // `equal` but not the global
        "function equal(a,b) {}; QUnit.test('Name', function () { equal(a, b); });"
    ],

    invalid: [
        {
            code: "QUnit.test('Name', function (assert) { assert.equal(a, b); });",
            errors: [{
                messageId: "unexpectedAssertEqual",
                data: { assertVar: "assert" },
                suggestions: [
                    {
                        messageId: "switchToDeepEqual",
                        output: "QUnit.test('Name', function (assert) { assert.deepEqual(a, b); });"
                    },
                    {
                        messageId: "switchToPropEqual",
                        output: "QUnit.test('Name', function (assert) { assert.propEqual(a, b); });"
                    },
                    {
                        messageId: "switchToStrictEqual",
                        output: "QUnit.test('Name', function (assert) { assert.strictEqual(a, b); });"
                    }
                ]
            }]
        },
        {
            code: "QUnit.test('Name', function (foo) { foo.equal(a, b); });",
            errors: [{
                messageId: "unexpectedAssertEqual",
                data: { assertVar: "foo" },
                suggestions: [
                    {
                        messageId: "switchToDeepEqual",
                        output: "QUnit.test('Name', function (foo) { foo.deepEqual(a, b); });"
                    },
                    {
                        messageId: "switchToPropEqual",
                        output: "QUnit.test('Name', function (foo) { foo.propEqual(a, b); });"
                    },
                    {
                        messageId: "switchToStrictEqual",
                        output: "QUnit.test('Name', function (foo) { foo.strictEqual(a, b); });"
                    }
                ]
            }]
        },
        {
            code: "QUnit.test('Name', function (assert) { equal(a, b); });",
            globals: { equal: true },
            errors: [{
                messageId: "unexpectedGlobalEqual",
                suggestions: [
                    {
                        messageId: "switchToDeepEqual",
                        output: "QUnit.test('Name', function (assert) { deepEqual(a, b); });"
                    },
                    {
                        messageId: "switchToPropEqual",
                        output: "QUnit.test('Name', function (assert) { propEqual(a, b); });"
                    },
                    {
                        messageId: "switchToStrictEqual",
                        output: "QUnit.test('Name', function (assert) { strictEqual(a, b); });"
                    }
                ]
            }]
        },
        {
            code: "QUnit.test('Name', function () { equal(a, b); });",
            globals: { equal: true },
            errors: [{
                messageId: "unexpectedGlobalEqual",
                suggestions: [
                    {
                        messageId: "switchToDeepEqual",
                        output: "QUnit.test('Name', function () { deepEqual(a, b); });"
                    },
                    {
                        messageId: "switchToPropEqual",
                        output: "QUnit.test('Name', function () { propEqual(a, b); });"
                    },
                    {
                        messageId: "switchToStrictEqual",
                        output: "QUnit.test('Name', function () { strictEqual(a, b); });"
                    }
                ]
            }]
        }
    ]
});
