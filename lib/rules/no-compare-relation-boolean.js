/**
 * @fileoverview forbid comparing relational expression to boolean in assertions
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var assert = require("assert"),
    utils = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "forbid comparing relational expression to boolean in assertions",
            category: "Best Practices"
        },
        schema: []
    },

    create: function (context) {
        var testStack = [],
            MESSAGE = "Redundant comparison of relational expression to boolean literal",
            RELATIONAL_OPS = [
                "==", "!=", "===", "!==", "<", "<=", ">", ">=",
                "in", "instanceof"
            ];

        function shouldCheckArguments(calleeNode) {
            assert.ok(testStack.length);

            var assertContextVar = testStack[testStack.length - 1].assertContextVar;

            return utils.isAssertion(calleeNode, assertContextVar) && utils.isComparativeAssertion(calleeNode, assertContextVar);
        }

        function sortLiteralFirst(a, b) {
            if (a.type === "Literal" && b.type !== "Literal") {
                return -1;      // Literal is first and should remain first
            }

            if (a.type !== "Literal" && b.type === "Literal") {
                return 1;       // Literal is second and should be first
            }

            return 0;
        }

        function checkAndReport(callExprNode, literalNode, binaryExprNode) {
            if (RELATIONAL_OPS.indexOf(binaryExprNode.operator) !== -1 && typeof literalNode.value === "boolean") {
                context.report({
                    node: callExprNode,
                    message: MESSAGE
                });
            }
        }

        function checkAssertArguments(callExprNode) {
            var args = callExprNode.arguments.slice();

            args.sort(sortLiteralFirst);

            if (args[0].type === "Literal" && args[1].type === "BinaryExpression") {
                checkAndReport(callExprNode, args[0], args[1]);
            }
        }

        return {
            "CallExpression": function (node) {
                if (utils.isTest(node.callee)) {
                    testStack.push({
                        assertContextVar: utils.getAssertContextNameForTest(node.arguments)
                    });
                } else if (testStack.length && shouldCheckArguments(node.callee)) {
                    checkAssertArguments(node);
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
