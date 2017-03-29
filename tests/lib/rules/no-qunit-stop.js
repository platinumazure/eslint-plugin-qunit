/**
 * @fileoverview Forbid the use of QUnit.stop.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-qunit-stop"),
    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-qunit-stop", rule, {

    valid: [
        "var done = assert.async();"
    ],

    invalid: [
        {
            code: "QUnit.stop();",
            errors: [{
                message: "Use assert.async() instead of QUnit.stop().",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.stop(2);",
            errors: [{
                message: "Use assert.async() instead of QUnit.stop().",
                type: "CallExpression"
            }]
        }
    ]
});
