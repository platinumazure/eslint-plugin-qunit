"use strict";

const fs = require("fs");
const path = require("path");
const { rules, configs } = require("../");

const pathReadme = path.resolve(__dirname, "../README.md");
const readmeContent = fs.readFileSync(pathReadme, "utf8");
const tablePlaceholder = /<!--RULES_TABLE_START-->[\S\s]*<!--RULES_TABLE_END-->/;

// Config/preset/fixable emojis.
const EMOJI_RECOMMENDED = ":white_check_mark:";
const EMOJI_TWO = ":two:";
const EMOJI_FIXABLE = ":wrench:";

// Generate rule table contents.
const rulesTableContent = Object.keys(rules)
    .sort()
    .map((ruleName) => {
        // Check which emojis to show for this rule.
        const isRecommended = Object.prototype.hasOwnProperty.call(configs.recommended.rules, `qunit/${ruleName}`);
        const isTwo = Object.prototype.hasOwnProperty.call(configs.two.rules, `qunit/${ruleName}`);
        const isFixable = rules[ruleName].meta.fixable;

        const emojis = [
            isRecommended ? EMOJI_RECOMMENDED : "",
            isTwo ? EMOJI_TWO : "",
            isFixable ? EMOJI_FIXABLE : ""
        ].join("");

        const url = `./docs/rules/${ruleName}.md`;
        const link = `[${ruleName}](${url})`;

        const description = rules[ruleName].meta.docs.description;

        return `| ${emojis} | ${link} | ${description}|`;
    })
    .join("\n");

fs.writeFileSync(
    pathReadme,
    readmeContent.replace(
        tablePlaceholder,
        `<!--RULES_TABLE_START-->\n\n|    | Name | Description |\n|:---|:--------|:--------|\n${rulesTableContent}\n\n<!--RULES_TABLE_END-->`
    )
);
