"use strict";

const js = require("@eslint/js");
const { FlatCompat } = require("@eslint/eslintrc");
const eslintPluginMarkdown = require("eslint-plugin-markdown");
const eslintPluginEslintPluginAll = require("eslint-plugin-eslint-plugin/configs/all");
const globals = require("globals");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended
});

module.exports = [
    ...compat.extends(
        "plugin:node/recommended",
        "plugin:eslint-comments/recommended",
        "plugin:unicorn/recommended"
    ),

    eslintPluginEslintPluginAll,

    // Apply mocha config only to tests.
    ...compat.extends("plugin:mocha/recommended").map(config => ({ ...config,
        files: ["tests/**/*.js"] })),

    {
        languageOptions: {
            "sourceType": "script",
            "ecmaVersion": "latest",
            "globals": globals.node
        }
    },
    {
        "rules":
        {
            "array-bracket-spacing": ["error", "never"],
            "block-spacing": ["error", "always"],
            "brace-style": ["error", "1tbs"],
            "camelcase": ["error", { "properties": "always" }],
            "comma-dangle": ["error", "never"],
            "comma-spacing": ["error", { "before": false,
                "after": true }],
            "comma-style": ["error", "last"],
            "complexity": ["error", 10],
            "computed-property-spacing": ["error", "never"],
            "consistent-return": "error",
            "consistent-this": ["error", "self"],
            "curly": ["error", "multi-line"],
            "default-case": "error",
            "dot-location": ["error", "property"],
            "dot-notation": "error",
            "eol-last": "error",
            "eqeqeq": "error",
            "func-call-spacing": "error",
            "func-style": ["error", "declaration"],
            "guard-for-in": "error",
            "indent": ["error", 4, { "SwitchCase": 1,
                "VariableDeclarator": 1 }],
            "key-spacing": ["error", { "beforeColon": false,
                "afterColon": true }],
            "keyword-spacing": ["error", { "before": true,
                "after": true }],
            "linebreak-style": ["error", "unix"],
            "lines-around-comment": [
                "error",
                {
                    "beforeBlockComment": false,
                    "afterBlockComment": false,
                    "beforeLineComment": true,
                    "afterLineComment": false,
                    "allowBlockStart": true,
                    "allowBlockEnd": true,
                    "allowObjectStart": true,
                    "allowObjectEnd": true,
                    "allowArrayStart": true,
                    "allowArrayEnd": true
                }
            ],
            "max-depth": ["error", 5],
            "new-cap": ["error", { "newIsCap": true,
                "capIsNew": true }],
            "new-parens": "error",
            "no-array-constructor": "error",
            "no-caller": "error",
            "no-catch-shadow": "error",
            "no-cond-assign": ["error", "except-parens"],
            "no-console": "error",
            "no-const-assign": "error",
            "no-constant-condition": "error",
            "no-control-regex": "error",
            "no-debugger": "error",
            "no-delete-var": "error",
            "no-dupe-args": "error",
            "no-dupe-keys": "error",
            "no-duplicate-case": "error",
            "no-else-return": "error",
            "no-empty": "error",
            "no-empty-character-class": "error",
            "no-empty-function": "error",
            "no-eval": "error",
            "no-ex-assign": "error",
            "no-extend-native": "error",
            "no-extra-boolean-cast": "error",
            "no-extra-parens": "error",
            "no-extra-semi": "error",
            "no-fallthrough": "error",
            "no-floating-decimal": "error",
            "no-func-assign": "error",
            "no-implied-eval": "error",
            "no-invalid-regexp": "error",
            "no-irregular-whitespace": "error",
            "no-labels": "error",
            "no-lone-blocks": "error",
            "no-lonely-if": "error",
            "no-loop-func": "error",
            "no-mixed-requires": "error",
            "no-mixed-spaces-and-tabs": "error",
            "no-multi-spaces": ["error", { "ignoreEOLComments": true }],
            "no-multi-str": "error",
            "no-multiple-empty-lines": "error",
            "no-unsafe-negation": "error",
            "no-nested-ternary": "error",
            "no-new-func": "error",
            "no-new-object": "error",
            "no-new-require": "error",
            "no-new-wrappers": "error",
            "no-octal": "error",
            "no-octal-escape": "error",
            "no-path-concat": "error",
            "no-process-exit": "error",
            "no-redeclare": "error",
            "no-return-assign": "error",
            "no-regex-spaces": "error",
            "no-self-assign": "error",
            "no-self-compare": "error",
            "no-sequences": "error",
            "no-sparse-arrays": "error",
            "no-template-curly-in-string": "error",
            "no-throw-literal": "error",
            "no-trailing-spaces": "error",
            "no-undef": "error",
            "no-undefined": "error",
            "no-underscore-dangle": "error",
            "no-unexpected-multiline": "error",
            "no-unmodified-loop-condition": "error",
            "no-unneeded-ternary": "error",
            "no-unreachable": "error",
            "no-unsafe-finally": "error",
            "no-unused-expressions": "error",
            "no-unused-vars": "error",
            "no-use-before-define": "error",
            "no-useless-call": "error",
            "no-useless-concat": "error",
            "no-useless-escape": "error",
            "no-useless-return": "error",
            "no-var": "error",
            "no-warning-comments": "error",
            "no-whitespace-before-property": "error",
            "no-with": "error",
            "object-curly-newline": ["error", { "consistent": true }],
            "object-curly-spacing": ["error", "always"],
            "object-property-newline": "error",
            "operator-assignment": ["error", "always"],
            "operator-linebreak": ["error", "after"],
            "padded-blocks": ["error", "never"],
            "prefer-const": "error",
            "prefer-template": "error",
            "quote-props": ["error", "consistent"],
            "quotes": ["error", "double"],
            "radix": "error",
            "semi": ["error", "always"],
            "semi-spacing": ["error", { "before": false,
                "after": true }],
            "space-before-blocks": ["error", "always"],
            "space-before-function-paren": ["error", { "anonymous": "always",
                "named": "never" }],
            "space-in-parens": ["error", "never"],
            "space-infix-ops": "error",
            "space-unary-ops": ["error", { "words": true,
                "nonwords": false }],
            "spaced-comment": ["error", "always", { "exceptions": ["-"] }],
            "strict": ["error", "global"],
            "template-curly-spacing": ["error", "never"],
            "use-isnan": "error",
            "valid-jsdoc": ["error", {
                "prefer": {
                    "return": "returns"
                }
            }],
            "valid-typeof": "error",
            "wrap-iife": "error",
            "yoda": ["error", "never"],

            // eslint-plugin-eslint-plugin
            "eslint-plugin/meta-property-ordering": ["error", [
                "type", "docs", "fixable", "messages", "schema", "deprecated", "replacedBy"
            ]],
            "eslint-plugin/require-meta-docs-url": ["error", {
                "pattern": "https://github.com/platinumazure/eslint-plugin-qunit/blob/master/docs/rules/{{name}}.md"
            }],

            // eslint-plugin-node
            "node/no-missing-require": ["error", {
                "allowModules": ["@typescript-eslint/parser"]
            }],

            // eslint-plugin-unicorn
            "unicorn/consistent-function-scoping": "off",
            "unicorn/empty-brace-spaces": "off",
            "unicorn/filename-case": "off",
            "unicorn/no-array-reduce": "off",
            "unicorn/no-null": "off",
            // eslint-disable-next-line no-warning-comments
            "unicorn/prefer-at": "off", // TODO: enable once we raise Node requirement to v16.6.0
            "unicorn/prefer-module": "off",
            "unicorn/prevent-abbreviations": "off"
        }
    },
    {
        files: ["**/*.md"],
        plugins: { markdown: eslintPluginMarkdown },
        processor: "markdown/markdown"
    },
    {
        "files": ["**/*.md/*.js", "**/*.md/*.javascript"],
        "languageOptions": {
            "parserOptions": {
                "sourceType": "module"
            }
        },
        "rules": {
            "brace-style": "off",
            "eqeqeq": "off",
            "guard-for-in": "off",
            "no-constant-condition": "off",
            "no-empty-function": "off",
            "no-undef": "off",
            "no-unused-expressions": "off",
            "no-unused-vars": "off",
            "no-var": "off",
            "quotes": "off",
            "space-before-function-paren": "off",
            "strict": "off"
        }
    }
];
