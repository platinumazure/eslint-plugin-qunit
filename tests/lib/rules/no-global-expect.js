/**
 * @fileoverview Forbid the use of global expect.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-global-expect"),
    RuleTester = require("eslint").RuleTester,
    testUtils = require("../../testUtils");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2015,
        sourceType: "module"
    }
});

ruleTester.run("no-global-expect", rule, {
    valid: [
        testUtils.wrap("assert.expect(1);"),
        {
            code: testUtils.wrap("assert.expect(1);"),
            globals: { expect: true }
        },

        // Global overridden by local import/declaration.
        {
            code: `import expect from 'foo'; ${testUtils.wrap("expect(1);")}`,
            globals: { expect: true }
        },
        {
            code: `import { expect } from 'foo'; ${testUtils.wrap("expect(1);")}`,
            globals: { expect: true }
        },
        {
            code: `var expect = require('foo'); ${testUtils.wrap("expect(1);")}`,
            globals: { expect: true }
        },
        {
            code: `var expect = () => {}; ${testUtils.wrap("expect(1);")}`,
            globals: { expect: true }
        },
        {
            code: `function expect() {}; ${testUtils.wrap("expect(1);")}`,
            globals: { expect: true }
        }
    ],

    invalid: [
        {
            code: testUtils.wrap("expect(1)"),
            globals: { expect: true },
            errors: [{
                messageId: "unexpectedGlobalExpect",
                type: "CallExpression"
            }]
        }
    ]
});
