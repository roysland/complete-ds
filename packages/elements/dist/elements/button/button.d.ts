import { LitElement } from 'lit';
export declare class AirButton extends LitElement {
    label: string | undefined;
    icon: string | undefined;
    variant: 'primary' | 'secondary' | 'tertiary';
    disabled: boolean | undefined;
    static get styles(): any;
    render(): import("lit-html").TemplateResult<1>;
    attributeChangedCallback(name: string, oldval: string, newval: string): void;
}
