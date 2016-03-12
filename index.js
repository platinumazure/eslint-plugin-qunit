"use strict";

module.exports = {
    rules: {
        "assert-args": require("./lib/rules/assert-args"),
        "literal-compare-order": require("./lib/rules/literal-compare-order"),
        "no-arrow-tests": require("./lib/rules/no-arrow-tests"),
        "no-assert-equal": require("./lib/rules/no-assert-equal"),
        "no-async-in-loops": require("./lib/rules/no-async-in-loops"),
        "no-commented-tests": require("./lib/rules/no-commented-tests"),
        "no-global-assertions": require("./lib/rules/no-global-assertions"),
        "no-ok-equality": require("./lib/rules/no-ok-equality"),
        "no-only": require("./lib/rules/no-only"),
        "resolve-async": require("./lib/rules/resolve-async"),
        "require-expect": require("./lib/rules/require-expect")
    },
    rulesConfig: {
        "assert-args": 1,
        "literal-compare-order": 0,
        "no-arrow-tests": 0,
        "no-assert-equal": 0,
        "no-async-in-loops": 1,
        "no-commented-tests": 0,
        "no-global-assertions": 0,
        "no-ok-equality": 1,
        "no-only": 1,
        "resolve-async": 2,
        "require-expect": 0
    }
};
