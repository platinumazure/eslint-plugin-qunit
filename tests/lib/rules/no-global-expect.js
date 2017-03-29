/**
 * @fileoverview Forbid the use of global expect.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-global-expect"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function wrap(code) {
    return "QUnit.test('a test', function (assert) { " + code + " });";
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-global-expect", rule, {
    valid: [
        wrap("assert.expect(1);")
    ],

    invalid: [
        {
            code: wrap("expect(1)"),
            errors: [{
                message: "Unexpected global expect.",
                type: "CallExpression"
            }]
        }
    ]
});
