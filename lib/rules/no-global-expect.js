/**
 * @fileoverview Forbid the use of global expect.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "forbid global expect",
            category: "Possible Errors"
        },
        schema: []
    },

    create: function (context) {
        var MESSAGE = "Unexpected global expect.";

        return {
            CallExpression: function (node) {
                if (node.callee.type === "Identifier" && node.callee.name === "expect") {
                    context.report({
                        node: node,
                        message: MESSAGE
                    });
                }
            }
        };
    }
};
