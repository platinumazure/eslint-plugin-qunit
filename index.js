"use strict";

module.exports = {
    rules: {
        "no-async-in-loops": require("./lib/rules/no-async-in-loops"),
        "no-ok-equality": require("./lib/rules/no-ok-equality"),
        "resolve-async": require("./lib/rules/resolve-async")
    },
    rulesConfig: {
        "no-async-in-loops": 1,
        "resolve-async": 2
    }
};
