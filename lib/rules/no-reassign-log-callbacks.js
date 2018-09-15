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
        messages: {
            noReassignLogCallbacks: "Do not reassign QUnit log callbacks."
        },
        schema: []
    },

    create: function (context) {
        const LOG_CALLBACKS = [
            "begin",
            "done",
            "log",
            "moduleDone",
            "moduleStart",
            "testDone",
            "testStart"
        ];

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return LOG_CALLBACKS.reduce(function (memo, callback) {
            memo[`AssignmentExpression[left.object.name='QUnit'][left.property.name='${callback}']`] = function (node) {
                context.report({
                    node: node,
                    messageId: "noReassignLogCallbacks"
                });
            };

            return memo;
        }, {});
    }
};
