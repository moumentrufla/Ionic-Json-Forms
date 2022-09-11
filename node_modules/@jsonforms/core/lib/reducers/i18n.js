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
var actions_1 = require("../actions");
var __1 = require("..");
var initState = {
    locale: undefined,
    localizedSchemas: new Map(),
    localizedUISchemas: new Map()
};
exports.i18nReducer = function (state, action) {
    if (state === void 0) { state = initState; }
    switch (action.type) {
        case actions_1.SET_LOCALIZED_SCHEMAS:
            return __assign({}, state, { localizedSchemas: action.localizedSchemas });
        case __1.SET_LOCALIZED_UISCHEMAS:
            return __assign({}, state, { localizedUISchemas: action.localizedUISchemas });
        case actions_1.SET_LOCALE:
            return __assign({}, state, { locale: action.locale === undefined ? navigator.languages[0] : action.locale });
        default:
            return state;
    }
};
exports.fetchLocale = function (state) {
    if (state === undefined) {
        return undefined;
    }
    return state.locale;
};
exports.findLocalizedSchema = function (locale) { return function (state) {
    if (state === undefined) {
        return undefined;
    }
    return state.localizedSchemas.get(locale);
}; };
exports.findLocalizedUISchema = function (locale) { return function (state) {
    if (state === undefined) {
        return undefined;
    }
    return state.localizedUISchemas.get(locale);
}; };
//# sourceMappingURL=i18n.js.map