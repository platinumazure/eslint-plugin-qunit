/**
 * @fileoverview Forbid the use of assert.equal/assert.ok/assert.notOk and suggest other assertions.
 * @author ventuno
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const utils = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const GLOBAL_ERROR_MESSAGE_ID = "unexpectedGlobalLooseAssertion";
const LOCAL_ERROR_MESSAGE_ID = "unexpectedLocalLooseAssertion";
const DEFAULT_ASSERTIONS = ["equal", "ok", "notEqual", "notOk"];

const ERROR_MESSAGE_CONFIG = {
    equal: { unexpectedGlobalAssertionMessageId: GLOBAL_ERROR_MESSAGE_ID,
        unexpectedLocalAssertionMessageId: LOCAL_ERROR_MESSAGE_ID },
    ok: { unexpectedGlobalAssertionMessageId: GLOBAL_ERROR_MESSAGE_ID,
        unexpectedLocalAssertionMessageId: LOCAL_ERROR_MESSAGE_ID },
    notEqual: { unexpectedGlobalAssertionMessageId: GLOBAL_ERROR_MESSAGE_ID,
        unexpectedLocalAssertionMessageId: LOCAL_ERROR_MESSAGE_ID },
    notOk: { unexpectedGlobalAssertionMessageId: GLOBAL_ERROR_MESSAGE_ID,
        unexpectedLocalAssertionMessageId: LOCAL_ERROR_MESSAGE_ID }
};

function buildErrorMessage(disallowed) {
    const globalMessage = `Unexpected {{assertion}}. Use ${disallowed.join(", ")}.`;
    const localMessasge = `Unexpected {{assertVar}}.{{assertion}}. Use ${disallowed.map((ass) => `{{assertVar}}.${ass}`).join(", ")}.`;
    return {
        unexpectedGlobalAssertionMessage: globalMessage,
        unexpectedLocalAssertionMessage: localMessasge
    };
}

function parseOptions(options) {
    if (options[0]) {
        const assertions = [];
        const errorMessageConfig = {};
        options[0].forEach((assertion) => {
            if (typeof assertion === "string") {
                // Skip if rule was defined before.
                if (assertions.includes(assertion)) {
                    return;
                }
                assertions.push(assertion);
                errorMessageConfig[assertion] = ERROR_MESSAGE_CONFIG[assertion];
            } else {
                // Skip if rule was defined before.
                if (assertions.includes(assertion.disallowed)) {
                    return;
                }
                assertions.push(assertion.disallowed);
                errorMessageConfig[assertion.disallowed] = buildErrorMessage(assertion.recommended);
            }
        });
        return [assertions, errorMessageConfig];
    }
    return [DEFAULT_ASSERTIONS, ERROR_MESSAGE_CONFIG];
}

module.exports = {
    meta: {
        docs: {
            description: "forbid the use of assert.equal/assert.ok/assert.notEqual/assert.notOk (can be configured)",
            category: "Best Practices"
        },
        messages: {
            [GLOBAL_ERROR_MESSAGE_ID]: "Unexpected {{assertion}}. Use strictEqual, notStrictEqual, deepEqual, or propEqual.",
            [LOCAL_ERROR_MESSAGE_ID]: "Unexpected {{assertVar}}.{{assertion}}. Use {{assertVar}}.strictEqual, {{assertVar}}.notStrictEqual, {{assertVar}}.deepEqual, or {{assertVar}}.propEqual."
        },
        schema: [{
            type: "array",
            minItems: 1,
            items: {
                oneOf: [{
                    type: "object",
                    properties: {
                        disallowed: {
                            type: "string",
                            enum: DEFAULT_ASSERTIONS
                        },
                        recommended: {
                            type: "array",
                            items: {
                                type: "string",
                                minItems: 1
                            }
                        }
                    },
                    required: ["disallowed", "recommended"],
                    additionalProperties: false
                }, {
                    type: "string",
                    enum: DEFAULT_ASSERTIONS
                }]
            },
            uniqueItems: true
        }]
    },

    create: function (context) {
        const [assertions, errorMessageConfig] = parseOptions(context.options);
        return utils.createAssertionCheck(assertions, errorMessageConfig).call(this, context);
    }
};
