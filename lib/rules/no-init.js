/**
 * @fileoverview Forbids use of QUnit.init.
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
            description: "forbid use of QUnit.init",
            category: "Possible Errors"
        },
        schema: []
    },

    create: function (context) {
        const MESSAGE = "Do not use QUnit.init().";

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            "CallExpression[callee.object.name='QUnit'][callee.property.name='init']": function (node) {
                context.report({
                    node: node,
                    message: MESSAGE
                });
            }
        };
    }
};
