/**
 * @fileoverview Forbid the use of QUnit.skip
 * @author Steve Calvert
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-skip"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

function createError(callee) {
    return {
        messageId: "noQUnitSkip",
        data: {
            callee
        }
    };
}

const ruleTester = new RuleTester();

ruleTester.run("no-skip", rule, {
    valid: [
        "QUnit.module.test('Name', function() { });",
        "QUnit.test('Name', function() { });",
        "module.test('Name', function() { });",
        "test('Name', function() { });"
    ],

    invalid: [
        {
            code: "QUnit.module.skip('Name', function() { });",
            errors: [createError("QUnit.module.skip")]
        },
        {
            code: "QUnit.skip('Name', function() { });",
            errors: [createError("QUnit.skip")]
        },
        {
            code: "module.skip('Name', function() { });",
            errors: [createError("module.skip")]
        },
        {
            code: "skip('Name', function() { });",
            errors: [createError("skip")]
        },
        {
            code: "test.skip('Name', function() { });",
            errors: [createError("test.skip")]
        }
    ]
});
