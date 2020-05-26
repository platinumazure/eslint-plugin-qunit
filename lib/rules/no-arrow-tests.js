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

const utils = require("../utils.js");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "forbid arrow functions as QUnit test/module callbacks",
            category: "Best Practices"
        },
        fixable: "code",
        messages: {
            noArrowFunction: "Arrow function should not be used as test callback."
        },
        schema: []
    },

    create: function (context) {
        //--------------------------------------------------------------------------
        // Helpers
        //--------------------------------------------------------------------------

        // Fixer adapted from https://github.com/lo1tuma/eslint-plugin-mocha (MIT)
        const sourceCode = context.getSourceCode();

        function formatFunctionHead(fn) {
            const paramsLeftParen = sourceCode.getFirstToken(fn);
            const paramsRightParen = sourceCode.getTokenBefore(sourceCode.getTokenBefore(fn.body));
            let paramsFullText = sourceCode.text.slice(paramsLeftParen.range[0], paramsRightParen.range[1]);
            const functionKeyword = "function";

            if (fn.params.length > 0) {
                paramsFullText = `(${sourceCode.text.slice(fn.params[0].range[0], fn.params[fn.params.length - 1].range[1])})`;
            }

            return `${functionKeyword}${paramsFullText} `;
        }

        function checkCallback(fn) {
            if (fn && fn.type === "ArrowFunctionExpression") {
                context.report({
                    node: fn,
                    messageId: "noArrowFunction",
                    fix: function (fixer) {
                        return fixer.replaceTextRange(
                            [fn.range[0], fn.body.range[0]],
                            formatFunctionHead(fn)
                        );
                    }
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
