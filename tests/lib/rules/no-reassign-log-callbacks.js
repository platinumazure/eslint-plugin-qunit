/**
 * @fileoverview Forbid overwriting of QUnit logging callbacks.
 * @author Kevin Partington
 * @copyright 2016 Kevin Partington. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-reassign-log-callbacks"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-reassign-log-callbacks", rule, {

    valid: [
        "QUnit.begin(function () { });",
        "QUnit.done(function () { });",
        "QUnit.log(function () { });",
        "QUnit.moduleDone(function () { });",
        "QUnit.moduleStart(function () { });",
        "QUnit.testDone(function () { });",
        "QUnit.testStart(function () { });",

        // Assigning to other QUnit properties is okay
        "QUnit.blah = function () { };"
    ],

    invalid: [
        {
            code: "QUnit.begin = function () { };",
            errors: [{
                message: "Do not reassign QUnit log callbacks.",
                type: "AssignmentExpression"
            }]
        },
        {
            code: "QUnit.done = function () { };",
            errors: [{
                message: "Do not reassign QUnit log callbacks.",
                type: "AssignmentExpression"
            }]
        },
        {
            code: "QUnit.log = function () { };",
            errors: [{
                message: "Do not reassign QUnit log callbacks.",
                type: "AssignmentExpression"
            }]
        },
        {
            code: "QUnit.moduleDone = function () { };",
            errors: [{
                message: "Do not reassign QUnit log callbacks.",
                type: "AssignmentExpression"
            }]
        },
        {
            code: "QUnit.moduleStart = function () { };",
            errors: [{
                message: "Do not reassign QUnit log callbacks.",
                type: "AssignmentExpression"
            }]
        },
        {
            code: "QUnit.testDone = function () { };",
            errors: [{
                message: "Do not reassign QUnit log callbacks.",
                type: "AssignmentExpression"
            }]
        },
        {
            code: "QUnit.testStart = function () { };",
            errors: [{
                message: "Do not reassign QUnit log callbacks.",
                type: "AssignmentExpression"
            }]
        }
    ]
});
