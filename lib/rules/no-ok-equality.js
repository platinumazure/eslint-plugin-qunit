/**
 * @fileoverview Forbid the use of equality comparisons in assert.ok/notOk.
 * @author Kevin Partington
 */
"use strict";

var utils = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "forbid equality comparisons in assert.ok/assert.notOk",
            category: "Best Practices"
        },
        schema: [
            {
                type: "object",
                properties: {
                    allowGlobal: {
                        type: "boolean"
                    }
                },
                additionalProperties: false
            }
        ]
    },

    create: function (context) {
        // Declare a stack in case of nested test cases (not currently supported
        // in QUnit).
        var asyncStateStack = [],
            DEFAULT_OPTIONS = {
                allowGlobal: true
            },
            MESSAGE = "Unexpected equality comparison in {{assertion}} call.",
            SUGGESTION = "Use {{suggestion}}({{a}}, {{b}}) instead.",
            options = context.options[0] || DEFAULT_OPTIONS,
            sourceCode = context.getSourceCode();

        function getAssertContextVar() {
            var state = asyncStateStack[asyncStateStack.length - 1];
            return state && state.assertContextVar;
        }

        function isOk(calleeNode) {
            var assertContextVar = getAssertContextVar(),
                isOk,
                isAssertOk;

            isOk = calleeNode.type === "Identifier" && calleeNode.name === "ok";

            isAssertOk = calleeNode.type === "MemberExpression" &&
                calleeNode.object.type === "Identifier" &&
                calleeNode.object.name === assertContextVar &&
                calleeNode.property.type === "Identifier" &&
                calleeNode.property.name === "ok";

            if (options.allowGlobal) {
                return isOk || isAssertOk;
            }

            return isAssertOk;
        }

        function isNotOk(calleeNode) {
            var assertContextVar = getAssertContextVar(),
                isNotOk,
                isAssertNotOk;

            isNotOk = calleeNode.type === "Identifier" && calleeNode.name === "notOk";

            isAssertNotOk = calleeNode.type === "MemberExpression" &&
                calleeNode.object.type === "Identifier" &&
                calleeNode.object.name === assertContextVar &&
                calleeNode.property.type === "Identifier" &&
                calleeNode.property.name === "notOk";

            if (options.allowGlobal) {
                return isNotOk || isAssertNotOk;
            }

            return isAssertNotOk;
        }

        function isOkOrNotOk(calleeNode) {
            return isOk(calleeNode) || isNotOk(calleeNode);
        }

        function isEqual(arg) {
            return arg.type === "BinaryExpression" &&
                ["===", "==", "!==", "!="].indexOf(arg.operator) !== -1;
        }

        function isStrict(arg) {
            return arg.type === "BinaryExpression" &&
                ["===", "!=="].indexOf(arg.operator) !== -1;
        }

        function isNegative(arg) {
            return arg.type === "BinaryExpression" &&
                ["!==", "!="].indexOf(arg.operator) !== -1;
        }

        function getSuggestedAssertion(criteria) {
            var assertVar = getAssertContextVar(),
                assertMethod;

            if (criteria.strict) {
                assertMethod = criteria.negative ? "notStrictEqual" : "strictEqual";
            } else {
                assertMethod = criteria.negative ? "notEqual" : "equal";
            }

            if (assertVar) {
                return assertVar + "." + assertMethod;
            }

            return assertMethod;
        }

        function checkArguments(args, isCalleeNegative, isGlobal, node) {
            var firstArg,
                isArgEqual,
                isArgStrictEqual,
                isArgNegative;

            /* istanbul ignore else: will correctly do nothing */
            if (args.length) {
                firstArg = args[0];
                isArgEqual = isEqual(firstArg);
                isArgStrictEqual = isStrict(firstArg);
                isArgNegative = isNegative(firstArg);

                if (isArgEqual) {
                    context.report(node, [MESSAGE, SUGGESTION].join(" "), {
                        assertion: sourceCode.getText(node.callee),
                        suggestion: getSuggestedAssertion({
                            strict: isArgStrictEqual,
                            negative: isArgNegative !== isCalleeNegative
                        }),
                        a: sourceCode.getText(firstArg.left),
                        b: sourceCode.getText(firstArg.right)
                    });
                }
            }
        }

        return {
            "CallExpression": function (node) {
                var isGlobal;

                if (asyncStateStack.length && isOkOrNotOk(node.callee)) {
                    isGlobal = node.callee.type === "Identifier";
                    checkArguments(node.arguments, isNotOk(node.callee), isGlobal, node);
                } else if (utils.isTest(node.callee)) {
                    asyncStateStack.push({
                        assertContextVar: utils.getAssertContextNameForTest(node.arguments)
                    });
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
