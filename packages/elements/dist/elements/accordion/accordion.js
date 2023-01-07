var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../icon';
import '../card';
import styles from './accordion.styles.scss';
/**
 * @prop {String} label -	Defines the text label.
 * @prop {String} icon - If set, defines the icon shown before the label.
 * @prop {Boolean} expanded -	If set to true, expands the accordion to display its content.
 * @prop {Boolean} disabled -	If set to true, disables mouse clicks and the style gets updated.
 *
 * @slot - Displayed inside the accordion when it is expanded.
 * @slot header - If used, the header slot replaces the default text label and expand arrow with custom content.
 * @slot functions - Displayed close to the 'expand' arrow.
 * @slot footer - Displayed below the content when it is expanded.
 *
 * @cssprop --body-gap - Defines the gap between elements in the body slot.
 * @cssprop --header-gap - Defines the gap between elements in the header slot.
 * @cssprop --functions-gap - Defines the gap between elements in the functions slot.
 * @cssprop --footer-gap - Defines the gap between elements in the footer slot.
 */
let AirAccordion = class AirAccordion extends LitElement {
    constructor() {
        super(...arguments);
        this.label = 'Label';
        // readonly properties
        this.emptyHeader = true;
        this.emptyFunctions = true;
        this.emptyBody = true;
        this.emptyFooter = true;
    }
    static get styles() {
        return styles;
    }
    render() {
        return html `
      <air-card
        @click="${() => (!this.expanded ? (this.expanded = true) : '')}"
      >
        <slot
          name="header"
          slot="header"
          @click="${(e) => this.handleCollapse(e)}"
        >
          <div class="header">
            ${this.icon
            ? html ` <air-icon class="icon" icon="${this.icon}"></air-icon> `
            : ''}
            <p>${this.label}</p>
            <air-icon
              button
              class="expand"
              icon="keyboard_arrow_down"
            ></air-icon>
          </div>
        </slot>
        <slot name="functions" slot="functions"></slot>
        <slot></slot>
        ${this.expanded
            ? html `
              <slot
                name="footer"
                slot="${this.emptyFooter ? 'hidden' : 'footer'}"
                @slotchange="${(e) => (this.emptyFooter = e.target.assignedNodes().length === 0)}"
              ></slot>
            `
            : ''}
      </air-card>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
    }
    connectedCallback() {
        super.connectedCallback();
        // remove card padding
        setTimeout(() => {
            var _a, _b, _c;
            const topNode = (_c = (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('air-card')) === null || _b === void 0 ? void 0 : _b.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('.top');
            if (topNode) {
                topNode.style.padding = '0';
            }
        }, 0);
    }
    handleCollapse(e) {
        if (this.expanded) {
            this.expanded = false;
            e.stopPropagation();
        }
    }
};
__decorate([
    property({ type: String, reflect: true })
], AirAccordion.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], AirAccordion.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], AirAccordion.prototype, "expanded", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], AirAccordion.prototype, "disabled", void 0);
__decorate([
    state()
], AirAccordion.prototype, "emptyHeader", void 0);
__decorate([
    state()
], AirAccordion.prototype, "emptyFunctions", void 0);
__decorate([
    state()
], AirAccordion.prototype, "emptyBody", void 0);
__decorate([
    state()
], AirAccordion.prototype, "emptyFooter", void 0);
AirAccordion = __decorate([
    customElement('air-accordion')
], AirAccordion);
export { AirAccordion };
//# sourceMappingURL=accordion.js.map