import { LitElement } from 'lit';
/**
 * @prop {'horizontal'|'vertical'} orientation	- Defines the orientation of the component. Possible values are `horizontal` and `vertical`.
 *
 * @slot - Hosts air-tab-items.
 */
export declare class Tabs extends LitElement {
    orientation: 'horizontal' | 'vertical';
    static get styles(): any;
    render(): import("lit-html").TemplateResult<1>;
    handleOrientation(): void;
    attributeChangedCallback(name: string, oldval: string, newval: string): void;
}
