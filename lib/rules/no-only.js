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
        const MESSAGE = "Unexpected QUnit.only call.";

        return {
            "CallExpression[callee.object.name='QUnit'][callee.property.name='only']": function (node) {
                context.report({
                    node: node,
                    message: MESSAGE
                });
            }
        };
    }
};
