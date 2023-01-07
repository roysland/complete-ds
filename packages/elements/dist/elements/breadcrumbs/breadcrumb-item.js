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
import styles from './breadcrumb-item.styles.scss';
/**
 * @prop {String} label - Defines the text label.
 * @prop {Boolean} active - Defines whether the item is currently active or not.
 */
let AirBreadcrumbItem = class AirBreadcrumbItem extends LitElement {
    constructor() {
        super(...arguments);
        this.label = 'Label';
    }
    static get styles() {
        return styles;
    }
    render() {
        return html `
      ${!this.firstItem()
            ? html `
            <air-icon
              icon="keyboard_arrow_right"
              color="var(--text-2)"
            ></air-icon>
          `
            : ''}
      <air-text>${this.label}</air-text>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
    }
    firstItem() {
        var _a;
        let firstItem, children;
        children = Array.prototype.slice.call((_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.children);
        firstItem = children.indexOf(this) == 0;
        return firstItem;
    }
};
__decorate([
    property({ type: String, reflect: true })
], AirBreadcrumbItem.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], AirBreadcrumbItem.prototype, "active", void 0);
AirBreadcrumbItem = __decorate([
    customElement('air-breadcrumb-item')
], AirBreadcrumbItem);
export { AirBreadcrumbItem };
//# sourceMappingURL=breadcrumb-item.js.map