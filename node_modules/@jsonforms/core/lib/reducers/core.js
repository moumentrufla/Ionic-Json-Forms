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
var cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
var set_1 = __importDefault(require("lodash/set"));
var get_1 = __importDefault(require("lodash/get"));
var filter_1 = __importDefault(require("lodash/filter"));
var actions_1 = require("../actions");
var validator_1 = require("../util/validator");
var validate = function (validator, data) {
    var valid = validator(data);
    if (valid) {
        return [];
    }
    return validator.errors;
};
var sanitizeErrors = function (validator, data) {
    return validate(validator, data).map(function (error) {
        error.dataPath = error.dataPath.replace(/\//g, '.').substr(1);
        return error;
    });
};
var alwaysValid = function () { return true; };
var initState = {
    data: {},
    schema: {},
    uischema: undefined,
    errors: [],
    validator: alwaysValid,
    ajv: undefined
};
var getOrCreateAjv = function (state, action) {
    if (action && action.ajv) {
        return action.ajv;
    }
    if (state.ajv) {
        return state.ajv;
    }
    return validator_1.createAjv();
};
exports.coreReducer = function (state, action) {
    if (state === void 0) { state = initState; }
    switch (action.type) {
        case actions_1.INIT: {
            var thisAjv = getOrCreateAjv(state, action);
            var v = thisAjv.compile(action.schema);
            var e = sanitizeErrors(v, action.data);
            return __assign({}, state, { data: action.data, schema: action.schema, uischema: action.uischema, errors: e, validator: v, ajv: thisAjv });
        }
        case actions_1.SET_AJV: {
            var currentAjv = action.ajv;
            var validator = currentAjv.compile(state.schema);
            var errors = sanitizeErrors(validator, state.data);
            return __assign({}, state, { validator: validator,
                errors: errors });
        }
        case actions_1.SET_SCHEMA: {
            var v = action.schema && state.ajv
                ? state.ajv.compile(action.schema)
                : state.validator;
            return __assign({}, state, { validator: v, schema: action.schema });
        }
        case actions_1.SET_UISCHEMA: {
            return __assign({}, state, { uischema: action.uischema });
        }
        case actions_1.UPDATE_DATA: {
            if (action.path === undefined || action.path === null) {
                return state;
            }
            else if (action.path === '') {
                // empty path is ok
                var result = action.updater(cloneDeep_1.default(state.data));
                if (result === undefined || result === null) {
                    return __assign({}, state, { data: state.data, uischema: state.uischema, schema: state.schema });
                }
                var errors = sanitizeErrors(state.validator, result);
                return __assign({}, state, { data: result, errors: errors });
            }
            else {
                var oldData = get_1.default(state.data, action.path);
                var newData = action.updater(oldData);
                if (newData === '') {
                    newData = undefined;
                }
                var newState = set_1.default(cloneDeep_1.default(state.data), action.path, newData);
                var errors = sanitizeErrors(state.validator, newState);
                return __assign({}, state, { data: newState, errors: errors });
            }
        }
        default:
            return state;
    }
};
exports.extractData = function (state) { return get_1.default(state, 'data'); };
exports.extractSchema = function (state) { return get_1.default(state, 'schema'); };
exports.extractUiSchema = function (state) { return get_1.default(state, 'uischema'); };
exports.errorAt = function (instancePath) { return function (state) {
    return filter_1.default(state.errors, function (error) { return error.dataPath === instancePath; });
}; };
exports.subErrorsAt = function (instancePath) { return function (state) {
    var path = instancePath + ".";
    return filter_1.default(state.errors, function (error) {
        return error.dataPath.startsWith(path);
    });
}; };
//# sourceMappingURL=core.js.map