import { OwnPropsOfControl, OwnPropsOfEnum, StatePropsOfField, StatePropsOfScopedRenderer } from '../util';
import { DispatchPropsOfControl } from './renderer';
import { JsonFormsState } from '../store';
import { AnyAction, Dispatch } from 'redux';
import { JsonFormsFieldRendererRegistryEntry } from '../reducers/fields';
export { JsonFormsFieldRendererRegistryEntry };
export interface OwnPropsOfField extends OwnPropsOfControl {
    data?: any;
}
/**
 * State props of a field.
 */
export interface StatePropsOfField extends StatePropsOfScopedRenderer {
    isValid: boolean;
}
export interface OwnPropsOfEnumField extends OwnPropsOfField, OwnPropsOfEnum {
}
/**
 * State props of a field for enum field
 */
export interface StatePropsOfEnumField extends StatePropsOfField, OwnPropsOfEnum {
}
/**
 * Props of an enum field.
 */
export interface EnumFieldProps extends StatePropsOfEnumField, DispatchPropsOfControl {
}
export declare type DispatchPropsOfField = DispatchPropsOfControl;
/**
 * Props of a field.
 */
export interface FieldProps extends StatePropsOfField, DispatchPropsOfField {
}
/**
 * Registers the given field renderer when a JSON Forms store is created.
 * @param {RankedTester} tester
 * @param field the field to be registered
 * @returns {any}
 */
export interface DispatchFieldStateProps extends FieldProps {
    fields?: JsonFormsFieldRendererRegistryEntry[];
}
/**
 * Map state to field props.
 *
 * @param state JSONForms state tree
 * @param ownProps any own props
 * @returns {StatePropsOfField} state props of a field
 */
export declare const mapStateToFieldProps: (state: JsonFormsState, ownProps: OwnPropsOfField) => StatePropsOfField;
export declare const mapStateToDispatchFieldProps: (state: JsonFormsState, ownProps: OwnPropsOfField) => DispatchFieldStateProps;
export interface DispatchFieldProps extends DispatchFieldStateProps {
    showError: boolean;
}
/**
 * Default mapStateToFieldProps for enum field. Options is used for populating dropdown list
 * @param state
 * @param ownProps
 * @returns {StatePropsOfEnumField}
 */
export declare const defaultMapStateToEnumFieldProps: (state: JsonFormsState, ownProps: OwnPropsOfEnumField) => StatePropsOfEnumField;
/**
 * Synonym for mapDispatchToControlProps.
 *
 * @type {(dispatch) => {handleChange(path, value): void}}
 */
export declare const mapDispatchToFieldProps: (dispatch: Dispatch<AnyAction>) => DispatchPropsOfControl;
/**
 * Default dispatch to control props which can be customized to set handleChange action
 *
 */
export declare const defaultMapDispatchToControlProps: (dispatch: Dispatch<AnyAction>, ownProps: any) => DispatchPropsOfControl;
