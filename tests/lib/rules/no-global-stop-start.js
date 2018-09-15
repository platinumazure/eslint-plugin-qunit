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
        "QUnit.start();"
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
            }]
        },
        {
            code: "start();",
            errors: [{
                messageId: "unexpectedGlobalStopStart",
                data: {
                    callee: "start"
                },
                type: "CallExpression"
            }]
        }
    ]
});
