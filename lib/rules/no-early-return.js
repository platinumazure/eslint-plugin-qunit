/**
 * @fileoverview prevent early return in a QUnit test
 * @author Kevin Partington
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var utils = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "prevent early return in a QUnit test",
            category: "Best Practices"
        },
        schema: []
    },

    create: function (context) {
        var assertContextVar = null,
            functionScopes = [],
            MESSAGE = "Do not return early from a QUnit test.";

        function pushFunction() {
            if (assertContextVar !== null) {
                functionScopes.push({
                    returnAndAssertNodes: []
                });
            }
        }

        function popFunction() {
            if (assertContextVar !== null) {
                var lastScope = functionScopes.pop(),
                    lastAssert = null,
                    i;

                for (i = lastScope.returnAndAssertNodes.length - 1; i >= 0; --i) {
                    if (lastScope.returnAndAssertNodes[i].type === "CallExpression") {
                        lastAssert = i;
                        break;
                    }
                }

                if (lastAssert !== null && lastScope.returnAndAssertNodes.length) {
                    lastScope.returnAndAssertNodes.slice(0, lastAssert)
                        .forEach(function (node) {
                            if (node.type === "ReturnStatement") {
                                context.report({
                                    node: node,
                                    message: MESSAGE
                                });
                            }
                        });
                }
            }
        }

        return {
            "CallExpression": function (node) {
                if (utils.isTest(node.callee)) {
                    assertContextVar = utils.getAssertContextNameForTest(node.arguments);
                } else if (utils.isAssertion(node.callee, assertContextVar) && functionScopes.length) {
                    functionScopes[functionScopes.length - 1].returnAndAssertNodes.push(node);
                }
            },

            "FunctionDeclaration": pushFunction,
            "FunctionExpression": pushFunction,
            "ArrowFunctionExpression": pushFunction,

            "ReturnStatement": function (node) {
                if (functionScopes.length) {
                    functionScopes[functionScopes.length - 1].returnAndAssertNodes.push(node);
                }
            },

            "CallExpression:exit": function (node) {
                if (utils.isTest(node.callee)) {
                    assertContextVar = null;
                }
            },

            "FunctionDeclaration:exit": popFunction,
            "FunctionExpression:exit": popFunction,
            "ArrowFunctionExpression:exit": popFunction
        };
    }
};
