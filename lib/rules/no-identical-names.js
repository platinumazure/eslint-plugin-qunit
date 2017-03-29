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
        schema: []
    },

    create: function (context) {
        const moduleNames = [];
        let testNames = [];

        //----------------------------------------------------------------------
        // Helper functions
        //----------------------------------------------------------------------

        function isFirstArgLiteral(node) {
            return node.arguments && node.arguments[0] && node.arguments[0].type === "Literal";
        }

        function handleTestNames(node, title) {
            if (utils.isTest(node.callee)) {
                if (testNames.indexOf(title) !== -1) {
                    context.report({
                        node: node.arguments[0],
                        message: "Test name is used multiple times in the same module."
                    });
                }
                testNames.push(title);
            }
        }

        function handleModuleNames(node, title) {
            if (utils.isModule(node.callee)) {
                if (moduleNames.indexOf(title) !== -1) {
                    context.report({
                        node: node.arguments[0],
                        message: "Module name is used multiple times."
                    });
                }
                moduleNames.push(title);
            }
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            "CallExpression": function (node) {
                if (utils.isModule(node.callee)) {
                    testNames = [];
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
