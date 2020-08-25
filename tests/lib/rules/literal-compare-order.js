/**
 * @fileoverview Check the location of literals in arguments to QUnit's assertion functions.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/literal-compare-order"),
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

ruleTester.run("literal-compare-order", rule, {
    valid: [
        // equal
        wrap("equal(variable, 'Literal');"),
        wrap("equal(variable, 'Literal', 'Message');"),
        wrap("assert.equal(variable, 'Literal');"),
        wrap("assert.equal(variable, 'Literal', 'Message');"),
        wrap("equal();"), // avoid crash with missing arguments
        wrap("equal(variable);"), // avoid crash with missing arguments

        // strictEqual
        wrap("strictEqual(variable, 'Literal');"),
        wrap("strictEqual(variable, 'Literal', 'Message');"),
        wrap("assert.strictEqual(variable, 'Literal');"),
        wrap("assert.strictEqual(variable, 'Literal', 'Message');"),

        // deepEqual
        wrap("deepEqual(variable, 'Literal');"),
        wrap("deepEqual(variable, 'Literal', 'Message');"),
        wrap("assert.deepEqual(variable, 'Literal');"),
        wrap("assert.deepEqual(variable, 'Literal', 'Message');"),

        // propEqual
        wrap("propEqual(variable, 'Literal');"),
        wrap("propEqual(variable, 'Literal', 'Message');"),
        wrap("assert.propEqual(variable, 'Literal');"),
        wrap("assert.propEqual(variable, 'Literal', 'Message');"),

        // notEqual
        wrap("notEqual(variable, 'Literal');"),
        wrap("notEqual(variable, 'Literal', 'Message');"),
        wrap("assert.notEqual(variable, 'Literal');"),
        wrap("assert.notEqual(variable, 'Literal', 'Message');"),

        // notStrictEqual
        wrap("notStrictEqual(variable, 'Literal');"),
        wrap("notStrictEqual(variable, 'Literal', 'Message');"),
        wrap("assert.notStrictEqual(variable, 'Literal');"),
        wrap("assert.notStrictEqual(variable, 'Literal', 'Message');"),

        // notDeepEqual
        wrap("notDeepEqual(variable, 'Literal');"),
        wrap("notDeepEqual(variable, 'Literal', 'Message');"),
        wrap("assert.notDeepEqual(variable, 'Literal');"),
        wrap("assert.notDeepEqual(variable, 'Literal', 'Message');"),

        // notPropEqual
        wrap("notPropEqual(variable, 'Literal');"),
        wrap("notPropEqual(variable, 'Literal', 'Message');"),
        wrap("assert.notPropEqual(variable, 'Literal');"),
        wrap("assert.notPropEqual(variable, 'Literal', 'Message');"),

        // avoid crash in BDD-style assertions
        "QUnit.test('Name', function() { expect(variable).to.equal('Literal'); });"
    ],
    invalid: [
        // equal
        {
            code: wrap("equal('Literal', variable);"),
            output: wrap("equal(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("equal('Literal', variable, 'message');"),
            output: wrap("equal(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("assert.equal('Literal', variable);"),
            output: wrap("assert.equal(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("assert.equal('Literal', variable, 'message');"),
            output: wrap("assert.equal(variable, 'Literal', 'message');"),
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
            code: wrap("strictEqual('Literal', variable);"),
            output: wrap("strictEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("strictEqual('Literal', variable, 'message');"),
            output: wrap("strictEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("assert.strictEqual('Literal', variable);"),
            output: wrap("assert.strictEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("assert.strictEqual('Literal', variable, 'message');"),
            output: wrap("assert.strictEqual(variable, 'Literal', 'message');"),
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
            code: wrap("deepEqual('Literal', variable);"),
            output: wrap("deepEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("deepEqual('Literal', variable, 'message');"),
            output: wrap("deepEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("assert.deepEqual('Literal', variable);"),
            output: wrap("assert.deepEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("assert.deepEqual('Literal', variable, 'message');"),
            output: wrap("assert.deepEqual(variable, 'Literal', 'message');"),
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
            code: wrap("propEqual('Literal', variable);"),
            output: wrap("propEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("propEqual('Literal', variable, 'message');"),
            output: wrap("propEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("assert.propEqual('Literal', variable);"),
            output: wrap("assert.propEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("assert.propEqual('Literal', variable, 'message');"),
            output: wrap("assert.propEqual(variable, 'Literal', 'message');"),
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
            code: wrap("notEqual('Literal', variable);"),
            output: wrap("notEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("notEqual('Literal', variable, 'message');"),
            output: wrap("notEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("assert.notEqual('Literal', variable);"),
            output: wrap("assert.notEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("assert.notEqual('Literal', variable, 'message');"),
            output: wrap("assert.notEqual(variable, 'Literal', 'message');"),
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
            code: wrap("notStrictEqual('Literal', variable);"),
            output: wrap("notStrictEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("notStrictEqual('Literal', variable, 'message');"),
            output: wrap("notStrictEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("assert.notStrictEqual('Literal', variable);"),
            output: wrap("assert.notStrictEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("assert.notStrictEqual('Literal', variable, 'message');"),
            output: wrap("assert.notStrictEqual(variable, 'Literal', 'message');"),
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
            code: wrap("notDeepEqual('Literal', variable);"),
            output: wrap("notDeepEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("notDeepEqual('Literal', variable, 'message');"),
            output: wrap("notDeepEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("assert.notDeepEqual('Literal', variable);"),
            output: wrap("assert.notDeepEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("assert.notDeepEqual('Literal', variable, 'message');"),
            output: wrap("assert.notDeepEqual(variable, 'Literal', 'message');"),
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
            code: wrap("notPropEqual('Literal', variable);"),
            output: wrap("notPropEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("notPropEqual('Literal', variable, 'message');"),
            output: wrap("notPropEqual(variable, 'Literal', 'message');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("assert.notPropEqual('Literal', variable);"),
            output: wrap("assert.notPropEqual(variable, 'Literal');"),
            errors: [{
                messageId: "actualFirst",
                data: {
                    expected: "'Literal'",
                    actual: "variable"
                }
            }]
        },
        {
            code: wrap("assert.notPropEqual('Literal', variable, 'message');"),
            output: wrap("assert.notPropEqual(variable, 'Literal', 'message');"),
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
