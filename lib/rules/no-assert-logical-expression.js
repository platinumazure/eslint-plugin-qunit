/**
 * @fileoverview forbid binary logical expressions in assert arguments
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var utils = require("../utils");

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
        schema: []
    },

    create: function (context) {
        var testStack = [],
            MESSAGE = "Do not use '{{operator}}' in assertion arguments.";

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        function checkAndReport(argNodes) {
            argNodes.forEach(function (arg) {
                if (arg.type === "LogicalExpression") {
                    context.report({
                        node: arg,
                        message: MESSAGE,
                        data: {
                            operator: arg.operator
                        }
                    });
                }
            });
        }

        function getAssertVar() {
            var result = null;

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
