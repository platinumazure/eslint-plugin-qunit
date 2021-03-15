/**
 * @fileoverview forbid comparing relational expression to boolean in assertions
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-compare-relation-boolean"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------------------------

function wrapInQUnitTest(code) {
    return `QUnit.test('test', function (assert) { ${code} });`;
}

function generateInvalidCase({ code, output, options }) {
    const testCase = {
        code: wrapInQUnitTest(code),
        errors: [{
            messageId: "redundantComparison",
            type: "CallExpression"
        }]
    };

    if (output) {
        testCase.output = wrapInQUnitTest(output);
    }

    if (options) {
        testCase.options = options;
    }

    return testCase;
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
    ].map(wrapInQUnitTest),

    invalid: [
        {
            code: "assert.equal(a === b, true);",
            output: "assert.ok(a === b);"
        },
        {
            code: "assert.equal(a === b, false);",
            options: [{ fixToNotOk: true }],
            output: "assert.notOk(a === b);"
        },
        {
            // fixToNotOk = true (implicit since this is the option's default)
            code: "assert.equal(a === b, false);",
            output: "assert.notOk(a === b);"
        },
        {
            // No autofix when rule option `fixToNotOk` is off explicitly.
            code: "assert.equal(a === b, false);",
            options: [{ fixToNotOk: false }],
            output: null
        },

        {
            code: "assert.equal(a === b, true, 'message');", // With message
            output: "assert.ok(a === b, 'message');"
        },
        {
            code: "assert.equal(a === b, false, 'message');", // With message
            options: [{ fixToNotOk: true }],
            output: "assert.notOk(a === b, 'message');"
        },

        {
            code: "assert.strictEqual(a === b, true);",
            output: "assert.ok(a === b);"
        },
        {
            code: "assert.strictEqual(a === b, false);",
            options: [{ fixToNotOk: true }],
            output: "assert.notOk(a === b);"
        },

        {
            code: "assert.deepEqual(a === b, true);",
            output: "assert.ok(a === b);"
        },
        {
            code: "assert.deepEqual(a === b, false);",
            options: [{ fixToNotOk: true }],
            output: "assert.notOk(a === b);"
        },

        {
            code: "assert.propEqual(a === b, true);",
            output: "assert.ok(a === b);"
        },
        {
            code: "assert.propEqual(a === b, false);",
            options: [{ fixToNotOk: true }],
            output: "assert.notOk(a === b);"
        },

        {
            code: "assert.notEqual(a === b, true);",
            options: [{ fixToNotOk: true }],
            output: "assert.notOk(a === b);"
        },
        {
            code: "assert.notEqual(a === b, false);",
            output: "assert.ok(a === b);"
        },

        {
            code: "assert.notStrictEqual(a === b, true);",
            options: [{ fixToNotOk: true }],
            output: "assert.notOk(a === b);"
        },
        {
            code: "assert.notStrictEqual(a === b, false);",
            output: "assert.ok(a === b);"
        },

        {
            code: "assert.notDeepEqual(a === b, true);",
            options: [{ fixToNotOk: true }],
            output: "assert.notOk(a === b);"
        },
        {
            code: "assert.notDeepEqual(a === b, false);",
            output: "assert.ok(a === b);"
        },

        {
            code: "assert.notPropEqual(a === b, true);",
            options: [{ fixToNotOk: true }],
            output: "assert.notOk(a === b);"
        },
        {
            code: "assert.notPropEqual(a === b, false);",
            output: "assert.ok(a === b);"
        },

        // Argument order does not matter for this rule
        {
            code: "assert.equal(true, a === b);",
            output: "assert.ok(a === b);"
        },
        {
            code: "assert.equal(false, a === b);",
            options: [{ fixToNotOk: true }],
            output: "assert.notOk(a === b);"
        },

        {
            code: "assert.equal(true, a === b, 'message');", // With message
            output: "assert.ok(a === b, 'message');"
        },
        {
            code: "assert.equal(false, a === b, 'message');", // With message
            options: [{ fixToNotOk: true }],
            output: "assert.notOk(a === b, 'message');"
        },

        {
            code: "assert.strictEqual(true, a === b);",
            output: "assert.ok(a === b);"
        },
        {
            code: "assert.strictEqual(false, a === b);",
            options: [{ fixToNotOk: true }],
            output: "assert.notOk(a === b);"
        },

        {
            code: "assert.deepEqual(true, a === b);",
            output: "assert.ok(a === b);"
        },
        {
            code: "assert.deepEqual(false, a === b);",
            options: [{ fixToNotOk: true }],
            output: "assert.notOk(a === b);"
        },

        {
            code: "assert.propEqual(true, a === b);",
            output: "assert.ok(a === b);"
        },
        {
            code: "assert.propEqual(false, a === b);",
            options: [{ fixToNotOk: true }],
            output: "assert.notOk(a === b);"
        },

        {
            code: "assert.notEqual(true, a === b);",
            options: [{ fixToNotOk: true }],
            output: "assert.notOk(a === b);"
        },
        {
            code: "assert.notEqual(false, a === b);",
            output: "assert.ok(a === b);"
        },

        {
            code: "assert.notStrictEqual(true, a === b);",
            options: [{ fixToNotOk: true }],
            output: "assert.notOk(a === b);"
        },
        {
            code: "assert.notStrictEqual(false, a === b);",
            output: "assert.ok(a === b);"
        },

        {
            code: "assert.notDeepEqual(true, a === b);",
            options: [{ fixToNotOk: true }],
            output: "assert.notOk(a === b);"
        },
        {
            code: "assert.notDeepEqual(false, a === b);",
            output: "assert.ok(a === b);"
        },

        {
            code: "assert.notPropEqual(true, a === b);",
            options: [{ fixToNotOk: true }],
            output: "assert.notOk(a === b);"
        },
        {
            code: "assert.notPropEqual(false, a === b);",
            output: "assert.ok(a === b);"
        }
    ].map(generateInvalidCase)
});
