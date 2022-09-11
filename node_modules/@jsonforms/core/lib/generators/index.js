"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("./schema");
exports.generateJsonSchema = schema_1.generateJsonSchema;
var uischema_1 = require("./uischema");
exports.generateDefaultUISchema = uischema_1.generateDefaultUISchema;
exports.Generate = {
    jsonSchema: schema_1.generateJsonSchema,
    uiSchema: uischema_1.generateDefaultUISchema,
    controlElement: uischema_1.createControlElement
};
//# sourceMappingURL=index.js.map