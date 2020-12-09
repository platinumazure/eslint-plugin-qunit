/**
 * @fileoverview Forbid use of global stop()/start().
 * @author Kevin Partington
 * @copyright 2016 Kevin Partington. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-global-stop-start"),
    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-global-stop-start", rule, {

    valid: [
        "QUnit.stop();",
        "QUnit.start();",

        // Global overridden by local import/declaration.
        {
            code: "var start = require('foo'); start();",
            globals: { start: true }
        }
    ],

    invalid: [
        {
            code: "stop();",
            errors: [{
                messageId: "unexpectedGlobalStopStart",
                data: {
                    callee: "stop"
                },
                type: "CallExpression"
            }],
            globals: { stop: true }
        },
        {
            code: "start();",
            errors: [{
                messageId: "unexpectedGlobalStopStart",
                data: {
                    callee: "start"
                },
                type: "CallExpression"
            }],
            globals: { start: true }
        }
    ]
});
