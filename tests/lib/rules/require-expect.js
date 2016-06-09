/**
 * @fileoverview Require the use of `expect` when using `assert` inside of a
 * block or when passing `assert` to a function.
 * @author Mitch Lloyd
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/require-expect"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester(),
    returnAndIndent = "\n        ";

function alwaysErrorMessage(expectCallName) {
    return "Test is missing `" + expectCallName + "()` call`";
}

function exceptSimpleErrorMessage(expectCallName) {
    return "Should use `" + expectCallName + "()` when using assertions outside of the top-level test callback";
}

ruleTester.run("require-expect", rule, {

    valid: [
        // default, calling expect is valid
        {
            code: "test('name', function(assert) { assert.expect(0) });",
            options: []
        },

        // default, using global expect
        {
            code: "test('name', function() { expect(0) });",
            options: []
        },

        // CallExpression without parent object throws no errors
        {
            code: "test('name', function(assert) { assert.expect(0); noParentObject() });",
            options: []
        },

        // assert at top of test context is ok
        {
            code: "test('name', function(assert) { assert.ok(true) });",
            options: ["except-simple"]
        },

        // global assertion at top of test context is ok
        {
            code: "test('name', function() { ok(true) });",
            options: ["except-simple"]
        },

        // assert in block with expect at the top of test context is ok
        {
            code: "test('name', function(assert) { assert.expect(0); if (false) { assert.ok(false) } });",
            options: ["except-simple"]
        },

        // global assertion in block with expect at the top of test context is ok
        {
            code: "test('name', function() { expect(0); if (false) { ok(false) } });",
            options: ["except-simple"]
        },

        // nested modules
        {
            code: [
                "module('a', function() {",
                "    test('a - test', function(assert) {",
                "        assert.ok(true, 'no expect needed');",
                "    });",
                "",
                "    module('b', function() {",
                "        test('b - test', function() {",
                "            ok(true, 'still no expect needed');",
                "        });",
                "    });",
                "});"
            ].join(returnAndIndent),
            options: ["except-simple"]
        }

    ],

    invalid: [
        // default - make sure expect is identified correctly
        {
            code: "test('name', function(assert) { other.assert.expect(0) });",
            errors: [{
                message: alwaysErrorMessage("assert.expect"),
                type: "CallExpression"
            }],
            options: []
        },

        // assert in loop block
        {
            code: "test('name', function(assert) { while (false) { assert.ok(true) } });",
            errors: [{
                message: exceptSimpleErrorMessage("assert.expect"),
                type: "CallExpression"
            }],
            options: ["except-simple"]
        },

        // global assertion in loop block
        {
            code: "test('name', function() { for (;;) { ok(true) } });",
            errors: [{
                message: exceptSimpleErrorMessage("expect"),
                type: "CallExpression"
            }],
            options: ["except-simple"]
        },

        // assert used in callback
        {
            code: "test('name', function(assert) { maybe(function() { assert.ok(true) }); });",
            errors: [{
                message: exceptSimpleErrorMessage("assert.expect"),
                type: "CallExpression"
            }],
            options: ["except-simple"]
        },

        // global assertion used in callback
        {
            code: "test('name', function(assert) { maybe(function() { ok(true) }); });",
            errors: [{
                message: exceptSimpleErrorMessage("assert.expect"),
                type: "CallExpression"
            }],
            options: ["except-simple"]
        },

        // assert in function expression
        {
            code: "test('name', function(assert) { var maybe = function() { assert.ok(true) }; });",
            errors: [{
                message: exceptSimpleErrorMessage("assert.expect"),
                type: "CallExpression"
            }],
            options: ["except-simple"]
        },

        // global assertion in function expression
        {
            code: "test('name', function() { var maybe = function() { ok(true) }; });",
            errors: [{
                message: exceptSimpleErrorMessage("expect"),
                type: "CallExpression"
            }],
            options: ["except-simple"]
        },

        // `expect` does not count when used inside of a block.
        {
            code: "test('name', function(assert) { function name() { assert.expect(1); assert.ok(true) } });",
            errors: [{
                message: exceptSimpleErrorMessage("assert.expect"),
                type: "CallExpression"
            }],
            options: ["except-simple"]
        },

        // global `expect` does not count when used inside of a block.
        {
            code: "test('name', function() { function name() { expect(1); ok(true) } });",
            errors: [{
                message: exceptSimpleErrorMessage("expect"),
                type: "CallExpression"
            }],
            options: ["except-simple"]
        },

        // `expect` does not count when used inside of a callback
        {
            code: "test('name', function(assert) { maybe(function() { assert.expect(1); assert.ok(true) }); });",
            errors: [{
                message: exceptSimpleErrorMessage("assert.expect"),
                type: "CallExpression"
            }],
            options: ["except-simple"]
        },

        // global `expect` does not count when used inside of a callback
        {
            code: "test('name', function() { maybe(function() { expect(1); ok(true) }); });",
            errors: [{
                message: exceptSimpleErrorMessage("expect"),
                type: "CallExpression"
            }],
            options: ["except-simple"]
        },

        // assert in outer test context and nested in a block
        {
            code: "test('name', function(assert) { assert.ok(true); if (true) { assert.ok(true); } });",
            errors: [{
                message: exceptSimpleErrorMessage("assert.expect"),
                type: "CallExpression"
            }],
            options: ["except-simple"]
        },

        // Deeply nested
        {
            code: "test('name', function() { if (true) { if (true) { ok(true); } } });",
            errors: [{
                message: exceptSimpleErrorMessage("expect"),
                type: "CallExpression"
            }],
            options: ["except-simple"]
        },

        // Sending assert to a function
        {
            code: [
                "function myAssertion(a, assert, c) { assert.ok(true); }",
                "test('name', function(assert) { myAssertion(null, assert, null); });"
            ].join(returnAndIndent),
            errors: [{
                message: exceptSimpleErrorMessage("assert.expect"),
                type: "CallExpression"
            }],
            options: ["except-simple"]
        },

        // Sending assert to a function - renaming assert
        {
            code: [
                "function myAssertion(a, localAssert, c) { localAssert.ok(true); }",
                "test('name', function(myAssert) { myAssertion(null, myAssert, null); });"
            ].join(returnAndIndent),
            errors: [{
                message: exceptSimpleErrorMessage("myAssert.expect"),
                type: "CallExpression"
            }],
            options: ["except-simple"]
        },

        // nested modules
        {
            code: [
                "module('a', function() {",
                "    test('a - test', function(assert) {",
                "        if (false) {",
                "            assert.ok(true, 'needs expect');",
                "        }",
                "    });",
                "",
                "    module('b', function() {",
                "        test('b - test', function(assert) {",
                "            assert.expect(1);",
                "            assert.ok(true, 'has expect');",
                "        });",
                "    });",
                "});"
            ].join(returnAndIndent),
            errors: [{
                message: exceptSimpleErrorMessage("assert.expect"),
                type: "CallExpression",
                line: 2
            }],
            options: ["except-simple"]
        },

        // Multiple assert statements only report one error per test
        {
            code: "test('name', function(assert) { maybe(function() { assert.ok(true); assert.ok(true); }) });",
            errors: [{
                message: exceptSimpleErrorMessage("assert.expect"),
                column: 1,
                type: "CallExpression"
            }],
            options: ["except-simple"]
        },

        // "always" configration - simple case
        {
            code: "test('name', function(assert) { assert.ok(true) })",
            options: [],
            errors: [{ message: alwaysErrorMessage("assert.expect") }]
        },

        // "always" configration - global assertion
        {
            code: "test('name', function() { equal(1, 1) })",
            options: [],
            errors: [{ message: alwaysErrorMessage("expect") }]
        },

        // "always" configuration checking that "expect" is called on assert.
        {
            code: "test('name', function(assert) { other.expect(1); assert.ok(true); });",
            options: [],
            errors: [{ message: alwaysErrorMessage("assert.expect") }]
        },

        // "always" configuration - errors are reported on `test()` line
        {
            code: [
                "module('some-module', function() {",
                "    test('some-test', function(assert) {",
                "        if (false) {",
                "            assert.ok(true, 'needs expect');",
                "        }",
                "    });",
                "});"
            ].join(returnAndIndent),
            options: [],
            errors: [{
                message: alwaysErrorMessage("assert.expect"),
                type: "CallExpression",
                line: 2
            }]
        },

        // "always" configuration - multiple assert statements only report one error per test
        {
            code: "test('name', function(assert) { maybe(function() { assert.ok(true); assert.ok(true); }) });",
            options: [],
            errors: [{
                message: alwaysErrorMessage("assert.expect"),
                column: 1
            }]
        }
    ]

});
