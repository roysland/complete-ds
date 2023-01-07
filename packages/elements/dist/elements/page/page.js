var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './page.styles.scss';
/**
 * @prop {'dark'|'light'|undefined} theme - Defines the color theme of the page. Possible values are `dark` and `light`.
 * @prop {String} padding - Defines the padding style of the default slot.
 * @prop {'row'|'column'} direction - Defines the direction in which the slotted content flows (e.g. top to bottom or left to right). Possible values are `column` and `row`.
 * @prop {Boolean} flat - If set to true, the page background will be flat, without the need to use card as containers for the content.
 * @prop {Boolean} scrollable - If set to true, the page content will scroll if there is an overflow of content.
 *
 * @slot - The main content area.
 * @slot top - Shown on the top. Hosts components such as air-app-bar and air-nav-bar.
 * @slot bottom - Shown on the bottom. Hosts components such as air-nav-bar.
 * @slot left - Shown on the left side. Hosts components such as air-pane.
 * @slot right - Shown on the right side. Hosts components such as air-pane.
 */
let Page = class Page extends LitElement {
    constructor() {
        super(...arguments);
        this.padding = 'var(--spacing-l)';
        this.direction = 'row';
    }
    static get styles() {
        return styles;
    }
    render() {
        // @ts-ignore
        return html `
      <slot name="top"></slot>
      <div class="center-wrapper">
        <slot name="left"></slot>
        <slot style="padding: ${this.padding}"></slot>
        <slot name="right"></slot>
      </div>
      <slot name="bottom"></slot>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
    }
};
__decorate([
    property({ type: String, reflect: true })
], Page.prototype, "theme", void 0);
__decorate([
    property({ type: String, reflect: true })
], Page.prototype, "padding", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'direction' })
], Page.prototype, "direction", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Page.prototype, "flat", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Page.prototype, "scrollable", void 0);
Page = __decorate([
    customElement('air-page')
], Page);
export { Page };
//# sourceMappingURL=page.js.map