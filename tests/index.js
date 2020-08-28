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

                    const titleRegexp = new RegExp(`^# .+ \\(${fileName}\\)$`, "m");
                    assert.ok(fileContents.match(titleRegexp), "includes rule name in title header");
                });
            });
        });
    });
});
