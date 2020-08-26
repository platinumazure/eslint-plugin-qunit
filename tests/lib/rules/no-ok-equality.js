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
// Helpers
//------------------------------------------------------------------------------

function createError(assertion, suggestion, a, b) {
    return {
        messageId: "noEqualityCheckInOk",
        data: {
            assertion,
            suggestion,
            a,
            b
        }
    };
}

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
            output: "test('Name', function (assert) { assert.strictEqual(x, 1); });",
            errors: [
                createError("assert.ok", "assert.strictEqual", "x", "1")
            ]
        },
        {
            // With message:
            code: "test('Name', function (assert) { assert.ok(x === 1, 'my message'); });",
            output: "test('Name', function (assert) { assert.strictEqual(x, 1, 'my message'); });",
            errors: [
                createError("assert.ok", "assert.strictEqual", "x", "1")
            ]
        },
        {
            code: "test('Name', function (assert) { assert.notOk(x === 1); });",
            output: "test('Name', function (assert) { assert.notStrictEqual(x, 1); });",
            errors: [
                createError("assert.notOk", "assert.notStrictEqual", "x", "1")
            ]
        },
        {
            code: "test('Name', function () { ok(x === 1); });",
            output: "test('Name', function () { strictEqual(x, 1); });",
            options: [{ allowGlobal: true }],
            errors: [
                createError("ok", "strictEqual", "x", "1")
            ]
        },
        {
            code: "test('Name', function () { notOk(x === 1); });",
            output: "test('Name', function () { notStrictEqual(x, 1); });",
            options: [{ allowGlobal: true }],
            errors: [
                createError("notOk", "notStrictEqual", "x", "1")
            ]
        },
        {
            code: "test('Name', function (assert) { assert.ok(x == 1); });",
            output: "test('Name', function (assert) { assert.equal(x, 1); });",
            errors: [
                createError("assert.ok", "assert.equal", "x", "1")
            ]
        },
        {
            code: "test('Name', function (assert) { assert.notOk(x == 1); });",
            output: "test('Name', function (assert) { assert.notEqual(x, 1); });",
            errors: [
                createError("assert.notOk", "assert.notEqual", "x", "1")
            ]
        },
        {
            code: "test('Name', function () { ok(x == 1); });",
            output: "test('Name', function () { equal(x, 1); });",
            options: [{ allowGlobal: true }],
            errors: [
                createError("ok", "equal", "x", "1")
            ]
        },
        {
            code: "test('Name', function () { notOk(x == 1); });",
            output: "test('Name', function () { notEqual(x, 1); });",
            options: [{ allowGlobal: true }],
            errors: [
                createError("notOk", "notEqual", "x", "1")
            ]
        },
        {
            code: "test('Name', function (assert) { assert.ok(x !== 1); });",
            output: "test('Name', function (assert) { assert.notStrictEqual(x, 1); });",
            errors: [
                createError("assert.ok", "assert.notStrictEqual", "x", "1")
            ]
        },
        {
            code: "test('Name', function (assert) { assert.notOk(x !== 1); });",
            output: "test('Name', function (assert) { assert.strictEqual(x, 1); });",
            errors: [
                createError("assert.notOk", "assert.strictEqual", "x", "1")
            ]
        },
        {
            code: "test('Name', function () { ok(x !== 1); });",
            output: "test('Name', function () { notStrictEqual(x, 1); });",
            options: [{ allowGlobal: true }],
            errors: [
                createError("ok", "notStrictEqual", "x", "1")
            ]
        },
        {
            code: "test('Name', function () { notOk(x !== 1); });",
            output: "test('Name', function () { strictEqual(x, 1); });",
            options: [{ allowGlobal: true }],
            errors: [
                createError("notOk", "strictEqual", "x", "1")
            ]
        },
        {
            code: "test('Name', function (assert) { assert.ok(x != 1); });",
            output: "test('Name', function (assert) { assert.notEqual(x, 1); });",
            errors: [
                createError("assert.ok", "assert.notEqual", "x", "1")
            ]
        },
        {
            code: "test('Name', function (assert) { assert.notOk(x != 1); });",
            output: "test('Name', function (assert) { assert.equal(x, 1); });",
            errors: [
                createError("assert.notOk", "assert.equal", "x", "1")
            ]
        },
        {
            code: "test('Name', function () { ok(x != 1); });",
            output: "test('Name', function () { notEqual(x, 1); });",
            options: [{ allowGlobal: true }],
            errors: [
                createError("ok", "notEqual", "x", "1")
            ]
        },
        {
            code: "test('Name', function () { notOk(x != 1); });",
            output: "test('Name', function () { equal(x, 1); });",
            options: [{ allowGlobal: true }],
            errors: [
                createError("notOk", "equal", "x", "1")
            ]
        }
    ]

});
