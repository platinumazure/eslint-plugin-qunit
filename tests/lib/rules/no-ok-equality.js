/**
 * @fileoverview Forbid the use of equality comparisons in ok/notOk assertions.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-ok-equality"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

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
                message: "Unexpected equality comparison in assert.ok call. Use assert.strictEqual(x, 1) instead."
            }]
        },
        {
            code: "test('Name', function (assert) { assert.notOk(x === 1); });",
            errors: [{
                message: "Unexpected equality comparison in assert.notOk call. Use assert.notStrictEqual(x, 1) instead."
            }]
        },
        {
            code: "test('Name', function () { ok(x === 1); });",
            options: [{ allowGlobal: true }],
            errors: [{
                message: "Unexpected equality comparison in ok call. Use strictEqual(x, 1) instead."
            }]
        },
        {
            code: "test('Name', function () { notOk(x === 1); });",
            options: [{ allowGlobal: true }],
            errors: [{
                message: "Unexpected equality comparison in notOk call. Use notStrictEqual(x, 1) instead."
            }]
        },
        {
            code: "test('Name', function (assert) { assert.ok(x == 1); });",
            errors: [{
                message: "Unexpected equality comparison in assert.ok call. Use assert.equal(x, 1) instead."
            }]
        },
        {
            code: "test('Name', function (assert) { assert.notOk(x == 1); });",
            errors: [{
                message: "Unexpected equality comparison in assert.notOk call. Use assert.notEqual(x, 1) instead."
            }]
        },
        {
            code: "test('Name', function () { ok(x == 1); });",
            options: [{ allowGlobal: true }],
            errors: [{
                message: "Unexpected equality comparison in ok call. Use equal(x, 1) instead."
            }]
        },
        {
            code: "test('Name', function () { notOk(x == 1); });",
            options: [{ allowGlobal: true }],
            errors: [{
                message: "Unexpected equality comparison in notOk call. Use notEqual(x, 1) instead."
            }]
        },
        {
            code: "test('Name', function (assert) { assert.ok(x !== 1); });",
            errors: [{
                message: "Unexpected equality comparison in assert.ok call. Use assert.notStrictEqual(x, 1) instead."
            }]
        },
        {
            code: "test('Name', function (assert) { assert.notOk(x !== 1); });",
            errors: [{
                message: "Unexpected equality comparison in assert.notOk call. Use assert.strictEqual(x, 1) instead."
            }]
        },
        {
            code: "test('Name', function () { ok(x !== 1); });",
            options: [{ allowGlobal: true }],
            errors: [{
                message: "Unexpected equality comparison in ok call. Use notStrictEqual(x, 1) instead."
            }]
        },
        {
            code: "test('Name', function () { notOk(x !== 1); });",
            options: [{ allowGlobal: true }],
            errors: [{
                message: "Unexpected equality comparison in notOk call. Use strictEqual(x, 1) instead."
            }]
        },
        {
            code: "test('Name', function (assert) { assert.ok(x != 1); });",
            errors: [{
                message: "Unexpected equality comparison in assert.ok call. Use assert.notEqual(x, 1) instead."
            }]
        },
        {
            code: "test('Name', function (assert) { assert.notOk(x != 1); });",
            errors: [{
                message: "Unexpected equality comparison in assert.notOk call. Use assert.equal(x, 1) instead."
            }]
        },
        {
            code: "test('Name', function () { ok(x != 1); });",
            options: [{ allowGlobal: true }],
            errors: [{
                message: "Unexpected equality comparison in ok call. Use notEqual(x, 1) instead."
            }]
        },
        {
            code: "test('Name', function () { notOk(x != 1); });",
            options: [{ allowGlobal: true }],
            errors: [{
                message: "Unexpected equality comparison in notOk call. Use equal(x, 1) instead."
            }]
        }
    ]

});
