/**
 * @fileoverview Forbids use of QUnit.init.
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
            description: "forbid use of QUnit.init",
            category: "Possible Errors"
        },
        schema: []
    },

    create: function (context) {
        var MESSAGE = "Do not use QUnit.init().";

        function isQUnitInit(calleeNode) {
            return calleeNode.type === "MemberExpression" &&
                calleeNode.object &&
                calleeNode.object.type === "Identifier" &&
                calleeNode.object.name === "QUnit" &&
                calleeNode.property &&
                calleeNode.property.type === "Identifier" &&
                calleeNode.property.name === "init";
        }

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            "CallExpression": function (node) {
                if (isQUnitInit(node.callee)) {
                    context.report({
                        node: node,
                        message: MESSAGE
                    });
                }
            }
        };
    }
};
