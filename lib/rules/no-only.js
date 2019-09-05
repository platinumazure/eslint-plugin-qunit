/**
 * @fileoverview Forbid the use of QUnit.only.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const utils = require("../utils");

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
            noQUnitOnly: "Unexpected only() call."
        },
        schema: []
    },

    create: function (context) {
        return {
            "CallExpression": function (node) {
                if (utils.isOnly(node.callee)) {
                    context.report({
                        node: node,
                        messageId: "noQUnitOnly",
                        data: {
                            callee: node.callee.name
                        }
                    });
                }
            }
        };
    }
};
