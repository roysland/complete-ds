import { LitElement } from 'lit';
export declare class TableRow extends LitElement {
    active: boolean | undefined;
    static get styles(): import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
    attributeChangedCallback(name: string, oldval: string, newval: string): void;
    connectedCallback(): void;
    handleActive(): void;
    handleColumns(): void;
}
