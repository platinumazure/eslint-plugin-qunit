/**
 * @fileoverview Unit tests for the README.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const assert = require("chai").assert,
    fs = require("fs"),
    path = require("path");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("README", function () {
    const ruleGroupRegex = /## Available Rules[\s\S]*(?:\n(?=##)|$)/,
        ruleRegex = /^\* \[([a-z-]+)]\(docs\/rules\/\1\.md\)$/gm;

    let fileContents,
        availableRules;

    before(function (done) {
        fs.readFile("./README.md", "utf8", function (err, contents) {
            if (err) throw err;

            fileContents = contents;

            fs.readdir("./lib/rules", function (err, files) {
                if (err) throw err;

                availableRules = files.map(function (file) {
                    return path.basename(file, ".js");
                });

                done();
            });
        });
    });

    it("should find the rules", function () {
        const foundRules = [];
        let match = ruleGroupRegex.exec(fileContents);

        assert.ok(match, "Rule section should be present");

        const ruleSection = match[0];

        while ((match = ruleRegex.exec(ruleSection)) !== null) {
            foundRules.push(match[1]);
        }

        assert.deepEqual(foundRules, availableRules, "Rules in README should match available rules");
    });
});
