/**
 * @fileoverview Forbid the use of QUnit.todo
 * @author Baptiste Doucerain
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const utils = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "disallow QUnit.todo",
            category: "Best Practices",
            recommended: false,
            url: "https://github.com/platinumazure/eslint-plugin-qunit/blob/master/docs/rules/no-todo.md"
        },
        messages: {
            noQUnitTodo: "Unexpected todo() call."
        },
        schema: []
    },

    create: function (context) {
        return {
            "CallExpression": function (node) {
                if (utils.isTodo(node.callee)) {
                    context.report({
                        node: node,
                        messageId: "noQUnitTodo",
                        data: {
                            callee: node.callee.name
                        }
                    });
                }
            }
        };
    }
};
