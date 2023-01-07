var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../icon';
import '../text';
import styles from './checkbox.styles.scss';
/**
 * @prop {String} label -	If set, defines the text label.
 * @prop {Boolean} active - If set to true, a highlight style gets applied.
 * @prop {Boolean} disabled - If set to true, disables mouse clicks and the style gets updated.
 */
let AirCheckbox = class AirCheckbox extends LitElement {
    static get styles() {
        return styles;
    }
    render() {
        return html `
      <input
        type="checkbox"
        ?checked="${this.checked}"
        ?readonly="${this.disabled}"
        .value="${this.label}"
        .name="${this.label}"
        @change="${this.handleChange}"
      />
      <div class="box" tabindex="0" @keyup="${this.toggle}">
        ${this.checked
            ? html ` <air-icon icon="check" size="s" color="white"></air-icon> `
            : ''}
      </div>
      ${this.label ? html ` <air-text>${this.label}</air-text> ` : ''}
    `;
    }
    toggle(keyEvent) {
        console.log(keyEvent);
        if (keyEvent.code === 'Space') {
            this.checked = !this.checked;
        }
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', () => {
            this.checked = !this.checked;
        });
    }
    handleChange() {
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true,
        }));
    }
};
__decorate([
    property({ type: String, reflect: true })
], AirCheckbox.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], AirCheckbox.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], AirCheckbox.prototype, "disabled", void 0);
AirCheckbox = __decorate([
    customElement('air-checkbox')
], AirCheckbox);
export { AirCheckbox };
//# sourceMappingURL=checkbox.js.map