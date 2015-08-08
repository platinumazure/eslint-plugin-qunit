/**
 * @fileoverview Utility functions used by one or more rules.
 * @author Kevin Partington
 */
"use strict";

var SUPPORTED_IDENTIFIERS = ["test", "asyncTest"];

exports.isAsyncCallExpression = function (callExpressionNode, assertVar) {
    if (!assertVar) {
        assertVar = "assert";
    }

    return callExpressionNode &&
        callExpressionNode.type === "CallExpression" &&
        callExpressionNode.callee.type === "MemberExpression" &&
        callExpressionNode.callee.object.type === "Identifier" &&
        callExpressionNode.callee.object.name === assertVar &&
        callExpressionNode.callee.property.type === "Identifier" &&
        callExpressionNode.callee.property.name === "async";
};

exports.isStop = function (calleeNode) {
    var result = false;

    /* istanbul ignore else: will correctly return false */
    if (calleeNode.type === "Identifier") {
        result = calleeNode.name === "stop";
    } else if (calleeNode.type === "MemberExpression") {
        result = calleeNode.object.type === "Identifier" &&
            calleeNode.object.name === "QUnit" &&
            calleeNode.property.type === "Identifier" &&
            calleeNode.property.name === "stop";
    }

    return result;
};

exports.isStart = function (calleeNode) {
    var result = false;

    /* istanbul ignore else: will correctly return false */
    if (calleeNode.type === "Identifier") {
        result = calleeNode.name === "start";
    } else if (calleeNode.type === "MemberExpression") {
        result = calleeNode.object.type === "Identifier" &&
            calleeNode.object.name === "QUnit" &&
            calleeNode.property.type === "Identifier" &&
            calleeNode.property.name === "start";
    }

    return result;
};

exports.isTest = function (calleeNode) {
    var result = false;

    /* istanbul ignore else: will correctly return false */
    if (calleeNode.type === "Identifier") {
        result = SUPPORTED_IDENTIFIERS.indexOf(calleeNode.name) !== -1;
    } else if (calleeNode.type === "MemberExpression") {
        result = calleeNode.object.type === "Identifier" &&
            calleeNode.object.name === "QUnit" &&
            calleeNode.property.type === "Identifier" &&
            SUPPORTED_IDENTIFIERS.indexOf(calleeNode.property.name) !== -1;
    }

    return result;
};

exports.isAsyncTest = function (calleeNode) {
    var result = false;

    /* istanbul ignore else: will correctly return false */
    if (calleeNode.type === "Identifier") {
        result = calleeNode.name === "asyncTest";
    } else if (calleeNode.type === "MemberExpression") {
        result = calleeNode.object.type === "Identifier" &&
            calleeNode.object.name === "QUnit" &&
            calleeNode.property.type === "Identifier" &&
            calleeNode.property.name === "asyncTest";
    }

    return result;
};

exports.getAssertContextNameForTest = function (argumentsNodes) {
    var result;

    var functionExpr = argumentsNodes.filter(function (argNode) {
        return argNode.type === "FunctionExpression";
    })[0];

    if (functionExpr && functionExpr.params && functionExpr.params.length) {
        result = functionExpr.params[0].name;
    }

    return result;
};
