/**
 * @fileoverview Forbid the use of equality comparisons in ok/notOk assertions.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-ok-equality"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();

ruleTester.run("no-ok-equality", rule, {

    valid: [
        "test('Name', function (assert) { assert.ok(x); });",
        "test('Name', function (assert) { assert.ok(x, 'message'); });",
        "test('Name', function (assert) { assert.notOk(x); });",
        "test('Name', function (assert) { assert.notOk(x, 'message'); });",
        "test('Name', function (assert) { assert.ok(x > 0); });",
        "test('Name', function (assert) { assert.ok(x > 0, 'message'); });",
        "test('Name', function (assert) { assert.notOk(x > 0); });",
        "test('Name', function (assert) { assert.notOk(x > 0, 'message'); });",
        "test('Name', function (foo) { foo.ok(x); });",
        "test('Name', function (foo) { foo.ok(x, 'message'); });",
        "test('Name', function (foo) { foo.notOk(x); });",
        "test('Name', function (foo) { foo.notOk(x, 'message'); });",
        {
            code: "test('Name', function () { ok(x === 1); });",
            options: [{ allowGlobal: false }]
        },
        {
            code: "test('Name', function () { notOk(x === 1); });",
            options: [{ allowGlobal: false }]
        },
        {
            code: "test('Name', function () { ok(x == 1); });",
            options: [{ allowGlobal: false }]
        },
        {
            code: "test('Name', function () { notOk(x == 1); });",
            options: [{ allowGlobal: false }]
        },
        {
            code: "test('Name', function () { ok(x !== 1); });",
            options: [{ allowGlobal: false }]
        },
        {
            code: "test('Name', function () { notOk(x !== 1); });",
            options: [{ allowGlobal: false }]
        },
        {
            code: "test('Name', function () { ok(x != 1); });",
            options: [{ allowGlobal: false }]
        },
        {
            code: "test('Name', function () { notOk(x != 1); });",
            options: [{ allowGlobal: false }]
        }
    ],

    invalid: [
        {
            code: "test('Name', function (assert) { assert.ok(x === 1); });",
            errors: [{
                message: "Unexpected equality comparison in assert.ok call"
            }]
        },
        {
            code: "test('Name', function (assert) { assert.notOk(x === 1); });",
            errors: [{
                message: "Unexpected equality comparison in assert.notOk call"
            }]
        },
        {
            code: "test('Name', function () { ok(x === 1); });",
            options: [{ allowGlobal: true }],
            errors: [{
                message: "Unexpected equality comparison in ok call"
            }]
        },
        {
            code: "test('Name', function () { notOk(x === 1); });",
            options: [{ allowGlobal: true }],
            errors: [{
                message: "Unexpected equality comparison in notOk call"
            }]
        },
        {
            code: "test('Name', function (assert) { assert.ok(x == 1); });",
            errors: [{
                message: "Unexpected equality comparison in assert.ok call"
            }]
        },
        {
            code: "test('Name', function (assert) { assert.notOk(x == 1); });",
            errors: [{
                message: "Unexpected equality comparison in assert.notOk call"
            }]
        },
        {
            code: "test('Name', function () { ok(x == 1); });",
            options: [{ allowGlobal: true }],
            errors: [{
                message: "Unexpected equality comparison in ok call"
            }]
        },
        {
            code: "test('Name', function () { notOk(x == 1); });",
            options: [{ allowGlobal: true }],
            errors: [{
                message: "Unexpected equality comparison in notOk call"
            }]
        },
        {
            code: "test('Name', function (assert) { assert.ok(x !== 1); });",
            errors: [{
                message: "Unexpected equality comparison in assert.ok call"
            }]
        },
        {
            code: "test('Name', function (assert) { assert.notOk(x !== 1); });",
            errors: [{
                message: "Unexpected equality comparison in assert.notOk call"
            }]
        },
        {
            code: "test('Name', function () { ok(x !== 1); });",
            options: [{ allowGlobal: true }],
            errors: [{
                message: "Unexpected equality comparison in ok call"
            }]
        },
        {
            code: "test('Name', function () { notOk(x !== 1); });",
            options: [{ allowGlobal: true }],
            errors: [{
                message: "Unexpected equality comparison in notOk call"
            }]
        },
        {
            code: "test('Name', function (assert) { assert.ok(x != 1); });",
            errors: [{
                message: "Unexpected equality comparison in assert.ok call"
            }]
        },
        {
            code: "test('Name', function (assert) { assert.notOk(x != 1); });",
            errors: [{
                message: "Unexpected equality comparison in assert.notOk call"
            }]
        },
        {
            code: "test('Name', function () { ok(x != 1); });",
            options: [{ allowGlobal: true }],
            errors: [{
                message: "Unexpected equality comparison in ok call"
            }]
        },
        {
            code: "test('Name', function () { notOk(x != 1); });",
            options: [{ allowGlobal: true }],
            errors: [{
                message: "Unexpected equality comparison in notOk call"
            }]
        }
    ]

});
