"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var resolvers_1 = require("./resolvers");
var path_1 = require("./path");
exports.composePaths = path_1.compose;
exports.composeWithUi = path_1.composeWithUi;
exports.toDataPath = path_1.toDataPath;
var runtime_1 = require("./runtime");
exports.isEnabled = runtime_1.isEnabled;
exports.isVisible = runtime_1.isVisible;
var label_1 = require("./label");
exports.createCleanLabel = label_1.createCleanLabel;
exports.createLabelDescriptionFrom = label_1.createLabelDescriptionFrom;
/**
 * Escape the given string such that it can be used as a class name,
 * i.e. hashes and slashes will be replaced.
 *
 * @param {string} s the string that should be converted to a valid class name
 * @returns {string} the escaped string
 */
exports.convertToValidClassName = function (s) {
    return s.replace('#', 'root').replace(new RegExp('/', 'g'), '_');
};
exports.formatErrorMessage = function (errors) {
    if (errors === undefined || errors === null) {
        return '';
    }
    return errors.join('\n');
};
/**
 * Convenience wrapper around resolveData and resolveSchema.
 */
var Resolve = {
    schema: resolvers_1.resolveSchema,
    data: resolvers_1.resolveData
};
exports.Resolve = Resolve;
var resolvers_2 = require("./resolvers");
exports.resolveData = resolvers_2.resolveData;
exports.resolveSchema = resolvers_2.resolveSchema;
// Paths --
var fromScopable = function (scopable) {
    return path_1.toDataPathSegments(scopable.scope).join('.');
};
var Paths = {
    compose: path_1.compose,
    fromScopable: fromScopable
};
exports.Paths = Paths;
// Runtime --
var Runtime = {
    isEnabled: function (props, state) {
        return runtime_1.isEnabled(props, state);
    },
    isVisible: function (props, state) {
        return runtime_1.isVisible(props, state);
    }
};
exports.Runtime = Runtime;
__export(require("./renderer"));
__export(require("./field"));
__export(require("./runtime"));
__export(require("./ids"));
__export(require("./validator"));
//# sourceMappingURL=index.js.map