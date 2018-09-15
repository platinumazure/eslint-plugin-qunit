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
            category: "Possible Errors"
        },
        messages: {
            duplicateTest: "Test name is used on line {{ line }} in the same module.",
            duplicateModule: "Module name is used on line {{ line }}."
        },
        schema: []
    },

    create: function (context) {
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
                const duplicateModuleTitle = moduleNames.find(t => t.title === title);

                if (duplicateModuleTitle) {
                    context.report({
                        node: node.arguments[0],
                        messageId: "duplicateModule",
                        data: duplicateModuleTitle
                    });
                }

                moduleNames.push({
                    title,
                    line: node.arguments[0].loc.start.line
                });
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
            }
        };
    }
};
