/**
 * @fileoverview forbid assertions within if statements or conditional expressions
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-conditional-assertions"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const MESSAGE = "Do not place an assertion inside a conditional.";

function wrapInQUnitTest(code) {
    return "QUnit.test('test', function (assert) { " + code + " });";
}

function wrapInValidTestObject(code) {
    return {
        code: wrapInQUnitTest(code),
        parserOptions: { ecmaVersion: 6 }
    };
}

function wrapInInvalidTestObject(code) {
    return {
        code: wrapInQUnitTest(code),
        errors: [{
            message: MESSAGE,
            type: "CallExpression"
        }]
    };
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-conditional-assertions", rule, {

    valid: [
        // Unconditional assertions are good
        "assert.ok(true);",

        // Conditions in parent scope are okay
        "if (foo) (function() { assert.ok(true); });",
        "if (foo) { (function() { assert.ok(true); }); }",
        "if (foo) {} else if (bar) { (function() { assert.ok(true); }); }",
        "if (foo) {} else { (function() { assert.ok(true); }); }",
        "if (foo) { function bar() { assert.ok(true); } }",
        "if (foo) {} else if (bar) { function bar() { assert.ok(true); } }",
        "if (foo) {} else { function bar() { assert.ok(true); }; }",
        "foo ? (function() { assert.ok(true); }) : false;",
        "foo ? false : (function() { assert.ok(true); });",
        "if (foo) (() => { assert.ok(true); });",
        "if (foo) { (() => { assert.ok(true); }); }",
        "if (foo) {} else if (bar) { (() => { assert.ok(true); }); }",
        "if (foo) {} else { (() => { assert.ok(true); }); }",
        "foo ? (() => { assert.ok(true); }) : false;",
        "foo ? false : (() => { assert.ok(true); });",

        // Conditions around non-assertions are okay
        "if (foo) doSomething();",
        "foo ? doSomething() : false;",
        "foo ? false : doSomething();"
    ].map(wrapInValidTestObject).concat([
        // Conditional tests are okay
        "if (foo) QUnit.test('test', function (assert) { assert.ok(true); });"
    ]),

    invalid: [
        "if (foo) assert.ok(true);",
        "if (foo) { assert.ok(true); }",
        "if (foo) {} else if (bar) assert.ok(true);",
        "if (foo) {} else assert.ok(true);",
        "foo ? assert.ok(true) : false",
        "foo ? false : assert.ok(true)"
    ].map(wrapInInvalidTestObject)
});
