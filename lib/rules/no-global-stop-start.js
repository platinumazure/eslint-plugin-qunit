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
            category: "Possible Errors"
        },
        schema: []
    },

    create: function (context) {
        const MESSAGE = "Unexpected global {{callee}}() call.";

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            "CallExpression[callee.name=/^(stop|start)$/]": function (node) {
                context.report({
                    node: node,
                    message: MESSAGE,
                    data: {
                        callee: node.callee.name
                    }
                });
            }
        };
    }
};
