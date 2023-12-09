"use strict";

const fs = require("node:fs");
const { basename, extname } = require("node:path");

/** @type {import('eslint-remote-tester').Config} */
module.exports = {
    /** Repositories to scan */
    repositories: [
        // A few dozen top repositories using QUnit or this plugin.
        "DevExpress/DevExtreme",
        "adopted-ember-addons/ember-data-model-fragments",
        "balanced/balanced-dashboard",
        "ember-intl/ember-intl",
        "emberjs/ember.js",
        "getsentry/sentry-javascript",
        "glimmerjs/glimmer-vm",
        "hashicorp/boundary-ui",
        "hotwired/stimulus",
        "jashkenas/backbone",
        "jquery/jquery",
        "js-cookie/js-cookie",
        "l10n-tw/canvas-lms",
        "rust-lang/crates.io",
        "simonihmig/ember-responsive-image",
        "videojs/video.js",
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
                .map(
                    (filename) =>
                        `qunit/${basename(filename, extname(filename))}`,
                )
                .map((ruleName) => [ruleName, "error"]),
        ),

        overrides: [
            {
                files: ["*.ts", "*.mts", "*.cts"],
                parser: "@typescript-eslint/parser",
            },
        ],
    },
};
