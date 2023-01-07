var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import styles from './card.styles.scss';
import '../icon';
let AirCard = class AirCard extends LitElement {
    constructor() {
        super(...arguments);
        this.flexDirection = 'column';
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
      ${this.image ? html ` <img class="image" src="${this.image}" /> ` : ''}
      <div
        class="top ${this.emptyHeader &&
            this.emptyFunctions &&
            !this.label &&
            !this.icon
            ? 'empty'
            : ''}"
      >
        <div class="header">
          ${this.label || this.icon
            ? html `
                <div class="label">
                  ${this.icon
                ? html ` <air-icon icon="${this.icon}"></air-icon> `
                : ''}
                  <p>${this.label}</p>
                </div>
                ${!this.emptyHeader && (this.label || this.icon)
                ? html ` <div style="margin-top: var(--spacing-l)"></div> `
                : ''}
              `
            : ''}
          <slot
            name="header"
            @slotchange="${(e) => (this.emptyHeader = e.target.assignedNodes().length === 0)}"
            class="${this.emptyHeader ? 'empty' : ''}"
          ></slot>
        </div>
        <slot
          name="functions"
          @slotchange="${(e) => (this.emptyFunctions = e.target.assignedNodes().length === 0)}"
        ></slot>
      </div>
      <slot></slot>
      <slot
        name="footer"
        @slotchange="${(e) => (this.emptyFooter = e.target.assignedNodes().length === 0)}"
        class="${this.emptyFooter ? 'empty' : ''}"
      ></slot>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
    }
};
__decorate([
    property({ type: String, reflect: true })
], AirCard.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], AirCard.prototype, "icon", void 0);
__decorate([
    property({ type: String, reflect: true })
], AirCard.prototype, "image", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'flex-direction' })
], AirCard.prototype, "flexDirection", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], AirCard.prototype, "flat", void 0);
__decorate([
    state()
], AirCard.prototype, "emptyHeader", void 0);
__decorate([
    state()
], AirCard.prototype, "emptyFunctions", void 0);
__decorate([
    state()
], AirCard.prototype, "emptyFooter", void 0);
AirCard = __decorate([
    customElement('air-card')
], AirCard);
export { AirCard };
//# sourceMappingURL=card.js.map