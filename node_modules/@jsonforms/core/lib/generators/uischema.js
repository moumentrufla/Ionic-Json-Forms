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
var isArray_1 = __importDefault(require("lodash/isArray"));
var head_1 = __importDefault(require("lodash/head"));
var startCase_1 = __importDefault(require("lodash/startCase"));
var keys_1 = __importDefault(require("lodash/keys"));
var uischema_1 = require("../models/uischema");
var resolvers_1 = require("../util/resolvers");
/**
 * Creates a new ILayout.
 * @param layoutType The type of the laoyut
 * @returns the new ILayout
 */
var createLayout = function (layoutType) { return ({
    type: layoutType,
    elements: []
}); };
/**
 * Checks if the type of jsonSchema is a union of multiple types
 *
 * @param {JsonSchema} jsonSchema
 * @returns {boolean}
 */
var isUnionType = function (jsonSchema) {
    return !isEmpty_1.default(jsonSchema) && !isEmpty_1.default(jsonSchema.type) && isArray_1.default(jsonSchema.type);
};
/**
 * Derives the type of the jsonSchema element
 */
var deriveType = function (jsonSchema) {
    if (!isEmpty_1.default(jsonSchema) &&
        !isEmpty_1.default(jsonSchema.type) &&
        typeof jsonSchema.type === 'string') {
        return jsonSchema.type;
    }
    if (isUnionType(jsonSchema)) {
        return head_1.default(jsonSchema.type);
    }
    if (!isEmpty_1.default(jsonSchema) &&
        (!isEmpty_1.default(jsonSchema.properties) ||
            !isEmpty_1.default(jsonSchema.additionalProperties))) {
        return 'object';
    }
    if (!isEmpty_1.default(jsonSchema) && !isEmpty_1.default(jsonSchema.items)) {
        return 'array';
    }
    // ignore all remaining cases
    return 'null';
};
/**
 * Creates a IControlObject with the given label referencing the given ref
 */
exports.createControlElement = function (label, ref) { return ({
    type: 'Control',
    label: label === undefined ? false : label,
    scope: ref
}); };
var isLayout = function (uischema) {
    return uischema.elements !== undefined;
};
/**
 * Wraps the given {@code uiSchema} in a Layout if there is none already.
 * @param uischema The ui schema to wrap in a layout.
 * @param layoutType The type of the layout to create.
 * @returns the wrapped uiSchema.
 */
var wrapInLayoutIfNecessary = function (uischema, layoutType) {
    if (!isEmpty_1.default(uischema) && !isLayout(uischema)) {
        var verticalLayout = createLayout(layoutType);
        verticalLayout.elements.push(uischema);
        return verticalLayout;
    }
    return uischema;
};
/**
 * Adds the given {@code labelName} to the {@code layout} if it exists
 * @param layout
 *      The layout which is to receive the label
 * @param labelName
 *      The name of the schema
 */
var addLabel = function (layout, labelName) {
    if (!isEmpty_1.default(labelName)) {
        var fixedLabel = startCase_1.default(labelName);
        if (uischema_1.isGroup(layout)) {
            layout.label = fixedLabel;
        }
        else {
            // add label with name
            var label = {
                type: 'Label',
                text: fixedLabel
            };
            layout.elements.push(label);
        }
    }
};
/**
 * Returns whether the given {@code jsonSchema} is a combinator ({@code oneOf}, {@code anyOf}, {@code allOf}) at the root level
 * @param jsonSchema
 *      the schema to check
 */
var isCombinator = function (jsonSchema) {
    return (!isEmpty_1.default(jsonSchema) &&
        (!isEmpty_1.default(jsonSchema.oneOf) ||
            !isEmpty_1.default(jsonSchema.anyOf) ||
            !isEmpty_1.default(jsonSchema.allOf)));
};
var generateUISchema = function (jsonSchema, schemaElements, currentRef, schemaName, layoutType, rootSchema) {
    if (!isEmpty_1.default(jsonSchema) && jsonSchema.$ref !== undefined) {
        return generateUISchema(resolvers_1.resolveSchema(rootSchema, jsonSchema.$ref), schemaElements, currentRef, schemaName, layoutType, rootSchema);
    }
    if (isCombinator(jsonSchema)) {
        var controlObject = exports.createControlElement(startCase_1.default(schemaName), currentRef);
        schemaElements.push(controlObject);
        return controlObject;
    }
    var type = deriveType(jsonSchema);
    switch (type) {
        case 'object':
            var layout_1 = createLayout(layoutType);
            schemaElements.push(layout_1);
            if (jsonSchema.properties && keys_1.default(jsonSchema.properties).length > 1) {
                addLabel(layout_1, schemaName);
            }
            if (!isEmpty_1.default(jsonSchema.properties)) {
                // traverse properties
                var nextRef_1 = currentRef + '/properties';
                Object.keys(jsonSchema.properties).map(function (propName) {
                    var value = jsonSchema.properties[propName];
                    var ref = nextRef_1 + "/" + propName;
                    if (value.$ref !== undefined) {
                        value = resolvers_1.resolveSchema(rootSchema, value.$ref);
                    }
                    generateUISchema(value, layout_1.elements, ref, propName, layoutType, rootSchema);
                });
            }
            return layout_1;
        case 'array': // array items will be handled by the array control itself
        /* falls through */
        case 'string':
        /* falls through */
        case 'number':
        /* falls through */
        case 'integer':
        /* falls through */
        case 'boolean':
            var controlObject = exports.createControlElement(startCase_1.default(schemaName), currentRef);
            schemaElements.push(controlObject);
            return controlObject;
        case 'null':
            return null;
        default:
            throw new Error('Unknown type: ' + JSON.stringify(jsonSchema));
    }
};
/**
 * Generate a default UI schema.
 * @param {JsonSchema} jsonSchema the JSON schema to generated a UI schema for
 * @param {string} layoutType the desired layout type for the root layout
 *        of the generated UI schema
 */
exports.generateDefaultUISchema = function (jsonSchema, layoutType, prefix, rootSchema) {
    if (layoutType === void 0) { layoutType = 'VerticalLayout'; }
    if (prefix === void 0) { prefix = '#'; }
    if (rootSchema === void 0) { rootSchema = jsonSchema; }
    return wrapInLayoutIfNecessary(generateUISchema(jsonSchema, [], prefix, '', layoutType, rootSchema), layoutType);
};
//# sourceMappingURL=uischema.js.map