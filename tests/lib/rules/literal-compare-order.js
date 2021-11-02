/**
 * @fileoverview Check the location of literals in arguments to QUnit's assertion functions.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/literal-compare-order"),
    RuleTester = require("eslint").RuleTester,
    testUtils = require("../../testUtils");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("literal-compare-order", rule, {
    valid: [
        // equal
        testUtils.wrap("equal(variable, 'Literal');"),
        testUtils.wrap("equal(variable, 'Literal', 'Message');"),
        testUtils.wrap("assert.equal(variable, 'Literal');"),
        testUtils.wrap("assert.equal(variable, 'Literal', 'Message');"),
        testUtils.wrap("equal();"), // avoid crash with missing arguments
        testUtils.wrap("equal(variable);"), // avoid crash with missing arguments

        // strictEqual
        testUtils.wrap("strictEqual(variable, 'Literal');"),
        testUtils.wrap("strictEqual(variable, 'Literal', 'Message');"),
        testUtils.wrap("assert.strictEqual(variable, 'Literal');"),
        testUtils.wrap("assert.strictEqual(variable, 'Literal', 'Message');"),

        // deepEqual
        testUtils.wrap("deepEqual(variable, 'Literal');"),
        testUtils.wrap("deepEqual(variable, 'Literal', 'Message');"),
        testUtils.wrap("assert.deepEqual(variable, 'Literal');"),
        testUtils.wrap("assert.deepEqual(variable, 'Literal', 'Message');"),

        // propEqual
        testUtils.wrap("propEqual(variable, 'Literal');"),
        testUtils.wrap("propEqual(variable, 'Literal', 'Message');"),
        testUtils.wrap("assert.propEqual(variable, 'Literal');"),
        testUtils.wrap("assert.propEqual(variable, 'Literal', 'Message');"),

        // notEqual
        testUtils.wrap("notEqual(variable, 'Literal');"),
        testUtils.wrap("notEqual(variable, 'Literal', 'Message');"),
        testUtils.wrap("assert.notEqual(variable, 'Literal');"),
        testUtils.wrap("assert.notEqual(variable, 'Literal', 'Message');"),

        // notStrictEqual
        testUtils.wrap("notStrictEqual(variable, 'Literal');"),
        testUtils.wrap("notStrictEqual(variable, 'Literal', 'Message');"),
        testUtils.wrap("assert.notStrictEqual(variable, 'Literal');"),
        testUtils.wrap("assert.notStrictEqual(variable, 'Literal', 'Message');"),

        // notDeepEqual
        testUtils.wrap("notDeepEqual(variable, 'Literal');"),
        testUtils.wrap("notDeepEqual(variable, 'Literal', 'Message');"),
        testUtils.wrap("assert.notDeepEqual(variable, 'Literal');"),
        testUtils.wrap("assert.notDeepEqual(variable, 'Literal', 'Message');"),

        // notPropEqual
        testUtils.wrap("notPropEqual(variable, 'Literal');"),
        testUtils.wrap("notPropEqual(variable, 'Literal', 'Message');"),
        testUtils.wrap("assert.notPropEqual(variable, 'Literal');"),
        testUtils.wrap("assert.notPropEqual(variable, 'Literal', 'Message');"),

        // avoid crash in BDD-style assertions
        "QUnit.test('Name', function() { expect(variable).to.equal('Literal'); });"
    ],
    invalid: [
        // equal
        {
            code: testUtils.wrap("equal('Literal', variable);"),
            output: testUtils.wrap("equal(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("equal('Literal', variable, 'message');"),
            output: testUtils.wrap("equal(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("assert.equal('Literal', variable);"),
            output: testUtils.wrap("assert.equal(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrapArrow("assert.equal('Literal', variable);"),
            output: testUtils.wrapArrow("assert.equal(variable, 'Literal');"),
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("assert.equal('Literal', variable, 'message');"),
            output: testUtils.wrap("assert.equal(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },

        // strictEqual
        {
            code: testUtils.wrap("strictEqual('Literal', variable);"),
            output: testUtils.wrap("strictEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("strictEqual('Literal', variable, 'message');"),
            output: testUtils.wrap("strictEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("assert.strictEqual('Literal', variable);"),
            output: testUtils.wrap("assert.strictEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("assert.strictEqual('Literal', variable, 'message');"),
            output: testUtils.wrap("assert.strictEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },

        // deepEqual
        {
            code: testUtils.wrap("deepEqual('Literal', variable);"),
            output: testUtils.wrap("deepEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("deepEqual('Literal', variable, 'message');"),
            output: testUtils.wrap("deepEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("assert.deepEqual('Literal', variable);"),
            output: testUtils.wrap("assert.deepEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("assert.deepEqual('Literal', variable, 'message');"),
            output: testUtils.wrap("assert.deepEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },

        // propEqual
        {
            code: testUtils.wrap("propEqual('Literal', variable);"),
            output: testUtils.wrap("propEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("propEqual('Literal', variable, 'message');"),
            output: testUtils.wrap("propEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("assert.propEqual('Literal', variable);"),
            output: testUtils.wrap("assert.propEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("assert.propEqual('Literal', variable, 'message');"),
            output: testUtils.wrap("assert.propEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },

        // notEqual
        {
            code: testUtils.wrap("notEqual('Literal', variable);"),
            output: testUtils.wrap("notEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("notEqual('Literal', variable, 'message');"),
            output: testUtils.wrap("notEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("assert.notEqual('Literal', variable);"),
            output: testUtils.wrap("assert.notEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("assert.notEqual('Literal', variable, 'message');"),
            output: testUtils.wrap("assert.notEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },

        // notStrictEqual
        {
            code: testUtils.wrap("notStrictEqual('Literal', variable);"),
            output: testUtils.wrap("notStrictEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("notStrictEqual('Literal', variable, 'message');"),
            output: testUtils.wrap("notStrictEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("assert.notStrictEqual('Literal', variable);"),
            output: testUtils.wrap("assert.notStrictEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("assert.notStrictEqual('Literal', variable, 'message');"),
            output: testUtils.wrap("assert.notStrictEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },

        // notDeepEqual
        {
            code: testUtils.wrap("notDeepEqual('Literal', variable);"),
            output: testUtils.wrap("notDeepEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("notDeepEqual('Literal', variable, 'message');"),
            output: testUtils.wrap("notDeepEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("assert.notDeepEqual('Literal', variable);"),
            output: testUtils.wrap("assert.notDeepEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("assert.notDeepEqual('Literal', variable, 'message');"),
            output: testUtils.wrap("assert.notDeepEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },

        // notPropEqual
        {
            code: testUtils.wrap("notPropEqual('Literal', variable);"),
            output: testUtils.wrap("notPropEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("notPropEqual('Literal', variable, 'message');"),
            output: testUtils.wrap("notPropEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("assert.notPropEqual('Literal', variable);"),
            output: testUtils.wrap("assert.notPropEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: testUtils.wrap("assert.notPropEqual('Literal', variable, 'message');"),
            output: testUtils.wrap("assert.notPropEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        }
    ]
});
