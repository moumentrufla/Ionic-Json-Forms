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
var range_1 = __importDefault(require("lodash/range"));
exports.compose = function (path1, path2) {
    var p1 = path1;
    if (!isEmpty_1.default(path1) && !isEmpty_1.default(path2) && !path2.startsWith('[')) {
        p1 = path1 + '.';
    }
    if (isEmpty_1.default(p1)) {
        return path2;
    }
    else if (isEmpty_1.default(path2)) {
        return p1;
    }
    else {
        return "" + p1 + path2;
    }
};
/**
 * Convert a schema path (i.e. JSON pointer) to an array by splitting
 * at the '/' character and removing all schema-specific keywords.
 *
 * The returned value can be used to de-reference a root object by folding over it
 * and de-referencing the single segments to obtain a new object.
 *
 *
 * @param {string} schemaPath the schema path to be converted
 * @returns {string[]} an array containing only non-schema-specific segments
 */
exports.toDataPathSegments = function (schemaPath) {
    var s = schemaPath
        .replace(/anyOf\/[\d]\//, '')
        .replace(/allOf\/[\d]\//, '')
        .replace(/oneOf\/[\d]\//, '');
    var segments = s.split('/');
    var startFromRoot = segments[0] === '#' || segments[0] === '';
    var startIndex = startFromRoot ? 2 : 1;
    return range_1.default(startIndex, segments.length, 2).map(function (idx) { return segments[idx]; });
};
/**
 * Remove all schema-specific keywords (e.g. 'properties') from a given path.
 * @example
 * toDataPath('#/properties/foo/properties/bar') === '#/foo/bar')
 *
 * @param {string} schemaPath the schema path to be converted
 * @returns {string} the path without schema-specific keywords
 */
exports.toDataPath = function (schemaPath) {
    return exports.toDataPathSegments(schemaPath).join('.');
};
exports.composeWithUi = function (scopableUi, path) {
    var segments = exports.toDataPathSegments(scopableUi.scope);
    if (isEmpty_1.default(segments) && path === undefined) {
        return '';
    }
    return isEmpty_1.default(segments)
        ? path
        : exports.compose(path, segments.join('.'));
};
//# sourceMappingURL=path.js.map