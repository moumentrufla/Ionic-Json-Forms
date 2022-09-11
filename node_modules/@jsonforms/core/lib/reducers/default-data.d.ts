import { RegisterDefaultDataAction, UnregisterDefaultDataAction } from '../actions';
export interface JsonFormsDefaultDataRegistryEntry {
    schemaPath: string;
    data: any;
}
declare type ValidDefaultDataActions = RegisterDefaultDataAction | UnregisterDefaultDataAction;
export declare const defaultDataReducer: (state: JsonFormsDefaultDataRegistryEntry[], action: ValidDefaultDataActions) => JsonFormsDefaultDataRegistryEntry[];
export declare const extractDefaultData: (state: JsonFormsDefaultDataRegistryEntry[]) => JsonFormsDefaultDataRegistryEntry[];
export {};
