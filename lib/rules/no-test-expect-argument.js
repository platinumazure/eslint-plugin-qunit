/**
 * @fileoverview Forbid expect argument in QUnit.test
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
            description: "forbid expect argument in QUnit.test",
            category: "Possible Errors"
        },
        messages: {
            noExpectArgument: "Do not use expect argument in {{callee}}()."
        },
        schema: []
    },

    create: function (context) {
        const sourceCode = context.getSourceCode();

        return {
            CallExpression: function (node) {
                if (utils.isTest(node.callee) && node.arguments.length > 2) {
                    context.report({
                        node: node,
                        messageId: "noExpectArgument",
                        data: {
                            callee: sourceCode.getText(node.callee)
                        }
                    });
                }
            }
        };
    }
};
