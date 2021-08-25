"use strict";

const fs = require("fs");
const path = require("path");
const { rules, configs } = require("../");

const pathReadme = path.resolve(__dirname, "../README.md");
const readmeContent = fs.readFileSync(pathReadme, "utf8");
const rulesTablePlaceholder = /<!--RULES_TABLE_START-->[\S\s]*<!--RULES_TABLE_END-->/;
const deprecatedRulesTablePlaceholder = /<!--DEPRECATED_RULES_TABLE_START-->[\S\s]*<!--DEPRECATED_RULES_TABLE_END-->/;

// Config/preset/fixable emojis.
const EMOJI_RECOMMENDED = "✅";
const EMOJI_FIXABLE = "🔧";
const EMOJI_SUGGESTIONS = "💡";

// Generate rule table contents.
const rulesTableContent = Object.keys(rules)
    .filter(ruleName => !rules[ruleName].meta.deprecated)
    .sort()
    .map((ruleName) => {
        // Check which emojis to show for this rule.
        const isRecommended = Object.prototype.hasOwnProperty.call(configs.recommended.rules, `qunit/${ruleName}`);
        const isFixable = rules[ruleName].meta.fixable;
        const hasSuggestions = rules[ruleName].meta.hasSuggestions;
        const url = `./docs/rules/${ruleName}.md`;
        const link = `[${ruleName}](${url})`;
        const description = rules[ruleName].meta.docs.description;
        return `| ${link} | ${description} | ${isRecommended ? EMOJI_RECOMMENDED : ""} | ${isFixable ? EMOJI_FIXABLE : ""} | ${hasSuggestions ? EMOJI_SUGGESTIONS : ""} |`;
    })
    .join("\n");

// Generate deprecated rule table contents.
const deprecatedRulesTableContent = Object.keys(rules)
    .filter(ruleName => rules[ruleName].meta.deprecated)
    .sort()
    .map((ruleName) => {
        const url = `./docs/rules/${ruleName}.md`;
        const link = `[${ruleName}](${url})`;

        const replacedBy = rules[ruleName].meta.replacedBy || [];

        const replacedByLinks = replacedBy
            .map(replacementName => {
                const simpleName = replacementName.replace(/^qunit\//, "");

                const replaceUrl = `./docs/rules/${simpleName}.md`;
                return `[${simpleName}](${replaceUrl})`;
            });

        return `| ${link} | ${replacedByLinks.join(", ")}`;
    })
    .join("\n");

fs.writeFileSync(
    pathReadme,
    readmeContent
        .replace(
            rulesTablePlaceholder,
            `<!--RULES_TABLE_START-->\n\n| Name | Description | ${EMOJI_RECOMMENDED} | ${EMOJI_FIXABLE} | ${EMOJI_SUGGESTIONS} |\n|:--------|:--------|:---|:---|:---|\n${rulesTableContent}\n\n<!--RULES_TABLE_END-->`
        )
        .replace(
            deprecatedRulesTablePlaceholder,
            `<!--DEPRECATED_RULES_TABLE_START-->\n\n| Name | Replaced By |\n|:-----|:------------|\n${deprecatedRulesTableContent}\n\n<!--DEPRECATED_RULES_TABLE_END-->`
        )
);
