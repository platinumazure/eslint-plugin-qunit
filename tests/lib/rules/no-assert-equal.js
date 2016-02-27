/**
 * @fileoverview Forbid the use of assert.equal and suggest other assertions.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-assert-equal"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ERROR_TEMPLATE_QUALIFIED = "Unexpected {{id}}.equal. Use {{id}}.strictEqual, {{id}}.deepEqual, or {{id}}.propEqual.",
    ERROR_TEMPLATE_GLOBAL = "Unexpected equal. Use strictEqual, deepEqual, or propEqual.";

function getErrorMessage(identifier) {
    return ERROR_TEMPLATE_QUALIFIED.replace(/\{\{id\}\}/g, identifier);
}

var ruleTester = new RuleTester();

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
            errors: [{ message: getErrorMessage("assert") }]
        },
        {
            code: "QUnit.test('Name', function (foo) { foo.equal(a, b); });",
            errors: [{ message: getErrorMessage("foo") }]
        },
        {
            code: "QUnit.test('Name', function (assert) { equal(a, b); });",
            errors: [{ message: ERROR_TEMPLATE_GLOBAL }]
        },
        {
            code: "QUnit.test('Name', function () { equal(a, b); });",
            errors: [{ message: ERROR_TEMPLATE_GLOBAL }]
        }
    ]
});
