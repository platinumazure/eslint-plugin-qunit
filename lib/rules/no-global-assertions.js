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
    var currentTestNestingLevel = 0,
        MESSAGE = "Unexpected global `{{ assertion }}` assertion.";

    return {
        "CallExpression": function (node) {
            if (utils.isTest(node.callee)) {
                ++currentTestNestingLevel;
            } else if (node.callee.type === "Identifier" && utils.isAssertion(node.callee)) {
                context.report({
                    node: node,
                    message: MESSAGE,
                    data: {
                        assertion: node.callee.name
                    }
                });
            }
        },
        "CallExpression:exit": function (node) {
            if (utils.isTest(node.callee)) {
                --currentTestNestingLevel;
            }
        }
    };
};
