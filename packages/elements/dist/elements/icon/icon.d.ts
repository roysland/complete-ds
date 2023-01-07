import { LitElement } from 'lit';
export declare class Icon extends LitElement {
    icon: string | undefined;
    color: string | undefined;
    size: 's' | 'm' | 'l' | 'xl';
    button: boolean | undefined;
    disabled: boolean | undefined;
    static get styles(): any;
    render(): import("lit-html").TemplateResult<1>;
    attributeChangedCallback(name: string, oldval: string, newval: string): void;
    private setBackgroundImage;
}
