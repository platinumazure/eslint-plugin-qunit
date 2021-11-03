/**
 * @fileoverview Forbid the use of QUnit.todo
 * @author Baptiste Doucerain
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-todo"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-todo", rule, {
    valid: [
        "QUnit.module.test('Name', function() { });",
        "QUnit.test('Name', function() { });",
        "module.test('Name', function() { });",
        "test('Name', function() { });",
        "foo.todo('Name', function() { });",
        "foo.bar.todo('Name', function() { });",
        "module.foo.todo('Name', function() { });",
        "test.foo.todo('Name', function() { });",
        "todo.foo('Name', function() { });"
    ],

    invalid: [
        {
            code: "QUnit.module.todo('Name', function() { });",
            errors: [{
                messageId: "noQUnitTodo",
                data: { callee: "QUnit.module.todo" }
            }]
        },
        {
            code: "QUnit.todo('Name', function() { });",
            errors: [{
                messageId: "noQUnitTodo",
                data: { callee: "QUnit.todo" }
            }]
        },
        {
            code: "QUnit.test.todo('Name', function() { });",
            errors: [{
                messageId: "noQUnitTodo",
                data: { callee: "QUnit.test.todo" }
            }]
        },
        {
            code: "module.todo('Name', function() { });",
            errors: [{
                messageId: "noQUnitTodo",
                data: { callee: "module.todo" }
            }]
        },
        {
            code: "todo('Name', function() { });",
            errors: [{
                messageId: "noQUnitTodo",
                data: { callee: "todo" }
            }]
        },
        {
            code: "test.todo('Name', function() { });",
            errors: [{
                messageId: "noQUnitTodo",
                data: { callee: "test.todo" }
            }]
        }
    ]
});
