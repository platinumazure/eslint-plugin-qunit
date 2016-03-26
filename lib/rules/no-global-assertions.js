/**
 * @fileoverview Forbid the use of global QUnit assertions.
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

module.exports = function (context) {
    var MESSAGE = "Unexpected global `{{ assertion }}` assertion.";

    return {
        "CallExpression": function (node) {
            if (node.callee.type === "Identifier" && utils.isAssertion(node.callee)) {
                context.report({
                    node: node,
                    message: MESSAGE,
                    data: {
                        assertion: node.callee.name
                    }
                });
            }
        }
    };
};
