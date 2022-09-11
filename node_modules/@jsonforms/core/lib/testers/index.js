"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
  The MIT License

  Copyright (c) 2018 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
var isEmpty_1 = __importDefault(require("lodash/isEmpty"));
var get_1 = __importDefault(require("lodash/get"));
var endsWith_1 = __importDefault(require("lodash/endsWith"));
var last_1 = __importDefault(require("lodash/last"));
var isArray_1 = __importDefault(require("lodash/isArray"));
var reduce_1 = __importDefault(require("lodash/reduce"));
var toPairs_1 = __importDefault(require("lodash/toPairs"));
var has_1 = __importDefault(require("lodash/has"));
var includes_1 = __importDefault(require("lodash/includes"));
var resolvers_1 = require("../util/resolvers");
/**
 * Constant that indicates that a tester is not capable of handling
 * a combination of schema/data.
 * @type {number}
 */
exports.NOT_APPLICABLE = -1;
exports.isControl = function (uischema) {
    return !isEmpty_1.default(uischema) &&
        uischema.scope !== undefined &&
        uischema.scope !== undefined;
};
/**
 * Only applicable for Controls.
 *
 * This function checks whether the given UI schema is of type Control
 * and if so, resolves the sub-schema referenced by the control and applies
 * the given predicate
 *
 * @param {(JsonSchema) => boolean} predicate the predicate that should be
 *        applied to the resolved sub-schema
 */
exports.schemaMatches = function (predicate) { return function (uischema, schema) {
    if (isEmpty_1.default(uischema) || !exports.isControl(uischema)) {
        return false;
    }
    var schemaPath = uischema.scope;
    if (isEmpty_1.default(schemaPath)) {
        return false;
    }
    var currentDataSchema = resolvers_1.resolveSchema(schema, schemaPath);
    while (!isEmpty_1.default(currentDataSchema) && !isEmpty_1.default(currentDataSchema.$ref)) {
        currentDataSchema = resolvers_1.resolveSchema(schema, currentDataSchema.$ref);
    }
    if (currentDataSchema === undefined) {
        return false;
    }
    return predicate(currentDataSchema);
}; };
exports.schemaSubPathMatches = function (subPath, predicate) { return function (uischema, schema) {
    if (isEmpty_1.default(uischema) || !exports.isControl(uischema)) {
        return false;
    }
    var schemaPath = uischema.scope;
    if (isEmpty_1.default(schemaPath)) {
        return false;
    }
    var currentDataSchema = resolvers_1.resolveSchema(schema, "" + schemaPath);
    while (!isEmpty_1.default(currentDataSchema.$ref)) {
        currentDataSchema = resolvers_1.resolveSchema(schema, currentDataSchema.$ref);
    }
    currentDataSchema = get_1.default(currentDataSchema, subPath);
    if (currentDataSchema === undefined) {
        return false;
    }
    return predicate(currentDataSchema);
}; };
/**
 * Only applicable for Controls.
 *
 * This function checks whether the given UI schema is of type Control
 * and if so, resolves the sub-schema referenced by the control and checks
 * whether the type of the sub-schema matches the expected one.
 *
 * @param {string} expectedType the expected type of the resolved sub-schema
 */
exports.schemaTypeIs = function (expectedType) {
    return exports.schemaMatches(function (schema) { return !isEmpty_1.default(schema) && schema.type === expectedType; });
};
/**
 * Only applicable for Controls.
 *
 * This function checks whether the given UI schema is of type Control
 * and if so, resolves the sub-schema referenced by the control and checks
 * whether the format of the sub-schema matches the expected one.
 *
 * @param {string} expectedFormat the expected format of the resolved sub-schema
 */
exports.formatIs = function (expectedFormat) {
    return exports.schemaMatches(function (schema) {
        return !isEmpty_1.default(schema) &&
            schema.format === expectedFormat &&
            schema.type === 'string';
    });
};
/**
 * Checks whether the given UI schema has the expected type.
 *
 * @param {string} expected the expected UI schema type
 */
exports.uiTypeIs = function (expected) { return function (uischema) { return !isEmpty_1.default(uischema) && uischema.type === expected; }; };
/**
 * Checks whether the given UI schema has an option with the given
 * name and whether it has the expected value. If no options property
 * is set, returns false.
 *
 * @param {string} optionName the name of the option to check
 * @param {any} optionValue the expected value of the option
 */
exports.optionIs = function (optionName, optionValue) { return function (uischema) {
    var options = uischema.options;
    return !isEmpty_1.default(options) && options[optionName] === optionValue;
}; };
/**
 * Only applicable for Controls.
 *
 * Checks whether the scope of a control ends with the expected string.
 *
 * @param {string} expected the expected ending of the reference
 */
