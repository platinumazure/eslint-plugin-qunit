/**
 * @fileoverview Forbid expect argument in QUnit.test
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
            description: "forbid expect argument in QUnit.test",
            category: "Possible Errors"
        },
        schema: []
    },

    create: function (context) {
        var sourceCode = context.getSourceCode();

        return {
            CallExpression: function (node) {
                if (utils.isTest(node.callee) && node.arguments.length > 2) {
                    context.report({
                        node: node,
                        message: "Do not use expect argument in {{ callee }}()",
                        data: {
                            callee: sourceCode.getText(node.callee)
                        }
                    });
                }
            }
        };
    }

};
