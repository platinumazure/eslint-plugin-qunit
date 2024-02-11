/**
 * @fileoverview Forbid the use of QUnit.only.
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

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "disallow QUnit.only",
            category: "Best Practices",
            url: "https://github.com/platinumazure/eslint-plugin-qunit/blob/main/docs/rules/no-only.md",
        },
        messages: {
            noQUnitOnly: "Unexpected only() call.",
        },
        schema: [],
    },

    create: function (context) {
        return {
            CallExpression: function (node) {
                if (utils.isOnly(node.callee)) {
                    context.report({
                        node: node,
                        messageId: "noQUnitOnly",
                    });
                }
            },
        };
    },
};
