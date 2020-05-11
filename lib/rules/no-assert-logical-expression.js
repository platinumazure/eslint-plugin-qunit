/**
 * @fileoverview forbid binary logical expressions in assert arguments
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
            description: "forbid binary logical expressions in assert arguments",
            category: "Best Practices",
            recommended: false
        },
        fixable: null,
        messages: {
            noLogicalOperator: "Do not use '{{operator}}' in assertion arguments."
        },
        schema: []
    },

    create: function (context) {
        const testStack = [];

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        function checkAndReport(argNodes) {
            argNodes.forEach(function (arg) {
                if (arg.type === "LogicalExpression") {
                    context.report({
                        node: arg,
                        messageId: "noLogicalOperator",
                        data: {
                            operator: arg.operator
                        }
                    });
                }
            });
        }

        function getAssertVar() {
            let result = null;

            if (testStack.length) {
                result = testStack[testStack.length - 1].assertContextVar;
            }

            return result;
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {

            "CallExpression": function (node) {
                if (utils.isTest(node.callee)) {
                    testStack.push({
                        assertContextVar: utils.getAssertContextNameForTest(node.arguments)
                    });
                } else if (utils.isAssertion(node.callee, getAssertVar())) {
                    checkAndReport(node.arguments);
                }
            },

            "CallExpression:exit": function (node) {
                if (utils.isTest(node.callee)) {
                    testStack.pop();
                }
            }

        };
    }
};
