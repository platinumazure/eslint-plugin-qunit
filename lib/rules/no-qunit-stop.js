/**
 * @fileoverview Forbid the use of QUnit.stop.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var utils = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Forbid QUnit.stop",
            category: "Possible Errors"
        },
        schema: []
    },

    create: function (context) {
        var MESSAGE = "Use assert.async() instead of QUnit.stop().";

        function isQUnitStop(calleeNode) {
            return calleeNode &&
                calleeNode.type === "MemberExpression" &&
                utils.isStop(calleeNode);
        }

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            "CallExpression": function (node) {
                if (isQUnitStop(node.callee)) {
                    context.report({
                        node: node,
                        message: MESSAGE
                    });
                }
            }
        };
    }
};
