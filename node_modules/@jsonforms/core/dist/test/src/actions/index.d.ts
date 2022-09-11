import AJV from 'ajv';
import { RankedTester } from '../testers';
import { JsonSchema, UISchemaElement } from '../';
import { UISchemaTester } from '../reducers/uischemas';
import { AnyAction, Dispatch } from 'redux';
export declare const INIT: 'jsonforms/INIT';
export declare const SET_AJV: 'jsonforms/SET_AJV';
export declare const UPDATE_DATA: 'jsonforms/UPDATE';
export declare const VALIDATE: 'jsonforms/VALIDATE';
export declare const ADD_RENDERER: 'jsonforms/ADD_RENDERER';
export declare const REMOVE_RENDERER: 'jsonforms/REMOVE_RENDERER';
export declare const ADD_FIELD: 'jsonforms/ADD_FIELD';
export declare const REMOVE_FIELD: 'jsonforms/REMOVE_FIELD';
export declare const SET_CONFIG: 'jsonforms/SET_CONFIG';
export declare const ADD_UI_SCHEMA: 'jsonforms/ADD_UI_SCHEMA';
export declare const REMOVE_UI_SCHEMA: 'jsonforms/REMOVE_UI_SCHEMA';
export declare const SET_SCHEMA: 'jsonforms/SET_SCHEMA';
export declare const SET_UISCHEMA: 'jsonforms/SET_UISCHEMA';
export declare const SET_LOCALE: 'jsonforms/SET_LOCALE';
export declare const SET_LOCALIZED_SCHEMAS: 'jsonforms/SET_LOCALIZED_SCHEMAS';
export declare const SET_LOCALIZED_UISCHEMAS: 'jsonforms/SET_LOCALIZED_UISCHEMAS';
export declare const ADD_DEFAULT_DATA: 'jsonforms/ADD_DEFAULT_DATA';
export declare const REMOVE_DEFAULT_DATA: 'jsonforms/REMOVE_DEFAULT_DATA';
export interface UpdateAction {
    type: 'jsonforms/UPDATE';
    path: string;
    updater(existingData?: any): any;
}
export interface InitAction {
    type: 'jsonforms/INIT';
    data: any;
    schema: JsonSchema;
    uischema: UISchemaElement;
    ajv?: AJV.Ajv;
}
export declare const init: (data: any, schema?: JsonSchema, uischema?: UISchemaElement, ajv?: AJV.Ajv) => {
    type: "jsonforms/INIT";
    data: any;
    schema: JsonSchema;
    uischema: UISchemaElement;
    ajv: AJV.Ajv;
};
export interface RegisterDefaultDataAction {
    type: 'jsonforms/ADD_DEFAULT_DATA';
    schemaPath: string;
    data: any;
}
export declare const registerDefaultData: (schemaPath: string, data: any) => {
    type: "jsonforms/ADD_DEFAULT_DATA";
    schemaPath: string;
    data: any;
};
export interface UnregisterDefaultDataAction {
    type: 'jsonforms/REMOVE_DEFAULT_DATA';
    schemaPath: string;
}
export declare const unregisterDefaultData: (schemaPath: string) => {
    type: "jsonforms/REMOVE_DEFAULT_DATA";
    schemaPath: string;
};
export interface SetAjvAction {
    type: 'jsonforms/SET_AJV';
    ajv: AJV.Ajv;
}
export declare const setAjv: (ajv: AJV.Ajv) => {
    type: "jsonforms/SET_AJV";
    ajv: AJV.Ajv;
};
export declare const update: (path: string, updater: (existingData: any) => any) => UpdateAction;
export interface AddRendererAction {
    type: 'jsonforms/ADD_RENDERER';
    tester: RankedTester;
    renderer: any;
}
export declare const registerRenderer: (tester: RankedTester, renderer: any) => {
    type: "jsonforms/ADD_RENDERER";
    tester: RankedTester;
    renderer: any;
};
export interface AddFieldRendererAction {
    type: 'jsonforms/ADD_FIELD';
    tester: RankedTester;
    field: any;
}
export declare const registerField: (tester: RankedTester, field: any) => {
    type: "jsonforms/ADD_FIELD";
    tester: RankedTester;
    field: any;
};
export interface RemoveFieldRendererAction {
    type: 'jsonforms/REMOVE_FIELD';
    tester: RankedTester;
    field: any;
}
export declare const unregisterField: (tester: RankedTester, field: any) => {
    type: "jsonforms/REMOVE_FIELD";
    tester: RankedTester;
    field: any;
};
export interface RemoveRendererAction {
    type: 'jsonforms/REMOVE_RENDERER';
    tester: RankedTester;
    renderer: any;
}
export declare const unregisterRenderer: (tester: RankedTester, renderer: any) => {
    type: "jsonforms/REMOVE_RENDERER";
    tester: RankedTester;
    renderer: any;
};
export interface SetConfigAction {
    type: 'jsonforms/SET_CONFIG';
    config: any;
}
export declare const setConfig: (config: any) => (dispatch: Dispatch<AnyAction>) => void;
export interface AddUISchemaAction {
    type: 'jsonforms/ADD_UI_SCHEMA';
    tester: UISchemaTester;
    uischema: UISchemaElement;
}
export declare const registerUISchema: (tester: UISchemaTester, uischema: UISchemaElement) => AddUISchemaAction;
export interface RemoveUISchemaAction {
    type: 'jsonforms/REMOVE_UI_SCHEMA';
    tester: UISchemaTester;
}
export declare const unregisterUISchema: (tester: UISchemaTester) => RemoveUISchemaAction;
export interface SetLocaleAction {
    type: 'jsonforms/SET_LOCALE';
    locale: string;
}
export declare const setLocale: (locale: string) => SetLocaleAction;
export interface SetLocalizedSchemasAction {
    type: 'jsonforms/SET_LOCALIZED_SCHEMAS';
    localizedSchemas: Map<string, JsonSchema>;
}
export declare const setLocalizedSchemas: (localizedSchemas: Map<string, JsonSchema>) => SetLocalizedSchemasAction;
export interface SetSchemaAction {
    type: 'jsonforms/SET_SCHEMA';
    schema: JsonSchema;
}
export declare const setSchema: (schema: JsonSchema) => SetSchemaAction;
export interface SetLocalizedUISchemasAction {
    type: 'jsonforms/SET_LOCALIZED_UISCHEMAS';
    localizedUISchemas: Map<string, UISchemaElement>;
}
export declare const setLocalizedUISchemas: (localizedUISchemas: Map<string, UISchemaElement>) => SetLocalizedUISchemasAction;
export interface SetUISchemaAction {
    type: 'jsonforms/SET_UISCHEMA';
    uischema: UISchemaElement;
}
export declare const setUISchema: (uischema: UISchemaElement) => SetUISchemaAction;
