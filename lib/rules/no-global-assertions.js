/**
 * @fileoverview Forbid the use of global QUnit assertions.
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
            description: "forbid global QUnit assertions",
            category: "Possible Errors"
        },
        messages: {
            unexpectedGlobalAssertion: "Unexpected global `{{ assertion }}` assertion."
        },
        schema: []
    },

    create: function (context) {
        return {
            "CallExpression": function (node) {
                if (node.callee.type === "Identifier" && utils.isAssertion(node.callee)) {
                    context.report({
                        node: node,
                        messageId: "unexpectedGlobalAssertion",
                        data: {
                            assertion: node.callee.name
                        }
                    });
                }
            }
        };
    }
};
