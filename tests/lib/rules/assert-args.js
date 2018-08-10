/**
 * @fileoverview Check the number of arguments to QUnit's assertion functions.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/assert-args"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function wrap(assertionCode, testName) {
    testName = testName || "Name";
    return `QUnit.test('${testName}', function (assert) { ${assertionCode} });`;
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("assert-args", rule, {
    valid: [
        // ok
        wrap("ok(result);"),
        wrap("ok(result, 'Result is true');"),
        wrap("ok(obj[key], key + ' value is true');"),
        wrap("assert.ok(result);"),
        wrap("assert.ok(result, 'Result is true');"),
        wrap("assert.ok(obj[key], key + ' value is true');"),

        // equal
        wrap("equal(result, expected);"),
        wrap("equal(result, expected, 'Message');"),
        wrap("equal(obj[key], expected, key + ' value is true');"),
        wrap("assert.equal(result, expected);"),
        wrap("assert.equal(result, expected, 'Message');"),
        wrap("assert.equal(obj[key], expected, key + ' value is true');"),

        // strictEqual
        wrap("strictEqual(result, expected);"),
        wrap("strictEqual(result, expected, 'Message');"),
        wrap("strictEqual(obj[key], expected, key + ' value is true');"),
        wrap("assert.strictEqual(result, expected);"),
        wrap("assert.strictEqual(result, expected, 'Message');"),
        wrap("assert.strictEqual(obj[key], expected, key + ' value is true');"),

        // deepEqual
        wrap("deepEqual(result, expected);"),
        wrap("deepEqual(result, expected, 'Message');"),
        wrap("deepEqual(obj[key], expected, key + ' value is true');"),
        wrap("assert.deepEqual(result, expected);"),
        wrap("assert.deepEqual(result, expected, 'Message');"),
        wrap("assert.deepEqual(obj[key], expected, key + ' value is true');"),

        // propEqual
        wrap("propEqual(result, expected);"),
        wrap("propEqual(result, expected, 'Message');"),
        wrap("propEqual(obj[key], expected, key + ' value is true');"),
        wrap("assert.propEqual(result, expected);"),
        wrap("assert.propEqual(result, expected, 'Message');"),
        wrap("assert.propEqual(obj[key], expected, key + ' value is true');"),

        // raises
        wrap("raises(function () {});"),
        wrap("raises(function () {}, 'Message');"),
        wrap("raises(function () {}, expectedMessage);"),
        wrap("raises(function () {}, TypeError, 'Message');"),
        wrap("raises(function () {}, /error/, 'Message');"),
        wrap("raises(function () {}, 'Error', 'Message');"),
        wrap("raises(function () {}, TypeError, expectedMessage);"),
        wrap("assert.raises(function () {}, 'Message');"),
        wrap("assert.raises(function () {}, TypeError, 'Message');"),
        wrap("assert.raises(function () {}, expectedMessage);"),
        wrap("assert.raises(function () {}, /error/, 'Message');"),
        wrap("assert.raises(function () {}, 'Error', 'Message');"),
        wrap("assert.raises(function () {}, TypeError, expectedMessage);"),

        // throws
        wrap("throws(function () {});"),
        wrap("throws(function () {}, 'Message');"),
        wrap("throws(function () {}, expectedMessage);"),
        wrap("throws(function () {}, TypeError, 'Message');"),
        wrap("throws(function () {}, /error/, 'Message');"),
        wrap("throws(function () {}, 'Error', 'Message');"),
        wrap("throws(function () {}, TypeError, expectedMessage);"),
        wrap("assert.throws(function () {}, 'Message');"),
        wrap("assert.throws(function () {}, TypeError, 'Message');"),
        wrap("assert.throws(function () {}, expectedMessage);"),
        wrap("assert.throws(function () {}, /error/, 'Message');"),
        wrap("assert.throws(function () {}, 'Error', 'Message');"),
        wrap("assert.throws(function () {}, TypeError, expectedMessage);"),

        // notOk
        wrap("notOk(result);"),
        wrap("notOk(result, 'Result is true');"),
        wrap("notOk(obj[key], key + ' value is true');"),
        wrap("assert.notOk(result);"),
        wrap("assert.notOk(result, 'Result is true');"),
        wrap("assert.notOk(obj[key], key + ' value is true');"),

        // notEqual
        wrap("notEqual(result, expected);"),
        wrap("notEqual(result, expected, 'Message');"),
        wrap("notEqual(obj[key], expected, key + ' value is true');"),
        wrap("assert.notEqual(result, expected);"),
        wrap("assert.notEqual(result, expected, 'Message');"),
        wrap("assert.notEqual(obj[key], expected, key + ' value is true');"),

        // notStrictEqual
        wrap("notStrictEqual(result, expected);"),
        wrap("notStrictEqual(result, expected, 'Message');"),
        wrap("notStrictEqual(obj[key], expected, key + ' value is true');"),
        wrap("assert.notStrictEqual(result, expected);"),
        wrap("assert.notStrictEqual(result, expected, 'Message');"),
        wrap("assert.notStrictEqual(obj[key], expected, key + ' value is true');"),

        // notDeepEqual
        wrap("notDeepEqual(result, expected);"),
        wrap("notDeepEqual(result, expected, 'Message');"),
        wrap("notDeepEqual(obj[key], expected, key + ' value is true');"),
        wrap("assert.notDeepEqual(result, expected);"),
        wrap("assert.notDeepEqual(result, expected, 'Message');"),
        wrap("assert.notDeepEqual(obj[key], expected, key + ' value is true');"),

        // notPropEqual
        wrap("notPropEqual(result, expected);"),
        wrap("notPropEqual(result, expected, 'Message');"),
        wrap("notPropEqual(obj[key], expected, key + ' value is true');"),
        wrap("assert.notPropEqual(result, expected);"),
        wrap("assert.notPropEqual(result, expected, 'Message');"),
        wrap("assert.notPropEqual(obj[key], expected, key + ' value is true');"),

        // not actually assertions
        wrap("notAnAssertion(result, expected);"),
        wrap("getAssertion()(result, expected);"),

        // Object prototype properties (also not actually assertions)
        wrap("hasOwnProperty('prop');"),
        wrap("assert.hasOwnProperty('prop');"),

        // unwrapped
        "notAnAssertion(result, expected);"
    ],

    invalid: [
        // ok
        {
            code: wrap("ok();"),
            errors: ["Unexpected call to ok with 0 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("ok(a, b);"),
            errors: ["Unexpected call to ok with 2 arguments and no error message."]
        },
        */
        {
            code: wrap("ok(a, b, 'Message');"),
            errors: ["Unexpected call to ok with 3 arguments."]
        },
        {
            code: wrap("assert.ok();"),
            errors: ["Unexpected call to assert.ok with 0 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("assert.ok(a, b);"),
            errors: ["Unexpected call to assert.ok with 2 arguments and no error message."]
        },
        */
        {
            code: wrap("assert.ok(a, b, 'Message');"),
            errors: ["Unexpected call to assert.ok with 3 arguments."]
        },

        // equal
        {
            code: wrap("equal();"),
            errors: ["Unexpected call to equal with 0 arguments and no error message."]
        },
        {
            code: wrap("equal(a);"),
            errors: ["Unexpected call to equal with 1 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("equal(a, b, c);"),
            errors: ["Unexpected call to equal with 3 arguments and no error message."]
        },
        */
        {
            code: wrap("equal(a, b, c, 'Message');"),
            errors: ["Unexpected call to equal with 4 arguments."]
        },
        {
            code: wrap("assert.equal();"),
            errors: ["Unexpected call to assert.equal with 0 arguments and no error message."]
        },
        {
            code: wrap("assert.equal(a);"),
            errors: ["Unexpected call to assert.equal with 1 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("assert.equal(a, b, c);"),
            errors: ["Unexpected call to assert.equal with 3 arguments and no error message."]
        },
        */
        {
            code: wrap("assert.equal(a, b, c, 'Message');"),
            errors: ["Unexpected call to assert.equal with 4 arguments."]
        },

        // strictEqual
        {
            code: wrap("strictEqual();"),
            errors: ["Unexpected call to strictEqual with 0 arguments and no error message."]
        },
        {
            code: wrap("strictEqual(a);"),
            errors: ["Unexpected call to strictEqual with 1 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("strictEqual(a, b, c);"),
            errors: ["Unexpected call to strictEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrap("strictEqual(a, b, c, 'Message');"),
            errors: ["Unexpected call to strictEqual with 4 arguments."]
        },
        {
            code: wrap("assert.strictEqual();"),
            errors: ["Unexpected call to assert.strictEqual with 0 arguments and no error message."]
        },
        {
            code: wrap("assert.strictEqual(a);"),
            errors: ["Unexpected call to assert.strictEqual with 1 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("assert.strictEqual(a, b, c);"),
            errors: ["Unexpected call to assert.strictEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrap("assert.strictEqual(a, b, c, 'Message');"),
            errors: ["Unexpected call to assert.strictEqual with 4 arguments."]
        },

        // deepEqual
        {
            code: wrap("deepEqual();"),
            errors: ["Unexpected call to deepEqual with 0 arguments and no error message."]
        },
        {
            code: wrap("deepEqual(a);"),
            errors: ["Unexpected call to deepEqual with 1 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("deepEqual(a, b, c);"),
            errors: ["Unexpected call to deepEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrap("deepEqual(a, b, c, 'Message');"),
            errors: ["Unexpected call to deepEqual with 4 arguments."]
        },
        {
            code: wrap("assert.deepEqual();"),
            errors: ["Unexpected call to assert.deepEqual with 0 arguments and no error message."]
        },
        {
            code: wrap("assert.deepEqual(a);"),
            errors: ["Unexpected call to assert.deepEqual with 1 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("assert.deepEqual(a, b, c);"),
            errors: ["Unexpected call to assert.deepEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrap("assert.deepEqual(a, b, c, 'Message');"),
            errors: ["Unexpected call to assert.deepEqual with 4 arguments."]
        },

        // propEqual
        {
            code: wrap("propEqual();"),
            errors: ["Unexpected call to propEqual with 0 arguments and no error message."]
        },
        {
            code: wrap("propEqual(a);"),
            errors: ["Unexpected call to propEqual with 1 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("propEqual(a, b, c);"),
            errors: ["Unexpected call to propEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrap("propEqual(a, b, c, 'Message');"),
            errors: ["Unexpected call to propEqual with 4 arguments."]
        },
        {
            code: wrap("assert.propEqual();"),
            errors: ["Unexpected call to assert.propEqual with 0 arguments and no error message."]
        },
        {
            code: wrap("assert.propEqual(a);"),
            errors: ["Unexpected call to assert.propEqual with 1 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("assert.propEqual(a, b, c);"),
            errors: ["Unexpected call to assert.propEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrap("assert.propEqual(a, b, c, 'Message');"),
            errors: ["Unexpected call to assert.propEqual with 4 arguments."]
        },

        // raises
        {
            code: wrap("raises();"),
            errors: ["Unexpected call to raises with 0 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("raises(function () {}, TypeError, blah);"),
            errors: ["Unexpected call to raises with 3 arguments and no error message."]
        },
        */
        {
            code: wrap("raises(function () {}, TypeError, blah, 'Message');"),
            errors: ["Unexpected call to raises with 4 arguments."]
        },
        {
            code: wrap("assert.raises();"),
            errors: ["Unexpected call to assert.raises with 0 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("assert.raises(function () {}, TypeError, blah);"),
            errors: ["Unexpected call to assert.raises with 3 arguments and no error message."]
        },
        */
        {
            code: wrap("assert.raises(function () {}, TypeError, blah, 'Message');"),
            errors: ["Unexpected call to assert.raises with 4 arguments."]
        },

        // throws
        {
            code: wrap("throws();"),
            errors: ["Unexpected call to throws with 0 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("throws(function () {}, TypeError, blah);"),
            errors: ["Unexpected call to throws with 3 arguments and no error message."]
        },
        */
        {
            code: wrap("throws(function () {}, TypeError, blah, 'Message');"),
            errors: ["Unexpected call to throws with 4 arguments."]
        },
        {
            code: wrap("assert.throws();"),
            errors: ["Unexpected call to assert.throws with 0 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("assert.throws(function () {}, TypeError, blah);"),
            errors: ["Unexpected call to assert.throws with 3 arguments and no error message."]
        },
        */
        {
            code: wrap("assert.throws(function () {}, TypeError, blah, 'Message');"),
            errors: ["Unexpected call to assert.throws with 4 arguments."]
        },

        // notOk
        {
            code: wrap("notOk();"),
            errors: ["Unexpected call to notOk with 0 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("notOk(a, b);"),
            errors: ["Unexpected call to notOk with 2 arguments and no error message."]
        },
        */
        {
            code: wrap("notOk(a, b, 'Message');"),
            errors: ["Unexpected call to notOk with 3 arguments."]
        },
        {
            code: wrap("assert.notOk();"),
            errors: ["Unexpected call to assert.notOk with 0 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("assert.notOk(a, b);"),
            errors: ["Unexpected call to assert.notOk with 2 arguments and no error message."]
        },
        */
        {
            code: wrap("assert.notOk(a, b, 'Message');"),
            errors: ["Unexpected call to assert.notOk with 3 arguments."]
        },

        // notEqual
        {
            code: wrap("notEqual();"),
            errors: ["Unexpected call to notEqual with 0 arguments and no error message."]
        },
        {
            code: wrap("notEqual(a);"),
            errors: ["Unexpected call to notEqual with 1 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("notEqual(a, b, c);"),
            errors: ["Unexpected call to notEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrap("notEqual(a, b, c, 'Message');"),
            errors: ["Unexpected call to notEqual with 4 arguments."]
        },
        {
            code: wrap("assert.notEqual();"),
            errors: ["Unexpected call to assert.notEqual with 0 arguments and no error message."]
        },
        {
            code: wrap("assert.notEqual(a);"),
            errors: ["Unexpected call to assert.notEqual with 1 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("assert.notEqual(a, b, c);"),
            errors: ["Unexpected call to assert.notEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrap("assert.notEqual(a, b, c, 'Message');"),
            errors: ["Unexpected call to assert.notEqual with 4 arguments."]
        },

        // notStrictEqual
        {
            code: wrap("notStrictEqual();"),
            errors: ["Unexpected call to notStrictEqual with 0 arguments and no error message."]
        },
        {
            code: wrap("notStrictEqual(a);"),
            errors: ["Unexpected call to notStrictEqual with 1 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("notStrictEqual(a, b, c);"),
            errors: ["Unexpected call to notStrictEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrap("notStrictEqual(a, b, c, 'Message');"),
            errors: ["Unexpected call to notStrictEqual with 4 arguments."]
        },
        {
            code: wrap("assert.notStrictEqual();"),
            errors: ["Unexpected call to assert.notStrictEqual with 0 arguments and no error message."]
        },
        {
            code: wrap("assert.notStrictEqual(a);"),
            errors: ["Unexpected call to assert.notStrictEqual with 1 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("assert.notStrictEqual(a, b, c);"),
            errors: ["Unexpected call to assert.notStrictEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrap("assert.notStrictEqual(a, b, c, 'Message');"),
            errors: ["Unexpected call to assert.notStrictEqual with 4 arguments."]
        },

        // notDeepEqual
        {
            code: wrap("notDeepEqual();"),
            errors: ["Unexpected call to notDeepEqual with 0 arguments and no error message."]
        },
        {
            code: wrap("notDeepEqual(a);"),
            errors: ["Unexpected call to notDeepEqual with 1 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("notDeepEqual(a, b, c);"),
            errors: ["Unexpected call to notDeepEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrap("notDeepEqual(a, b, c, 'Message');"),
            errors: ["Unexpected call to notDeepEqual with 4 arguments."]
        },
        {
            code: wrap("assert.notDeepEqual();"),
            errors: ["Unexpected call to assert.notDeepEqual with 0 arguments and no error message."]
        },
        {
            code: wrap("assert.notDeepEqual(a);"),
            errors: ["Unexpected call to assert.notDeepEqual with 1 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("assert.notDeepEqual(a, b, c);"),
            errors: ["Unexpected call to assert.notDeepEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrap("assert.notDeepEqual(a, b, c, 'Message');"),
            errors: ["Unexpected call to assert.notDeepEqual with 4 arguments."]
        },

        // notPropEqual
        {
            code: wrap("notPropEqual();"),
            errors: ["Unexpected call to notPropEqual with 0 arguments and no error message."]
        },
        {
            code: wrap("notPropEqual(a);"),
            errors: ["Unexpected call to notPropEqual with 1 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("notPropEqual(a, b, c);"),
            errors: ["Unexpected call to notPropEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrap("notPropEqual(a, b, c, 'Message');"),
            errors: ["Unexpected call to notPropEqual with 4 arguments."]
        },
        {
            code: wrap("assert.notPropEqual();"),
            errors: ["Unexpected call to assert.notPropEqual with 0 arguments and no error message."]
        },
        {
            code: wrap("assert.notPropEqual(a);"),
            errors: ["Unexpected call to assert.notPropEqual with 1 arguments and no error message."]
        },
        /* Allowed for now.
        {
            code: wrap("assert.notPropEqual(a, b, c);"),
            errors: ["Unexpected call to assert.notPropEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrap("assert.notPropEqual(a, b, c, 'Message');"),
            errors: ["Unexpected call to assert.notPropEqual with 4 arguments."]
        }
    ]
});
