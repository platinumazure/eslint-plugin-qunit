/* eslint-disable no-template-curly-in-string */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-identical-names"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();

ruleTester.run("no-identical-title", rule, {

    valid: [
        [
            "module(\"module\");",
            "test(\"test\", function() {});"
        ].join("\n"),
        [
            "module(\"module1\");",
            "test(\"it1\", function() {});",
            "test(\"it2\", function() {});"
        ].join("\n"),
        [
            "test(\"it1\", function() {});",
            "test(\"it2\", function() {});"
        ].join("\n"),
        [
            "module(\"title\", function() {});",
            "test(\"title\", function() {});"
        ].join("\n"),
        [
            "module(\"module1\");",
            "test(\"it1\", function() {});",
            "module(\"module2\");",
            "test(\"it1\", function() {});"
        ].join("\n"),
        [
            "module(\"module1\");",
            "module(\"module2\");"
        ].join("\n"),
        [
            "test(\"test\" + n, function() {});",
            "test(\"test\" + n, function() {});"
        ].join("\n"),
        [
            "module(\"module1\", function() {",
            "  test(\"it1\", function() {});",
            "  test(\"it2\", function() {});",
            "});",
            "module(\"module2\", function() {",
            "  test(\"it1\", function() {});",
            "  test(\"it2\", function() {});",
            "});"
        ].join("\n"),
        {
            code: [
                "test(`it${n}`, function() {});",
                "test(`it${n}`, function() {});"
            ].join("\n"),
            parserOptions: {
                ecmaVersion: 6
            }
        }
    ],

    invalid: [
        {
            code: [
                "module(\"module1\");",
                "test(\"it1\", function() {});",
                "test(\"it1\", function() {});"
            ].join("\n"),
            errors: [{
                message: "Test name is used multiple times in the same module.",
                column: 6,
                line: 3
            }]
        },
        {
            code: [
                "test(\"it1\", function() {});",
                "test(\"it1\", function() {});"
            ].join("\n"),
            errors: [{
                message: "Test name is used multiple times in the same module.",
                column: 6,
                line: 2
            }]
        },
        {
            code: [
                "module(\"module1\", function() {",
                "  test(\"it1\", function() {});",
                "  test(\"it1\", function() {});",
                "});"
            ].join("\n"),
            errors: [{
                message: "Test name is used multiple times in the same module.",
                column: 8,
                line: 3
            }]
        },
        {
            code: [
                "module(\"module1\");",
                "module(\"module1\");"
            ].join("\n"),
            errors: [{
                message: "Module name is used multiple times.",
                column: 8,
                line: 2
            }]
        },
        {
            code: [
                "module(\"module1\");",
                "test(\"it\", function() {});",
                "module(\"module1\");"
            ].join("\n"),
            errors: [{
                message: "Module name is used multiple times.",
                column: 8,
                line: 3
            }]
        }
    ]
});
