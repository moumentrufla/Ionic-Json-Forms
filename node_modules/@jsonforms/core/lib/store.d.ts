import { Store } from 'redux';
import { JsonFormsCore } from './reducers/core';
import { JsonFormsFieldRendererRegistryEntry } from './reducers/fields';
import { JsonFormsRendererRegistryEntry } from './reducers/renderers';
import { JsonFormsLocaleState } from './reducers/i18n';
/**
 * JSONForms store.
 */
export interface JsonFormsStore extends Store<JsonFormsState> {
}
/**
 * The state shape of JSONForms.
 */
export interface JsonFormsState {
    /**
     * Represents JSONForm's sub-state.
     */
    jsonforms: JsonFormsSubStates;
}
export interface JsonFormsSubStates {
    /**
     * Substate for storing mandatory sub-state.
     */
    core?: JsonFormsCore;
    /**
     * Global configuration options.
     */
    config?: any;
    /**
     * All available renderers.
     */
    renderers?: JsonFormsRendererRegistryEntry[];
    /**
     * All available field renderers.
     */
    fields?: JsonFormsFieldRendererRegistryEntry[];
    /**
     *
     */
    i18n?: JsonFormsLocaleState;
    [additionalState: string]: any;
}
export interface JsonFormsExtendedState<T> extends JsonFormsState {
    jsonforms: {
        [subState: string]: T;
    };
}
