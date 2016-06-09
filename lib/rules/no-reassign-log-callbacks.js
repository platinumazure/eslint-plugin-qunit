/**
 * @fileoverview Forbid overwriting of QUnit logging callbacks.
 * @author Kevin Partington
 * @copyright 2016 Kevin Partington. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Forbid overwriting of QUnit logging callbacks",
            category: "Possible Errors"
        },
        schema: []
    },

    create: function (context) {
        var MESSAGE = "Do not reassign QUnit log callbacks.",
            LOG_CALLBACKS = [
                "begin",
                "done",
                "log",
                "moduleDone",
                "moduleStart",
                "testDone",
                "testStart"
            ];

        function isQUnitLogCallback(node) {
            return node.type === "MemberExpression" &&
                node.object &&
                node.object.type === "Identifier" &&
                node.object.name === "QUnit" &&
                node.property.type === "Identifier" &&
                LOG_CALLBACKS.indexOf(node.property.name) !== -1;
        }

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            "AssignmentExpression": function (node) {
                if (isQUnitLogCallback(node.left)) {
                    context.report({
                        node: node,
                        message: MESSAGE
                    });
                }
            }
        };
    }
};
