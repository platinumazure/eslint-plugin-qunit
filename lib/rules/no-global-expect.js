/**
 * @fileoverview Forbid the use of global expect.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "forbid global expect",
            category: "Possible Errors",
            url: "https://github.com/platinumazure/eslint-plugin-qunit/blob/master/docs/rules/no-global-expect.md"
        },
        messages: {
            unexpectedGlobalExpect: "Unexpected global expect."
        },
        schema: []
    },

    create: function (context) {
        return {
            "CallExpression[callee.name='expect']": function (node) {
                context.report({
                    node: node,
                    messageId: "unexpectedGlobalExpect"
                });
            }
        };
    }
};
