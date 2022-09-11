"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var maxBy_1 = __importDefault(require("lodash/maxBy"));
var remove_1 = __importDefault(require("lodash/remove"));
var actions_1 = require("../actions");
var __1 = require("..");
exports.uischemaRegistryReducer = function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case actions_1.ADD_UI_SCHEMA:
            return state
                .slice()
                .concat({ tester: action.tester, uischema: action.uischema });
        case actions_1.REMOVE_UI_SCHEMA:
            var copy = state.slice();
            remove_1.default(copy, function (entry) { return entry.tester === action.tester; });
            return copy;
        default:
            return state;
    }
};
exports.findMatchingUISchema = function (state) { return function (jsonSchema, schemaPath, path) {
    var match = maxBy_1.default(state, function (entry) {
        return entry.tester(jsonSchema, schemaPath, path);
    });
    if (match !== undefined &&
        match.tester(jsonSchema, schemaPath, path) !== __1.NOT_APPLICABLE) {
        return match.uischema;
    }
    return undefined;
}; };
//# sourceMappingURL=uischemas.js.map