import { UISchemaElement } from '../models/uischema';
import { StatePropsOfRenderer } from './renderer';
import { JsonFormsState } from '../store';
export declare const evalVisibility: (uischema: UISchemaElement, data: any, path?: string) => boolean;
export declare const evalEnablement: (uischema: UISchemaElement, data: any, path?: string) => boolean;
export declare const isVisible: (props: StatePropsOfRenderer, state: JsonFormsState, path?: string) => boolean;
export declare const isEnabled: (props: StatePropsOfRenderer, state: JsonFormsState, path?: string) => boolean;
