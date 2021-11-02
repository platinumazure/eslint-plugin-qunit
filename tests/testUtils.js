/**
 * @fileoverview Utility functions used by one or more rules.
 * @author Ed Sanders
 */
"use strict";

exports.wrap = function (assertionCode) {
    return `QUnit.test('test', function (assert) { ${assertionCode} });`;
};

exports.wrapArrow = function (assertionCode) {
    return `QUnit.test('test', (assert) => { ${assertionCode} });`;
};
