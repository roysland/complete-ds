import { LitElement } from 'lit';
import '../icon';
import '../text';
/**
 * @prop {String} label - If set, defines the text label.
 * @prop {String} icon - If set, defines the icon shown besides the label.
 * @prop {Boolean} button - If set to true, hover and click effects will be added.
 * @prop {Boolean} removable - If set to true, a close icon is displayed. Clicking on it dispatches a remove event.
 *
 * @fires remove - Dispatched when clicking on the close icon (removable only).
 */
export declare class Tag extends LitElement {
    label: string;
    icon: string | undefined;
    button: boolean | undefined;
    removable: boolean | undefined;
    variant: String | undefined;
    color: String | undefined;
    static get styles(): any;
    render(): import("lit-html").TemplateResult<1>;
    attributeChangedCallback(name: string, oldval: string, newval: string): void;
    handleRemove(): void;
}
