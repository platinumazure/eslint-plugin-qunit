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

const FIXABLE_MSG =
    ":wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.";

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
                    const titleRegexp = new RegExp(`^# .+ \\(${fileName}\\)$`);
                    assert.ok(titleRegexp.test(lines[0]), "includes rule name in title header");

                    // Second content should be fixable notice if applicable.
                    if (index.rules[fileName].meta.fixable) {
                        assert.equal(lines[1], "", "has blank line between title and fixable notice");
                        assert.equal(lines[2], FIXABLE_MSG, "includes fixable notice");
                        assert.equal(lines[3], "", "has blank line after fixable notice");
                    } else {
                        assert.ok(
                            !fileContents.includes(FIXABLE_MSG),
                            "does not include fixable notice"
                        );
                    }
                });
            });
        });
    });
});
