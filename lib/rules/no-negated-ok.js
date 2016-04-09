/**
 * @fileoverview Forbid the use of negations in assert.ok/notOk.
 * @author Kevin Partington
 */
"use strict";

var assert = require("assert"),
    utils = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    // Declare a stack in case of nested test cases (not currently supported
    // in QUnit).
    var asyncStateStack = [],
        ASSERTIONS_TO_CHECK = ["ok", "notOk"],
        sourceCode = context.getSourceCode();

    function getAssertVar() {
        var result = null;

        /* istanbul ignore else: correctly returns null */
        if (asyncStateStack.length) {
            result = asyncStateStack[asyncStateStack.length - 1].assertContextVar;
        }

        return result;
    }

    function isOkOrNotOk(calleeNode) {
        assert.ok(calleeNode);

        var result = false;

        /* istanbul ignore else: correctly returns false */
        if (calleeNode.type === "MemberExpression") {
            result = calleeNode.object &&
                calleeNode.object.type === "Identifier" &&
                calleeNode.object.name === getAssertVar() &&
                calleeNode.property &&
                calleeNode.property.type === "Identifier" &&
                ASSERTIONS_TO_CHECK.indexOf(calleeNode.property.name) !== -1;
        } else if (calleeNode.type === "Identifier") {
            result = ASSERTIONS_TO_CHECK.indexOf(calleeNode.name) !== -1;
        }

        return result;
    }

    function isAssertion(calleeNode) {
        assert.ok(calleeNode);
        return utils.isAssertion(calleeNode, getAssertVar());
    }

    function checkForNegation(callExprNode) {
        var firstArgNode;

        if (callExprNode.arguments && callExprNode.arguments.length) {
            firstArgNode = callExprNode.arguments[0];

            if (firstArgNode.type === "UnaryExpression" && firstArgNode.operator === "!") {
                context.report({
                    node: callExprNode,
                    message: "Unexpected negation in {{callee}}() assertion.",
                    data: {
                        callee: sourceCode.getText(callExprNode.callee)
                    }
                });
            }
        }
    }

    return {
        "CallExpression": function (node) {
            if (utils.isTest(node.callee)) {
                asyncStateStack.push({
                    assertContextVar: utils.getAssertContextNameForTest(node.arguments)
                });
            } else if (isAssertion(node.callee) && isOkOrNotOk(node.callee)) {
                checkForNegation(node);
            }
        },

        "CallExpression:exit": function (node) {
            if (utils.isTest(node.callee)) {
                asyncStateStack.pop();
            }
        }
    };
};

module.exports.schema = [];
