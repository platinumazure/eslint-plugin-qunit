/**
 * @fileoverview Enforce use of objects as expected values in `assert.propEqual`
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const assert = require("assert"),
    utils = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "enforce use of objects as expected value in `assert.propEqual`",
            category: "Possible Errors",
            url: "https://github.com/platinumazure/eslint-plugin-qunit/blob/master/docs/rules/require-object-in-propequal.md"
        },
        messages: {
            useObject: "Use object as propEqual expected value (found: {{ value }})."
        },
        schema: []
    },

    create: function (context) {
        // Declare a test stack in case of nested test cases (not currently supported by QUnit).
        const sourceCode = context.getSourceCode(),
            testStack = [];

        function getCurrentAssertContextVariable() {
            assert(testStack.length, "Test stack should not be empty");

            return testStack[testStack.length - 1].assertVar;
        }

        function isGlobalPropEqual(calleeNode) {
            return calleeNode &&
                calleeNode.type === "Identifier" &&
                calleeNode.name === "propEqual";
        }

        function isAssertPropEqual(calleeNode) {
            return calleeNode &&
                calleeNode.type === "MemberExpression" &&
                calleeNode.property.type === "Identifier" &&
                calleeNode.property.name === "propEqual" &&
                calleeNode.object.type === "Identifier" &&
                calleeNode.object.name === getCurrentAssertContextVariable();
        }

        function isPropEqual(calleeNode) {
            return isAssertPropEqual(calleeNode) || isGlobalPropEqual(calleeNode);
        }

        // eslint-disable-next-line complexity
        function isNonObject(argNode) {
            switch (argNode.type) {
                case "ObjectExpression":
                case "ArrayExpression":
                case "ThisExpression":
                case "Identifier":
                case "MemberExpression":
                case "CallExpression":
                case "NewExpression":
                case "OptionalMemberExpression":
                case "OptionalCallExpression":
                    return false;

                case "Literal":
                default:
                    return true;
            }
        }

        function hasNonObjectExpectedValue(callExpressionNode) {
            return callExpressionNode &&
                callExpressionNode.arguments &&
                callExpressionNode.arguments.length >= 2 &&
                isNonObject(callExpressionNode.arguments[1]);
        }

        return {
            "CallExpression": function (node) {
                /* istanbul ignore else: correctly does nothing */
                if (utils.isTest(node.callee) || utils.isAsyncTest(node.callee)) {
                    testStack.push({
                        assertVar: utils.getAssertContextNameForTest(node.arguments)
                    });
                } else if (testStack.length && isPropEqual(node.callee) && hasNonObjectExpectedValue(node)) {
                    context.report({
                        node,
                        messageId: "useObject",
                        data: {
                            value: sourceCode.getText(node.arguments[1])
                        }
                    });
                }
            },

            "CallExpression:exit": function (node) {
                /* istanbul ignore else: correctly does nothing */
                if (utils.isTest(node.callee) || utils.isAsyncTest(node.callee)) {
                    testStack.pop();
                }
            }
        };
    }
};