exports.scopeEndsWith = function (expected) { return function (uischema) {
    if (isEmpty_1.default(expected) || !exports.isControl(uischema)) {
        return false;
    }
    return endsWith_1.default(uischema.scope, expected);
}; };
/**
 * Only applicable for Controls.
 *
 * Checks whether the last segment of the scope matches the expected string.
 *
 * @param {string} expected the expected ending of the reference
 */
exports.scopeEndIs = function (expected) { return function (uischema) {
    if (isEmpty_1.default(expected) || !exports.isControl(uischema)) {
        return false;
    }
    var schemaPath = uischema.scope;
    return !isEmpty_1.default(schemaPath) && last_1.default(schemaPath.split('/')) === expected;
}; };
/**
 * A tester that allow composing other testers by && them.
 *
 * @param {Array<Tester>} testers the testers to be composed
 */
exports.and = function () {
    var testers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        testers[_i] = arguments[_i];
    }
    return function (uischema, schema) { return testers.reduce(function (acc, tester) { return acc && tester(uischema, schema); }, true); };
};
/**
 * A tester that allow composing other testers by || them.
 *
 * @param {Array<Tester>} testers the testers to be composed
 */
exports.or = function () {
    var testers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        testers[_i] = arguments[_i];
    }
    return function (uischema, schema) { return testers.reduce(function (acc, tester) { return acc || tester(uischema, schema); }, false); };
};
/**
 * Create a ranked tester that will associate a number with a given tester, if the
 * latter returns true.
 *
 * @param {number} rank the rank to be returned in case the tester returns true
 * @param {Tester} tester a tester
 */
exports.rankWith = function (rank, tester) { return function (uischema, schema) {
    if (tester(uischema, schema)) {
        return rank;
    }
    return exports.NOT_APPLICABLE;
}; };
exports.withIncreasedRank = function (by, rankedTester) { return function (uischema, schema) {
    var rank = rankedTester(uischema, schema);
    if (rank === exports.NOT_APPLICABLE) {
        return exports.NOT_APPLICABLE;
    }
    return rank + by;
}; };
/**
 * Default tester for boolean.
 * @type {RankedTester}
 */
exports.isBooleanControl = exports.and(exports.uiTypeIs('Control'), exports.schemaTypeIs('boolean'));
// TODO: rather check for properties property
exports.isObjectControl = exports.and(exports.uiTypeIs('Control'), exports.schemaTypeIs('object'));
exports.isAllOfControl = exports.and(exports.uiTypeIs('Control'), exports.schemaMatches(function (schema) { return schema.hasOwnProperty('allOf'); }));
exports.isAnyOfControl = exports.and(exports.uiTypeIs('Control'), exports.schemaMatches(function (schema) { return schema.hasOwnProperty('anyOf'); }));
exports.isOneOfControl = exports.and(exports.uiTypeIs('Control'), exports.schemaMatches(function (schema) { return schema.hasOwnProperty('oneOf'); }));
/**
 * Tests whether the given UI schema is of type Control and if the schema
 * has a 'date' format.
 * @type {Tester}
 */
exports.isDateControl = exports.and(exports.uiTypeIs('Control'), exports.formatIs('date'));
/**
 * Tests whether the given UI schema is of type Control and if the schema
 * has an enum.
 * @type {Tester}
 */
exports.isEnumControl = exports.and(exports.uiTypeIs('Control'), exports.schemaMatches(function (schema) { return schema.hasOwnProperty('enum'); }));
/**
 * Tests whether the given UI schema is of type Control and if the schema
 * is of type integer
 * @type {Tester}
 */
exports.isIntegerControl = exports.and(exports.uiTypeIs('Control'), exports.schemaTypeIs('integer'));
/**
 * Tests whether the given UI schema is of type Control and if the schema
 * is of type number
 * @type {Tester}
 */
exports.isNumberControl = exports.and(exports.uiTypeIs('Control'), exports.schemaTypeIs('number'));
/**
 * Tests whether the given UI schema is of type Control and if the schema
 * is of type string
 * @type {Tester}
 */
exports.isStringControl = exports.and(exports.uiTypeIs('Control'), exports.schemaTypeIs('string'));
/**
 * Tests whether the given UI schema is of type Control and if is has
 * a 'multi' option.
 * @type {Tester}
 */
exports.isMultiLineControl = exports.and(exports.uiTypeIs('Control'), exports.optionIs('multi', true));
/**
 * Tests whether the given UI schema is of type Control and if the schema
 * has a 'time' format.
 * @type {Tester}
 */
exports.isTimeControl = exports.and(exports.uiTypeIs('Control'), exports.formatIs('time'));
/**
 * Tests whether the given UI schema is of type Control and if the schema
 * has a 'date-time' format.
 * @type {Tester}
 */
