/**
 * @fileoverview Forbid the use of assert.equal and suggest other assertions.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const assert = require("assert"),
    utils = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "disallow the use of assert.equal",
            category: "Best Practices",
            url: "https://github.com/platinumazure/eslint-plugin-qunit/blob/master/docs/rules/no-assert-equal.md"
        },
        messages: {
            unexpectedGlobalEqual: "Unexpected equal. Use strictEqual, deepEqual, or propEqual.",
            unexpectedAssertEqual: "Unexpected {{assertVar}}.equal. Use {{assertVar}}.strictEqual, {{assertVar}}.deepEqual, or {{assertVar}}.propEqual."
        },
        schema: []
    },

    create: function (context) {
        // Declare a test stack in case of nested test cases (not currently
        // supported by QUnit).
        const testStack = [];

        function isGlobalEqual(calleeNode) {
            return calleeNode &&
                calleeNode.type === "Identifier" &&
                calleeNode.name === "equal";
        }

        function getCurrentAssertContextVariable() {
            assert(testStack.length, "Test stack should not be empty");

            return testStack[testStack.length - 1].assertVar;
        }

        function isAssertEqual(calleeNode) {
            return calleeNode &&
                calleeNode.type === "MemberExpression" &&
                calleeNode.property.type === "Identifier" &&
                calleeNode.property.name === "equal" &&
                calleeNode.object.type === "Identifier" &&
                calleeNode.object.name === getCurrentAssertContextVariable();
        }

        function isEqual(calleeNode) {
            return isGlobalEqual(calleeNode) ||
                isAssertEqual(calleeNode);
        }

        function reportError(node) {
            const assertVar = getCurrentAssertContextVariable();

            context.report({
                node: node,
                messageId: isGlobalEqual(node.callee) ? "unexpectedGlobalEqual" : "unexpectedAssertEqual",
                data: {
                    assertVar
                }
            });
        }

        return {
            "CallExpression": function (node) {
                /* istanbul ignore else: correctly does nothing */
                if (utils.isTest(node.callee) || utils.isAsyncTest(node.callee)) {
                    testStack.push({
                        assertVar: utils.getAssertContextNameForTest(node.arguments)
                    });
                } else if (testStack.length && isEqual(node.callee)) {
                    reportError(node);
                }
            },
            "CallExpression:exit": function (node) {
                /* istanbul ignore else: correctly does nothing */
                if (utils.isTest(node.callee) || utils.isAsyncTest(node.callee)) {
                    testStack.pop();
                }
            }
        };
    }
};
