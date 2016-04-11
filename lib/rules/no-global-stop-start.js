/**
 * @fileoverview Forbid use of global stop()/start().
 * @author Kevin Partington
 * @copyright 2016 Kevin Partington. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

var utils = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var MESSAGE = "Unexpected global {{callee}}() call.";

    function isGlobalStop(calleeNode) {
        return calleeNode.type === "Identifier" && utils.isStop(calleeNode);
    }

    function isGlobalStart(calleeNode) {
        return calleeNode.type === "Identifier" && utils.isStart(calleeNode);
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function (node) {
            if (isGlobalStop(node.callee) || isGlobalStart(node.callee)) {
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
};

module.exports.schema = [];
