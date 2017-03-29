/**
 * @fileoverview Forbid the use of global module/test/asyncTest.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-global-module-test"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-global-module-test", rule, {
    valid: [
        "QUnit.module();",
        "QUnit.test();",
        "QUnit.asyncTest();",

        // Other identifiers are perfectly valid
        "ok();"
    ],

    invalid: [
        {
            code: "module();",
            errors: [{
                message: "Unexpected global `module`.",
                type: "CallExpression"
            }]
        },
        {
            code: "test();",
            errors: [{
                message: "Unexpected global `test`.",
                type: "CallExpression"
            }]
        },
        {
            code: "asyncTest();",
            errors: [{
                message: "Unexpected global `asyncTest`.",
                type: "CallExpression"
            }]
        }
    ]
});
