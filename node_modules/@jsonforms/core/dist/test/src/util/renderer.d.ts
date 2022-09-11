import { RankedTester } from '../testers';
import { JsonSchema } from '../models/jsonSchema';
import { ControlElement, UISchemaElement } from '../models/uischema';
import { ErrorObject } from 'ajv';
import { JsonFormsState } from '../store';
import { AnyAction, Dispatch } from 'redux';
import { JsonFormsRendererRegistryEntry } from '../reducers/renderers';
export { JsonFormsRendererRegistryEntry };
export interface Labels {
    default: string;
    [additionalLabels: string]: string;
}
export declare const isPlainLabel: (label: string | Labels) => label is string;
/**
 * Adds an asterisk to the given label string based
 * on the required parameter.
 *
 * @param {string} label the label string
 * @param {boolean} required whether the label belongs to a control which is required
 * @returns {string} the label string
 */
export declare const computeLabel: (label: string, required: boolean) => string;
/**
 * Create a default value based on the given scheam.
 * @param schema the schema for which to create a default value.
 * @returns {any}
 */
export declare const createDefaultValue: (schema: JsonSchema) => {};
/**
 * Whether an element's description should be hidden.
 *
 * @param visible whether an element is visible
 * @param description the element's description
 * @param isFocused whether the element is focused
 *
 * @returns {boolean} true, if the description is to be hidden, false otherwise
 */
export declare const isDescriptionHidden: (visible: boolean, description: string, isFocused: boolean) => boolean;
export interface WithClassname {
    className?: string;
}
export interface OwnPropsOfRenderer {
    /**
     * The UI schema to be rendered.
     */
    uischema?: UISchemaElement;
    /**
     * The JSON schema that describes the data.
     */
    schema?: JsonSchema;
    /**
     * Whether the rendered element should be enabled.
     */
    enabled?: boolean;
    /**
     * Whether the rendered element should be visible.
     */
    visible?: boolean;
    /**
     * Optional instance path. Necessary when the actual data
     * path can not be inferred via the UI schema element as
     * it is the case with nested controls.
     */
    path?: string;
}
export interface OwnPropsOfControl extends OwnPropsOfRenderer {
    id?: string;
    uischema?: ControlElement;
}
export interface OwnPropsOfEnum {
    options?: any[];
}
/**
 * State-based props of a {@link Renderer}.
 */
export interface StatePropsOfRenderer extends OwnPropsOfRenderer {
    /**
     * Any configuration options for the element.
     */
    config?: any;
}
/**
 * State-based properties for UI schema elements that have a scope.
 */
export interface StatePropsOfScopedRenderer extends OwnPropsOfControl, StatePropsOfRenderer {
    uischema: ControlElement;
    /**
     * Any validation errors that are caused by the data to be rendered.
     */
    errors?: any[];
    /**
     * The data to be rendered.
     */
    data?: any;
    /**
     * The absolute dot-separated path to the value being rendered.
     * A path is a sequence of property names separated by dots,
     * e.g. for accessing the value of b in the object
     * { foo: { a: { b: 42 } } }, one would use foo.a.b.
     */
    path: string;
    /**
     * Path of the parent renderer, if any.
     */
    parentPath?: string;
    /**
     * The sub-schema that describes the data this element is bound to.
     */
    scopedSchema: JsonSchema;
    /**
     * Finds a registered UI schema to use, if any.
     * @param schema the JSON schema describing the data to be rendered
     * @param schemaPath the according schema path
     * @param path the instance path
     * @param fallbackLayoutType the type of the layout to use
     * @param control may be checked for embedded inline uischema options
     */
    findUISchema(schema: JsonSchema, schemaPath: string, path: string, fallbackLayoutType?: string, control?: ControlElement): UISchemaElement;
}
/**
 * Props of a {@link Renderer}.
 */
export interface RendererProps extends StatePropsOfRenderer {
}
/**
 * State-based props of a Control
 */
