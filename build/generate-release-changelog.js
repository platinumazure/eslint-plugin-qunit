/**
 * Generates a changelog for a new release.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var shelljs = require("shelljs"),
    semver = require("semver");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function execSilent(command) {
    return shelljs.exec(command, { silent: true }).stdout;
}

//------------------------------------------------------------------------------
// Script
//------------------------------------------------------------------------------

var lastTwoTags = execSilent("git tag")
    .trim()
    .split("\n")
    .filter(semver.valid)
    .sort(semver.compare)
    .slice(-2);

var releaseCommitMessage = /^\* \d+\.\d+\.\d+/;

var logs = execSilent("git log --no-merges --pretty=format:\"* %s (%an)\" " + lastTwoTags.join(".."))
    .split(/\n/g)
    .filter(function (line) {
        return !releaseCommitMessage.test(line);
    });

// Output header first
("### " + semver.clean(lastTwoTags[1]) + "\n").to("CHANGELOG.tmp");

// Output logs
logs.join("\n").concat("\n\n").toEnd("CHANGELOG.tmp");

shelljs.cat("CHANGELOG.tmp", "CHANGELOG.md").to("CHANGELOG.md.tmp");
shelljs.rm("CHANGELOG.tmp");
shelljs.mv("CHANGELOG.md.tmp", "CHANGELOG.md");

// Stage changelog for commit
execSilent("git add CHANGELOG.md");

// Commit changelog
execSilent("git commit --amend --no-edit");
