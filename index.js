"use strict";

module.exports = {
    rules: {
        "no-assert-equal": require("./lib/rules/no-assert-equal"),
        "no-async-in-loops": require("./lib/rules/no-async-in-loops"),
        "no-commented-tests": require("./lib/rules/no-commented-tests"),
        "no-ok-equality": require("./lib/rules/no-ok-equality"),
        "resolve-async": require("./lib/rules/resolve-async")
    },
    rulesConfig: {
        "no-assert-equal": 0,
        "no-async-in-loops": 1,
        "no-commented-tests": 0,
        "no-ok-equality": 1,
        "resolve-async": 2
    }
};
