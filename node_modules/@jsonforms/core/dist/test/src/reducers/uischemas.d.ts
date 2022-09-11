import { AddUISchemaAction, RemoveUISchemaAction } from '../actions';
import { JsonSchema, UISchemaElement } from '..';
export declare type UISchemaTester = (schema: JsonSchema, schemaPath: string, path: string) => number;
declare type ValidUISchemaReducerActions = AddUISchemaAction | RemoveUISchemaAction;
export declare const uischemaRegistryReducer: (state: {
    tester: UISchemaTester;
    uischema: UISchemaElement;
}[], action: ValidUISchemaReducerActions) => {
    tester: UISchemaTester;
    uischema: UISchemaElement;
}[];
export declare const findMatchingUISchema: (state: {
    tester: UISchemaTester;
    uischema: UISchemaElement;
}[]) => (jsonSchema: JsonSchema, schemaPath: string, path: string) => UISchemaElement;
export {};
