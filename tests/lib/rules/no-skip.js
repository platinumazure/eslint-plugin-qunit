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

const ruleTester = new RuleTester();

ruleTester.run("no-skip", rule, {
    valid: [
        "QUnit.module.test('Name', function() { });",
        "QUnit.test('Name', function() { });",
        "module.test('Name', function() { });",
        "test('Name', function() { });",
    ],

    invalid: [
        {
            code: "QUnit.module.skip('Name', function() { });",
            errors: [{ messageId: "noQUnitSkip" }],
        },
        {
            code: "QUnit.skip('Name', function() { });",
            errors: [{ messageId: "noQUnitSkip" }],
        },
        {
            code: "module.skip('Name', function() { });",
            errors: [{ messageId: "noQUnitSkip" }],
        },
        {
            code: "skip('Name', function() { });",
            errors: [{ messageId: "noQUnitSkip" }],
        },
        {
            code: "test.skip('Name', function() { });",
            errors: [{ messageId: "noQUnitSkip" }],
        },
    ],
});
