import { LitElement } from 'lit';
/**
 * @prop {'horizontal'|'vertical'} orientation - Defines the orientation of the component. Possible values are `horizontal` and `vertical`.
 *
 * @slot - Hosts air-stepper-items.
 */
export declare class Stepper extends LitElement {
    orientation: 'horizontal' | 'vertical';
    static get styles(): any;
    render(): import("lit-html").TemplateResult<1>;
    attributeChangedCallback(name: string, oldval: string, newval: string): void;
    handleOrientation(): void;
    handleItems(): void;
}
