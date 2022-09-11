import { RankedTester } from '../testers';
import { AddFieldRendererAction, RemoveFieldRendererAction } from '../actions';
declare type ValidFieldReducerActions = AddFieldRendererAction | RemoveFieldRendererAction;
export declare type JsonFormsFieldRendererRegistryState = JsonFormsFieldRendererRegistryEntry[];
export interface JsonFormsFieldRendererRegistryEntry {
    tester: RankedTester;
    field: any;
}
export declare const fieldReducer: (state: JsonFormsFieldRendererRegistryEntry[], { type, tester, field }: ValidFieldReducerActions) => JsonFormsFieldRendererRegistryEntry[];
export {};
