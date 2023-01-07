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
import { styles } from './tab-item.scss';
/**
 * @prop {String} label - If set, defines the text label.
 * @prop {String} icon - If set, defines the icon shown above the label (if set).
 * @prop {Boolean} active - If set to true, a highlight style gets applied. Only one item can be active at a time.
 * @prop {Boolean} disabled - If set to true, disables mouse clicks and the style gets updated.
 * @prop {'horizontal'|'vertical'} orientation	- Defines the orientation of the component. Possible values are `horizontal` and `vertical`.
 *
 * @slot - The main content area. If used, replaces the label and icon elements.
 */
let TabItem = class TabItem extends LitElement {
    constructor() {
        super(...arguments);
        this.orientation = 'horizontal';
    }
    static get styles() {
        return styles;
    }
    render() {
        return html `
      <slot>
        ${this.icon ? html ` <air-icon icon="${this.icon}"></air-icon> ` : ''}
        ${this.label
            ? html ` <air-text class="label">${this.label}</air-text> `
            : ''}
      </slot>
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
        let siblings = (_a = this.closest('air-tabs')) === null || _a === void 0 ? void 0 : _a.querySelectorAll('air-tab-item');
        siblings.forEach((el) => {
            el.active = false;
        });
        this.active = true;
    }
};
__decorate([
    property({ type: String, reflect: true })
], TabItem.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], TabItem.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], TabItem.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], TabItem.prototype, "disabled", void 0);
__decorate([
    property({ type: String, reflect: true })
], TabItem.prototype, "orientation", void 0);
TabItem = __decorate([
    customElement('air-tab-item')
], TabItem);
export { TabItem };
//# sourceMappingURL=tab-item.js.map