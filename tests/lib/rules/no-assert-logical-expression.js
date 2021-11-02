/**
 * @fileoverview forbid binary logical expressions in assert arguments
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-assert-logical-expression"),
    RuleTester = require("eslint").RuleTester,
    testUtils = require("../../testUtils");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-assert-logical-expression", rule, {

    valid: [
        // Simple assertions
        testUtils.wrap("assert.ok(foo);"),
        testUtils.wrap("assert.equal(foo, bar);"),
        testUtils.wrap("assert.false(foo);"),
        testUtils.wrap("assert.strictEqual(foo, bar);"),
        testUtils.wrap("assert.deepEqual(foo, bar);"),
        testUtils.wrap("assert.propEqual(foo, bar);"),
        testUtils.wrap("assert.notOk(foo);"),
        testUtils.wrap("assert.notEqual(foo, bar);"),
        testUtils.wrap("assert.notStrictEqual(foo, bar);"),
        testUtils.wrap("assert.notDeepEqual(foo, bar);"),
        testUtils.wrap("assert.notPropEqual(foo, bar);"),
        testUtils.wrap("assert.raises(function () {}, /Message/);"),
        testUtils.wrap("assert.throws(function () {}, /Message/);"),
        testUtils.wrap("assert.true(foo);"),

        // Logical expressions inside raises/throw blocks are fine
        testUtils.wrap("assert.raises(function () { throw (foo || bar); });"),
        testUtils.wrap("assert.throws(function () { throw (foo || bar); });"),

        // Messages can have logical expressions.
        testUtils.wrap("assert.ok(foo, message || 'alternative message');"),
        testUtils.wrap("assert.equal(foo, bar, message || 'alternative message');"),

        // Not an assertion, not in a test
        "doSomething(foo && bar);"
    ],

    invalid: [
        {
            code: testUtils.wrap("assert.ok(foo && bar);"),
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
            code: testUtils.wrapArrow("assert.ok(foo && bar);"),
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
            code: testUtils.wrap("assert.ok(foo || bar);"),
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
            code: testUtils.wrap("assert.notOk(foo && bar);"),
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
            code: testUtils.wrap("assert.notOk(foo || bar);"),
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
            code: testUtils.wrap("assert.equal(foo && bar, baz && lol);"),
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
            code: testUtils.wrap("assert.equal(foo || bar, baz || lol);"),
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
            code: testUtils.wrap("assert.strictEqual(foo && bar, baz && lol);"),
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
            code: testUtils.wrap("assert.strictEqual(foo || bar, baz || lol);"),
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
            code: testUtils.wrap("assert.deepEqual(foo && bar, baz && lol);"),
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
            code: testUtils.wrap("assert.deepEqual(foo || bar, baz || lol);"),
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
            code: testUtils.wrap("assert.propEqual(foo && bar, baz && lol);"),
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
            code: testUtils.wrap("assert.propEqual(foo || bar, baz || lol);"),
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
            code: testUtils.wrap("assert.notEqual(foo && bar, baz && lol);"),
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
            code: testUtils.wrap("assert.notEqual(foo || bar, baz || lol);"),
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
            code: testUtils.wrap("assert.notStrictEqual(foo && bar, baz && lol);"),
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
            code: testUtils.wrap("assert.notStrictEqual(foo || bar, baz || lol);"),
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
            code: testUtils.wrap("assert.notDeepEqual(foo && bar, baz && lol);"),
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
            code: testUtils.wrap("assert.notDeepEqual(foo || bar, baz || lol);"),
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
            code: testUtils.wrap("assert.notPropEqual(foo && bar, baz && lol);"),
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
            code: testUtils.wrap("assert.notPropEqual(foo || bar, baz || lol);"),
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
            code: testUtils.wrap("assert.true(foo && bar);"),
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
            code: testUtils.wrap("assert.false(foo && bar);"),
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
