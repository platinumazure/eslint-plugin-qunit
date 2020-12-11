/**
 * @fileoverview Unit tests for the package index.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const assert = require("chai").assert,
    index = require("../index"),
    fs = require("fs"),
    path = require("path");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const MESSAGES = {
    fixable: ":wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.",
    configRecommended: ":white_check_mark: The `\"extends\": \"plugin:qunit/recommended\"` property in a configuration file enables this rule.",
    configTwo: ":two: The `\"extends\": \"plugin:qunit/two\"` property in a configuration file enables this rule."
};

function toSentenceCase(str) {
    return str.replace(
        /^\w/,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

describe("index.js", function () {
    let ruleFileNames;

    before(function (done) {
        fs.readdir("./lib/rules", function (err, files) {
            if (err) throw err;
            ruleFileNames = files.map(function (rawFileName) {
                return path.basename(rawFileName, ".js");
            });
            done();
        });
    });

    it("rules", function () {
        ruleFileNames.forEach(function (fileName) {
            describe(fileName, function () {
                it("should appear in rule exports", function () {
                    assert.property(index.rules, fileName, `Rule export for ${fileName} not present`);
                });

                it("should appear in tests", function (done) {
                    const path = `./tests/lib/rules/${fileName}.js`;

                    fs.access(path, function (err) {
                        assert.notOk(err, `tests/lib/rules/${fileName}.js should exist`);
                        done();
                    });
                });

                it("should appear in docs", function (done) {
                    const path = `./docs/rules/${fileName}.md`;

                    fs.access(path, function (err) {
                        assert.notOk(err, `docs/rules/${fileName}.md should exist`);
                        done();
                    });
                });

                it("should have the right doc contents", function () {
                    const path = `./docs/rules/${fileName}.md`;
                    const fileContents = fs.readFileSync(path, "utf8");
                    const lines = fileContents.split("\n");

                    // First content should be title.
                    const description = index.rules[fileName].meta.docs.description;
                    const expectedTitle = `# ${toSentenceCase(description)} (${fileName})`;
                    assert.equal(lines[0], expectedTitle, "includes the rule description and name in title");

                    // Decide which notices should be shown at the top of the doc.
                    const expectedNotices = [];
                    const unexpectedNotices = [];
                    if (index.configs.recommended.rules[`qunit/${fileName}`]) {
                        expectedNotices.push("configRecommended");
                    } else {
                        unexpectedNotices.push("configRecommended");
                    }
                    if (index.configs.two.rules[`qunit/${fileName}`]) {
                        expectedNotices.push("configTwo");
                    } else {
                        unexpectedNotices.push("configTwo");
                    }
                    if (index.rules[fileName].meta.fixable) {
                        expectedNotices.push("fixable");
                    } else {
                        unexpectedNotices.push("fixable");
                    }

                    // Ensure that expected notices are present in the correct order.
                    let currentLineNumber = 1;
                    expectedNotices.forEach(expectedNotice => {
                        assert.equal(lines[currentLineNumber], "", `has blank line before ${expectedNotice} notice`);
                        assert.equal(lines[currentLineNumber + 1], MESSAGES[expectedNotice], `includes ${expectedNotice} notice`);
                        currentLineNumber += 2;
                    });

                    // Ensure that unexpected notices are not present.
                    unexpectedNotices.forEach(unexpectedNotice => {
                        assert.ok(
                            !fileContents.includes(MESSAGES[unexpectedNotice]),
                            `does not include unexpected ${unexpectedNotice} notice`
                        );
                    });
                });
            });
        });
    });

    describe("configs", function () {
        for (const configName of Object.keys(index.configs)) {
            const config = index.configs[configName];
            describe(configName, function () {
                it("has the right plugins", function () {
                    assert.deepStrictEqual(config.plugins, ["qunit"]);
                });
            });
        }
    });
});
