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

/**
 * Get list of named options from a JSON schema (used for rule schemas).
 * @param {Object|Array} jsonSchema - the JSON schema to check
 * @returns {String[]} list of named options
 */
function getAllNamedOptions(jsonSchema) {
    if (!jsonSchema) {
        return [];
    }

    if (Array.isArray(jsonSchema)) {
        return jsonSchema.flatMap(item => getAllNamedOptions(item));
    }

    if (jsonSchema.items) {
        return getAllNamedOptions(jsonSchema.items);
    }

    if (jsonSchema.properties) {
        return Object.keys(jsonSchema.properties);
    }

    return [];
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

                // eslint-disable-next-line complexity
                it("should have the right doc contents", function () {
                    const path = `./docs/rules/${ruleName}.md`;
                    const fileContents = fs.readFileSync(path, "utf8");
                    const lines = fileContents.split("\n");
                    const rule = rules[ruleName];

                    // First content should be title.
                    const description = rule.meta.docs.description;
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
                    if (rule.meta.fixable) {
                        expectedNotices.push("fixable");
                    } else {
                        unexpectedNotices.push("fixable");
                    }
                    if (rule.meta.hasSuggestions) {
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

                    // Check if the rule has configuration options.
                    if (
                        Array.isArray(rule.meta.schema) && rule.meta.schema.length > 0 ||
                        typeof rule.meta.schema === "object" && Object.keys(rule.meta.schema).length > 0
                    ) {
                        // Should have a configuration section header:
                        assert.ok(fileContents.includes("## Options"), "Should have an \"## Options\" section");

                        // Ensure all configuration options are mentioned.
                        for (const namedOption of getAllNamedOptions(rule.meta.schema)) {
                            assert.ok(fileContents.includes(namedOption), `Should mention the \`${namedOption}\` option`);
                        }
                    } else {
                        // Should NOT have any options/config section headers:
                        assert.notOk(fileContents.includes("# Options"), "Should not have an \"Options\" section");
                        assert.notOk(fileContents.includes("# Config"), "Should not have a \"Config\" section");
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
