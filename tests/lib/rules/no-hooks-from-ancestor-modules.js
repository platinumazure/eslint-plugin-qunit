/**
 * @fileoverview disallow the use of hooks from ancestor modules
 * @author Raymond Cohen
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-hooks-from-ancestor-modules"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function createError({ invokedMethodName, usedHooksIdentifierName }) {
    return {
        messageId: "noHooksFromAncestorModules",
        data: {
            invokedMethodName,
            usedHooksIdentifierName
        }
    };
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-hooks-from-ancestor-modules", rule, {

    valid: [
        "QUnit.testDone(function() {});",
        `
        QUnit.module("module", function(hooks) { hooks.beforeEach(function() {}); });
        `,
        `
        QUnit.module("module", function(hooks) { hooks.afterEach(function() {}); });
        `,
        `
        QUnit.module("module-a", function() {
            QUnit.module("module-b", function(hooks) {
                hooks.beforeEach(function() {});
            });
        });
        `,
        `
        module("module-a", function() {
            module("module-b", function(hooks) {
                hooks.beforeEach(function() {});
            });
        });
        `,
        `
        QUnit.module("module-a", function() {
            QUnit.module("module-b", function(hooks) {
                hooks.afterEach(function() {});
            });
        });
        `,
        `
        QUnit.module("module-a", function() {
            QUnit.module("module-b", function(hooks) {
                hooks.beforeEach(function() {});
                hooks.beforeEach(function() {});
                hooks.afterEach(function() {});
                hooks.afterEach(function() {});
            });
        });
        `,
        `
        QUnit.module("first", function(hooks) {
            hooks.beforeEach(function() {});
            hooks.beforeEach(function() {});
            hooks.afterEach(function() {});
            hooks.afterEach(function() {});

            QUnit.module("second", function(hooks) {
                hooks.beforeEach(function() {});
                hooks.beforeEach(function() {});
                hooks.afterEach(function() {});
                hooks.afterEach(function() {});

                QUnit.module("third", function(hooks) {
                    hooks.beforeEach(function() {});
                    hooks.beforeEach(function() {});
                    hooks.afterEach(function() {});
                    hooks.afterEach(function() {});
                });
            });
        });
        `,
        `
        QUnit.module("first", function(firstHooks) {
            firstHooks.beforeEach(function() {});
            firstHooks.afterEach(function() {});

            QUnit.module("second", function(secondHooks) {
                secondHooks.beforeEach(function() {});
                secondHooks.afterEach(function() {});

                QUnit.module("third", function(thirdHooks) {
                    thirdHooks.beforeEach(function() {});
                    thirdHooks.afterEach(function() {});
                });
            });
        });
        `
    ],

    invalid: [
        {
            code: `
                QUnit.module("module-a", function (hooks) {
                    QUnit.module("module-b", function () {
                        hooks.beforeEach(function () {});
                    });
                });
            `,
            errors: [
                createError({
                    invokedMethodName: "beforeEach",
                    usedHooksIdentifierName: "hooks"
                })
            ]
        },
        {
            code: `
                QUnit.module("first", function (firstHooks) {
                    QUnit.module("second", function (secondHooks) {
                        firstHooks.afterEach(function () {});
                    });
                });
            `,
            errors: [
                createError({
                    invokedMethodName: "afterEach",
                    usedHooksIdentifierName: "firstHooks"
                })
            ]
        },
        {
            code: `
                QUnit.module("module-a", function (hooks) {
                    QUnit.module("module-b", function () {
                        hooks.afterEach(function () {});
                    });
                });
            `,
            errors: [
                createError({
                    invokedMethodName: "afterEach",
                    usedHooksIdentifierName: "hooks"
                })
            ]
        },
        {
            code: `
                module("module-a", function (hooks) {
                    module("module-b", function () {
                        hooks.afterEach(function () {});
                    });
                });
            `,
            errors: [
                createError({
                    invokedMethodName: "afterEach",
                    usedHooksIdentifierName: "hooks"
                })
            ]
        },
        {
            code: `
                QUnit.module("first", function (firstHooks) {
                    firstHooks.beforeEach(function () { });

                    QUnit.module("second", function (secondHooks) {
                        secondHooks.beforeEach(function () { });

                        QUnit.module("third", function (thirdHooks) {
                            thirdHooks.beforeEach(function () { });
                            firstHooks.beforeEach(function () { });
                        });
                    });
                });
            `,
            errors: [
                createError({
                    invokedMethodName: "beforeEach",
                    usedHooksIdentifierName: "firstHooks"
                })
            ]
        }
    ]
});
