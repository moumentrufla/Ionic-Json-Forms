import { ControlElement, LabelDescription } from '../models/uischema';
export declare const createCleanLabel: (label: string) => string;
/**
 * Return a label object based on the given control element.
 * @param {ControlElement} withLabel the UI schema to obtain a label object for
 * @returns {LabelDescription}
 */
export declare const createLabelDescriptionFrom: (withLabel: ControlElement) => LabelDescription;
