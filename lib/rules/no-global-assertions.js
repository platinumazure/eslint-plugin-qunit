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
            category: "Possible Errors",
            url: "https://github.com/platinumazure/eslint-plugin-qunit/blob/master/docs/rules/no-global-assertions.md"
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
