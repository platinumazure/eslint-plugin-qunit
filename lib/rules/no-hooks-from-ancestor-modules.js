/**
 * @fileoverview disallow the use of hooks from ancestor modules
 * @author Raymond Cohen
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const utils = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const NESTABLE_HOOK_NAMES = ["afterEach", "beforeEach"];

module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "disallow the use of hooks from ancestor modules",
            category: "Possible Errors",
            recommended: false,
            url: "https://github.com/platinumazure/eslint-plugin-qunit/blob/master/docs/rules/no-hooks-from-ancestor-modules.md"
        },
        fixable: null,
        messages: {
            "noHooksFromAncestorModules": "Do not call {{usedHooksIdentifierName}}.{{hookName}} from an ancestor module."
        },
        schema: []
    },

    create: function (context) {
        const moduleStack = [];

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        function isInModuleCallbackBody(callExpressionNode) {
            return callExpressionNode &&
                callExpressionNode.parent &&
                callExpressionNode.parent.type === "ExpressionStatement" &&
                callExpressionNode.parent.parent &&
                callExpressionNode.parent.parent.type === "BlockStatement" &&
                callExpressionNode.parent.parent.parent &&
                callExpressionNode.parent.parent.parent.type === "FunctionExpression" &&
                callExpressionNode.parent.parent.parent.parent &&
                callExpressionNode.parent.parent.parent.parent.type === "CallExpression" &&
                utils.isModule(callExpressionNode.parent.parent.parent.parent.callee);
        }

        function isHookInvocation(node) {
            return node.callee.type === "MemberExpression" &&
                node.callee.object.type === "Identifier" &&
                NESTABLE_HOOK_NAMES.includes(node.callee.property.name) &&
                isInModuleCallbackBody(node);
        }

        function isFunctionWithIdentifierArg(node) {
            return node &&
                node.type === "FunctionExpression" &&
                node.params.length > 0 &&
                node.params[0].type === "Identifier";
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            "CallExpression": function (node) {
                if (utils.isModule(node.callee)) {
                    const moduleStackInfo = {
                        callExpression: node,
                        description: node.arguments[0].value
                    };

                    const callback = node.arguments[1];
                    if (isFunctionWithIdentifierArg(callback)) {
                        moduleStackInfo.hookIdentifierName = callback.params[0].name;
                    } else {
                        moduleStackInfo.hookIdentifierName = null;
                    }
                    moduleStack.push(moduleStackInfo);
                } else if (isHookInvocation(node)) {
                    const containingModuleInfo = moduleStack[moduleStack.length - 1];
                    const expectedHooksIdentifierName = containingModuleInfo.hookIdentifierName;
                    const usedHooksIdentifierName = node.callee.object.name;
                    const invokedMethodName = node.callee.property.name;

                    if (expectedHooksIdentifierName !== usedHooksIdentifierName) {
                        context.report({
                            node: node,
                            messageId: "noHooksFromAncestorModules",
                            data: {
                                invokedMethodName,
                                usedHooksIdentifierName
                            }
                        });
                    }
                }
            },

            "CallExpression:exit": function (node) {
                if (utils.isModule(node.callee)) {
                    moduleStack.pop();
                }
            }
        };
    }
};
