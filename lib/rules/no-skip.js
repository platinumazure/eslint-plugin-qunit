/**
 * @fileoverview Forbid the use of QUnit.skip
 * @author Steve Calvert
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
            description: "forbid QUnit.skip",
            category: "Best Practices",
            recommended: false
        },
        messages: {
            noQUnitSkip: "Unexpected skip() call."
        },
        schema: []
    },

    create: function (context) {
        return {
            "CallExpression": function (node) {
                if (utils.isSkip(node.callee)) {
                    context.report({
                        node: node,
                        messageId: "noQUnitSkip",
                        data: {
                            callee: node.callee.name
                        }
                    });
                }
            }
        };
    }
};
