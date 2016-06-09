/**
 * @fileoverview Forbid the use of QUnit.only.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "forbid QUnit.only",
            category: "Best Practices"
        },
        schema: []
    },

    create: function (context) {
        var MESSAGE = "Unexpected QUnit.only call.";

        function isQUnitOnly(calleeNode) {
            return calleeNode &&
                calleeNode.type === "MemberExpression" &&
                calleeNode.object &&
                calleeNode.object.type === "Identifier" &&
                calleeNode.object.name === "QUnit" &&
                calleeNode.property &&
                calleeNode.property.type === "Identifier" &&
                calleeNode.property.name === "only";
        }

        return {
            "CallExpression": function (node) {
                if (isQUnitOnly(node.callee)) {
                    context.report({
                        node: node,
                        message: MESSAGE
                    });
                }
            }
        };
    }
};
