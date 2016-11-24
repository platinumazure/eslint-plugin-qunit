/**
 * @fileoverview forbid QUnit.start() within tests or test hooks
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var utils = require("../utils");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

var MESSAGE = "Do not use QUnit.start() inside a {{context}}.";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "forbid QUnit.start() within tests or test hooks",
            category: "Possible Errors",
            recommended: false
        },
        fixable: null,
        schema: []
    },

    create: function (context) {
        var contextStack = [];

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        function isQUnitStart(calleeNode) {
            return calleeNode.type === "MemberExpression" &&
                utils.isStart(calleeNode);
        }

        function isInModule(propertyNode) {
            return propertyNode &&
                propertyNode.parent &&          // ObjectExpression
                propertyNode.parent.parent &&   // CallExpression?
                propertyNode.parent.parent.type === "CallExpression" &&
                utils.isModule(propertyNode.parent.parent.callee);
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            "CallExpression": function (node) {
                if (utils.isTest(node.callee)) {
                    contextStack.push("test");
                } else if (contextStack.length && isQUnitStart(node.callee)) {
                    var currentContext = contextStack[contextStack.length - 1];

                    context.report({
                        node: node,
                        message: MESSAGE,
                        data: {
                            context: currentContext
                        }
                    });
                }
            },

            "Property": function (node) {
                if (utils.isModuleHookPropertyKey(node.key) && isInModule(node)) {
                    contextStack.push(node.key.name + " hook");
                }
            },

            "CallExpression:exit": function (node) {
                if (utils.isTest(node.callee)) {
                    contextStack.pop();
                }
            },

            "Property:exit": function (node) {
                if (utils.isModuleHookPropertyKey(node.key) && isInModule(node)) {
                    contextStack.pop();
                }
            }
        };
    }
};
