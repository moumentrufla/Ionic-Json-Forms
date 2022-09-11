import { Ajv, ErrorObject, ValidateFunction } from 'ajv';
import { InitAction, SetAjvAction, SetSchemaAction, SetUISchemaAction, UpdateAction } from '../actions';
import { JsonSchema, UISchemaElement } from '..';
export interface JsonFormsCore {
    data: any;
    schema: JsonSchema;
    uischema: UISchemaElement;
    errors?: ErrorObject[];
    validator?: ValidateFunction;
    ajv?: Ajv;
}
declare type ValidCoreActions = InitAction | UpdateAction | SetAjvAction | SetSchemaAction | SetUISchemaAction;
export declare const coreReducer: (state: JsonFormsCore, action: ValidCoreActions) => JsonFormsCore;
export declare const extractData: (state: JsonFormsCore) => any;
export declare const extractSchema: (state: JsonFormsCore) => JsonSchema;
export declare const extractUiSchema: (state: JsonFormsCore) => UISchemaElement;
export declare const errorAt: (instancePath: string) => (state: JsonFormsCore) => any[];
export declare const subErrorsAt: (instancePath: string) => (state: JsonFormsCore) => any[];
export {};
