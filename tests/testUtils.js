/**
 * @fileoverview Utility functions used by one or more rules.
 * @author Ed Sanders
 */
"use strict";

exports.wrapInTest = function (assertionCode) {
    return `QUnit.test('test', function (assert) { ${assertionCode} });`;
};

exports.wrapInArrowTest = function (assertionCode) {
    return `QUnit.test('test', (assert) => { ${assertionCode} });`;
};
