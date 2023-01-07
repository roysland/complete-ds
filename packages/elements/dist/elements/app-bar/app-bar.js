var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import styles from './app-bar.styles.scss';
/**
 * @prop {String} label -	If set, defines the text label shown on the left side (if mobile is unset).
 * @prop {String} logo - If set, defines the logo shown on the left side.
 * @prop {Boolean} mobile - If set, toggles the mobile variation.
 *
 * @slot - The central content area. Used for hosting components such as Tabs.
 * @slot functions - Displayed on the right side (if mobile is unset). Used for hosting components such as Icon and Avatar.
 * @slot left - Displayed on the left side (if mobile is set to true). Used for hosting components such as Icon.
 * @slot right - Displayed on the right side (if mobile is set to true). Used for hosting components such as Icon.
 *
 * @fires logo-clicked - Fired when clicking on the logo.
 *
 * @cssprop --functions-gap - Defines the gap between elements in the functions slot.
 */
export class AppBar extends LitElement {
    static get styles() {
        return styles;
    }
    render() {
        return html `
      ${!this.mobile
            ? html `
            ${this.logo
                ? html `
                  <img
                    class="logo"
                    src="${this.logo}"
                    @click="${() => this.handleLogoClick()}"
                  />
                `
                : ''}
            ${this.label ? html ` <div class="label">${this.label}</div> ` : ''}
            <slot></slot>
            <slot name="functions"></slot>
          `
            : html `
            <slot name="left"></slot>
            ${this.label ? html ` <div class="label">${this.label}</div> ` : ''}
            <slot name="right"></slot>
          `}
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
    }
    handleLogoClick() {
        this.dispatchEvent(new Event('logo-clicked'));
    }
}
__decorate([
    property({ type: String, reflect: true })
], AppBar.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], AppBar.prototype, "logo", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], AppBar.prototype, "mobile", void 0);
if (!window.customElements.get('air-app-bar')) {
    window.customElements.define('air-app-bar', AppBar);
}
//# sourceMappingURL=app-bar.js.map