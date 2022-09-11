import { RankedTester } from '../testers';
import { AddRendererAction, RemoveRendererAction } from '../actions';
export interface JsonFormsRendererRegistryEntry {
    tester: RankedTester;
    renderer: any;
}
declare type ValidRendererReducerActions = AddRendererAction | RemoveRendererAction;
export declare const rendererReducer: (state: JsonFormsRendererRegistryEntry[], action: ValidRendererReducerActions) => JsonFormsRendererRegistryEntry[];
export {};
