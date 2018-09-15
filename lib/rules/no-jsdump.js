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
        messages: {
            noJsDump: "Use QUnit.dump() instead of QUnit.jsDump()."
        },
        schema: []
    },

    create: function (context) {
        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            "CallExpression[callee.object.name='QUnit'][callee.property.name='jsDump']": function (node) {
                context.report({
                    node: node,
                    messageId: "noJsDump"
                });
            }
        };
    }
};
