"use strict";
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
exports.defaultDataReducer = function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case actions_1.ADD_DEFAULT_DATA:
            return state.concat([
                { schemaPath: action.schemaPath, data: action.data }
            ]);
        case actions_1.REMOVE_DEFAULT_DATA:
            return state.filter(function (t) { return t.schemaPath !== action.schemaPath; });
        default:
            return state;
    }
};
exports.extractDefaultData = function (state) { return state; };
//# sourceMappingURL=default-data.js.map