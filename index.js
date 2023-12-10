/**
 * @fileoverview Entry point for eslint-plugin-qunit. Exports rules and configs.
 * @author Kevin Partington
 */

/* eslint sort-keys: "error" */

"use strict";

const requireIndex = require("requireindex");
const pkg = require("./package.json");

module.exports = {
    meta: {
        name: pkg.name,
        version: pkg.version
    },

    rules: requireIndex(`${__dirname}/lib/rules`),

    // eslint-disable-next-line sort-keys
    configs: {
        recommended: {
            description: [
                "This configuration includes rules which I recommend to avoid QUnit runtime errors or incorrect behavior, some of which can be difficult to debug. Some of these rules also encourage best practices that help QUnit work better for you.",
                "For ESLint `.eslintrc.js` legacy config, extend from `\"plugin:qunit/recommended\"`.",
                "For ESLint `eslint.config.js` flat config, load from `require('eslint-plugin-qunit/configs/recommended')`."
            ].join(" "),
            plugins: ["qunit"],
            rules: {
                "qunit/assert-args": "error",
                "qunit/literal-compare-order": "error",
                "qunit/no-assert-equal": "error",
                "qunit/no-assert-equal-boolean": "error",
                "qunit/no-assert-logical-expression": "error",
                "qunit/no-async-in-loops": "error",
                "qunit/no-async-module-callbacks": "error",
                "qunit/no-async-test": "error",
                "qunit/no-commented-tests": "error",
                "qunit/no-compare-relation-boolean": "error",
                "qunit/no-conditional-assertions": "error",
                "qunit/no-early-return": "error",
                "qunit/no-global-assertions": "error",
                "qunit/no-global-expect": "error",
                "qunit/no-global-module-test": "error",
                "qunit/no-global-stop-start": "error",
                "qunit/no-hooks-from-ancestor-modules": "error",
                "qunit/no-identical-names": "error",
                "qunit/no-init": "error",
                "qunit/no-jsdump": "error",
                "qunit/no-negated-ok": "error",
                "qunit/no-nested-tests": "error",
                "qunit/no-ok-equality": "error",
                "qunit/no-only": "error",
                "qunit/no-qunit-push": "error",
                "qunit/no-qunit-start-in-tests": "error",
                "qunit/no-qunit-stop": "error",
                "qunit/no-reassign-log-callbacks": "error",
                "qunit/no-reset": "error",
                "qunit/no-setup-teardown": "error",
                "qunit/no-test-expect-argument": "error",
                "qunit/no-throws-string": "error",
                "qunit/require-expect": "error",
                "qunit/require-object-in-propequal": "error",
                "qunit/resolve-async": "error"
            }
        }
    }
};
