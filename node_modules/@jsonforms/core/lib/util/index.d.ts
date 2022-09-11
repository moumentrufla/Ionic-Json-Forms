import { JsonFormsState, JsonSchema, Scopable, StatePropsOfRenderer } from '../';
import { compose as composePaths, composeWithUi, toDataPath } from './path';
import { isEnabled, isVisible } from './runtime';
export { createCleanLabel, createLabelDescriptionFrom } from './label';
/**
 * Escape the given string such that it can be used as a class name,
 * i.e. hashes and slashes will be replaced.
 *
 * @param {string} s the string that should be converted to a valid class name
 * @returns {string} the escaped string
 */
export declare const convertToValidClassName: (s: string) => string;
export declare const formatErrorMessage: (errors: string[]) => string;
/**
 * Convenience wrapper around resolveData and resolveSchema.
 */
declare const Resolve: {
    schema(schema: JsonSchema, schemaPath: string): JsonSchema;
    data(data: any, path: string): any;
};
export { resolveData, resolveSchema } from './resolvers';
export { Resolve };
declare const Paths: {
    compose: (path1: string, path2: string) => string;
    fromScopable: (scopable: Scopable) => string;
};
export { composePaths, composeWithUi, Paths, toDataPath };
declare const Runtime: {
    isEnabled(props: StatePropsOfRenderer, state: JsonFormsState): boolean;
    isVisible(props: StatePropsOfRenderer, state: JsonFormsState): boolean;
};
export { isEnabled, isVisible, Runtime };
export * from './renderer';
export * from './field';
export * from './runtime';
export * from './Formatted';
export * from './ids';
export * from './validator';
