"use strict";

module.exports = {
    rules: {
        "no-async-in-loops": require("./lib/rules/no-async-in-loops"),
        "no-commented-tests": require("./lib/rules/no-commented-tests"),
        "no-ok-equality": require("./lib/rules/no-ok-equality"),
        "resolve-async": require("./lib/rules/resolve-async")
    },
    rulesConfig: {
        "no-async-in-loops": 1,
        "no-commented-tests": 0,
        "resolve-async": 2
    }
};
