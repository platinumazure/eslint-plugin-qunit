/**
 * @fileoverview Forbid the use of QUnit.only.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-only"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-only", rule, {
    valid: [
        "QUnit.test('Name', function() { });",

        // QUnit.only is not exposed globally so this is valid
        "only('Name', function() { });"
    ],

    invalid: [
        {
            code: "QUnit.only('Name', function() { });",
            errors: [
                "Unexpected QUnit.only call."
            ]
        }
    ]
});
