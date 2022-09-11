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
var isEmpty_1 = __importDefault(require("lodash/isEmpty"));
var has_1 = __importDefault(require("lodash/has"));
var cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
var merge_1 = __importDefault(require("lodash/merge"));
var reducers_1 = require("../reducers");
var util_1 = require("../util");
var renderer_1 = require("./renderer");
/**
 * Map state to field props.
 *
 * @param state JSONForms state tree
 * @param ownProps any own props
 * @returns {StatePropsOfField} state props of a field
 */
exports.mapStateToFieldProps = function (state, ownProps) {
    var path = util_1.composeWithUi(ownProps.uischema, ownProps.path);
    var visible = has_1.default(ownProps, 'visible')
        ? ownProps.visible
        : util_1.isVisible(ownProps, state);
    var enabled = has_1.default(ownProps, 'enabled')
        ? ownProps.enabled
        : util_1.isEnabled(ownProps, state);
    var errors = reducers_1.getErrorAt(path)(state).map(function (error) { return error.message; });
    var isValid = isEmpty_1.default(errors);
    var controlElement = ownProps.uischema;
    var id = ownProps.id;
    var defaultConfig = cloneDeep_1.default(reducers_1.getConfig(state));
    var config = merge_1.default(defaultConfig, ownProps.uischema.options);
    return {
        data: ownProps.data !== undefined
            ? util_1.Resolve.data(ownProps.data, path)
            : util_1.Resolve.data(reducers_1.getData(state), path),
        visible: visible,
        enabled: enabled,
        id: id,
        path: path,
        errors: errors,
        isValid: isValid,
        scopedSchema: util_1.Resolve.schema(ownProps.schema, controlElement.scope),
        uischema: ownProps.uischema,
        schema: ownProps.schema,
        config: config,
        findUISchema: reducers_1.findUISchema(state)
    };
};
exports.mapStateToDispatchFieldProps = function (state, ownProps) {
    var props = exports.mapStateToFieldProps(state, ownProps);
    return __assign({}, props, ownProps, { fields: state.jsonforms.fields || [] });
};
/**
 * Default mapStateToFieldProps for enum field. Options is used for populating dropdown list
 * @param state
 * @param ownProps
 * @returns {StatePropsOfEnumField}
 */
exports.defaultMapStateToEnumFieldProps = function (state, ownProps) {
    var props = exports.mapStateToFieldProps(state, ownProps);
    var options = ownProps.options !== undefined ? ownProps.options : props.scopedSchema.enum;
    return __assign({}, props, { options: options });
};
/**
 * Synonym for mapDispatchToControlProps.
 *
 * @type {(dispatch) => {handleChange(path, value): void}}
 */
exports.mapDispatchToFieldProps = renderer_1.mapDispatchToControlProps;
/**
 * Default dispatch to control props which can be customized to set handleChange action
 *
 */
exports.defaultMapDispatchToControlProps = 
// TODO: ownProps types
function (dispatch, ownProps) {
    var dispatchControlProps = exports.mapDispatchToFieldProps(dispatch);
    return {
        handleChange: ownProps.handleChange !== undefined
            ? ownProps.handleChange
            : dispatchControlProps.handleChange
    };
};
//# sourceMappingURL=field.js.map