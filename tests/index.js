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
    fs = require("fs");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("index.js", function () {
    let ruleFileNames;

    before(function (done) {
        fs.readdir("lib/rules", function (err, files) {
            if (err) throw err;
            ruleFileNames = files.map(function (rawFileName) {
                return rawFileName.slice(0, -3);
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

                it("should appear in docs", function (done) {
                    const path = `./docs/rules/${fileName}.md`;

                    fs.access(path, function (err) {
                        assert.notOk(err, `docs/rules/${fileName}.md should exist`);
                        done();
                    });
                });
            });
        });
    });
});
