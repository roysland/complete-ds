import { LitElement } from 'lit';
import '../icon';
export declare class AirCard extends LitElement {
    label: string | undefined;
    icon: string | undefined;
    image: string | undefined;
    flexDirection: 'column' | 'row';
    flat: boolean | undefined;
    emptyHeader: boolean;
    emptyFunctions: boolean;
    emptyFooter: boolean;
    static get styles(): any;
    render(): import("lit-html").TemplateResult<1>;
    attributeChangedCallback(name: string, oldval: string, newval: string): void;
}
