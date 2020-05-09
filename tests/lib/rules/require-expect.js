/**
 * @fileoverview Require the use of `expect` when using `assert` inside of a
 * block or when passing `assert` to a function.
 * @author Mitch Lloyd
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/require-expect"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } }),
    returnAndIndent = "\n        ";

function alwaysErrorMessage(expectCallName) {
    return {
        messageId: "expectRequired",
        data: {
            expect: expectCallName
        }
    };
}

function exceptSimpleErrorMessage(expectCallName) {
    return {
        messageId: "expectRequiredComplexTest",
        data: {
            expect: expectCallName
        }
    };
}

function neverErrorMessage(expectCallName) {
    return {
        messageId: "expectForbidden",
        data: {
            expect: expectCallName
        }
    };
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
        },

        // "never" - assert without expect is fine
        {
            code: "test('name', function(assert) { assert.ok(true) });",
            options: ["never"]
        },

        // "never-except-zero" - assert without expect is fine
        {
            code: "test('name', function(assert) { assert.ok(true) });",
            options: ["never-except-zero"]
        },

        // "never-except-zero" - expect zero is fine
        {
            code: "test('name', function(assert) { assert.expect(0) });",
            options: ["never-except-zero"]
        }
    ],

    invalid: [
        // default - make sure expect is identified correctly
        {
            code: "test('name', function(assert) { other.assert.expect(0) });",
            errors: [alwaysErrorMessage("assert.expect")],
            options: []
        },

        // assert in loop block
        {
            code: "test('name', function(assert) { while (false) { assert.ok(true) } });",
            errors: [exceptSimpleErrorMessage("assert.expect")],
            options: ["except-simple"]
        },

        // global assertion in loop block
        {
            code: "test('name', function() { for (;;) { ok(true) } });",
            errors: [exceptSimpleErrorMessage("expect")],
            options: ["except-simple"]
        },

        // assert used in callback
        {
            code: "test('name', function(assert) { maybe(function() { assert.ok(true) }); });",
            errors: [exceptSimpleErrorMessage("assert.expect")],
            options: ["except-simple"]
        },
        {
            code: "test('name', function(assert) { maybe(() => { assert.ok(true) }); });",
            errors: [exceptSimpleErrorMessage("assert.expect")],
            options: ["except-simple"]
        },
        {
            code: "test('name', function(assert) { maybe(() => assert.ok(true)); });",
            errors: [exceptSimpleErrorMessage("assert.expect")],
            options: ["except-simple"]
        },

        // global assertion used in callback
        {
            code: "test('name', function(assert) { maybe(function() { ok(true) }); });",
            errors: [exceptSimpleErrorMessage("assert.expect")],
            options: ["except-simple"]
        },

        // assert in function expression
        {
            code: "test('name', function(assert) { var maybe = function() { assert.ok(true) }; });",
            errors: [exceptSimpleErrorMessage("assert.expect")],
            options: ["except-simple"]
        },

        // global assertion in function expression
        {
            code: "test('name', function() { var maybe = function() { ok(true) }; });",
            errors: [exceptSimpleErrorMessage("expect")],
            options: ["except-simple"]
        },

        // `expect` does not count when used inside of a block.
        {
            code: "test('name', function(assert) { function name() { assert.expect(1); assert.ok(true) } });",
            errors: [exceptSimpleErrorMessage("assert.expect")],
            options: ["except-simple"]
        },

        // global `expect` does not count when used inside of a block.
        {
            code: "test('name', function() { function name() { expect(1); ok(true) } });",
            errors: [exceptSimpleErrorMessage("expect")],
            options: ["except-simple"]
        },

        // `expect` does not count when used inside of a callback
        {
            code: "test('name', function(assert) { maybe(function() { assert.expect(1); assert.ok(true) }); });",
            errors: [exceptSimpleErrorMessage("assert.expect")],
            options: ["except-simple"]
        },

        // global `expect` does not count when used inside of a callback
        {
            code: "test('name', function() { maybe(function() { expect(1); ok(true) }); });",
            errors: [exceptSimpleErrorMessage("expect")],
            options: ["except-simple"]
        },

        // assert in outer test context and nested in a block
        {
            code: "test('name', function(assert) { assert.ok(true); if (true) { assert.ok(true); } });",
            errors: [exceptSimpleErrorMessage("assert.expect")],
            options: ["except-simple"]
        },

        // Deeply nested
        {
            code: "test('name', function() { if (true) { if (true) { ok(true); } } });",
            errors: [exceptSimpleErrorMessage("expect")],
            options: ["except-simple"]
        },

        // Sending assert to a function
        {
            code: [
                "function myAssertion(a, assert, c) { assert.ok(true); }",
                "test('name', function(assert) { myAssertion(null, assert, null); });"
            ].join(returnAndIndent),
            errors: [exceptSimpleErrorMessage("assert.expect")],
            options: ["except-simple"]
        },

        // Sending assert to a function - renaming assert
        {
            code: [
                "function myAssertion(a, localAssert, c) { localAssert.ok(true); }",
                "test('name', function(myAssert) { myAssertion(null, myAssert, null); });"
            ].join(returnAndIndent),
            errors: [exceptSimpleErrorMessage("myAssert.expect")],
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
            errors: [Object.assign(exceptSimpleErrorMessage("assert.expect"), { line: 2 })],
            options: ["except-simple"]
        },

        // Multiple assert statements only report one error per test
        {
            code: "test('name', function(assert) { maybe(function() { assert.ok(true); assert.ok(true); }) });",
            errors: [Object.assign(exceptSimpleErrorMessage("assert.expect"), { column: 1 })],
            options: ["except-simple"]
        },

        // "always" configration - simple case
        {
            code: "test('name', function(assert) { assert.ok(true) })",
            options: [],
            errors: [alwaysErrorMessage("assert.expect")]
        },

        // "always" configration - global assertion
        {
            code: "test('name', function() { equal(1, 1) })",
            options: [],
            errors: [alwaysErrorMessage("expect")]
        },

        // "always" configuration checking that "expect" is called on assert.
        {
            code: "test('name', function(assert) { other.expect(1); assert.ok(true); });",
            options: [],
            errors: [alwaysErrorMessage("assert.expect")]
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
            errors: [Object.assign(alwaysErrorMessage("assert.expect"), { line: 2 })]
        },

        // "always" configuration - multiple assert statements only report one error per test
        {
            code: "test('name', function(assert) { maybe(function() { assert.ok(true); assert.ok(true); }) });",
            options: [],
            errors: [Object.assign(alwaysErrorMessage("assert.expect"), { column: 1 })]
        },

        // "never" - expect is not fine
        {
            code: "test('name', function(assert) { assert.expect(1); assert.ok(true); });",
            options: ["never"],
            errors: [neverErrorMessage("assert.expect")]
        },

        // "never" - expect zero is not fine
        {
            code: "test('name', function(assert) { assert.expect(0) });",
            options: ["never"],
            errors: [neverErrorMessage("assert.expect")]
        },

        // "never-except-zero" - expect is not fine
        {
            code: "test('name', function(assert) { assert.expect(1); assert.ok(true); });",
            options: ["never-except-zero"],
            errors: [neverErrorMessage("assert.expect")]
        }
    ]

});
