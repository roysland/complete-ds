var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './textarea.scss';
/**
 * @prop {String} label - If set, defines the text label shown on top.
 * @prop {String} value - If set, defines the value of the input. Changes upon user interaction.
 * @prop {Number} rows - Defines the visible number of lines in a text area.
 * @prop {Boolean} active - If set to true, highlights the label and underline.
 * @prop {Boolean} disabled - If set to true, disables mouse clicks and the style gets updated.
 * @prop {Boolean} readonly - If set to true, disables the input without reducing the opacity.
 * @prop {Boolean} autofocus - If set to true, the component gets focused as soon as the page loads.
 */
let Textarea = class Textarea extends LitElement {
    static get styles() {
        return styles;
    }
    render() {
        return html `
      <div class="center">
        ${this.label ? html ` <label class="label">${this.label}</label> ` : ''}
        <textarea
          .value="${this.value !== undefined ? this.value : ''}"
          .rows="${this.rows}"
          .columns="${this.rows}"
          ?autofocus="${this.autofocus}"
          ?disabled="${this.disabled}"
          ?readonly="${this.readonly}"
          @focus="${() => (this.active = true)}"
          @blur="${() => (this.active = false)}"
          @input="${this.handleChange}"
        ></textarea>
      </div>
    `;
    }
    constructor() {
        super();
        this.rows = 1;
        this.autofocus = false;
        this.addEventListener('click', () => {
            var _a, _b;
            this.active = true;
            (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('textarea')) === null || _b === void 0 ? void 0 : _b.focus();
        });
    }
    handleChange(e) {
        this.value = e.target.value;
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true,
        }));
    }
    handleClear() {
        this.value = undefined;
        this.removeAttribute('value');
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
    }
};
__decorate([
    property({ type: String, reflect: true })
], Textarea.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], Textarea.prototype, "value", void 0);
__decorate([
    property({ type: Number, reflect: true })
], Textarea.prototype, "rows", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Textarea.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Textarea.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Textarea.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Textarea.prototype, "autofocus", void 0);
Textarea = __decorate([
    customElement('air-textarea')
], Textarea);
export { Textarea };
//# sourceMappingURL=textarea.js.map