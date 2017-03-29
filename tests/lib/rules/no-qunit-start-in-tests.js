/**
 * @fileoverview forbid QUnit.start() within tests or test hooks
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-qunit-start-in-tests"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const MESSAGE = "Do not use QUnit.start() inside a {{context}}.";

function createMessage(context) {
    return MESSAGE.replace(/\{\{context\}\}/g, context);
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-qunit-start-in-tests", rule, {

    valid: [
        // Must allow QUnit.start() outside of test contexts
        "QUnit.start();",

        // Must allow QUnit.start() in module properties that are not hooks
        "QUnit.module(\"a module\", { notAHook: function() { QUnit.start(); } });"
    ],

    invalid: [
        {
            code: "QUnit.asyncTest(\"test\", function(assert) { QUnit.start(); });",
            errors: [{
                message: createMessage("test"),
                type: "CallExpression"
            }]
        },

        // Module hooks
        {
            code: "QUnit.module(\"module\", { beforeEach: function() { QUnit.start(); } });",
            errors: [{
                message: createMessage("beforeEach hook"),
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.module(\"module\", { afterEach: function() { QUnit.start(); } });",
            errors: [{
                message: createMessage("afterEach hook"),
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.module(\"module\", { setup: function() { QUnit.start(); } });",
            errors: [{
                message: createMessage("setup hook"),
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.module(\"module\", { teardown: function() { QUnit.start(); } });",
            errors: [{
                message: createMessage("teardown hook"),
                type: "CallExpression"
            }]
        }

        // Module hooks (new-style modules)
        /* Enable when supported
        {
            code: "QUnit.module(\"module\", function(hooks) { hooks.beforeEach(function() { QUnit.start(); }); });",
            errors: [{
                message: createMessage("beforeEach hook"),
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.module(\"module\", function(hooks) { hooks.afterEach(function() { QUnit.start(); }); });",
            errors: [{
                message: createMessage("afterEach hook"),
                type: "CallExpression"
            }]
        }
        */
    ]
});
