/**
 * @fileoverview Unit tests for the package index.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const assert = require("chai").assert,
    { rules, configs } = require("../index"),
    fs = require("fs"),
    path = require("path");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const MESSAGES = {
    fixable: "🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.",
    configRecommended: "✅ The `\"extends\": \"plugin:qunit/recommended\"` property in a configuration file enables this rule.",
    hasSuggestions: "💡 Some problems reported by this rule are manually fixable by editor [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)."
};

function toSentenceCase(str) {
    return str.replace(
        /^\w/,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
        }
    );
}

const ruleNames = fs.readdirSync("./lib/rules").map(rawFileName => path.basename(rawFileName, ".js"));

describe("index.js", function () {
    describe("rules", function () {
        for (const ruleName of ruleNames) {
            describe(ruleName, function () {
                it("should appear in rule exports", function () {
                    assert.property(rules, ruleName, `Rule export for ${ruleName} not present`);
                });

                it("should appear in tests", function (done) {
                    const path = `./tests/lib/rules/${ruleName}.js`;

                    fs.access(path, function (err) {
                        assert.notOk(err, `tests/lib/rules/${ruleName}.js should exist`);
                        done();
                    });
                });

                it("should appear in docs", function (done) {
                    const path = `./docs/rules/${ruleName}.md`;

                    fs.access(path, function (err) {
                        assert.notOk(err, `docs/rules/${ruleName}.md should exist`);
                        done();
                    });
                });

                it("should have the right doc contents", function () {
                    const path = `./docs/rules/${ruleName}.md`;
                    const fileContents = fs.readFileSync(path, "utf8");
                    const lines = fileContents.split("\n");

                    // First content should be title.
                    const description = rules[ruleName].meta.docs.description;
                    const expectedTitle = `# ${toSentenceCase(description)} (${ruleName})`;
                    assert.equal(lines[0], expectedTitle, "includes the rule description and name in title");

                    // Decide which notices should be shown at the top of the doc.
                    const expectedNotices = [];
                    const unexpectedNotices = [];
                    if (configs.recommended.rules[`qunit/${ruleName}`]) {
                        expectedNotices.push("configRecommended");
                    } else {
                        unexpectedNotices.push("configRecommended");
                    }
                    if (rules[ruleName].meta.fixable) {
                        expectedNotices.push("fixable");
                    } else {
                        unexpectedNotices.push("fixable");
                    }
                    if (rules[ruleName].meta.hasSuggestions) {
                        expectedNotices.push("hasSuggestions");
                    } else {
                        unexpectedNotices.push("hasSuggestions");
                    }

                    // Ensure that expected notices are present in the correct order.
                    let currentLineNumber = 1;
                    for (const expectedNotice of expectedNotices) {
                        assert.equal(lines[currentLineNumber], "", `has blank line before ${expectedNotice} notice`);
                        assert.equal(lines[currentLineNumber + 1], MESSAGES[expectedNotice], `includes ${expectedNotice} notice`);
                        currentLineNumber += 2;
                    }

                    // Ensure that unexpected notices are not present.
                    for (const unexpectedNotice of unexpectedNotices) {
                        assert.ok(
                            !fileContents.includes(MESSAGES[unexpectedNotice]),
                            `does not include unexpected ${unexpectedNotice} notice`
                        );
                    }
                });
            });
        }
    });

    describe("configs", function () {
        // eslint-disable-next-line mocha/no-setup-in-describe -- rule doesn't like function calls like `Object.entries()`
        for (const [configName, config] of Object.entries(configs)) {
            describe(configName, function () {
                it("has the right plugins", function () {
                    assert.deepStrictEqual(config.plugins, ["qunit"]);
                });
            });
        }
    });
});
