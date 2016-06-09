/**
 * @fileoverview Forbid the use of asyncTest or QUnit.asyncTest.
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
            description: "forbid the use of asyncTest or QUnit.asyncTest",
            category: "Best Practices"
        },
        schema: []
    },

    create: function (context) {
        var MESSAGE = "Unexpected asynchronous test. Use assert.async() instead.";

        return {
            "CallExpression": function (node) {
                if (utils.isAsyncTest(node.callee)) {
                    context.report({
                        node: node,
                        message: MESSAGE
                    });
                }
            }
        };
    }
};
