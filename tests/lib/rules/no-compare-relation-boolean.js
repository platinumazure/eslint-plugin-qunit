/**
 * @fileoverview forbid comparing relational expression to boolean in assertions
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-compare-relation-boolean"),
    RuleTester = require("eslint").RuleTester,
    testUtils = require("../../testUtils");

//------------------------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------------------------

function addErrors(testCase) {
    return Object.assign({
        errors: [{
            messageId: "redundantComparison",
            type: "CallExpression"
        }]
    }, testCase);
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-compare-relation-boolean", rule, {
    valid: [
        "assert.strictEqual(a, b);",
        "assert.ok(a === b);",
        "assert.ok(a > b);",

        // Non-relational operators should not trigger the rule
        "assert.equal(a >> 1, true);",

        // Logical operators should not be flagged because they return the operand
        "assert.equal(a && b, true);",

        // Comparing against something that isn't a boolean literal is fine
        "assert.equal(a > b, 1);",
        "assert.equal(a > b, c);"
    ].map(code => testUtils.wrap(code)),

    invalid: [
        {
            code: testUtils.wrap("assert.equal(a === b, true);"),
            output: testUtils.wrap("assert.ok(a === b);")
        },
        {
            code: testUtils.wrapArrow("assert.equal(a === b, true);"),
            output: testUtils.wrapArrow("assert.ok(a === b);"),
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: testUtils.wrap("assert.equal(a === b, false);"),
            output: testUtils.wrap("assert.notOk(a === b);")
        },

        {
            code: testUtils.wrap("assert.equal(a === b, true, 'message');"), // With message
            output: testUtils.wrap("assert.ok(a === b, 'message');")
        },
        {
            code: testUtils.wrap("assert.equal(a === b, false, 'message');"), // With message
            output: testUtils.wrap("assert.notOk(a === b, 'message');")
        },

        {
            code: testUtils.wrap("assert.strictEqual(a === b, true);"),
            output: testUtils.wrap("assert.ok(a === b);")
        },
        {
            code: testUtils.wrap("assert.strictEqual(a === b, false);"),
            output: testUtils.wrap("assert.notOk(a === b);")
        },

        {
            code: testUtils.wrap("assert.deepEqual(a === b, true);"),
            output: testUtils.wrap("assert.ok(a === b);")
        },
        {
            code: testUtils.wrap("assert.deepEqual(a === b, false);"),
            output: testUtils.wrap("assert.notOk(a === b);")
        },

        {
            code: testUtils.wrap("assert.propEqual(a === b, true);"),
            output: testUtils.wrap("assert.ok(a === b);")
        },
        {
            code: testUtils.wrap("assert.propEqual(a === b, false);"),
            output: testUtils.wrap("assert.notOk(a === b);")
        },

        {
            code: testUtils.wrap("assert.notEqual(a === b, true);"),
            output: testUtils.wrap("assert.notOk(a === b);")
        },
        {
            code: testUtils.wrap("assert.notEqual(a === b, false);"),
            output: testUtils.wrap("assert.ok(a === b);")
        },

        {
            code: testUtils.wrap("assert.notStrictEqual(a === b, true);"),
            output: testUtils.wrap("assert.notOk(a === b);")
        },
        {
            code: testUtils.wrap("assert.notStrictEqual(a === b, false);"),
            output: testUtils.wrap("assert.ok(a === b);")
        },

        {
            code: testUtils.wrap("assert.notDeepEqual(a === b, true);"),
            output: testUtils.wrap("assert.notOk(a === b);")
        },
        {
            code: testUtils.wrap("assert.notDeepEqual(a === b, false);"),
            output: testUtils.wrap("assert.ok(a === b);")
        },

        {
            code: testUtils.wrap("assert.notPropEqual(a === b, true);"),
            output: testUtils.wrap("assert.notOk(a === b);")
        },
        {
            code: testUtils.wrap("assert.notPropEqual(a === b, false);"),
            output: testUtils.wrap("assert.ok(a === b);")
        },

        // Argument order does not matter for this rule
        {
            code: testUtils.wrap("assert.equal(true, a === b);"),
            output: testUtils.wrap("assert.ok(a === b);")
        },
        {
            code: testUtils.wrap("assert.equal(false, a === b);"),
            output: testUtils.wrap("assert.notOk(a === b);")
        },

        {
            code: testUtils.wrap("assert.equal(true, a === b, 'message');"), // With message
            output: testUtils.wrap("assert.ok(a === b, 'message');")
        },
        {
            code: testUtils.wrap("assert.equal(false, a === b, 'message');"), // With message
            output: testUtils.wrap("assert.notOk(a === b, 'message');")
        },

        {
            code: testUtils.wrap("assert.strictEqual(true, a === b);"),
            output: testUtils.wrap("assert.ok(a === b);")
        },
        {
            code: testUtils.wrap("assert.strictEqual(false, a === b);"),
            output: testUtils.wrap("assert.notOk(a === b);")
        },

        {
            code: testUtils.wrap("assert.deepEqual(true, a === b);"),
            output: testUtils.wrap("assert.ok(a === b);")
        },
        {
            code: testUtils.wrap("assert.deepEqual(false, a === b);"),
            output: testUtils.wrap("assert.notOk(a === b);")
        },

        {
            code: testUtils.wrap("assert.propEqual(true, a === b);"),
            output: testUtils.wrap("assert.ok(a === b);")
        },
        {
            code: testUtils.wrap("assert.propEqual(false, a === b);"),
            output: testUtils.wrap("assert.notOk(a === b);")
        },

        {
            code: testUtils.wrap("assert.notEqual(true, a === b);"),
            output: testUtils.wrap("assert.notOk(a === b);")
        },
        {
            code: testUtils.wrap("assert.notEqual(false, a === b);"),
            output: testUtils.wrap("assert.ok(a === b);")
        },

        {
            code: testUtils.wrap("assert.notStrictEqual(true, a === b);"),
            output: testUtils.wrap("assert.notOk(a === b);")
        },
        {
            code: testUtils.wrap("assert.notStrictEqual(false, a === b);"),
            output: testUtils.wrap("assert.ok(a === b);")
        },

        {
            code: testUtils.wrap("assert.notDeepEqual(true, a === b);"),
            output: testUtils.wrap("assert.notOk(a === b);")
        },
        {
            code: testUtils.wrap("assert.notDeepEqual(false, a === b);"),
            output: testUtils.wrap("assert.ok(a === b);")
        },

        {
            code: testUtils.wrap("assert.notPropEqual(true, a === b);"),
            output: testUtils.wrap("assert.notOk(a === b);")
        },
        {
            code: testUtils.wrap("assert.notPropEqual(false, a === b);"),
            output: testUtils.wrap("assert.ok(a === b);")
        }
    ].map(testCase => addErrors(testCase))
});
