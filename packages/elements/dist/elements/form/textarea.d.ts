import { LitElement } from 'lit';
/**
 * @prop {String} label - If set, defines the text label shown on top.
 * @prop {String} value - If set, defines the value of the input. Changes upon user interaction.
 * @prop {Number} rows - Defines the visible number of lines in a text area.
 * @prop {Boolean} active - If set to true, highlights the label and underline.
 * @prop {Boolean} disabled - If set to true, disables mouse clicks and the style gets updated.
 * @prop {Boolean} readonly - If set to true, disables the input without reducing the opacity.
 * @prop {Boolean} autofocus - If set to true, the component gets focused as soon as the page loads.
 */
export declare class Textarea extends LitElement {
    label: string | undefined;
    value: string | undefined;
    rows: number;
    active: boolean | undefined;
    disabled: boolean | undefined;
    readonly: boolean | undefined;
    autofocus: boolean;
    static get styles(): any;
    render(): import("lit-html").TemplateResult<1>;
    constructor();
    handleChange(e: Event): void;
    handleClear(): void;
    attributeChangedCallback(name: string, oldval: string, newval: string): void;
}
