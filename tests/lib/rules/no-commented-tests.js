/**
 * @fileoverview Ensure that no unit test is commented out.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-commented-tests"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-commented-tests", rule, {
    valid: [
        "QUnit.skip('Name', function () { ok(true); });",

        // shebang comments
        "#!/some-test()",

        // Allow test, parentheses, no quote (https://github.com/platinumazure/eslint-plugin-qunit/issues/61)
        "// TODO: refactor with a Component test (instead of an Acceptance test)",
        "// Run actual test (without context).",
    ],

    invalid: [
        // Single-line comments
        {
            code: "// test('Name', function () { ok(true); });",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "test",
                    },
                    line: 1,
                    column: 4,
                },
            ],
        },
        {
            code: "// asyncTest('Name', function () { ok(true); });",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "asyncTest",
                    },
                    line: 1,
                    column: 4,
                },
            ],
        },
        {
            code: "// QUnit.test('Name', function () { ok(true); });",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "QUnit.test",
                    },
                    line: 1,
                    column: 4,
                },
            ],
        },
        {
            code: "// QUnit.asyncTest('Name', function () { ok(true); });",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "QUnit.asyncTest",
                    },
                    line: 1,
                    column: 4,
                },
            ],
        },
        {
            code: "// QUnit.skip('Name', function () { ok(true); });",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "QUnit.skip",
                    },
                    line: 1,
                    column: 4,
                },
            ],
        },

        // Single-line block comments
        {
            code: "/* test('Name', function () { ok(true); }); */",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "test",
                    },
                    line: 1,
                    column: 4,
                },
            ],
        },
        {
            code: "/* asyncTest('Name', function () { ok(true); }); */",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "asyncTest",
                    },
                    line: 1,
                    column: 4,
                },
            ],
        },
        {
            code: "/* QUnit.test('Name', function () { ok(true); }); */",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "QUnit.test",
                    },
                    line: 1,
                    column: 4,
                },
            ],
        },
        {
            code: "/* QUnit.asyncTest('Name', function () { ok(true); }); */",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "QUnit.asyncTest",
                    },
                    line: 1,
                    column: 4,
                },
            ],
        },
        {
            code: "/* QUnit.skip('Name', function () { ok(true); }); */",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "QUnit.skip",
                    },
                    line: 1,
                    column: 4,
                },
            ],
        },

        // Block comments with line offset (\n)
        {
            code: "/**\n\ttest('Name', function () { ok(true); }); */",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "test",
                    },
                    line: 2,
                    column: 2,
                },
            ],
        },
        {
            code: "/**\n\tasyncTest('Name', function () { ok(true); }); */",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "asyncTest",
                    },
                    line: 2,
                    column: 2,
                },
            ],
        },
        {
            code: "/**\n\tQUnit.test('Name', function () { ok(true); }); */",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "QUnit.test",
                    },
                    line: 2,
                    column: 2,
                },
            ],
        },
        {
            code: "/**\n\tQUnit.asyncTest('Name', function () { ok(true); }); */",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "QUnit.asyncTest",
                    },
                    line: 2,
                    column: 2,
                },
            ],
        },
        {
            code: "/**\n\tQUnit.skip('Name', function () { ok(true); }); */",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "QUnit.skip",
                    },
                    line: 2,
                    column: 2,
                },
            ],
        },

        // Block comments with line offset (\r)
        {
            code: "/**\r\ttest('Name', function () { ok(true); }); */",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "test",
                    },
                    line: 2,
                    column: 2,
                },
            ],
        },
        {
            code: "/**\r\tasyncTest('Name', function () { ok(true); }); */",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "asyncTest",
                    },
                    line: 2,
                    column: 2,
                },
            ],
        },
        {
            code: "/**\r\tQUnit.test('Name', function () { ok(true); }); */",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "QUnit.test",
                    },
                    line: 2,
                    column: 2,
                },
            ],
        },
        {
            code: "/**\r\tQUnit.asyncTest('Name', function () { ok(true); }); */",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "QUnit.asyncTest",
                    },
                    line: 2,
                    column: 2,
                },
            ],
        },
        {
            code: "/**\r\tQUnit.skip('Name', function () { ok(true); }); */",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "QUnit.skip",
                    },
                    line: 2,
                    column: 2,
                },
            ],
        },

        // Block comments with line offset (\r\n)
        {
            code: "/**\r\n\ttest('Name', function () { ok(true); }); */",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "test",
                    },
                    line: 2,
                    column: 2,
                },
            ],
        },
        {
            code: "/**\r\n\tasyncTest('Name', function () { ok(true); }); */",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "asyncTest",
                    },
                    line: 2,
                    column: 2,
                },
            ],
        },
        {
            code: "/**\r\n\tQUnit.test('Name', function () { ok(true); }); */",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "QUnit.test",
                    },
                    line: 2,
                    column: 2,
                },
            ],
        },
        {
            code: "/**\r\n\tQUnit.asyncTest('Name', function () { ok(true); }); */",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "QUnit.asyncTest",
                    },
                    line: 2,
                    column: 2,
                },
            ],
        },
        {
            code: "/**\r\n\tQUnit.skip('Name', function () { ok(true); }); */",
            errors: [
                {
                    messageId: "unexpectedTestInComment",
                    data: {
                        callee: "QUnit.skip",
                    },
                    line: 2,
                    column: 2,
                },
            ],
        },
    ],
});
