/**
 * @fileoverview Forbid arrow functions as QUnit test/module callbacks.
 * @author Kevin Partington
 * @copyright 2016 Kevin Partington. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var utils = require("../utils.js");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "forbid arrow functions as QUnit test/module callbacks",
            category: "Best Practices"
        },
        schema: []
    },

    create: function (context) {
        var MESSAGE = "Arrow function should not be used as test callback.";

        //--------------------------------------------------------------------------
        // Helpers
        //--------------------------------------------------------------------------

        function checkCallback(testCallbackNode) {
            if (testCallbackNode && testCallbackNode.type === "ArrowFunctionExpression") {
                context.report({
                    node: testCallbackNode,
                    message: MESSAGE
                });
            }
        }

        function isPropertyInModule(propertyNode) {
            return propertyNode &&
                propertyNode.parent &&
                propertyNode.parent.type === "ObjectExpression" &&
                propertyNode.parent.parent &&
                propertyNode.parent.parent.type === "CallExpression" &&
                utils.isModule(propertyNode.parent.parent.callee);
        }

        function isModuleProperty(propertyNode) {
            return isPropertyInModule(propertyNode) &&
                utils.isModuleHookPropertyKey(propertyNode.key);
        }

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            "CallExpression": function (node) {
                if (utils.isTest(node.callee) && node.arguments && node.arguments.length > 1) {
                    checkCallback(node.arguments[1]);
                }
            },

            "Property": function (node) {
                if (isModuleProperty(node)) {
                    checkCallback(node.value);
                }
            }
        };
    }
};
