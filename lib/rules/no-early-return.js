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
        var insideTest = false,
            nestedFunctionCount = 0,
            MESSAGE = "Do not return early from a QUnit test.";

        function incrementNestedFunctionCount() {
            if (insideTest) {
                ++nestedFunctionCount;
            }
        }

        function decrementNestedFunctionCount() {
            if (insideTest) {
                --nestedFunctionCount;
            }
        }

        return {
            "CallExpression": function (node) {
                if (utils.isTest(node.callee)) {
                    insideTest = true;
                }
            },

            "FunctionDeclaration": incrementNestedFunctionCount,
            "FunctionExpression": incrementNestedFunctionCount,
            "ArrowFunctionExpression": incrementNestedFunctionCount,

            "ReturnStatement": function (node) {
                if (insideTest && nestedFunctionCount <= 1) {
                    context.report({
                        node: node,
                        message: MESSAGE
                    });
                }
            },

            "CallExpression:exit": function (node) {
                if (utils.isTest(node.callee)) {
                    insideTest = false;
                }
            },

            "FunctionDeclaration:exit": decrementNestedFunctionCount,
            "FunctionExpression:exit": decrementNestedFunctionCount,
            "ArrowFunctionExpression:exit": decrementNestedFunctionCount
        };
    }
};
