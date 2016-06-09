/**
 * @fileoverview Forbid use of QUnit.jsDump().
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "forbid use of QUnit.jsDump",
            category: "Possible Errors"
        },
        schema: []
    },

    create: function (context) {
        var MESSAGE = "Use QUnit.dump() instead of QUnit.jsDump().";

        function isQUnitJsDump(calleeNode) {
            return calleeNode &&
                calleeNode.type === "MemberExpression" &&
                calleeNode.object &&
                calleeNode.object.type === "Identifier" &&
                calleeNode.object.name === "QUnit" &&
                calleeNode.property &&
                calleeNode.property.type === "Identifier" &&
                calleeNode.property.name === "jsDump";
        }

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            CallExpression: function (node) {
                if (isQUnitJsDump(node.callee)) {
                    context.report({
                        node: node,
                        message: MESSAGE
                    });
                }
            }
        };
    }
};
