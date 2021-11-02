/**
 * @fileoverview forbid binary logical expressions in assert arguments
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-assert-logical-expression"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function wrap(code) {
    return `QUnit.test('test', function (assert) { ${code} });`;
}

function wrapArrow(code) {
    return `QUnit.test('test', (assert) => { ${code} });`;
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-assert-logical-expression", rule, {

    valid: [
        // Simple assertions
        wrap("assert.ok(foo);"),
        wrap("assert.equal(foo, bar);"),
        wrap("assert.false(foo);"),
        wrap("assert.strictEqual(foo, bar);"),
        wrap("assert.deepEqual(foo, bar);"),
        wrap("assert.propEqual(foo, bar);"),
        wrap("assert.notOk(foo);"),
        wrap("assert.notEqual(foo, bar);"),
        wrap("assert.notStrictEqual(foo, bar);"),
        wrap("assert.notDeepEqual(foo, bar);"),
        wrap("assert.notPropEqual(foo, bar);"),
        wrap("assert.raises(function () {}, /Message/);"),
        wrap("assert.throws(function () {}, /Message/);"),
        wrap("assert.true(foo);"),

        // Logical expressions inside raises/throw blocks are fine
        wrap("assert.raises(function () { throw (foo || bar); });"),
        wrap("assert.throws(function () { throw (foo || bar); });"),

        // Messages can have logical expressions.
        wrap("assert.ok(foo, message || 'alternative message');"),
        wrap("assert.equal(foo, bar, message || 'alternative message');"),

        // Not an assertion, not in a test
        "doSomething(foo && bar);"
    ],

    invalid: [
        {
            code: wrap("assert.ok(foo && bar);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 50
            }]
        },
        {
            code: wrapArrow("assert.ok(foo && bar);"),
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 44
            }]
        },
        {
            code: wrap("assert.ok(foo || bar);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "||"
                },
                type: "LogicalExpression",
                line: 1,
                column: 50
            }]
        },
        {
            code: wrap("assert.notOk(foo && bar);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 53
            }]
        },
        {
            code: wrap("assert.notOk(foo || bar);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "||"
                },
                type: "LogicalExpression",
                line: 1,
                column: 53
            }]
        },
        {
            code: wrap("assert.equal(foo && bar, baz && lol);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 53
            }, {
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 65
            }]
        },
        {
            code: wrap("assert.equal(foo || bar, baz || lol);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "||"
                },
                type: "LogicalExpression",
                line: 1,
                column: 53
            }, {
                messageId: "noLogicalOperator",
                data: {
                    operator: "||"
                },
                type: "LogicalExpression",
                line: 1,
                column: 65
            }]
        },
        {
            code: wrap("assert.strictEqual(foo && bar, baz && lol);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 59
            }, {
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 71
            }]
        },
        {
            code: wrap("assert.strictEqual(foo || bar, baz || lol);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "||"
                },
                type: "LogicalExpression",
                line: 1,
                column: 59
            }, {
                messageId: "noLogicalOperator",
                data: {
                    operator: "||"
                },
                type: "LogicalExpression",
                line: 1,
                column: 71
            }]
        },
        {
            code: wrap("assert.deepEqual(foo && bar, baz && lol);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 57
            }, {
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 69
            }]
        },
        {
            code: wrap("assert.deepEqual(foo || bar, baz || lol);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "||"
                },
                type: "LogicalExpression",
                line: 1,
                column: 57
            }, {
                messageId: "noLogicalOperator",
                data: {
                    operator: "||"
                },
                type: "LogicalExpression",
                line: 1,
                column: 69
            }]
        },
        {
            code: wrap("assert.propEqual(foo && bar, baz && lol);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 57
            }, {
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 69
            }]
        },
        {
            code: wrap("assert.propEqual(foo || bar, baz || lol);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "||"
                },
                type: "LogicalExpression",
                line: 1,
                column: 57
            }, {
                messageId: "noLogicalOperator",
                data: {
                    operator: "||"
                },
                type: "LogicalExpression",
                line: 1,
                column: 69
            }]
        },
        {
            code: wrap("assert.notEqual(foo && bar, baz && lol);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 56
            }, {
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 68
            }]
        },
        {
            code: wrap("assert.notEqual(foo || bar, baz || lol);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "||"
                },
                type: "LogicalExpression",
                line: 1,
                column: 56
            }, {
                messageId: "noLogicalOperator",
                data: {
                    operator: "||"
                },
                type: "LogicalExpression",
                line: 1,
                column: 68
            }]
        },
        {
            code: wrap("assert.notStrictEqual(foo && bar, baz && lol);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 62
            }, {
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 74
            }]
        },
        {
            code: wrap("assert.notStrictEqual(foo || bar, baz || lol);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "||"
                },
                type: "LogicalExpression",
                line: 1,
                column: 62
            }, {
                messageId: "noLogicalOperator",
                data: {
                    operator: "||"
                },
                type: "LogicalExpression",
                line: 1,
                column: 74
            }]
        },
        {
            code: wrap("assert.notDeepEqual(foo && bar, baz && lol);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 60
            }, {
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 72
            }]
        },
        {
            code: wrap("assert.notDeepEqual(foo || bar, baz || lol);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "||"
                },
                type: "LogicalExpression",
                line: 1,
                column: 60
            }, {
                messageId: "noLogicalOperator",
                data: {
                    operator: "||"
                },
                type: "LogicalExpression",
                line: 1,
                column: 72
            }]
        },
        {
            code: wrap("assert.notPropEqual(foo && bar, baz && lol);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 60
            }, {
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 72
            }]
        },
        {
            code: wrap("assert.notPropEqual(foo || bar, baz || lol);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "||"
                },
                type: "LogicalExpression",
                line: 1,
                column: 60
            }, {
                messageId: "noLogicalOperator",
                data: {
                    operator: "||"
                },
                type: "LogicalExpression",
                line: 1,
                column: 72
            }]
        },

        // Boolean assertions
        {
            code: wrap("assert.true(foo && bar);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 52
            }]
        },
        {
            code: wrap("assert.false(foo && bar);"),
            errors: [{
                messageId: "noLogicalOperator",
                data: {
                    operator: "&&"
                },
                type: "LogicalExpression",
                line: 1,
                column: 53
            }]
        }
    ]
});
