/**
 * @fileoverview Ensure async hooks are resolved in QUnit tests.
 * @author Kevin Partington
 */
"use strict";

var assert = require("assert");
var utils = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var loopStack = [];

    var ERROR_MESSAGE = "Unexpected {{call}} in {{loopTypeText}}";

    function popAndMatch (expectedNode) {
        var actualNode = loopStack.pop();
        assert.strictEqual(actualNode, expectedNode, "Node mismatch in loop stack");
    }

    function getLoopTypeText (loopType) {
        switch (loopType) {
            case "WhileStatement":
                return "while loop";
            case "DoWhileStatement":
                return "do-while loop";
            case "ForStatement":
                return "for loop";
            case "ForInStatement":
                return "for-in loop";
            case "ForOfStatement":
                return "for-of loop";
            /* istanbul ignore next */
            default:
                throw new RangeError("Invalid loop type: " + loopType);
        }
    }

    function getAsyncCallType (node) {
        var callType;

        /* istanbul ignore else: correctly returning undefined */
        if (utils.isAsyncCallExpression(node)) {
            callType = "assert.async()";
        } else if (utils.isStop(node.callee)) {
            callType = "stop()";
        } else if (utils.isStart(node.callee)) {
            callType = "start()";
        }

        return callType;
    }

    function reportError (node) {
        var loopNode = loopStack[loopStack.length - 1];
        var loopType = loopNode.type;

        context.report(node, ERROR_MESSAGE, {
            call: getAsyncCallType(node),
            loopTypeText: getLoopTypeText(loopType)
        });
    }

    return {
        "CallExpression": function (node) {
            var isStopOrStartOrAsync;

            /* istanbul ignore else: correctly not doing anything */
            if (loopStack.length) {
                isStopOrStartOrAsync = utils.isAsyncCallExpression(node) ||
                    utils.isStop(node.callee) ||
                    utils.isStart(node.callee);

                /* istanbul ignore else: correctly not doing anything */
                if (isStopOrStartOrAsync) {
                    reportError(node);
                }
            }
        },
        "WhileStatement": function (node) {
            loopStack.push(node);
        },
        "WhileStatement:exit": function (node) {
            popAndMatch(node);
        },
        "DoWhileStatement": function (node) {
            loopStack.push(node);
        },
        "DoWhileStatement:exit": function (node) {
            popAndMatch(node);
        },
        "ForStatement": function (node) {
            loopStack.push(node);
        },
        "ForStatement:exit": function (node) {
            popAndMatch(node);
        },
        "ForInStatement": function (node) {
            loopStack.push(node);
        },
        "ForInStatement:exit": function (node) {
            popAndMatch(node);
        },
        "ForOfStatement": function (node) {
            loopStack.push(node);
        },
        "ForOfStatement:exit": function (node) {
            popAndMatch(node);
        }
    };
};
