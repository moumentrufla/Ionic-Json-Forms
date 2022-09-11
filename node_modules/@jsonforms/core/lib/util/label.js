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
var startCase_1 = __importDefault(require("lodash/startCase"));
var deriveLabel = function (controlElement) {
    if (controlElement.scope !== undefined) {
        var ref = controlElement.scope;
        var label = ref.substr(ref.lastIndexOf('/') + 1);
        return startCase_1.default(label);
    }
    return '';
};
exports.createCleanLabel = function (label) {
    return startCase_1.default(label.replace('_', ' '));
};
/**
 * Return a label object based on the given control element.
 * @param {ControlElement} withLabel the UI schema to obtain a label object for
 * @returns {LabelDescription}
 */
exports.createLabelDescriptionFrom = function (withLabel) {
    var labelProperty = withLabel.label;
    var derivedLabel = deriveLabel(withLabel);
    if (typeof labelProperty === 'boolean') {
        if (labelProperty) {
            return {
                text: derivedLabel,
                show: labelProperty
            };
        }
        else {
            return {
                text: derivedLabel,
                show: labelProperty
            };
        }
    }
    else if (typeof labelProperty === 'string') {
        return {
            text: labelProperty,
            show: true
        };
    }
    else if (typeof labelProperty === 'object') {
        var show = labelProperty.hasOwnProperty('show')
            ? labelProperty.show
            : true;
        var label = labelProperty.hasOwnProperty('text')
            ? labelProperty.text
            : derivedLabel;
        return {
            text: label,
            show: show
        };
    }
    else {
        return {
            text: derivedLabel,
            show: true
        };
    }
};
//# sourceMappingURL=label.js.map