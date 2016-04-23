/**
 * @fileoverview Forbid use of QUnit.jsDump().
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-jsdump"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-jsdump", rule, {

    valid: [
        "QUnit.dump(obj);"
    ],

    invalid: [
        {
            code: "QUnit.jsDump(obj);",
            errors: [{
                message: "Use QUnit.dump() instead of QUnit.jsDump().",
                type: "CallExpression"
            }]
        }
    ]
});
