/**
 * @fileoverview Forbid use of global stop()/start().
 * @author Kevin Partington
 * @copyright 2016 Kevin Partington. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "forbid global stop/start",
            category: "Possible Errors",
            url: "https://github.com/platinumazure/eslint-plugin-qunit/blob/master/docs/rules/no-global-stop-start.md"
        },
        messages: {
            unexpectedGlobalStopStart: "Unexpected global {{callee}}() call."
        },
        schema: []
    },

    create: function (context) {
        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            "CallExpression[callee.name=/^(stop|start)$/]": function (node) {
                context.report({
                    node: node,
                    messageId: "unexpectedGlobalStopStart",
                    data: {
                        callee: node.callee.name
                    }
                });
            }
        };
    }
};
