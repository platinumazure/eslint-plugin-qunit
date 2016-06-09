/**
 * @fileoverview Check the number of arguments to QUnit's assertion functions.
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
            description: "ensure correct number of assert arguments is used",
            category: "Possible Errors"
        },
        schema: []
    },

    create: function (context) {
        var testStack = [],
            sourceCode = context.getSourceCode(),
            MESSAGE = "Unexpected call to {{callee}} with {{argCount}} arguments.",
            MESSAGE_NO_ASSERT_MESSAGE = "Unexpected call to {{callee}} with {{argCount}} arguments and no error message.";

        function isPossibleMessage(argNode) {
            // For now, we will allow all nodes. Hoping to allow user-driven
            // configuration later.
            // E.g., to allow string literals only:
            // return lastArg.type === "Literal" && typeof lastArg.value === "string";

            // For now, allowing all nodes to be possible messages.
            return argNode;
        }

        function getAssertContext() {
            assert.ok(testStack.length);

            return testStack[testStack.length - 1].assertContextVar;
        }

        function checkAssertArity(callExpressionNode) {
            var allowedArities = utils.getAllowedArities(callExpressionNode.callee, getAssertContext()),
                assertArgs = callExpressionNode.arguments,
                lastArg = assertArgs[assertArgs.length - 1],
                mayHaveMessage = lastArg && isPossibleMessage(lastArg),
                definitelyTooFewArgs;

            definitelyTooFewArgs = allowedArities.every(function (arity) {
                return assertArgs.length < arity;
            });

            if (mayHaveMessage && allowedArities.indexOf(assertArgs.length - 1) !== -1) {
                return;
            } else if (allowedArities.indexOf(assertArgs.length) !== -1) {
                return;
            }

            context.report({
                node: callExpressionNode,
                message: mayHaveMessage && !definitelyTooFewArgs ? MESSAGE : MESSAGE_NO_ASSERT_MESSAGE,
                data: {
                    callee: sourceCode.getText(callExpressionNode.callee),
                    argCount: assertArgs.length
                }
            });
        }

        return {
            "CallExpression": function (node) {
                if (utils.isTest(node.callee)) {
                    testStack.push({
                        assertContextVar: utils.getAssertContextNameForTest(node.arguments)
                    });
                } else if (testStack.length && utils.isAssertion(node.callee, getAssertContext())) {
                    checkAssertArity(node);
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
