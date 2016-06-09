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

module.exports = {
    meta: {
        docs: {
            description: "forbid negation in assert.ok/assert.notOk",
            category: "Best Practices"
        },
        schema: []
    },

    create: function (context) {
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

            if (calleeNode.type === "MemberExpression") {
                result = calleeNode.object &&
                    calleeNode.object.type === "Identifier" &&
                    calleeNode.object.name === getAssertVar() &&
                    calleeNode.property &&
                    calleeNode.property.type === "Identifier" &&
                    ASSERTIONS_TO_CHECK.indexOf(calleeNode.property.name) !== -1;
            }

            return result;
        }

        function isAssertion(calleeNode) {
            assert.ok(calleeNode);
            return utils.isAssertion(calleeNode, getAssertVar());
        }

        function getNegationDepth(argNode) {
            var negationDepth = 0,
                node = argNode;

            while (node && node.type === "UnaryExpression" && node.operator === "!") {
                ++negationDepth;
                node = node.argument;
            }

            return negationDepth;
        }

        function checkForNegation(callExprNode) {
            var firstArgNode,
                negationDepth;

            if (callExprNode.arguments && callExprNode.arguments.length) {
                firstArgNode = callExprNode.arguments[0];
                negationDepth = getNegationDepth(firstArgNode);

                if (negationDepth % 2 === 1) {
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
    }
};
