"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var ADDITIONAL_PROPERTIES = 'additionalProperties';
var REQUIRED_PROPERTIES = 'required';
var distinct = function (properties, discriminator) {
    var known = {};
    return properties.filter(function (item) {
        var discriminatorValue = discriminator(item);
        if (known.hasOwnProperty(discriminatorValue)) {
            return false;
        }
        else {
            known[discriminatorValue] = true;
            return true;
        }
    });
};
var Gen = /** @class */ (function () {
    function Gen(findOption) {
        var _this = this;
        this.findOption = findOption;
        this.schemaObject = function (data) {
            var props = _this.properties(data);
            var schema = {
                type: 'object',
                properties: props,
                additionalProperties: _this.findOption(props)(ADDITIONAL_PROPERTIES)
            };
            var required = _this.findOption(props)(REQUIRED_PROPERTIES);
            if (required.length > 0) {
                schema.required = required;
            }
            return schema;
        };
        this.properties = function (data) {
            var emptyProps = {};
            return Object.keys(data).reduce(function (acc, propName) {
                acc[propName] = _this.property(data[propName]);
                return acc;
            }, emptyProps);
        };
        this.property = function (data) {
            switch (typeof data) {
                case 'string':
                    return { type: 'string' };
                case 'boolean':
                    return { type: 'boolean' };
                case 'number':
                    if (Number.isInteger(data)) {
                        return { type: 'integer' };
                    }
                    return { type: 'number' };
                case 'object':
                    if (data == null) {
                        return { type: 'null' };
                    }
                    return _this.schemaObjectOrArray(data);
                default:
                    return {};
            }
        };
        this.schemaObjectOrArray = function (data) {
            if (data instanceof Array) {
                return _this.schemaArray(data);
            }
            else {
                return _this.schemaObject(data);
            }
        };
        this.schemaArray = function (data) {
            if (data.length > 0) {
                var allProperties = data.map(_this.property);
                var uniqueProperties = distinct(allProperties, function (prop) {
                    return JSON.stringify(prop);
                });
                if (uniqueProperties.length === 1) {
                    return {
                        type: 'array',
                        items: uniqueProperties[0]
                    };
                }
                else {
                    return {
                        type: 'array',
                        items: {
                            oneOf: uniqueProperties
                        }
                    };
                }
            }
            else {
                return {
                    type: 'array',
                    items: {}
                };
            }
        };
    }
    return Gen;
}());
/**
 * Generate a JSON schema based on the given data and any additional options.
 * @param {Object} instance the data to create a JSON schema for
 * @param {any} options any additional options that may alter the generated JSON schema
 * @returns {JsonSchema} the generated schema
 */
exports.generateJsonSchema = function (instance, options) {
    if (options === void 0) { options = {}; }
    var findOption = function (props) { return function (optionName) {
        switch (optionName) {
            case ADDITIONAL_PROPERTIES:
                if (options.hasOwnProperty(ADDITIONAL_PROPERTIES)) {
                    return options[ADDITIONAL_PROPERTIES];
                }
                return true;
            case REQUIRED_PROPERTIES:
                if (options.hasOwnProperty(REQUIRED_PROPERTIES)) {
                    return options[REQUIRED_PROPERTIES](props);
                }
                return Object.keys(props);
            default:
                return;
        }
    }; };
    var gen = new Gen(findOption);
    return gen.schemaObject(instance);
};
//# sourceMappingURL=schema.js.map