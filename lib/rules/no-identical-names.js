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

module.exports = {
    meta: {
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
        const TOP_LEVEL_MODULE_NODE = "top-level-module"; //  Constant representing the implicit top-level module.
        const modulesStack = [TOP_LEVEL_MODULE_NODE];
        const mapModuleNodeToInfo = new Map();
        mapModuleNodeToInfo.set(TOP_LEVEL_MODULE_NODE, {
            modules: [], // Children module nodes.
            tests: [] // Children test nodes.
        });

        //----------------------------------------------------------------------
        // Helper functions
        //----------------------------------------------------------------------

        function isFirstArgLiteral(node) {
            return node.arguments && node.arguments[0] && node.arguments[0].type === "Literal";
        }

        function getCurrentModuleNode() {
            const parentModule = mapModuleNodeToInfo.get(modulesStack[modulesStack.length - 1]);
            if (parentModule.modules.length > 0) {
                // Find the last function-less module at the current level if one exists, i.e: module('foo');
                const lastFunctionLessModule = parentModule.modules.reverse().find(node => node.arguments.length === 1);
                if (lastFunctionLessModule) {
                    return lastFunctionLessModule;
                }
            }
            return modulesStack[modulesStack.length - 1];
        }

        function handleTestNames(node) {
            if (utils.isTest(node.callee)) {
                const title = node.arguments[0].value;
                const currentModuleNode = getCurrentModuleNode();
                const currentModuleInfo = mapModuleNodeToInfo.get(currentModuleNode);

                // Check if we have seen this test name in the current module yet.
                const duplicateTestTitle = currentModuleInfo.tests.find(t => t.arguments[0].value === title);
                if (duplicateTestTitle) {
                    context.report({
                        node: node.arguments[0],
                        messageId: "duplicateTest",
                        data: {
                            line: duplicateTestTitle.arguments[0].loc.start.line
                        }
                    });
                }

                // Add this test to the current module's list of tests.
                currentModuleInfo.tests.push(node);
            }
        }

        function handleModuleNames(node) {
            if (utils.isModule(node.callee)) {
                const title = node.arguments[0].value;
                const currentModuleNode = modulesStack[modulesStack.length - 1];
                const currentModuleInfo = mapModuleNodeToInfo.get(currentModuleNode);

                // Check if we have seen the same title in a sibling module.
                const duplicateModuleTitle = currentModuleInfo.modules.find(moduleNode => moduleNode.arguments[0].value === title);
                if (duplicateModuleTitle) {
                    context.report({
                        node: node.arguments[0],
                        messageId: "duplicateModule",
                        data: {
                            line: duplicateModuleTitle.loc.start.line
                        }
                    });
                }

                // Check if we have seen the same title in any ancestor modules.
                const duplicateAncestorModuleTitle = modulesStack.filter(moduleNode => moduleNode !== TOP_LEVEL_MODULE_NODE).find(moduleNode => moduleNode.arguments[0].value === title);
                if (duplicateAncestorModuleTitle) {
                    context.report({
                        node: node.arguments[0],
                        messageId: "duplicateModuleAncestor",
                        data: {
                            line: duplicateAncestorModuleTitle.arguments[0].loc.start.line
                        }
                    });
                }

                // Entering a module so push it onto the stack.
                modulesStack.push(node);
                mapModuleNodeToInfo.set(node, {
                    modules: [],
                    tests: []
                });
                currentModuleInfo.modules.push(node); // Add to parent module's list of children modules.
            }
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            "CallExpression": function (node) {
                if (!isFirstArgLiteral(node)) {
                    return;
                }

                handleModuleNames(node);
                handleTestNames(node);
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
