/**
 * @fileoverview Forbid the use of QUnit.push.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "forbid QUnit.push",
            category: "Possible Errors"
        },
        schema: []
    },

    create: function (context) {
        var MESSAGE = "Do not use QUnit.push().";

        function isQUnitPush(calleeNode) {
            return calleeNode &&
                calleeNode.type === "MemberExpression" &&
                calleeNode.object &&
                calleeNode.object.type === "Identifier" &&
                calleeNode.object.name === "QUnit" &&
                calleeNode.property &&
                calleeNode.property.type === "Identifier" &&
                calleeNode.property.name === "push";
        }

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            "CallExpression": function (node) {
                if (isQUnitPush(node.callee)) {
                    context.report({
                        node: node,
                        message: MESSAGE
                    });
                }
            }
        };
    }
};
