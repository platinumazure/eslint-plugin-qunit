/**
 * @fileoverview Forbid the use of global QUnit assertions.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-global-assertions"),
    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function wrap(assertionCode, testName) {
    testName = testName || "Name";
    return "QUnit.test('" +
        testName +
        "', function (assert) { " +
        assertionCode +
        " });";
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();

ruleTester.run("no-global-assertions", rule, {
    valid: [
        wrap("assert.ok(true);"),
        wrap("assert.equal(a, b);"),
        wrap("assert.strictEqual(a, b);"),
        wrap("assert.deepEqual(a, b);"),
        wrap("assert.propEqual(a, b);"),
        wrap("assert.notEqual(a, b);"),
        wrap("assert.notStrictEqual(a, b);"),
        wrap("assert.notDeepEqual(a, b);"),
        wrap("assert.notPropEqual(a, b);"),
        wrap("assert.raises(function () {}, TypeError);"),
        wrap("assert.throws(function () {}, TypeError);"),
        wrap("assert.expect(1);"),

        // Intentionally not covered by this rule
        wrap("expect(1);")
    ],

    invalid: [
        {
            code: wrap("ok(true);"),
            errors: ["Unexpected global `ok` assertion."]
        },
        {
            code: wrap("equal(a, b);"),
            errors: ["Unexpected global `equal` assertion."]
        },
        {
            code: wrap("strictEqual(a, b);"),
            errors: ["Unexpected global `strictEqual` assertion."]
        },
        {
            code: wrap("deepEqual(a, b);"),
            errors: ["Unexpected global `deepEqual` assertion."]
        },
        {
            code: wrap("propEqual(a, b);"),
            errors: ["Unexpected global `propEqual` assertion."]
        },
        {
            code: wrap("notEqual(a, b);"),
            errors: ["Unexpected global `notEqual` assertion."]
        },
        {
            code: wrap("notStrictEqual(a, b);"),
            errors: ["Unexpected global `notStrictEqual` assertion."]
        },
        {
            code: wrap("notDeepEqual(a, b);"),
            errors: ["Unexpected global `notDeepEqual` assertion."]
        },
        {
            code: wrap("notPropEqual(a, b);"),
            errors: ["Unexpected global `notPropEqual` assertion."]
        },
        {
            code: wrap("raises(function () {}, TypeError);"),
            errors: ["Unexpected global `raises` assertion."]
        },
        {
            code: wrap("throws(function () {}, TypeError);"),
            errors: ["Unexpected global `throws` assertion."]
        }
    ]
});
