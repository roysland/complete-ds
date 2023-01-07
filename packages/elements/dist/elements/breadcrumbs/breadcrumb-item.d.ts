import { LitElement } from 'lit';
import '../icon';
import '../text';
/**
 * @prop {String} label - Defines the text label.
 * @prop {Boolean} active - Defines whether the item is currently active or not.
 */
export declare class AirBreadcrumbItem extends LitElement {
    label: string;
    active: boolean | undefined;
    static get styles(): any;
    render(): import("lit-html").TemplateResult<1>;
    attributeChangedCallback(name: string, oldval: string, newval: string): void;
    firstItem(): boolean;
}
