/**
 * @fileoverview Forbid identical test and module names
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const utils = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------


function areArraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((item, index) => item === arr2[index]);
}

module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "Forbid identical test and module names",
            category: "Possible Errors",
            url: "https://github.com/platinumazure/eslint-plugin-qunit/blob/master/docs/rules/no-identical-names.md"
        },
        messages: {
            duplicateTest: "Test name is used on line {{ line }} in the same module.",
            duplicateModule: "Module name is used by sibling on line {{ line }}.",
            duplicateModuleAncestor: "Module name is used by ancestor on line {{ line }}."
        },
        schema: []
    },

    create: function (context) {
        const modulesStack = [];
        const moduleNames = [];
        const testNames = [];

        //----------------------------------------------------------------------
        // Helper functions
        //----------------------------------------------------------------------

        function isFirstArgLiteral(node) {
            return node.arguments && node.arguments[0] && node.arguments[0].type === "Literal";
        }

        function handleTestNames(node, title) {
            if (utils.isTest(node.callee)) {
                const duplicateTestTitle = testNames.find(t => t.title === title);

                if (duplicateTestTitle) {
                    context.report({
                        node: node.arguments[0],
                        messageId: "duplicateTest",
                        data: duplicateTestTitle
                    });
                }

                testNames.push({
                    title,
                    line: node.arguments[0].loc.start.line
                });
            }
        }

        function handleModuleNames(node, title) {
            if (utils.isModule(node.callee)) {
                // Get the nested module title parts.
                const ancestorTitleParts = modulesStack.map(moduleNode => moduleNode.arguments[0].value);
                const titleParts = [...ancestorTitleParts, title]; // Example: ["Module", "Submodule"]

                // Check if we have seen the same nested module title parts before.
                const duplicateModuleTitle = moduleNames.find(obj => areArraysEqual(obj.titleParts, titleParts));
                if (duplicateModuleTitle) {
                    context.report({
                        node: node.arguments[0],
                        messageId: "duplicateModule",
                        data: duplicateModuleTitle
                    });
                }

                // Check if we have seen the same title in any ancestor modules.
                const duplicateAncestorModuleTitle = modulesStack.find(moduleNode => moduleNode.arguments[0].value === title);
                if (duplicateAncestorModuleTitle) {
                    context.report({
                        node: node.arguments[0],
                        messageId: "duplicateModuleAncestor",
                        data: {
                            line: duplicateAncestorModuleTitle.arguments[0].loc.start.line
                        }
                    });
                }

                moduleNames.push({
                    titleParts,
                    line: node.arguments[0].loc.start.line
                });

                // Entering a module so push it onto the stack.
                modulesStack.push(node);
            }
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            "CallExpression": function (node) {
                if (utils.isModule(node.callee)) {
                    testNames.length = 0;
                }

                if (!isFirstArgLiteral(node)) {
                    return;
                }

                const title = node.arguments[0].value;
                handleTestNames(node, title);
                handleModuleNames(node, title);
            },

            "CallExpression:exit": function (node) {
                if (modulesStack.length > 0 && modulesStack[modulesStack.length - 1] === node) {
                    // Exiting a module so pop it from the stack.
                    modulesStack.pop();
                }
            }
        };
    }
};
