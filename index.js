"use strict";

module.exports = {
    rules: {
        "assert-args": require("./lib/rules/assert-args"),
        "literal-compare-order": require("./lib/rules/literal-compare-order"),
        "no-arrow-tests": require("./lib/rules/no-arrow-tests"),
        "no-assert-equal": require("./lib/rules/no-assert-equal"),
        "no-async-in-loops": require("./lib/rules/no-async-in-loops"),
        "no-async-test": require("./lib/rules/no-async-test"),
        "no-commented-tests": require("./lib/rules/no-commented-tests"),
        "no-global-assertions": require("./lib/rules/no-global-assertions"),
        "no-global-expect": require("./lib/rules/no-global-expect"),
        "no-global-module-test": require("./lib/rules/no-global-module-test"),
        "no-global-stop-start": require("./lib/rules/no-global-stop-start"),
        "no-init": require("./lib/rules/no-init"),
        "no-jsdump": require("./lib/rules/no-jsdump"),
        "no-negated-ok": require("./lib/rules/no-negated-ok"),
        "no-ok-equality": require("./lib/rules/no-ok-equality"),
        "no-only": require("./lib/rules/no-only"),
        "no-qunit-push": require("./lib/rules/no-qunit-push"),
        "no-qunit-stop": require("./lib/rules/no-qunit-stop"),
        "no-reassign-log-callbacks": require("./lib/rules/no-reassign-log-callbacks"),
        "no-reset": require("./lib/rules/no-reset"),
        "no-setup-teardown": require("./lib/rules/no-setup-teardown"),
        "resolve-async": require("./lib/rules/resolve-async"),
        "require-expect": require("./lib/rules/require-expect")
    }
};
