var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import buttonStyles from './button.styles.scss';
let AirButton = class AirButton extends LitElement {
    constructor() {
        super(...arguments);
        this.variant = 'primary';
    }
    static get styles() {
        return buttonStyles;
    }
    render() {
        return html `
          <slot name="icon">
            ${this.icon ? html ` <air-icon icon="${this.icon}"></air-icon> ` : ''}
          </slot>
          <slot> ${this.label ? html ` ${this.label} ` : ''}</slot>
        `;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
    }
};
__decorate([
    property({ type: String, reflect: true })
], AirButton.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], AirButton.prototype, "icon", void 0);
__decorate([
    property({ type: String, reflect: true })
], AirButton.prototype, "variant", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], AirButton.prototype, "disabled", void 0);
AirButton = __decorate([
    customElement('air-button')
], AirButton);
export { AirButton };
//# sourceMappingURL=button.js.map