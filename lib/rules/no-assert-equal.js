/**
 * @fileoverview Forbid the use of assert.equal and suggest other assertions.
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
            description: "forbid the use of assert.equal",
            category: "Best Practices"
        },
        schema: []
    },

    create: function (context) {
        // Declare a test stack in case of nested test cases (not currently
        // supported by QUnit).
        var testStack = [],
            ERROR_TEMPLATE_QUALIFIED = "Unexpected {{id}}.equal. Use {{id}}.strictEqual, {{id}}.deepEqual, or {{id}}.propEqual.",
            ERROR_TEMPLATE_GLOBAL = "Unexpected equal. Use strictEqual, deepEqual, or propEqual.";

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
            var assertVar = getCurrentAssertContextVariable(),
                message = isGlobalEqual(node.callee) ? ERROR_TEMPLATE_GLOBAL : ERROR_TEMPLATE_QUALIFIED;

            context.report(node, message, {
                id: assertVar
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
