"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var get_1 = __importDefault(require("lodash/get"));
var default_data_1 = require("./default-data");
var redux_1 = require("redux");
var renderers_1 = require("./renderers");
exports.rendererReducer = renderers_1.rendererReducer;
var fields_1 = require("./fields");
exports.fieldReducer = fields_1.fieldReducer;
var config_1 = require("./config");
var core_1 = require("./core");
exports.coreReducer = core_1.coreReducer;
var uischemas_1 = require("./uischemas");
var __1 = require("..");
var i18n_1 = require("./i18n");
exports.jsonformsReducer = function (additionalReducers) {
    if (additionalReducers === void 0) { additionalReducers = {}; }
    return redux_1.combineReducers(__assign({ core: core_1.coreReducer, renderers: renderers_1.rendererReducer, fields: fields_1.fieldReducer, config: config_1.configReducer, uischemas: uischemas_1.uischemaRegistryReducer, defaultData: default_data_1.defaultDataReducer, i18n: i18n_1.i18nReducer }, additionalReducers));
};
exports.getData = function (state) {
    return core_1.extractData(get_1.default(state, 'jsonforms.core'));
};
exports.getSchema = function (state) {
    return core_1.extractSchema(get_1.default(state, 'jsonforms.core'));
};
exports.getUiSchema = function (state) {
    return core_1.extractUiSchema(get_1.default(state, 'jsonforms.core'));
};
exports.getDefaultData = function (state) {
    return default_data_1.extractDefaultData(get_1.default(state, 'jsonforms.defaultData'));
};
exports.getRenderers = function (state) { return get_1.default(state, 'jsonforms.renderers'); };
exports.findUISchema = function (state) { return function (schema, schemaPath, path, fallbackLayoutType, control) {
    if (fallbackLayoutType === void 0) { fallbackLayoutType = 'VerticalLayout'; }
    // handle options
    if (control && control.options && control.options.detail) {
        if (typeof control.options.detail === 'string') {
            if (control.options.detail.toUpperCase() === 'GENERATE') {
                // force generation of uischema
                return __1.Generate.uiSchema(schema, fallbackLayoutType);
            }
        }
        else if (typeof control.options.detail === 'object') {
            // check if detail is a valid uischema
            if (control.options.detail.type &&
                typeof control.options.detail.type === 'string') {
                return control.options.detail;
            }
        }
    }
    // default
    var uiSchema = uischemas_1.findMatchingUISchema(state.jsonforms.uischemas)(schema, schemaPath, path);
    if (uiSchema === undefined) {
        return __1.Generate.uiSchema(schema, fallbackLayoutType);
    }
    return uiSchema;
}; };
exports.getErrorAt = function (instancePath) { return function (state) {
    return core_1.errorAt(instancePath)(state.jsonforms.core);
}; };
exports.getSubErrorsAt = function (instancePath) { return function (state) { return core_1.subErrorsAt(instancePath)(state.jsonforms.core); }; };
exports.getConfig = function (state) { return state.jsonforms.config; };
exports.getLocale = function (state) {
    return i18n_1.fetchLocale(get_1.default(state, 'jsonforms.i18n'));
};
exports.getLocalizedSchema = function (locale) { return function (state) { return i18n_1.findLocalizedSchema(locale)(get_1.default(state, 'jsonforms.i18n')); }; };
exports.getLocalizedUISchema = function (locale) { return function (state) {
    return i18n_1.findLocalizedUISchema(locale)(get_1.default(state, 'jsonforms.i18n'));
}; };
//# sourceMappingURL=index.js.map