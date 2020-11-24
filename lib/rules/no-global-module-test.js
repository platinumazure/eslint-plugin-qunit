/**
 * @fileoverview Forbid the use of global module/test/asyncTest.
 * @author Kevin Partington
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
            description: "forbid global module/test/asyncTest",
            category: "Possible Errors",
            url: "https://github.com/platinumazure/eslint-plugin-qunit/blob/master/docs/rules/no-global-module-test.md"
        },
        messages: {
            unexpectedGlobalModuleTest: "Unexpected global `{{ callee }}`."
        },
        schema: []
    },

    create: function (context) {
        function isModuleOrTest(calleeNode) {
            return utils.isModule(calleeNode) || utils.isTest(calleeNode);
        }

        return {
            "CallExpression[callee.type='Identifier']": function (node) {
                if (isModuleOrTest(node.callee)) {
                    context.report({
                        node: node,
                        messageId: "unexpectedGlobalModuleTest",
                        data: {
                            callee: node.callee.name
                        }
                    });
                }
            }
        };
    }
};
