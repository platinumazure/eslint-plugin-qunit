/**
 * @fileoverview Ensure async hooks are resolved in QUnit tests.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    // Declare a stack in case of nested test cases (not currently supported
    // in QUnit).
    var asyncStateStack = [];

    var SUPPORTED_IDENTIFIERS = ["test", "asyncTest"];

    var STOP_MESSAGE = "Need {{semaphore}} more start() calls";
    var ASYNC_VAR_MESSAGE = "Async callback \"{{asyncVar}}\" is not called";

    function isTest(calleeNode) {
        var result = false;

        if (calleeNode.type === "Identifier") {
            result = SUPPORTED_IDENTIFIERS.indexOf(calleeNode.name) !== -1;
        } else if (calleeNode.type === "MemberExpression") {
            result = calleeNode.object.type === "Identifier" &&
                calleeNode.object.name === "QUnit" &&
                calleeNode.property.type === "Identifier" &&
                SUPPORTED_IDENTIFIERS.indexOf(calleeNode.property.name) !== -1;
        }

        return result;
    }

    function isAsyncTest(calleeNode) {
        var result = false;

        if (calleeNode.type === "Identifier") {
            result = calleeNode.name === "asyncTest";
        } else if (calleeNode.type === "MemberExpression") {
            result = calleeNode.object.type === "Identifier" &&
                calleeNode.object.name === "QUnit" &&
                calleeNode.property.type === "Identifier" &&
                calleeNode.property.name === "asyncTest";
        }

        return result;
    }

    function isAsyncCallExpression(callExpressionNode) {
        return callExpressionNode &&
            callExpressionNode.type === "CallExpression" &&
            callExpressionNode.callee.type === "MemberExpression" &&
            callExpressionNode.callee.object.type === "Identifier" &&
            callExpressionNode.callee.object.name === "assert" &&
            callExpressionNode.callee.property.type === "Identifier" &&
            callExpressionNode.callee.property.name === "async";
    }

    function isAsyncCallbackVar(calleeNode) {
        var asyncState = asyncStateStack[asyncStateStack.length - 1];
        var result = false;

        if (calleeNode.type === "Identifier") {
            result = calleeNode.name in asyncState.asyncCallbackVars;
        }

        return result;
    }

    function isStop(calleeNode) {
        var result = false;

        if (calleeNode.type === "Identifier") {
            result = calleeNode.name === "stop";
        } else if (calleeNode.type === "MemberExpression") {
            result = calleeNode.object.type === "Identifier" &&
                calleeNode.object.name === "QUnit" &&
                calleeNode.property.type === "Identifier" &&
                calleeNode.property.name === "stop";
        }

        return result;
    }

    function isStart(calleeNode) {
        var result = false;

        if (calleeNode.type === "Identifier") {
            result = calleeNode.name === "start";
        } else if (calleeNode.type === "MemberExpression") {
            result = calleeNode.object.type === "Identifier" &&
                calleeNode.object.name === "QUnit" &&
                calleeNode.property.type === "Identifier" &&
                calleeNode.property.name === "start";
        }

        return result;
    }

    function incrementSemaphoreCount(amount) {
        var asyncState = asyncStateStack[asyncStateStack.length - 1];
        asyncState.stopSemaphoreCount = asyncState.stopSemaphoreCount + amount;
    }

    function addAsyncCallbackVar(lhsNode) {
        var asyncState = asyncStateStack[asyncStateStack.length - 1];
        asyncState.asyncCallbackVars[lhsNode.name] = false;
    }

    function markAsyncCallbackVarCalled(calleeNode) {
        var asyncState = asyncStateStack[asyncStateStack.length - 1];
        asyncState.asyncCallbackVars[calleeNode.name] = true;
    }

    function verifyAsyncState(asyncState, node) {
        if (asyncState.stopSemaphoreCount > 0) {
            context.report(node, STOP_MESSAGE, {
                semaphore: asyncState.stopSemaphoreCount
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

    return {
        "CallExpression": function (node) {
            if (isTest(node.callee)) {
                asyncStateStack.push({
                    stopSemaphoreCount: isAsyncTest(node.callee) ? 1 : 0,
                    asyncCallbackVars: {}
                });
            } else if (isAsyncCallbackVar(node.callee)) {
                markAsyncCallbackVarCalled(node.callee);
            } else if (isStop(node.callee)) {
                incrementSemaphoreCount(1);
            } else if (isStart(node.callee)) {
                incrementSemaphoreCount(-1);
            }
        },
        "CallExpression:exit": function (node) {
            if (isTest(node.callee)) {
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
};
