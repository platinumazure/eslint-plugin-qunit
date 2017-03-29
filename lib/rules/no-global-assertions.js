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
        schema: []
    },

    create: function (context) {
        const MESSAGE = "Unexpected global `{{ assertion }}` assertion.";

        return {
            "CallExpression": function (node) {
                if (node.callee.type === "Identifier" && utils.isAssertion(node.callee)) {
                    context.report({
                        node: node,
                        message: MESSAGE,
                        data: {
                            assertion: node.callee.name
                        }
                    });
                }
            }
        };
    }
};
