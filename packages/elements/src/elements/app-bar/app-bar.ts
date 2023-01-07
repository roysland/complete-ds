import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import styles from './app-bar.styles.scss'
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
  @property({ type: String, reflect: true }) label: string | undefined;
  @property({ type: String, reflect: true }) logo: string | undefined;
  @property({ type: Boolean, reflect: true }) mobile: boolean | undefined;
  

  static get styles() {
    return styles
  }

  render() {
    return html`
      ${!this.mobile
        ? html`
            ${this.logo
              ? html`
                  <img
                    class="logo"
                    alt="${this.label}"
                    title="${this.label}"
                    src="${this.logo}"
                    @click="${() => this.handleLogoClick()}"
                  />
                `
              : ''}
            ${this.label ? html` <div class="label">${this.label}</div> ` : ''}
            <slot></slot>
            <slot name="functions"></slot>
          `
        : html`
            <slot name="left"></slot>
            ${this.label ? html` <div class="label">${this.label}</div> ` : ''}
            <slot name="right"></slot>
          `}
    `;
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }

  handleLogoClick() {
    this.dispatchEvent(new Event('logo-clicked'));
  }
}

if (!window.customElements.get('air-app-bar')) {
  window.customElements.define('air-app-bar', AppBar);
}
