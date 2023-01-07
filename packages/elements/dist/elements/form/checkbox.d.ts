import { LitElement } from 'lit';
import '../icon';
import '../text';
/**
 * @prop {String} label -	If set, defines the text label.
 * @prop {Boolean} active - If set to true, a highlight style gets applied.
 * @prop {Boolean} disabled - If set to true, disables mouse clicks and the style gets updated.
 */
export declare class AirCheckbox extends LitElement {
    label: string | undefined;
    checked: boolean | undefined;
    disabled: boolean | undefined;
    static get styles(): any;
    render(): import("lit-html").TemplateResult<1>;
    toggle(keyEvent: KeyboardEvent): void;
    attributeChangedCallback(name: string, oldval: string, newval: string): void;
    connectedCallback(): void;
    handleChange(): void;
}
