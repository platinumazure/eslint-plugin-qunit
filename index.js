"use strict";

module.exports = {
    rules: {
        "assert-args": require("./lib/rules/assert-args"),
        "literal-compare-order": require("./lib/rules/literal-compare-order"),
        "no-arrow-tests": require("./lib/rules/no-arrow-tests"),
        "no-assert-equal": require("./lib/rules/no-assert-equal"),
        "no-assert-logical-expression": require("./lib/rules/no-assert-logical-expression"),
        "no-async-in-loops": require("./lib/rules/no-async-in-loops"),
        "no-async-test": require("./lib/rules/no-async-test"),
        "no-commented-tests": require("./lib/rules/no-commented-tests"),
        "no-compare-relation-boolean": require("./lib/rules/no-compare-relation-boolean"),
        "no-conditional-assertions": require("./lib/rules/no-conditional-assertions"),
        "no-global-assertions": require("./lib/rules/no-global-assertions"),
        "no-global-expect": require("./lib/rules/no-global-expect"),
        "no-global-module-test": require("./lib/rules/no-global-module-test"),
        "no-global-stop-start": require("./lib/rules/no-global-stop-start"),
        "no-early-return": require("./lib/rules/no-early-return"),
        "no-init": require("./lib/rules/no-init"),
        "no-jsdump": require("./lib/rules/no-jsdump"),
        "no-negated-ok": require("./lib/rules/no-negated-ok"),
        "no-ok-equality": require("./lib/rules/no-ok-equality"),
        "no-only": require("./lib/rules/no-only"),
        "no-qunit-push": require("./lib/rules/no-qunit-push"),
        "no-qunit-stop": require("./lib/rules/no-qunit-stop"),
        "no-qunit-start-in-tests": require("./lib/rules/no-qunit-start-in-tests"),
        "no-reassign-log-callbacks": require("./lib/rules/no-reassign-log-callbacks"),
        "no-reset": require("./lib/rules/no-reset"),
        "no-setup-teardown": require("./lib/rules/no-setup-teardown"),
        "no-test-expect-argument": require("./lib/rules/no-test-expect-argument"),
        "no-throws-string": require("./lib/rules/no-throws-string"),
        "require-expect": require("./lib/rules/require-expect"),
        "resolve-async": require("./lib/rules/resolve-async")
    },
    configs: {
        two: {
            rules: {
                "qunit/no-async-test": "error",
                "qunit/no-global-assertions": "error",
                "qunit/no-global-expect": "error",
                "qunit/no-global-module-test": "error",
                "qunit/no-global-stop-start": "error",
                "qunit/no-init": "error",
                "qunit/no-jsdump": "error",
                "qunit/no-qunit-push": "error",
                "qunit/no-qunit-stop": "error",
                "qunit/no-reassign-log-callbacks": "error",
                "qunit/no-reset": "error",
                "qunit/no-setup-teardown": "error",
                "qunit/no-test-expect-argument": "error",
                "qunit/no-throws-string": "error"
            }
        },
        recommended: {
            rules: {
                "qunit/assert-args": "error",
                "qunit/literal-compare-order": "error",
                "qunit/no-async-in-loops": "error",
                "qunit/no-commented-tests": "error",
                "qunit/no-ok-equality": "error",
                "qunit/no-only": "error",
                "qunit/no-reassign-log-callbacks": "error",
                "qunit/no-reset": "error",
                "qunit/no-throws-string": "error",
                "qunit/require-expect": ["error", "except-simple"],
                "qunit/resolve-async": "error"
            }
        }
    }
};
