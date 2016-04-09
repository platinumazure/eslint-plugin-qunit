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

module.exports = function (context) {
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
};

module.exports.schema = [];
