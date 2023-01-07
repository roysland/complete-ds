var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './radio.scss';
import '../text';
/**
 * @prop {String} label - If set, defines the text label.
 * @prop {Boolean} active - If set to true, a highlight style gets applied. Only one item can be active at a time.
 * @prop {Boolean} disabled - If set to true, disables mouse clicks and the style gets updated.
 */
let RadioButton = class RadioButton extends LitElement {
    static get styles() {
        return styles;
    }
    render() {
        return html `
      <input
        type="radio"
        ?checked="${this.active}"
        .value="${this.label}"
        .name="${this.label}"
        @change="${this.handleChange}"
      />
      <div class="circle"></div>
      ${this.label ? html ` <air-text>${this.label}</air-text> ` : ''}
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', () => this.handleActive());
    }
    handleChange() {
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true,
        }));
    }
    handleActive() {
        var _a;
        let siblings = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.childNodes;
        siblings === null || siblings === void 0 ? void 0 : siblings.forEach((el) => {
            el.active = false;
        });
        this.active = true;
    }
};
__decorate([
    property({ type: String, reflect: true })
], RadioButton.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], RadioButton.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], RadioButton.prototype, "disabled", void 0);
RadioButton = __decorate([
    customElement('air-radio')
], RadioButton);
export { RadioButton };
//# sourceMappingURL=radio.js.map