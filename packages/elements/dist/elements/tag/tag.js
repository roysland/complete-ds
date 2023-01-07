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
import styles from './tag.scss';
/**
 * @prop {String} label - If set, defines the text label.
 * @prop {String} icon - If set, defines the icon shown besides the label.
 * @prop {Boolean} button - If set to true, hover and click effects will be added.
 * @prop {Boolean} removable - If set to true, a close icon is displayed. Clicking on it dispatches a remove event.
 *
 * @fires remove - Dispatched when clicking on the close icon (removable only).
 */
let Tag = class Tag extends LitElement {
    constructor() {
        super(...arguments);
        this.label = 'Label';
    }
    static get styles() {
        return styles;
    }
    render() {
        return html `
      <!-- icon -->
      ${this.icon ? html ` <air-icon icon="${this.icon}"></air-icon> ` : ''}
      <!-- label -->
      ${this.label
            ? html ` <air-text class="label" size="xs" color="${this.color}">${this.label}</air-text> `
            : ''}
      <!-- removable -->
      ${this.removable
            ? html `
            <air-icon
              icon="close"
              button
              @click="${() => this.handleRemove()}"
            ></air-icon>
          `
            : ''}
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
    }
    handleRemove() {
        this.dispatchEvent(new Event('remove'));
    }
};
__decorate([
    property({ type: String, reflect: true })
], Tag.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], Tag.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Tag.prototype, "button", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Tag.prototype, "removable", void 0);
__decorate([
    property({ type: String, reflect: true })
], Tag.prototype, "variant", void 0);
__decorate([
    property({ type: String, reflect: true })
], Tag.prototype, "color", void 0);
Tag = __decorate([
    customElement('air-tag')
], Tag);
export { Tag };
//# sourceMappingURL=tag.js.map