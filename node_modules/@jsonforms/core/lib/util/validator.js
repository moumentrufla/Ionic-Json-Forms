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
var ajv_1 = __importDefault(require("ajv"));
var draft4_1 = require("../models/draft4");
exports.createAjv = function (options) {
    var ajv = new ajv_1.default(__assign({ schemaId: 'auto', allErrors: true, jsonPointers: true, errorDataPath: 'property' }, options));
    ajv.addFormat('time', '^([0-1][0-9]|2[0-3]):[0-5][0-9]$');
    ajv.addMetaSchema(draft4_1.Draft4);
    return ajv;
};
//# sourceMappingURL=validator.js.map