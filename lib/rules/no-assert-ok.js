/**
 * @fileoverview Forbid the use of assert.ok/assert.notOk and suggest other assertions.
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

const GLOBAL_ERROR_MESSAGE_ID = "unexpectedGlobalOkNotOk";
const LOCAL_ERROR_MESSAGE_ID = "unexpectedLocalOkNotOk";
const assertions = ["ok", "notOk"];

module.exports = {
    meta: {
        docs: {
            description: "forbid the use of assert.ok/assert.notOk",
            category: "Best Practices"
        },
        messages: {
            [GLOBAL_ERROR_MESSAGE_ID]: "Unexpected {{assertion}}. Use strictEqual, deepEqual, or propEqual.",
            [LOCAL_ERROR_MESSAGE_ID]: "Unexpected {{assertVar}}.{{assertion}}. Use {{assertVar}}.strictEqual, {{assertVar}}.deepEqual, or {{assertVar}}.propEqual."
        },
        schema: []
    },

    create: utils.createAssertionCheck(assertions, GLOBAL_ERROR_MESSAGE_ID, LOCAL_ERROR_MESSAGE_ID)
};
