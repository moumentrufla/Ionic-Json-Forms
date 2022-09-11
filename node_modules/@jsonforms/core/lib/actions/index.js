"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generators_1 = require("../generators");
exports.INIT = 'jsonforms/INIT';
exports.SET_AJV = 'jsonforms/SET_AJV';
exports.UPDATE_DATA = 'jsonforms/UPDATE';
exports.VALIDATE = 'jsonforms/VALIDATE';
exports.ADD_RENDERER = 'jsonforms/ADD_RENDERER';
exports.REMOVE_RENDERER = 'jsonforms/REMOVE_RENDERER';
exports.ADD_FIELD = 'jsonforms/ADD_FIELD';
exports.REMOVE_FIELD = 'jsonforms/REMOVE_FIELD';
exports.SET_CONFIG = 'jsonforms/SET_CONFIG';
exports.ADD_UI_SCHEMA = "jsonforms/ADD_UI_SCHEMA";
exports.REMOVE_UI_SCHEMA = "jsonforms/REMOVE_UI_SCHEMA";
exports.SET_SCHEMA = "jsonforms/SET_SCHEMA";
exports.SET_UISCHEMA = "jsonforms/SET_UISCHEMA";
exports.SET_LOCALE = "jsonforms/SET_LOCALE";
exports.SET_LOCALIZED_SCHEMAS = 'jsonforms/SET_LOCALIZED_SCHEMAS';
exports.SET_LOCALIZED_UISCHEMAS = 'jsonforms/SET_LOCALIZED_UISCHEMAS';
exports.ADD_DEFAULT_DATA = "jsonforms/ADD_DEFAULT_DATA";
exports.REMOVE_DEFAULT_DATA = "jsonforms/REMOVE_DEFAULT_DATA";
exports.init = function (data, schema, uischema, ajv) {
    if (schema === void 0) { schema = generators_1.generateJsonSchema(data); }
    if (uischema === void 0) { uischema = generators_1.generateDefaultUISchema(schema); }
    return ({
        type: exports.INIT,
        data: data,
        schema: schema,
        uischema: uischema,
        ajv: ajv
    });
};
exports.registerDefaultData = function (schemaPath, data) { return ({
    type: exports.ADD_DEFAULT_DATA,
    schemaPath: schemaPath,
    data: data
}); };
exports.unregisterDefaultData = function (schemaPath) { return ({
    type: exports.REMOVE_DEFAULT_DATA,
    schemaPath: schemaPath
}); };
exports.setAjv = function (ajv) { return ({
    type: exports.SET_AJV,
    ajv: ajv
}); };
exports.update = function (path, updater) { return ({
    type: exports.UPDATE_DATA,
    path: path,
    updater: updater
}); };
exports.registerRenderer = function (tester, renderer) { return ({
    type: exports.ADD_RENDERER,
    tester: tester,
    renderer: renderer
}); };
exports.registerField = function (tester, field) { return ({
    type: exports.ADD_FIELD,
    tester: tester,
    field: field
}); };
exports.unregisterField = function (tester, field) { return ({
    type: exports.REMOVE_FIELD,
    tester: tester,
    field: field
}); };
exports.unregisterRenderer = function (tester, renderer) { return ({
    type: exports.REMOVE_RENDERER,
    tester: tester,
    renderer: renderer
}); };
exports.setConfig = function (config) { return function (dispatch) {
    dispatch({
        type: exports.SET_CONFIG,
        config: config
    });
}; };
exports.registerUISchema = function (tester, uischema) {
    return {
        type: exports.ADD_UI_SCHEMA,
        tester: tester,
        uischema: uischema
    };
};
exports.unregisterUISchema = function (tester) {
    return {
        type: exports.REMOVE_UI_SCHEMA,
        tester: tester
    };
};
exports.setLocale = function (locale) { return ({
    type: exports.SET_LOCALE,
    locale: locale
}); };
exports.setLocalizedSchemas = function (localizedSchemas) { return ({
    type: exports.SET_LOCALIZED_SCHEMAS,
    localizedSchemas: localizedSchemas
}); };
exports.setSchema = function (schema) { return ({
    type: exports.SET_SCHEMA,
    schema: schema
}); };
exports.setLocalizedUISchemas = function (localizedUISchemas) { return ({
    type: exports.SET_LOCALIZED_UISCHEMAS,
    localizedUISchemas: localizedUISchemas
}); };
exports.setUISchema = function (uischema) { return ({
    type: exports.SET_UISCHEMA,
    uischema: uischema
}); };
//# sourceMappingURL=index.js.map