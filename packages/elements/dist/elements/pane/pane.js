var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../card';
import styles from './pane.scss';
/**
 * @prop {String} label - If set, defines the text label.
 * @prop {String} icon - If set, defines the icon shown close to the label.
 * @prop {'row'|'column'} flexDirection - Defines the direction in which the slotted content flows (e.g. top to bottom or left to right). Possible values are `column` and `row`.
 * @prop {'s'|'m'|'l'} size - Defines the size (width) of the component. Possible values are `s`(80px), `m`(120px) and `l`(320px).
 *
 * @slot - Displayed inside the content area.
 * @slot header - If used, the header slot is shown on top of the component, below the label (if any is set).
 * @slot functions - Displayed on the right side of the label or header slot.
 * @slot footer - Displayed below the content area.
 *
 * @cssprop --body-gap - Defines the gap between elements in the body slot.
 * @cssprop --header-gap - Defines the gap between elements in the header slot.
 * @cssprop --functions-gap - Defines the gap between elements in the functions slot.
 * @cssprop --footer-gap - Defines the gap between elements in the footer slot.
 */
let Pane = class Pane extends LitElement {
    constructor() {
        super(...arguments);
        this.flexDirection = 'column';
        this.size = 'l';
        // readonly properties
        this.emptyHeader = true;
        this.emptyFunctions = true;
        this.emptyFooter = true;
    }
    static get styles() {
        return styles;
    }
    render() {
        return html `
      <air-card
        label="${this.label ? this.label : ''}"
        icon="${this.icon ? this.icon : ''}"
        flex-direction="${this.flexDirection}"
      >
        <slot></slot>
        <slot
          name="header"
          slot="${this.emptyHeader ? '' : 'header'}"
          @slotchange="${(e) => (this.emptyHeader = e.target.assignedNodes().length === 0)}"
        ></slot>
        <slot
          name="functions"
          slot="${this.emptyFunctions ? '' : 'functions'}"
          @slotchange="${(e) => (this.emptyFunctions = e.target.assignedNodes().length === 0)}"
        ></slot>
        <slot
          name="footer"
          slot="${this.emptyFooter ? '' : 'footer'}"
          @slotchange="${(e) => (this.emptyFooter = e.target.assignedNodes().length === 0)}"
        ></slot>
      </air-card>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
    }
};
__decorate([
    property({ type: String, reflect: true })
], Pane.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], Pane.prototype, "icon", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'flex-direction' })
], Pane.prototype, "flexDirection", void 0);
__decorate([
    property({ type: String, reflect: true })
], Pane.prototype, "size", void 0);
__decorate([
    state()
], Pane.prototype, "emptyHeader", void 0);
__decorate([
    state()
], Pane.prototype, "emptyFunctions", void 0);
__decorate([
    state()
], Pane.prototype, "emptyFooter", void 0);
Pane = __decorate([
    customElement('air-pane')
], Pane);
export { Pane };
//# sourceMappingURL=pane.js.map