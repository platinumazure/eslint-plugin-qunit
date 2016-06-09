/**
 * @fileoverview Forbids use of QUnit.reset.
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
            description: "forbid QUnit.reset",
            category: "Best Practices"
        },
        schema: []
    },

    create: function (context) {
        var MESSAGE = "Do not use QUnit.reset().";

        function isQUnitReset(calleeNode) {
            return calleeNode.type === "MemberExpression" &&
                calleeNode.object &&
                calleeNode.object.type === "Identifier" &&
                calleeNode.object.name === "QUnit" &&
                calleeNode.property &&
                calleeNode.property.type === "Identifier" &&
                calleeNode.property.name === "reset";
        }

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            "CallExpression": function (node) {
                if (isQUnitReset(node.callee)) {
                    context.report({
                        node: node,
                        message: MESSAGE
                    });
                }
            }
        };
    }
};
