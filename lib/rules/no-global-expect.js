/**
 * @fileoverview Forbid the use of global expect.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
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
};
