import { JsonSchema, UISchemaElement } from '..';
export interface JsonFormsLocaleState {
    locale?: string;
    localizedSchemas: Map<string, JsonSchema>;
    localizedUISchemas: Map<string, UISchemaElement>;
}
export declare const i18nReducer: (state: JsonFormsLocaleState, action: any) => {
    localizedSchemas: any;
    locale?: string;
    localizedUISchemas: Map<string, UISchemaElement>;
} | {
    localizedUISchemas: any;
    locale?: string;
    localizedSchemas: Map<string, JsonSchema>;
} | {
    locale: any;
    localizedSchemas: Map<string, JsonSchema>;
    localizedUISchemas: Map<string, UISchemaElement>;
};
export declare const fetchLocale: (state?: JsonFormsLocaleState) => string;
export declare const findLocalizedSchema: (locale: string) => (state?: JsonFormsLocaleState) => JsonSchema;
export declare const findLocalizedUISchema: (locale: string) => (state?: JsonFormsLocaleState) => UISchemaElement;
