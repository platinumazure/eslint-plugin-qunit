/**
 * @fileoverview forbid comparing relational expression to boolean in assertions
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-compare-relation-boolean"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------------------------

function wrapInQUnitTest(code) {
    return "QUnit.test('test', function (assert) { " + code + " });";
}

function generateInvalidCase(code) {
    return {
        code: wrapInQUnitTest(code),
        errors: [{
            message: "Redundant comparison of relational expression to boolean literal",
            type: "CallExpression"
        }]
    };
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();

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
    ].map(wrapInQUnitTest),

    invalid: [
        "assert.equal(a === b, true);",
        "assert.equal(a === b, false);",

        "assert.strictEqual(a === b, true);",
        "assert.strictEqual(a === b, false);",

        "assert.deepEqual(a === b, true);",
        "assert.deepEqual(a === b, false);",

        "assert.propEqual(a === b, true);",
        "assert.propEqual(a === b, false);",

        "assert.notEqual(a === b, true);",
        "assert.notEqual(a === b, false);",

        "assert.notStrictEqual(a === b, true);",
        "assert.notStrictEqual(a === b, false);",

        "assert.notDeepEqual(a === b, true);",
        "assert.notDeepEqual(a === b, false);",

        "assert.notPropEqual(a === b, true);",
        "assert.notPropEqual(a === b, false);",

        // Argument order does not matter for this rule
        "assert.equal(true, a === b);",
        "assert.equal(false, a === b);",

        "assert.strictEqual(true, a === b);",
        "assert.strictEqual(false, a === b);",

        "assert.deepEqual(true, a === b);",
        "assert.deepEqual(false, a === b);",

        "assert.propEqual(true, a === b);",
        "assert.propEqual(false, a === b);",

        "assert.notEqual(true, a === b);",
        "assert.notEqual(false, a === b);",

        "assert.notStrictEqual(true, a === b);",
        "assert.notStrictEqual(false, a === b);",

        "assert.notDeepEqual(true, a === b);",
        "assert.notDeepEqual(false, a === b);",

        "assert.notPropEqual(true, a === b);",
        "assert.notPropEqual(false, a === b);"
    ].map(generateInvalidCase)
});