export interface StatePropsOfControl extends StatePropsOfScopedRenderer {
    fields?: {
        tester: RankedTester;
        field: any;
    }[];
    /**
     * The label for the rendered element.
     */
    label: string | Labels;
    /**
     * Description of input field
     */
    description?: string;
    /**
     * Whether the rendered data is required.
     */
    required?: boolean;
}
/**
 * Dispatch-based props of a Control.
 */
export interface DispatchPropsOfControl {
    /**
     * Update handler that emits a data change
     *
     * @param {string} path the path to the data to be updated
     * @param {any} value the new value that should be written to the given path
     */
    handleChange?(path: string, value: any): void;
}
/**
 * Props of a Control.
 */
export interface ControlProps extends StatePropsOfControl, DispatchPropsOfControl {
}
/**
 * State props of a layout;
 */
export interface StatePropsOfLayout extends OwnPropsOfRenderer {
    /**
     * All available renderers.
     */
    renderers?: any[];
}
/**
 * The state of a control.
 */
export interface ControlState {
    /**
     * The current value.
     */
    value: any;
    /**
     * Whether the control is focused.
     */
    isFocused: boolean;
}
/**
 * Map state to control props.
 * @param state the store's state
 * @param ownProps any own props
 * @returns {StatePropsOfControl} state props for a control
 */
export declare const mapStateToControlProps: (state: JsonFormsState, ownProps: OwnPropsOfControl) => StatePropsOfControl;
/**
 *
 * Map dispatch to control props.
 *
 * @param dispatch the store's dispatch method
 * @returns {DispatchPropsOfControl} dispatch props for a control
 */
export declare const mapDispatchToControlProps: (dispatch: Dispatch<AnyAction>) => DispatchPropsOfControl;
/**
 * State-based props of a table control.
 */
export interface StatePropsOfArrayControl extends StatePropsOfControl {
    childErrors?: ErrorObject[];
}
/**
 * Map state to table props
 *
 * @param state the store's state
 * @param ownProps any element's own props
 * @returns {StatePropsOfArrayControl} state props for a table control
 */
export declare const mapStateToArrayControlProps: (state: JsonFormsState, ownProps: OwnPropsOfControl) => StatePropsOfArrayControl;
/**
 * Dispatch props of a table control
 */
export interface DispatchPropsOfArrayControl {
    addItem(path: string): () => void;
    removeItems(path: string, toDelete: any[]): () => void;
}
/**
 * Maps state to dispatch properties of an array control.
 *
 * @param dispatch the store's dispatch method
 * @param ownProps own properties
 * @returns {DispatchPropsOfArrayControl} dispatch props of an array control
 */
export declare const mapDispatchToArrayControlProps: (dispatch: Dispatch<AnyAction>, ownProps: OwnPropsOfControl) => DispatchPropsOfArrayControl;
/**
 * Props of an array control.
 */
export interface ArrayControlProps extends StatePropsOfArrayControl, DispatchPropsOfArrayControl {
}
/**
 * Map state to layout props.
 * @param state JSONForms state tree
 * @param ownProps any own props
 * @returns {StatePropsOfLayout}
 */
export declare const mapStateToLayoutProps: (state: JsonFormsState, ownProps: StatePropsOfRenderer) => StatePropsOfLayout;
export interface OwnPropsOfJsonFormsRenderer extends OwnPropsOfRenderer {
    renderers?: JsonFormsRendererRegistryEntry[];
}
export interface JsonFormsProps extends StatePropsOfRenderer {
    renderers?: JsonFormsRendererRegistryEntry[];
}
export interface StatePropsOfJsonFormsRenderer extends OwnPropsOfJsonFormsRenderer {
}
export declare const mapStateToJsonFormsRendererProps: (state: JsonFormsState, ownProps: OwnPropsOfJsonFormsRenderer) => StatePropsOfJsonFormsRenderer;
