var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../text';
import styles from './toggle.scss';
/**
 * @prop {String} label - If set, defines the text label.
 * @prop {Boolean} active - If set to true, a highlight style gets applied.
 * @prop {Boolean} disabled - If set to true, disables mouse clicks and the style gets updated.
 */
let Toggle = class Toggle extends LitElement {
    static get styles() {
        return styles;
    }
    render() {
        return html `
      <input
        type="checkbox"
        ?checked="${this.active}"
        ?readonly="${this.disabled}"
        .value="${this.label}"
        .name="${this.label}"
        @change="${this.handleChange}"
      />
      <div class="bg">
        <div class="dot"></div>
      </div>
      ${this.label ? html ` <air-text>${this.label}</air-text> ` : ''}
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', () => {
            this.active = !this.active;
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
], Toggle.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Toggle.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Toggle.prototype, "disabled", void 0);
Toggle = __decorate([
    customElement('air-toggle')
], Toggle);
export { Toggle };
//# sourceMappingURL=toggle.js.map