import { LitElement, PropertyValueMap } from "lit";
export declare class Knob extends LitElement {
    turn: number;
    step: number;
    static get styles(): any;
    connectedCallback(): void;
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    attributeChangedCallback(name: string, oldval: string, newval: string): void;
    private handleTurnPosition;
    render(): import("lit-html").TemplateResult<1>;
}
