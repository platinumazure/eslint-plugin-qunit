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

        // equal is not within test context
        "equal(a, b);"
    ],

    invalid: [
        {
            code: "QUnit.test('Name', function (assert) { assert.equal(a, b); });",
            errors: [{
                messageId: "unexpectedAssertEqual",
                data: { assertVar: "assert" }
            }]
        },
        {
            code: "QUnit.test('Name', function (foo) { foo.equal(a, b); });",
            errors: [{
                messageId: "unexpectedAssertEqual",
                data: { assertVar: "foo" }
            }]
        },
        {
            code: "QUnit.test('Name', function (assert) { equal(a, b); });",
            errors: [{
                messageId: "unexpectedGlobalEqual"
            }]
        },
        {
            code: "QUnit.test('Name', function () { equal(a, b); });",
            errors: [{
                messageId: "unexpectedGlobalEqual"
            }]
        }
    ]
});
