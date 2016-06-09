/**
 * @fileoverview Ensure async hooks are resolved in QUnit tests.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var utils = require("../utils");

module.exports = {
    meta: {
        docs: {
            description: "require that async calls are resolved",
            category: "Possible Errors"
        },
        schema: []
    },

    create: function (context) {
        /*
         * Declare a stack in case of nested test cases (not currently supported
         * in QUnit).
         */
        var asyncStateStack = [];

        var STOP_MESSAGE = "Need {{semaphore}} more start() {{callOrCalls}}";
        var ASYNC_VAR_MESSAGE = "Async callback \"{{asyncVar}}\" is not called";

        function isAsyncCallExpression(callExpressionNode) {
            var asyncState = asyncStateStack[asyncStateStack.length - 1];
            var assertContextVar = asyncState && asyncState.assertContextVar;

            return utils.isAsyncCallExpression(callExpressionNode, assertContextVar);
        }

        function isAsyncCallbackVar(calleeNode) {
            var asyncState = asyncStateStack[asyncStateStack.length - 1];
            var result = false;

            if (asyncState && calleeNode.type === "Identifier") {
                result = calleeNode.name in asyncState.asyncCallbackVars;
            }

            return result;
        }

        function incrementSemaphoreCount(amount) {
            var asyncState = asyncStateStack[asyncStateStack.length - 1];
            if (asyncState) {
                asyncState.stopSemaphoreCount += amount;
            }
        }

        function addAsyncCallbackVar(lhsNode) {
            var asyncState = asyncStateStack[asyncStateStack.length - 1];

            /* istanbul ignore else: will correctly do nothing */
            if (asyncState) {
                asyncState.asyncCallbackVars[lhsNode.name] = false;
            }
        }

        function markAsyncCallbackVarCalled(calleeNode) {
            var asyncState = asyncStateStack[asyncStateStack.length - 1];

            /* istanbul ignore else: will correctly do nothing */
            if (asyncState) {
                asyncState.asyncCallbackVars[calleeNode.name] = true;
            }
        }

        function verifyAsyncState(asyncState, node) {
            if (asyncState.stopSemaphoreCount > 0) {
                var singular = asyncState.stopSemaphoreCount === 1;

                context.report(node, STOP_MESSAGE, {
                    semaphore: asyncState.stopSemaphoreCount,
                    callOrCalls: singular ? "call" : "calls"
                });
            }

            for (var callbackVar in asyncState.asyncCallbackVars) {
                if (asyncState.asyncCallbackVars[callbackVar] === false) {
                    context.report(node, ASYNC_VAR_MESSAGE, {
                        asyncVar: callbackVar
                    });
                }
            }
        }

        function isInModule(propertyNode) {
            return propertyNode &&
                propertyNode.parent &&          // ObjectExpression
                propertyNode.parent.parent &&   // CallExpression?
                propertyNode.parent.parent.type === "CallExpression" &&
                utils.isModule(propertyNode.parent.parent.callee);
        }

        return {
            "CallExpression": function (node) {
                var delta, assertContextVar;

                if (utils.isTest(node.callee)) {
                    assertContextVar = utils.getAssertContextNameForTest(node.arguments);
                    asyncStateStack.push({
                        stopSemaphoreCount: utils.isAsyncTest(node.callee) ? 1 : 0,
                        asyncCallbackVars: {},
                        assertContextVar: assertContextVar
                    });
                } else if (isAsyncCallbackVar(node.callee)) {
                    markAsyncCallbackVarCalled(node.callee);
                } else if (utils.isStop(node.callee)) {
                    delta = node.arguments.length ? +node.arguments[0] : 1;
                    incrementSemaphoreCount(delta);
                } else if (utils.isStart(node.callee)) {
                    delta = node.arguments.length ? +node.arguments[0] : 1;
                    incrementSemaphoreCount(-delta);
                }
            },

            "CallExpression:exit": function (node) {
                if (utils.isTest(node.callee)) {
                    var asyncState = asyncStateStack.pop();
                    verifyAsyncState(asyncState, node);
                }
            },

            "Property": function (node) {
                var assertContextVar;

                if (utils.isModuleHookPropertyKey(node.key) && isInModule(node)) {
                    assertContextVar = utils.getAssertContextName(node.value);
                    asyncStateStack.push({
                        stopSemaphoreCount: 0,
                        asyncCallbackVars: {},
                        assertContextVar: assertContextVar
                    });
                }
            },

            "Property:exit": function (node) {
                if (utils.isModuleHookPropertyKey(node.key) && isInModule(node)) {
                    var asyncState = asyncStateStack.pop();
                    verifyAsyncState(asyncState, node);
                }
            },

            "AssignmentExpression": function (node) {
                if (isAsyncCallExpression(node.right)) {
                    addAsyncCallbackVar(node.left);
                }
            },

            "VariableDeclarator": function (node) {
                if (isAsyncCallExpression(node.init)) {
                    addAsyncCallbackVar(node.id);
                }
            }
        };
    }
};
