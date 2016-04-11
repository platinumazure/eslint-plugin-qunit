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
        "no-negated-ok": require("./lib/rules/no-negated-ok"),
        "no-ok-equality": require("./lib/rules/no-ok-equality"),
        "no-only": require("./lib/rules/no-only"),
        "no-reassign-log-callbacks": require("./lib/rules/no-reassign-log-callbacks"),
        "no-reset": require("./lib/rules/no-reset"),
        "no-setup-teardown": require("./lib/rules/no-setup-teardown"),
        "resolve-async": require("./lib/rules/resolve-async"),
        "require-expect": require("./lib/rules/require-expect")
    },
    rulesConfig: {
        "assert-args": 1,
        "literal-compare-order": 0,
        "no-arrow-tests": 0,
        "no-assert-equal": 0,
        "no-async-in-loops": 1,
        "no-async-test": 0,
        "no-commented-tests": 0,
        "no-global-assertions": 0,
        "no-global-expect": 0,
        "no-global-module-test": 0,
        "no-global-stop-start": 0,
        "no-init": 0,
        "no-negated-ok": 0,
        "no-ok-equality": 1,
        "no-only": 1,
        "no-reassign-log-callbacks": 0,
        "no-reset": 0,
        "no-setup-teardown": 0,
        "resolve-async": 2,
        "require-expect": 0
    }
};
