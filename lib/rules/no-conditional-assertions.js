/**
 * @fileoverview forbid assertions within if statements or conditional expressions
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var utils = require("../utils");

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

var CONDITIONAL_NODE_TYPES = ["IfStatement", "ConditionalExpression"];

var STOP_NODE_TYPES = [
    "FunctionExpression",
    "FunctionDeclaration",
    "ArrowFunctionExpression"
];

var MESSAGE = "Do not place an assertion inside a conditional.";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "forbid assertions within if statements or conditional expressions",
            category: "Best Practices",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: []
    },

    create: function (context) {
        var testStack = [];

        //----------------------------------------------------------------------
        // Helper functions
        //----------------------------------------------------------------------

        function isConditionalNode(node) {
            return CONDITIONAL_NODE_TYPES.indexOf(node.type) !== -1;
        }

        function isStopNode(node) {
            return STOP_NODE_TYPES.indexOf(node.type) !== -1;
        }

        function checkAndReport(assertNode) {
            var currentNode = assertNode;

            while (currentNode && !isStopNode(currentNode) && !isConditionalNode(currentNode)) {
                currentNode = currentNode.parent;
            }

            if (CONDITIONAL_NODE_TYPES.indexOf(currentNode.type) !== -1) {
                context.report({
                    node: assertNode,
                    message: MESSAGE
                });
            }
        }

        function isAssertion(calleeNode) {
            var assertContextVar = testStack[testStack.length - 1].assertContextVar;
            return utils.isAssertion(calleeNode, assertContextVar);
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
                } else if (testStack.length && isAssertion(node.callee)) {
                    checkAndReport(node);
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
