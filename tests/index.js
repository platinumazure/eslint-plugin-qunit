/**
 * @fileoverview Unit tests for the package index.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var assert = require("chai").assert,
    index = require("../index"),
    fs = require("fs");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("index.js", function () {
    var ruleFileNames;

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
                    assert.property(index.rules, fileName, "Rule export for " + fileName + " not present");
                });

                it("should appear in rulesConfig", function () {
                    assert.property(index.rulesConfig, fileName, "Rule config for " + fileName + " not present");
                    assert.include(["number", "array"], typeof index.rulesConfig[fileName], "Rule config for " + fileName + " should be number or array");
                });
            });
        });
    });
});
