/**
 * @fileoverview Forbid the use of asyncTest or QUnit.asyncTest.
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
            description: "forbid the use of asyncTest or QUnit.asyncTest",
            category: "Best Practices"
        },
        messages: {
            unexpectedAsyncTest: "Unexpected asynchronous test. Use assert.async() instead."
        },
        schema: []
    },

    create: function (context) {
        return {
            "CallExpression": function (node) {
                if (utils.isAsyncTest(node.callee)) {
                    context.report({
                        node: node,
                        messageId: "unexpectedAsyncTest"
                    });
                }
            }
        };
    }
};
