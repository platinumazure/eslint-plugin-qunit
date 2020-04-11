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
const DEFAULT_ASSERTIONS = ["equal", "ok", "notOk"];

module.exports = {
    meta: {
        docs: {
            description: "forbid the use of assert.equal/assert.ok/assert.notOk (can be configured)",
            category: "Best Practices"
        },
        messages: {
            [GLOBAL_ERROR_MESSAGE_ID]: "Unexpected {{assertion}}. Use strictEqual, deepEqual, or propEqual.",
            [LOCAL_ERROR_MESSAGE_ID]: "Unexpected {{assertVar}}.{{assertion}}. Use {{assertVar}}.strictEqual, {{assertVar}}.deepEqual, or {{assertVar}}.propEqual."
        },
        schema: [{
            type: "array",
            minItems: 1,
            items: { enum: DEFAULT_ASSERTIONS },
            uniqueItems: true
        }]
    },

    create: function (context) {
        const assertions = context.options[0] || DEFAULT_ASSERTIONS;
        return utils.createAssertionCheck(assertions, "unexpectedGlobalLooseAssertion", "unexpectedLocalLooseAssertion").call(this, context);
    }
};
