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
        "ok();",

        // Global overridden by local import/declaration.
        {
            code: "var module = require('foo'); module();",
            globals: { module: true }
        }
    ],

    invalid: [
        {
            code: "module();",
            errors: [{
                messageId: "unexpectedGlobalModuleTest",
                data: {
                    callee: "module"
                },
                type: "CallExpression"
            }],
            globals: { module: true }
        },
        {
            code: "test();",
            errors: [{
                messageId: "unexpectedGlobalModuleTest",
                data: {
                    callee: "test"
                },
                type: "CallExpression"
            }],
            globals: { test: true }
        },
        {
            code: "asyncTest();",
            errors: [{
                messageId: "unexpectedGlobalModuleTest",
                data: {
                    callee: "asyncTest"
                },
                type: "CallExpression"
            }],
            globals: { asyncTest: true }
        }
    ]
});
