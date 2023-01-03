"use strict";

const fs = require("fs");

/** @type {import('eslint-remote-tester').Config} */
module.exports = {
    /** Repositories to scan */
    repositories: [
        // A few dozen top repositories using QUnit or this plugin.
        "balanced/balanced-dashboard",
        "emberjs/ember.js",
        "getsentry/sentry-javascript",
        "glimmerjs/glimmer-vm",
        "hashicorp/boundary-ui",
        "hotwired/stimulus",
        "jashkenas/backbone",
        "jquery/jquery",
        "js-cookie/js-cookie",
        "l10n-tw/canvas-lms",
        "mrdoob/three.js",
        "rust-lang/crates.io",
        "simonihmig/ember-responsive-image",
        "videojs/video.js"
    ],

    /** Extensions of files under scanning */
    extensions: ["js", "mjs", "cjs", "ts", "mts", "cts"],

    /** Optional boolean flag used to enable caching of cloned repositories. For CIs it's ideal to disable caching. Defaults to true. */
    cache: false,

    /** ESLint configuration */
    eslintrc: {
        plugins: ["qunit"],

        // Enable all of our rules.
        rules: Object.fromEntries(
            fs
                .readdirSync(`${__dirname}/lib/rules`)
                .map((filename) => `qunit/${filename.replace(/\.js$/, "")}`)
                .map((ruleName) => [ruleName, "error"])
        ),

        overrides: [
            {
                files: ["*.ts", "*.mts", "*.cts"],
                parser: "@typescript-eslint/parser"
            }
        ]
    }
};
