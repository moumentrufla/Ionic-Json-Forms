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
var has_1 = __importDefault(require("lodash/has"));
var isObjectSchema = function (schema) {
    return schema.properties !== undefined;
};
var isArraySchema = function (schema) {
    return schema.type === 'array' && schema.items !== undefined;
};
exports.resolveData = function (instance, dataPath) {
    var dataPathSegments = dataPath.split('.');
    if (isEmpty_1.default(dataPath)) {
        return instance;
    }
    return dataPathSegments
        .map(function (segment) { return decodeURIComponent(segment); })
        .reduce(function (curInstance, decodedSegment) {
        if (curInstance === undefined ||
            !curInstance.hasOwnProperty(decodedSegment)) {
            return undefined;
        }
        return curInstance[decodedSegment];
    }, instance);
};
/**
 * Finds all references inside the given schema.
 *
 * @param schema The {@link JsonSchema} to find the references in
 * @param result The initial result map, default: empty map (this parameter is used for recursion
 *               inside the function)
 * @param resolveTuples Whether arrays of tuples should be considered; default: false
 */
exports.findAllRefs = function (schema, result, resolveTuples) {
    if (result === void 0) { result = {}; }
    if (resolveTuples === void 0) { resolveTuples = false; }
    if (isObjectSchema(schema)) {
        Object.keys(schema.properties).forEach(function (key) {
            return exports.findAllRefs(schema.properties[key], result);
        });
    }
    if (isArraySchema(schema)) {
        if (Array.isArray(schema.items)) {
            if (resolveTuples) {
                var items = schema.items;
                items.forEach(function (child) { return exports.findAllRefs(child, result); });
            }
        }
        else {
            exports.findAllRefs(schema.items, result);
        }
    }
    if (Array.isArray(schema.anyOf)) {
        var anyOf = schema.anyOf;
        anyOf.forEach(function (child) { return exports.findAllRefs(child, result); });
    }
    if (schema.$ref !== undefined) {
        result[schema.$ref] = schema;
    }
    // tslint:disable:no-string-literal
    if (has_1.default(schema, 'links')) {
        get_1.default(schema, 'links').forEach(function (link) {
            if (!isEmpty_1.default(link.targetSchema.$ref)) {
                result[link.targetSchema.$ref] = schema;
            }
            else {
                exports.findAllRefs(link.targetSchema, result);
            }
        });
    }
    return result;
};
/**
 * Resolve the given schema path in order to obtain a subschema.
 * @param {JsonSchema} schema the root schema from which to start
 * @param {string} schemaPath the schema path to be resolved
 * @returns {JsonSchema} the resolved sub-schema
 */
exports.resolveSchema = function (schema, schemaPath) {
    if (isEmpty_1.default(schema)) {
        return undefined;
    }
    var validPathSegments = schemaPath.split('/');
    var invalidSegment = function (pathSegment) {
        return pathSegment === '#' || pathSegment === undefined || pathSegment === '';
    };
    var resultSchema = validPathSegments.reduce(function (curSchema, pathSegment) {
        curSchema =
            curSchema === undefined || curSchema.$ref === undefined
                ? curSchema
                : exports.resolveSchema(schema, curSchema.$ref);
        return invalidSegment(pathSegment)
            ? curSchema
            : get_1.default(curSchema, pathSegment);
    }, schema);
    if (resultSchema !== undefined && resultSchema.$ref !== undefined) {
        return retrieveResolvableSchema(schema, resultSchema.$ref);
    }
    return resultSchema;
};
/**
 * Normalizes the schema and resolves the given ref.
 *
 * @param {JsonSchema} full the JSON schema to resolved the reference against
 * @param {string} reference the reference to be resolved
 * @returns {JsonSchema} the resolved sub-schema
 */
// disable rule because resolve is mutually recursive
// tslint:disable:only-arrow-functions
function retrieveResolvableSchema(full, reference) {
    // tslint:enable:only-arrow-functions
    var child = exports.resolveSchema(full, reference);
    var allRefs = exports.findAllRefs(child);
    var innerSelfReference = allRefs[reference];
    if (innerSelfReference !== undefined) {
        innerSelfReference.$ref = '#';
    }
    return child;
}
//# sourceMappingURL=resolvers.js.map