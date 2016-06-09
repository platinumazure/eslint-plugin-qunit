/**
 * @fileoverview Check the location of literals in arguments to QUnit's assertion functions.
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
            description: "ensure comparison assertions have arguments in the right order",
            category: "Possible Errors"
        },
        schema: []
    },

    create: function (context) {
        var testStack = [],
            MESSAGE_ACTUAL_FIRST = "Expected value {{expected}} should be specified after actual value {{actual}}.",
            MESSAGE_EXPECTED_FIRST = "Actual value {{actual}} should be specified after expected value {{expected}}.",
            sourceCode = context.getSourceCode();

        function getAssertContext() {
            assert.ok(testStack.length);

            return testStack[testStack.length - 1].assertContextVar;
        }

        function checkLiteralCompareOrder(args, compareActualFirst) {
            if (compareActualFirst && args[0].type === "Literal" && args[1].type !== "Literal") {
                context.report({
                    node: args[0],
                    message: MESSAGE_ACTUAL_FIRST,
                    data: {
                        expected: sourceCode.getText(args[0]),
                        actual: sourceCode.getText(args[1])
                    }
                });
            } else /* istanbul ignore next: no assertions compare expected first */ if (!compareActualFirst && args[0].type !== "Literal" && args[1].type === "Literal") {
                context.report({
                    node: args[0],
                    message: MESSAGE_EXPECTED_FIRST,
                    data: {
                        expected: sourceCode.getText(args[0]),
                        actual: sourceCode.getText(args[1])
                    }
                });
            }
        }

        function processAssertion(node, assertVar) {
            var compareActualFirst;

            /* istanbul ignore else: correctly does nothing */
            if (utils.isComparativeAssertion(node.callee, assertVar)) {
                compareActualFirst = utils.shouldCompareActualFirst(node.callee, assertVar);
                checkLiteralCompareOrder(node.arguments, compareActualFirst);
            }
        }

        return {
            "CallExpression": function (node) {
                /* istanbul ignore else: correctly does nothing */
                if (utils.isTest(node.callee)) {
                    testStack.push({
                        assertContextVar: utils.getAssertContextNameForTest(node.arguments)
                    });
                } else if (testStack.length && utils.isAssertion(node.callee, getAssertContext())) {
                    processAssertion(node, getAssertContext());
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
