/**
 * @fileoverview forbid binary logical expressions in assert arguments
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-assert-logical-expression"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function wrap(code) {
    return "QUnit.test('test', function (assert) { " + code + " });";
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-assert-logical-expression", rule, {

    valid: [
        // Simple assertions
        wrap("assert.ok(foo);"),
        wrap("assert.equal(foo, bar);"),
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

        // Logical expressions inside raises/throw blocks are fine
        wrap("assert.raises(function () { throw (foo || bar); });"),
        wrap("assert.throws(function () { throw (foo || bar); });"),

        // Not an assertion, not in a test
        "doSomething(foo && bar);"
    ],

    invalid: [
        {
            code: wrap("assert.ok(foo && bar);"),
            errors: [{
                message: "Do not use '&&' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 50
            }]
        },
        {
            code: wrap("assert.ok(foo || bar);"),
            errors: [{
                message: "Do not use '||' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 50
            }]
        },
        {
            code: wrap("assert.notOk(foo && bar);"),
            errors: [{
                message: "Do not use '&&' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 53
            }]
        },
        {
            code: wrap("assert.notOk(foo || bar);"),
            errors: [{
                message: "Do not use '||' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 53
            }]
        },
        {
            code: wrap("assert.equal(foo && bar, baz && lol);"),
            errors: [{
                message: "Do not use '&&' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 53
            }, {
                message: "Do not use '&&' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 65
            }]
        },
        {
            code: wrap("assert.equal(foo || bar, baz || lol);"),
            errors: [{
                message: "Do not use '||' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 53
            }, {
                message: "Do not use '||' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 65
            }]
        },
        {
            code: wrap("assert.strictEqual(foo && bar, baz && lol);"),
            errors: [{
                message: "Do not use '&&' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 59
            }, {
                message: "Do not use '&&' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 71
            }]
        },
        {
            code: wrap("assert.strictEqual(foo || bar, baz || lol);"),
            errors: [{
                message: "Do not use '||' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 59
            }, {
                message: "Do not use '||' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 71
            }]
        },
        {
            code: wrap("assert.deepEqual(foo && bar, baz && lol);"),
            errors: [{
                message: "Do not use '&&' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 57
            }, {
                message: "Do not use '&&' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 69
            }]
        },
        {
            code: wrap("assert.deepEqual(foo || bar, baz || lol);"),
            errors: [{
                message: "Do not use '||' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 57
            }, {
                message: "Do not use '||' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 69
            }]
        },
        {
            code: wrap("assert.propEqual(foo && bar, baz && lol);"),
            errors: [{
                message: "Do not use '&&' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 57
            }, {
                message: "Do not use '&&' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 69
            }]
        },
        {
            code: wrap("assert.propEqual(foo || bar, baz || lol);"),
            errors: [{
                message: "Do not use '||' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 57
            }, {
                message: "Do not use '||' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 69
            }]
        },
        {
            code: wrap("assert.notEqual(foo && bar, baz && lol);"),
            errors: [{
                message: "Do not use '&&' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 56
            }, {
                message: "Do not use '&&' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 68
            }]
        },
        {
            code: wrap("assert.notEqual(foo || bar, baz || lol);"),
            errors: [{
                message: "Do not use '||' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 56
            }, {
                message: "Do not use '||' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 68
            }]
        },
        {
            code: wrap("assert.notStrictEqual(foo && bar, baz && lol);"),
            errors: [{
                message: "Do not use '&&' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 62
            }, {
                message: "Do not use '&&' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 74
            }]
        },
        {
            code: wrap("assert.notStrictEqual(foo || bar, baz || lol);"),
            errors: [{
                message: "Do not use '||' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 62
            }, {
                message: "Do not use '||' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 74
            }]
        },
        {
            code: wrap("assert.notDeepEqual(foo && bar, baz && lol);"),
            errors: [{
                message: "Do not use '&&' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 60
            }, {
                message: "Do not use '&&' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 72
            }]
        },
        {
            code: wrap("assert.notDeepEqual(foo || bar, baz || lol);"),
            errors: [{
                message: "Do not use '||' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 60
            }, {
                message: "Do not use '||' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 72
            }]
        },
        {
            code: wrap("assert.notPropEqual(foo && bar, baz && lol);"),
            errors: [{
                message: "Do not use '&&' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 60
            }, {
                message: "Do not use '&&' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 72
            }]
        },
        {
            code: wrap("assert.notPropEqual(foo || bar, baz || lol);"),
            errors: [{
                message: "Do not use '||' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 60
            }, {
                message: "Do not use '||' in assertion arguments.",
                type: "LogicalExpression",
                line: 1,
                column: 72
            }]
        }
    ]
});