exports.isDateTimeControl = exports.and(exports.uiTypeIs('Control'), exports.formatIs('date-time'));
/**
 * Tests whether the given UI schema is of type Control and if the schema
 * is an array of objects.
 * @type {Tester}
 */
exports.isObjectArrayControl = exports.and(exports.uiTypeIs('Control'), exports.schemaMatches(function (schema) {
    return !isEmpty_1.default(schema) &&
        schema.type === 'array' &&
        !isEmpty_1.default(schema.items) &&
        !Array.isArray(schema.items);
} // we don't care about tuples
), exports.schemaSubPathMatches('items', function (schema) { return schema.type === 'object'; }));
var traverse = function (any, pred) {
    if (isArray_1.default(any)) {
        return reduce_1.default(any, function (acc, el) { return acc || traverse(el, pred); }, false);
    }
    if (pred(any)) {
        return true;
    }
    if (any.items) {
        return traverse(any.items, pred);
    }
    if (any.properties) {
        return reduce_1.default(toPairs_1.default(any.properties), function (acc, _a) {
            var _key = _a[0], val = _a[1];
            return acc || traverse(val, pred);
        }, false);
    }
    return false;
};
exports.isObjectArrayWithNesting = function (uischema, schema) {
    if (!exports.uiTypeIs('Control')(uischema, schema)) {
        return false;
    }
    var schemaPath = uischema.scope;
    var resolvedSchema = resolvers_1.resolveSchema(schema, schemaPath);
    var wantedNestingByType = {
        object: 2,
        array: 1
    };
    if (has_1.default(resolvedSchema, 'items')) {
        // check if nested arrays
        if (traverse(resolvedSchema.items, function (val) {
            if (val === schema) {
                return false;
            }
            // we don't support multiple types
            if (typeof val.type !== 'string') {
                return true;
            }
            var typeCount = wantedNestingByType[val.type];
            if (typeCount === undefined) {
                return false;
            }
            wantedNestingByType[val.type] = typeCount - 1;
            if (wantedNestingByType[val.type] === 0) {
                return true;
            }
            return false;
        })) {
            return true;
        }
        // check if uischema options detail is set
        if (uischema.options && uischema.options.detail) {
            if (typeof uischema.options.detail === 'string') {
                return uischema.options.detail.toUpperCase() !== 'DEFAULT';
            }
            else if (typeof uischema.options.detail === 'object' &&
                uischema.options.detail.type) {
                return true;
            }
        }
    }
    return false;
};
/**
 * Synonym for isObjectArrayControl
 */
exports.isArrayObjectControl = exports.isObjectArrayControl;
/**
 * Tests whether the given UI schema is of type Control and if the schema
 * is an array of a primitive type.
 * @type {Tester}
 */
exports.isPrimitiveArrayControl = exports.and(exports.uiTypeIs('Control'), exports.schemaMatches(function (schema) {
    return !isEmpty_1.default(schema) &&
        schema.type === 'array' &&
        !isEmpty_1.default(schema.items) &&
        !Array.isArray(schema.items);
} // we don't care about tuples
), exports.schemaSubPathMatches('items', function (schema) {
    return includes_1.default(['integer', 'number', 'boolean', 'string'], schema.type);
}));
/**
 * Tests whether a given UI schema is of type Control,
 * if the schema is of type number or integer and
 * whether the schema defines a numerical range with a default value.
 * @type {Tester}
 */
exports.isRangeControl = exports.and(exports.uiTypeIs('Control'), exports.or(exports.schemaTypeIs('number'), exports.schemaTypeIs('integer')), exports.schemaMatches(function (schema) {
    return schema.hasOwnProperty('maximum') &&
        schema.hasOwnProperty('minimum') &&
        schema.hasOwnProperty('default');
}), exports.optionIs('slider', true));
/**
 * Tests whether the given UI schema is of type Control, if the schema
 * is of type string and has option format
 * @type {Tester}
 */
exports.isNumberFormatControl = exports.and(exports.uiTypeIs('Control'), exports.schemaTypeIs('integer'), exports.optionIs('format', true));
exports.isCategorization = function (category) { return category.type === 'Categorization'; };
exports.isCategory = function (uischema) {
    return uischema.type === 'Category';
};
exports.hasCategory = function (categorization) {
    if (isEmpty_1.default(categorization.elements)) {
        return false;
    }
    // all children of the categorization have to be categories
    return categorization.elements
        .map(function (elem) {
        return exports.isCategorization(elem) ? exports.hasCategory(elem) : exports.isCategory(elem);
    })
        .reduce(function (prev, curr) { return prev && curr; }, true);
};
exports.categorizationHasCategory = function (uischema) {
    return exports.hasCategory(uischema);
};
//# sourceMappingURL=index.js.map