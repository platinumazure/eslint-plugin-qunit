/**
 * @fileoverview Forbid the use of negations in assert.ok/notOk.
 * @author Kevin Partington
 */
"use strict";

const assert = require("assert"),
    utils = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "disallow negation in assert.ok/assert.notOk",
            category: "Best Practices",
            url: "https://github.com/platinumazure/eslint-plugin-qunit/blob/master/docs/rules/no-negated-ok.md"
        },
        fixable: "code",
        messages: {
            noNegationInOk: "Unexpected negation in {{callee}}() assertion."
        },
        schema: [
            {
                type: "object",
                properties: {
                    fixToNotOk: {
                        type: "boolean",
                        default: false
                    }
                },
                additionalProperties: false
            }
        ]
    },

    create: function (context) {
        const fixToNotOk = context.options[0] && context.options[0].fixToNotOk;

        // Declare a stack in case of nested test cases (not currently supported
        // in QUnit).
        const asyncStateStack = [],
            ASSERTIONS_TO_CHECK = ["ok", "notOk"],
            sourceCode = context.getSourceCode();

        function getAssertVar() {
            let result = null;

            /* istanbul ignore else: correctly returns null */
            if (asyncStateStack.length) {
                result = asyncStateStack[asyncStateStack.length - 1].assertContextVar;
            }

            return result;
        }

        function isOkOrNotOk(calleeNode) {
            assert.ok(calleeNode);

            let result = false;

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
            let negationDepth = 0,
                node = argNode;

            while (node && node.type === "UnaryExpression" && node.operator === "!") {
                ++negationDepth;
                node = node.argument;
            }

            return negationDepth;
        }

        function unwrapNegation(argNode) {
            let node = argNode;

            while (node && node.type === "UnaryExpression" && node.operator === "!") {
                node = node.argument;
            }

            return node;
        }

        function checkForNegation(callExprNode) {
            if (callExprNode.arguments && callExprNode.arguments.length) {
                const firstArgNode = callExprNode.arguments[0],
                    negationDepth = getNegationDepth(firstArgNode);

                if (negationDepth % 2 === 1) {
                    context.report({
                        node: callExprNode,
                        messageId: "noNegationInOk",
                        data: {
                            callee: sourceCode.getText(callExprNode.callee)
                        },
                        fix(fixer) {
                            // Conversions:
                            // * assert.notOk(!foo) => assert.ok(foo)
                            // * assert.ok(!foo) => assert.equal(foo, false) -- when `fixToNotOk` option disabled
                            // * assert.ok(!foo) => assert.notOk(foo) -- when `fixToNotOk` option enabled

                            const assertionVariableName = callExprNode.callee.object.name;
                            const oppositeAssertionFunctionName = callExprNode.callee.property.name === "ok" ? "notOk" : "ok";
                            const newAssertionFunctionName = !fixToNotOk && oppositeAssertionFunctionName === "notOk" ? "equal" : oppositeAssertionFunctionName;
                            const newArgsTextArray = [unwrapNegation(firstArgNode), ...callExprNode.arguments.slice(1)].map(arg => sourceCode.getText(arg));
                            if (newAssertionFunctionName === "equal") {
                                newArgsTextArray.splice(1, 0, "false");
                            }
                            const newArgsTextJoined = newArgsTextArray.join(", ");
                            return fixer.replaceText(callExprNode, `${assertionVariableName}.${newAssertionFunctionName}(${newArgsTextJoined})`);
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
