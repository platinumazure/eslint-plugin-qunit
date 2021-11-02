/**
 * @fileoverview Check the number of arguments to QUnit's assertion functions.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/assert-args"),
    RuleTester = require("eslint").RuleTester,
    testUtils = require("../../testUtils");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("assert-args", rule, {
    valid: [
        // ok
        testUtils.wrap("ok(result);"),
        testUtils.wrap("ok(result, 'Result is true');"),
        testUtils.wrap("ok(obj[key], key + ' value is true');"),
        testUtils.wrap("assert.ok(result);"),
        testUtils.wrap("assert.ok(result, 'Result is true');"),
        testUtils.wrap("assert.ok(obj[key], key + ' value is true');"),

        // equal
        testUtils.wrap("equal(result, expected);"),
        testUtils.wrap("equal(result, expected, 'Message');"),
        testUtils.wrap("equal(obj[key], expected, key + ' value is true');"),
        testUtils.wrap("assert.equal(result, expected);"),
        testUtils.wrap("assert.equal(result, expected, 'Message');"),
        testUtils.wrap("assert.equal(obj[key], expected, key + ' value is true');"),

        // false
        testUtils.wrap("assert.false(result);"),
        testUtils.wrap("assert.false(result, 'Message');"),

        // strictEqual
        testUtils.wrap("strictEqual(result, expected);"),
        testUtils.wrap("strictEqual(result, expected, 'Message');"),
        testUtils.wrap("strictEqual(obj[key], expected, key + ' value is true');"),
        testUtils.wrap("assert.strictEqual(result, expected);"),
        testUtils.wrap("assert.strictEqual(result, expected, 'Message');"),
        testUtils.wrap("assert.strictEqual(obj[key], expected, key + ' value is true');"),

        // deepEqual
        testUtils.wrap("deepEqual(result, expected);"),
        testUtils.wrap("deepEqual(result, expected, 'Message');"),
        testUtils.wrap("deepEqual(obj[key], expected, key + ' value is true');"),
        testUtils.wrap("assert.deepEqual(result, expected);"),
        testUtils.wrap("assert.deepEqual(result, expected, 'Message');"),
        testUtils.wrap("assert.deepEqual(obj[key], expected, key + ' value is true');"),

        // propEqual
        testUtils.wrap("propEqual(result, expected);"),
        testUtils.wrap("propEqual(result, expected, 'Message');"),
        testUtils.wrap("propEqual(obj[key], expected, key + ' value is true');"),
        testUtils.wrap("assert.propEqual(result, expected);"),
        testUtils.wrap("assert.propEqual(result, expected, 'Message');"),
        testUtils.wrap("assert.propEqual(obj[key], expected, key + ' value is true');"),

        // raises
        testUtils.wrap("raises(function () {});"),
        testUtils.wrap("raises(function () {}, 'Message');"),
        testUtils.wrap("raises(function () {}, expectedMessage);"),
        testUtils.wrap("raises(function () {}, TypeError, 'Message');"),
        testUtils.wrap("raises(function () {}, /error/, 'Message');"),
        testUtils.wrap("raises(function () {}, 'Error', 'Message');"),
        testUtils.wrap("raises(function () {}, TypeError, expectedMessage);"),
        testUtils.wrap("assert.raises(function () {}, 'Message');"),
        testUtils.wrap("assert.raises(function () {}, TypeError, 'Message');"),
        testUtils.wrap("assert.raises(function () {}, expectedMessage);"),
        testUtils.wrap("assert.raises(function () {}, /error/, 'Message');"),
        testUtils.wrap("assert.raises(function () {}, 'Error', 'Message');"),
        testUtils.wrap("assert.raises(function () {}, TypeError, expectedMessage);"),

        // throws
        testUtils.wrap("throws(function () {});"),
        testUtils.wrap("throws(function () {}, 'Message');"),
        testUtils.wrap("throws(function () {}, expectedMessage);"),
        testUtils.wrap("throws(function () {}, TypeError, 'Message');"),
        testUtils.wrap("throws(function () {}, /error/, 'Message');"),
        testUtils.wrap("throws(function () {}, 'Error', 'Message');"),
        testUtils.wrap("throws(function () {}, TypeError, expectedMessage);"),
        testUtils.wrap("assert.throws(function () {}, 'Message');"),
        testUtils.wrap("assert.throws(function () {}, TypeError, 'Message');"),
        testUtils.wrap("assert.throws(function () {}, expectedMessage);"),
        testUtils.wrap("assert.throws(function () {}, /error/, 'Message');"),
        testUtils.wrap("assert.throws(function () {}, 'Error', 'Message');"),
        testUtils.wrap("assert.throws(function () {}, TypeError, expectedMessage);"),

        // true
        testUtils.wrap("assert.true(result);"),
        testUtils.wrap("assert.true(result, 'Message');"),

        // notOk
        testUtils.wrap("notOk(result);"),
        testUtils.wrap("notOk(result, 'Result is true');"),
        testUtils.wrap("notOk(obj[key], key + ' value is true');"),
        testUtils.wrap("assert.notOk(result);"),
        testUtils.wrap("assert.notOk(result, 'Result is true');"),
        testUtils.wrap("assert.notOk(obj[key], key + ' value is true');"),

        // notEqual
        testUtils.wrap("notEqual(result, expected);"),
        testUtils.wrap("notEqual(result, expected, 'Message');"),
        testUtils.wrap("notEqual(obj[key], expected, key + ' value is true');"),
        testUtils.wrap("assert.notEqual(result, expected);"),
        testUtils.wrap("assert.notEqual(result, expected, 'Message');"),
        testUtils.wrap("assert.notEqual(obj[key], expected, key + ' value is true');"),

        // notStrictEqual
        testUtils.wrap("notStrictEqual(result, expected);"),
        testUtils.wrap("notStrictEqual(result, expected, 'Message');"),
        testUtils.wrap("notStrictEqual(obj[key], expected, key + ' value is true');"),
        testUtils.wrap("assert.notStrictEqual(result, expected);"),
        testUtils.wrap("assert.notStrictEqual(result, expected, 'Message');"),
        testUtils.wrap("assert.notStrictEqual(obj[key], expected, key + ' value is true');"),

        // notDeepEqual
        testUtils.wrap("notDeepEqual(result, expected);"),
        testUtils.wrap("notDeepEqual(result, expected, 'Message');"),
        testUtils.wrap("notDeepEqual(obj[key], expected, key + ' value is true');"),
        testUtils.wrap("assert.notDeepEqual(result, expected);"),
        testUtils.wrap("assert.notDeepEqual(result, expected, 'Message');"),
        testUtils.wrap("assert.notDeepEqual(obj[key], expected, key + ' value is true');"),

        // notPropEqual
        testUtils.wrap("notPropEqual(result, expected);"),
        testUtils.wrap("notPropEqual(result, expected, 'Message');"),
        testUtils.wrap("notPropEqual(obj[key], expected, key + ' value is true');"),
        testUtils.wrap("assert.notPropEqual(result, expected);"),
        testUtils.wrap("assert.notPropEqual(result, expected, 'Message');"),
        testUtils.wrap("assert.notPropEqual(obj[key], expected, key + ' value is true');"),

        // not actually assertions
        testUtils.wrap("notAnAssertion(result, expected);"),
        testUtils.wrap("getAssertion()(result, expected);"),

        // Object prototype properties (also not actually assertions)
        testUtils.wrap("hasOwnProperty('prop');"),
        testUtils.wrap("assert.hasOwnProperty('prop');"),

        // untestUtils.wrapped
        "notAnAssertion(result, expected);"
    ],

    invalid: [
        // ok
        {
            code: testUtils.wrap("ok();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "ok",
                    argCount: 0
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("ok(a, b);"),
            errors: ["Unexpected call to ok with 2 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("ok(a, b, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "ok",
                    argCount: 3
                }
            }]
        },
        {
            code: testUtils.wrap("assert.ok();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.ok",
                    argCount: 0
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("assert.ok(a, b);"),
            errors: ["Unexpected call to assert.ok with 2 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("assert.ok(a, b, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "assert.ok",
                    argCount: 3
                }
            }]
        },

        // equal
        {
            code: testUtils.wrap("equal();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "equal",
                    argCount: 0
                }
            }]
        },
        {
            code: testUtils.wrap("equal(a);"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "equal",
                    argCount: 1
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("equal(a, b, c);"),
            errors: ["Unexpected call to equal with 3 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("equal(a, b, c, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "equal",
                    argCount: 4
                }
            }]
        },
        {
            code: testUtils.wrap("assert.equal();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.equal",
                    argCount: 0
                }
            }]
        },
        {
            code: testUtils.wrap("assert.equal(a);"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.equal",
                    argCount: 1
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("assert.equal(a, b, c);"),
            errors: ["Unexpected call to assert.equal with 3 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("assert.equal(a, b, c, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "assert.equal",
                    argCount: 4
                }
            }]
        },

        // false
        {
            code: testUtils.wrap("assert.false();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.false",
                    argCount: 0
                }
            }]
        },
        {
            code: testUtils.wrap("assert.false(a, b, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "assert.false",
                    argCount: 3
                }
            }]
        },

        // true
        {
            code: testUtils.wrap("assert.true();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.true",
                    argCount: 0
                }
            }]
        },
        {
            code: testUtils.wrap("assert.true(a, b, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "assert.true",
                    argCount: 3
                }
            }]
        },

        // strictEqual
        {
            code: testUtils.wrap("strictEqual();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "strictEqual",
                    argCount: 0
                }
            }]
        },
        {
            code: testUtils.wrap("strictEqual(a);"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "strictEqual",
                    argCount: 1
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("strictEqual(a, b, c);"),
            errors: ["Unexpected call to strictEqual with 3 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("strictEqual(a, b, c, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "strictEqual",
                    argCount: 4
                }
            }]
        },
        {
            code: testUtils.wrap("assert.strictEqual();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.strictEqual",
                    argCount: 0
                }
            }]
        },
        {
            code: testUtils.wrapArrow("assert.strictEqual();"),
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.strictEqual",
                    argCount: 0
                }
            }]
        },
        {
            code: testUtils.wrap("assert.strictEqual(a);"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.strictEqual",
                    argCount: 1
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("assert.strictEqual(a, b, c);"),
            errors: ["Unexpected call to assert.strictEqual with 3 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("assert.strictEqual(a, b, c, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "assert.strictEqual",
                    argCount: 4
                }
            }]
        },

        // deepEqual
        {
            code: testUtils.wrap("deepEqual();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "deepEqual",
                    argCount: 0
                }
            }]
        },
        {
            code: testUtils.wrap("deepEqual(a);"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "deepEqual",
                    argCount: 1
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("deepEqual(a, b, c);"),
            errors: ["Unexpected call to deepEqual with 3 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("deepEqual(a, b, c, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "deepEqual",
                    argCount: 4
                }
            }]
        },
        {
            code: testUtils.wrap("assert.deepEqual();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.deepEqual",
                    argCount: 0
                }
            }]
        },
        {
            code: testUtils.wrap("assert.deepEqual(a);"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.deepEqual",
                    argCount: 1
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("assert.deepEqual(a, b, c);"),
            errors: ["Unexpected call to assert.deepEqual with 3 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("assert.deepEqual(a, b, c, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "assert.deepEqual",
                    argCount: 4
                }
            }]
        },

        // propEqual
        {
            code: testUtils.wrap("propEqual();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "propEqual",
                    argCount: 0
                }
            }]
        },
        {
            code: testUtils.wrap("propEqual(a);"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "propEqual",
                    argCount: 1
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("propEqual(a, b, c);"),
            errors: ["Unexpected call to propEqual with 3 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("propEqual(a, b, c, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "propEqual",
                    argCount: 4
                }
            }]
        },
        {
            code: testUtils.wrap("assert.propEqual();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.propEqual",
                    argCount: 0
                }
            }]
        },
        {
            code: testUtils.wrap("assert.propEqual(a);"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.propEqual",
                    argCount: 1
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("assert.propEqual(a, b, c);"),
            errors: ["Unexpected call to assert.propEqual with 3 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("assert.propEqual(a, b, c, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "assert.propEqual",
                    argCount: 4
                }
            }]
        },

        // raises
        {
            code: testUtils.wrap("raises();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "raises",
                    argCount: 0
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("raises(function () {}, TypeError, blah);"),
            errors: ["Unexpected call to raises with 3 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("raises(function () {}, TypeError, blah, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "raises",
                    argCount: 4
                }
            }]
        },
        {
            code: testUtils.wrap("assert.raises();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.raises",
                    argCount: 0
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("assert.raises(function () {}, TypeError, blah);"),
            errors: ["Unexpected call to assert.raises with 3 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("assert.raises(function () {}, TypeError, blah, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "assert.raises",
                    argCount: 4
                }
            }]
        },

        // throws
        {
            code: testUtils.wrap("throws();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "throws",
                    argCount: 0
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("throws(function () {}, TypeError, blah);"),
            errors: ["Unexpected call to throws with 3 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("throws(function () {}, TypeError, blah, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "throws",
                    argCount: 4
                }
            }]
        },
        {
            code: testUtils.wrap("assert.throws();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.throws",
                    argCount: 0
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("assert.throws(function () {}, TypeError, blah);"),
            errors: ["Unexpected call to assert.throws with 3 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("assert.throws(function () {}, TypeError, blah, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "assert.throws",
                    argCount: 4
                }
            }]
        },

        // notOk
        {
            code: testUtils.wrap("notOk();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "notOk",
                    argCount: 0
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("notOk(a, b);"),
            errors: ["Unexpected call to notOk with 2 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("notOk(a, b, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "notOk",
                    argCount: 3
                }
            }]
        },
        {
            code: testUtils.wrap("assert.notOk();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.notOk",
                    argCount: 0
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("assert.notOk(a, b);"),
            errors: ["Unexpected call to assert.notOk with 2 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("assert.notOk(a, b, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "assert.notOk",
                    argCount: 3
                }
            }]
        },

        // notEqual
        {
            code: testUtils.wrap("notEqual();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "notEqual",
                    argCount: 0
                }
            }]
        },
        {
            code: testUtils.wrap("notEqual(a);"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "notEqual",
                    argCount: 1
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("notEqual(a, b, c);"),
            errors: ["Unexpected call to notEqual with 3 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("notEqual(a, b, c, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "notEqual",
                    argCount: 4
                }
            }]
        },
        {
            code: testUtils.wrap("assert.notEqual();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.notEqual",
                    argCount: 0
                }
            }]
        },
        {
            code: testUtils.wrap("assert.notEqual(a);"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.notEqual",
                    argCount: 1
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("assert.notEqual(a, b, c);"),
            errors: ["Unexpected call to assert.notEqual with 3 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("assert.notEqual(a, b, c, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "assert.notEqual",
                    argCount: 4
                }
            }]
        },

        // notStrictEqual
        {
            code: testUtils.wrap("notStrictEqual();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "notStrictEqual",
                    argCount: 0
                }
            }]
        },
        {
            code: testUtils.wrap("notStrictEqual(a);"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "notStrictEqual",
                    argCount: 1
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("notStrictEqual(a, b, c);"),
            errors: ["Unexpected call to notStrictEqual with 3 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("notStrictEqual(a, b, c, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "notStrictEqual",
                    argCount: 4
                }
            }]
        },
        {
            code: testUtils.wrap("assert.notStrictEqual();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.notStrictEqual",
                    argCount: 0
                }
            }]
        },
        {
            code: testUtils.wrap("assert.notStrictEqual(a);"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.notStrictEqual",
                    argCount: 1
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("assert.notStrictEqual(a, b, c);"),
            errors: ["Unexpected call to assert.notStrictEqual with 3 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("assert.notStrictEqual(a, b, c, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "assert.notStrictEqual",
                    argCount: 4
                }
            }]
        },

        // notDeepEqual
        {
            code: testUtils.wrap("notDeepEqual();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "notDeepEqual",
                    argCount: 0
                }
            }]
        },
        {
            code: testUtils.wrap("notDeepEqual(a);"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "notDeepEqual",
                    argCount: 1
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("notDeepEqual(a, b, c);"),
            errors: ["Unexpected call to notDeepEqual with 3 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("notDeepEqual(a, b, c, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "notDeepEqual",
                    argCount: 4
                }
            }]
        },
        {
            code: testUtils.wrap("assert.notDeepEqual();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.notDeepEqual",
                    argCount: 0
                }
            }]
        },
        {
            code: testUtils.wrap("assert.notDeepEqual(a);"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.notDeepEqual",
                    argCount: 1
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("assert.notDeepEqual(a, b, c);"),
            errors: ["Unexpected call to assert.notDeepEqual with 3 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("assert.notDeepEqual(a, b, c, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "assert.notDeepEqual",
                    argCount: 4
                }
            }]
        },

        // notPropEqual
        {
            code: testUtils.wrap("notPropEqual();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "notPropEqual",
                    argCount: 0
                }
            }]
        },
        {
            code: testUtils.wrap("notPropEqual(a);"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "notPropEqual",
                    argCount: 1
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("notPropEqual(a, b, c);"),
            errors: ["Unexpected call to notPropEqual with 3 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("notPropEqual(a, b, c, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "notPropEqual",
                    argCount: 4
                }
            }]
        },
        {
            code: testUtils.wrap("assert.notPropEqual();"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.notPropEqual",
                    argCount: 0
                }
            }]
        },
        {
            code: testUtils.wrap("assert.notPropEqual(a);"),
            errors: [{
                messageId: "unexpectedArgCountNoMessage",
                data: {
                    callee: "assert.notPropEqual",
                    argCount: 1
                }
            }]
        },
        /* Allowed for now.
        {
            code: testUtils.wrap("assert.notPropEqual(a, b, c);"),
            errors: ["Unexpected call to assert.notPropEqual with 3 arguments and no error message."]
        },
        */
        {
            code: testUtils.wrap("assert.notPropEqual(a, b, c, 'Message');"),
            errors: [{
                messageId: "unexpectedArgCount",
                data: {
                    callee: "assert.notPropEqual",
                    argCount: 4
                }
            }]
        }
    ]
});
