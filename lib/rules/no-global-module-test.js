/**
 * @fileoverview Forbid the use of global module/test/asyncTest.
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
            description: "forbid global module/test/asyncTest",
            category: "Possible Errors"
        },
        schema: []
    },

    create: function (context) {
        var MESSAGE = "Unexpected global `{{ callee }}`.";

        function isModuleOrTest(calleeNode) {
            return utils.isModule(calleeNode) || utils.isTest(calleeNode);
        }

        return {
            "CallExpression": function (node) {
                if (node.callee.type === "Identifier" && isModuleOrTest(node.callee)) {
                    context.report({
                        node: node,
                        message: MESSAGE,
                        data: {
                            callee: node.callee.name
                        }
                    });
                }
            }
        };
    }
};
