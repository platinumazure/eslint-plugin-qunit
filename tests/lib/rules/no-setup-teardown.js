/**
 * @fileoverview Forbid setup/teardown module hooks
 * @author Kevin Partington
 * @copyright 2016 Kevin Partington. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-setup-teardown"),
    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-setup-teardown", rule, {

    valid: [
        // Modules without hooks are always fine
        "QUnit.module('Module');",

        // beforeEach
        "QUnit.module('Module', { beforeEach: function () {} });",

        // afterEach
        "QUnit.module('Module', { afterEach: function () {} });",

        // both
        "QUnit.module('Module', { beforeEach: function () {}, afterEach: function () {} });",

        // other property names are not reported
        "QUnit.module('Module', { foo: function () {} });"
    ],

    invalid: [
        {
            code: "QUnit.module('module', { setup: function () { } });",
            errors: [{
                message: "Use beforeEach instead of setup.",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module('module', { teardown: function () { } });",
            errors: [{
                message: "Use afterEach instead of teardown.",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module('module', { setup: function () {}, teardown: function () { } });",
            errors: [{
                message: "Use beforeEach instead of setup.",
                type: "Property"
            }, {
                message: "Use afterEach instead of teardown.",
                type: "Property"
            }]
        }
    ]
});
