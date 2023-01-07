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
import styles from './menu-item.styles.scss';
/**
 * @prop {String} label - Defines the text label.
 * @prop {String} icon - If set, defines the icon shown before the label.
 * @prop {Boolean} active - If set to true, a highlight style gets applied.
 * @prop {Boolean} toggle - If set to true, clicking on the component will toggle the active property between true and false.
 * @prop {Boolean} disabled - If set to true, disables mouse clicks and the style gets updated.
 *
 * @slot - Displayed inside the content area.
 * @slot functions - Shown on the right side.
 */
let MenuItem = class MenuItem extends LitElement {
    constructor() {
        super(...arguments);
        this.label = 'Label';
        this.toggle = true;
    }
    static get styles() {
        return styles;
    }
    render() {
        return html `
      ${this.icon ? html ` <air-icon icon="${this.icon}"></air-icon> ` : ''}
      ${this.label ? html ` <air-text>${this.label}</air-text> ` : ''}
      <!-- functions slot -->
      <slot name="functions"></slot>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
        // add toggle click listener
        if (name == 'toggle' && this.toggle) {
            this.addEventListener('click', () => {
                this.active = !this.active;
            });
        }
    }
};
__decorate([
    property({ type: String, reflect: true })
], MenuItem.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], MenuItem.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MenuItem.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MenuItem.prototype, "toggle", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MenuItem.prototype, "disabled", void 0);
MenuItem = __decorate([
    customElement('air-menu-item')
], MenuItem);
export { MenuItem };
//# sourceMappingURL=menu-item.js.map