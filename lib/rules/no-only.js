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
        messages: {
            noQUnitOnly: "Unexpected QUnit.only call."
        },
        schema: []
    },

    create: function (context) {
        return {
            "CallExpression[callee.object.name='QUnit'][callee.property.name='only']": function (node) {
                context.report({
                    node: node,
                    messageId: "noQUnitOnly"
                });
            }
        };
    }
};
