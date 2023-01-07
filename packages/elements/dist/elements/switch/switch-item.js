var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '../icon';
import '../text';
import styles from './switch-item.scss';
/**
 * @prop {String} label - If set, defines the text label.
 * @prop {String} icon - If set, defines the icon shown instead of text label.
 * @prop {Boolean} active - If set to true, a highlight style gets applied. Only one item can be active at a time.
 * @prop {Boolean} disabled - If set to true, disables mouse clicks and the style gets updated.
 */
let SwitchItem = class SwitchItem extends LitElement {
    static get styles() {
        return styles;
    }
    render() {
        return html `
      ${this.icon ? html ` <air-icon icon="${this.icon}"></air-icon> ` : ''}
      ${this.label && !this.icon
            ? html ` <air-text class="label">${this.label}</air-text> `
            : ''}
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
    handleActive() {
        var _a;
        let siblings = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.childNodes;
        siblings.forEach((el) => {
            el.active = false;
        });
        this.active = true;
    }
};
__decorate([
    property({ type: String, reflect: true })
], SwitchItem.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], SwitchItem.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SwitchItem.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SwitchItem.prototype, "disabled", void 0);
SwitchItem = __decorate([
    customElement('air-switch-item')
], SwitchItem);
export { SwitchItem };
//# sourceMappingURL=switch-item.js.map