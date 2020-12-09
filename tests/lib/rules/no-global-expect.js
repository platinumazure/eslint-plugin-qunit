/**
 * @fileoverview Forbid the use of global expect.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-global-expect"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function wrap(code) {
    return `QUnit.test('a test', function (assert) { ${code} });`;
}

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
        wrap("assert.expect(1);"),
        {
            code: wrap("assert.expect(1);"),
            globals: { expect: true }
        },

        // Global overridden by local import/declaration.
        {
            code: `import expect from 'foo'; ${wrap("expect(1);")}`,
            globals: { expect: true }
        },
        {
            code: `import { expect } from 'foo'; ${wrap("expect(1);")}`,
            globals: { expect: true }
        },
        {
            code: `var expect = require('foo'); ${wrap("expect(1);")}`,
            globals: { expect: true }
        },
        {
            code: `var expect = () => {}; ${wrap("expect(1);")}`,
            globals: { expect: true }
        },
        {
            code: `function expect() {}; ${wrap("expect(1);")}`,
            globals: { expect: true }
        }
    ],

    invalid: [
        {
            code: wrap("expect(1)"),
            errors: [{
                messageId: "unexpectedGlobalExpect",
                type: "CallExpression"
            }],
            globals: { expect: true }
        }
    ]
});
