/**
 * @fileoverview Forbid usage of nested QUnit.test()
 * @author Aliaksandr Yermalayeu
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
            description: "Forbid nested QUnit.test() calls",
            category: "Possible Errors"
        },
        messages: {
            noNestedTests: "Usage of QUnit.test inside of another QUnit.test is not allowed."
        },
        schema: []
    },

    create: function (context) {
        return {
            "CallExpression": function (node) {
                if (utils.isTest(node.callee)) {
                    let currentNode = node;
                    while (currentNode.parent) {
                        const { parent } = currentNode;
                        if (parent.type === "CallExpression" && utils.isTest(parent.callee)) {
                            context.report({
                                node,
                                messageId: "noNestedTests"
                            });
                            return;
                        }
                        currentNode = parent;
                    }
                }
            }
        };
    }
};
