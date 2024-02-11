/**
 * @fileoverview Forbid usage of nested QUnit.test()
 * @author Aliaksandr Yermalayeu
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-nested-tests"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-nested-tests", rule, {
    valid: [
        "QUnit.test('Name', function() { });",
        "test('Name', function() { });",
        "QUnit.test('First', function() { }); \n QUnit.test('Second', function() { });",
        "test('First', function() { }); \n test('Second', function() { });",
        "QUnit.test('First', function() { }); \n test('Second', function() { });",
        "test('First', function() { }); \n QUnit.test('Second', function() { });",
        "QUnit.module('ParentModule', function () {\n QUnit.test('Name', function() {});\n QUnit.module('ChildModule', function () {\n QUnit.test('ChildTest', function () {});\n });\n })\n",
        "QUnit.module('ParentModule', function () {\n test('Name', function() {});\n module('ChildModule', function () {\n QUnit.test('ChildTest', function () {});\n });\n })\n",
        "module('ParentModule', function () {\n QUnit.test('Name', function() {});\n QUnit.module('ChildModule', function () {\n test('ChildTest', function () {});\n });\n })\n",
        "module('ParentModule', function () {\n test('Name', function() {});\n module('ChildModule', function () {\n test('ChildTest', function () {});\n });\n })\n",
    ],

    invalid: [
        "QUnit.test('Parent', function() {\n QUnit.test('Child', function () {}); });",
        "test('Parent', function() {\n test('Child', function () {}); });",
        "QUnit.test('Parent', function() {\n test('Child', function () {}); });",
        "test('Parent', function() {\n QUnit.test('Child', function () {}); });",
        "QUnit.test('ParentTest', function () {\n QUnit.module('ChildModule', function () {\n QUnit.test('ChildTest', function () {});\n });\n });",
        "test('ParentTest', function () {\n module('ChildModule', function () {\n test('ChildTest', function () {});\n });\n });",
        "QUnit.test('ParentTest', function () {\n module('ChildModule', function () {\n test('ChildTest', function () {});\n });\n });",
        "test('ParentTest', function () {\n QUnit.module('ChildModule', function () {\n QUnit.test('ChildTest', function () {});\n });\n });",
    ].map((code) => ({
        code,
        errors: [
            {
                messageId: "noNestedTests",
            },
        ],
    })),
});
