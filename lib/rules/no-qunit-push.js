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
        messages: {
            noQUnitPush: "Do not use QUnit.push()."
        },
        schema: []
    },

    create: function (context) {
        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            "CallExpression[callee.object.name='QUnit'][callee.property.name='push']": function (node) {
                context.report({
                    node: node,
                    messageId: "noQUnitPush"
                });
            }
        };
    }
};
