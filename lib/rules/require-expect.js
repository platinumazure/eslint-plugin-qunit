/**
 * @fileoverview Require the use of `expect` when using `assert` inside of a
 * block or when passing `assert` to a function.
 * @author Mitch Lloyd
 */
"use strict";

const utils = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "ensure that expect is called",
            category: "Best Practices"
        },
        schema: [
            {
                "enum": ["always", "except-simple", "never", "never-except-zero"]
            }
        ]
    },

    create: function (context) {
        const EXCEPT_SIMPLE_ERROR_MESSAGE = "Should use `{{assertPrefix}}expect()` when using assertions outside of the top-level test callback",
            ALWAYS_ERROR_MESSAGE = "Test is missing `{{assertPrefix}}expect()` call",
            NEVER_ERROR_MESSAGE = "Unexpected use of `{{assertPrefix}}expect()` call";

        let currentTest = false;

        function isGlobalExpectCall(callee) {
            return callee.type === "Identifier" && callee.name === "expect";
        }

        function isAssertExpectCall(callee) {
            return callee.object &&
                   callee.object.type === "Identifier" &&
                   callee.object.name === currentTest.assertName &&
                   callee.property.name === "expect";
        }

        function isExpectCall(callee) {
            return isGlobalExpectCall(callee) || isAssertExpectCall(callee);
        }

        function isNonZeroExpectCall(node) {
            // eslint-disable-next-line no-console
            return isExpectCall(node.callee) && !(
                node.arguments.length === 1 &&
                node.arguments[0].type === "Literal" &&
                node.arguments[0].raw === "0"
            );
        }

        function isTopLevelExpectCall(callee) {
            return isExpectCall(callee) && currentTest.blockDepth === 1;
        }

        function isUsingAssertInNestedBlock(node) {
            return currentTest.blockDepth > 1 && utils.isAssertion(node.callee, currentTest.assertName);
        }

        function isPassingAssertAsArgument(node) {
            if (!currentTest.assertName) {
                return false;
            }

            for (let i = 0; i < node.arguments.length; i++) {
                if (node.arguments[i].name === currentTest.assertName) {
                    return true;
                }
            }
            return false;
        }

        function isViolatingExceptSimpleRule(node) {
            return !currentTest.isExpectUsed &&
                   (isUsingAssertInNestedBlock(node) || isPassingAssertAsArgument(node));
        }

        function captureTestContext(node) {
            currentTest = {
                assertName: utils.getAssertContextNameForTest(node.arguments),
                node: node,
                blockDepth: 0,
                isExpectUsed: false,
                didReport: false
            };
        }

        function releaseTestContext() {
            currentTest = false;
        }

        function assertionMessageData() {
            let prefix;

            if (currentTest.assertName) {
                prefix = `${currentTest.assertName}.`;
            } else {
                prefix = "";
            }

            return { assertPrefix: prefix };
        }

        const ExceptSimpleStrategy = {
            "CallExpression": function (node) {
                if (currentTest && !currentTest.didReport) {
                    if (isTopLevelExpectCall(node.callee)) {
                        currentTest.isExpectUsed = true;
                    } else if (isViolatingExceptSimpleRule(node)) {
                        context.report({
                            node: currentTest.node,
                            message: EXCEPT_SIMPLE_ERROR_MESSAGE,
                            data: assertionMessageData()
                        });
                        currentTest.didReport = true;
                    }
                } else if (utils.isTest(node.callee)) {
                    captureTestContext(node);
                }
            },

            "CallExpression:exit": function (node) {
                if (utils.isTest(node.callee)) {
                    releaseTestContext();
                }
            },

            "BlockStatement": function () {
                if (currentTest) {
                    currentTest.blockDepth++;
                }
            },

            "BlockStatement:exit": function () {
                if (currentTest) {
                    currentTest.blockDepth--;
                }
            }
        };

        const AlwaysStrategy = {
            "CallExpression": function (node) {
                if (currentTest && isExpectCall(node.callee)) {
                    currentTest.isExpectUsed = true;
                } else if (utils.isTest(node.callee)) {
                    captureTestContext(node);
                }
            },

            "CallExpression:exit": function (node) {
                if (utils.isTest(node.callee)) {
                    if (!currentTest.isExpectUsed) {
                        context.report({
                            node: currentTest.node,
                            message: ALWAYS_ERROR_MESSAGE,
                            data: assertionMessageData()
                        });
                    }

                    releaseTestContext();
                }
            }
        };

        const NeverStrategy = {
            "CallExpression": function (node) {
                if (currentTest && isExpectCall(node.callee)) {
                    currentTest.isExpectUsed = true;
                } else if (utils.isTest(node.callee)) {
                    captureTestContext(node);
                }
            },
            "CallExpression:exit": function (node) {
                if (utils.isTest(node.callee)) {
                    if (currentTest.isExpectUsed) {
                        context.report({
                            node: currentTest.node,
                            message: NEVER_ERROR_MESSAGE,
                            data: assertionMessageData()
                        });
                    }
                    releaseTestContext();
                }
            }
        };

        const NeverExceptZeroStrategy = {
            "CallExpression": function (node) {
                if (currentTest && isNonZeroExpectCall(node)) {
                    currentTest.isNonZeroExpectUsed = true;
                } else if (utils.isTest(node.callee)) {
                    captureTestContext(node);
                }
            },
            "CallExpression:exit": function (node) {
                if (utils.isTest(node.callee)) {
                    if (currentTest.isNonZeroExpectUsed) {
                        context.report({
                            node: currentTest.node,
                            message: NEVER_ERROR_MESSAGE,
                            data: assertionMessageData()
                        });
                    }
                    releaseTestContext();
                }
            }
        };

        return {
            "except-simple": ExceptSimpleStrategy,
            "never": NeverStrategy,
            "never-except-zero": NeverExceptZeroStrategy
        }[context.options[0]] || AlwaysStrategy;
    }
};
