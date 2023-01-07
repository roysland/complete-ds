var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import styles from './stepper.scss';
/**
 * @prop {'horizontal'|'vertical'} orientation - Defines the orientation of the component. Possible values are `horizontal` and `vertical`.
 *
 * @slot - Hosts air-stepper-items.
 */
export class Stepper extends LitElement {
    constructor() {
        super(...arguments);
        this.orientation = 'horizontal';
    }
    static get styles() {
        return styles;
    }
    render() {
        return html `
      <slot
        @slotchange="${() => {
            this.handleOrientation();
            this.handleItems();
        }}"
      ></slot>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
    }
    handleOrientation() {
        this.childNodes.forEach((el) => {
            el.orientation = this.orientation;
        });
    }
    handleItems() {
        let items, length;
        items = Array.prototype.slice.call(this.children);
        length = this.children.length;
        items.forEach((el) => {
            el.first = el.index == 1;
            el.last = el.index == length;
        });
    }
}
__decorate([
    property({ type: String, reflect: true })
], Stepper.prototype, "orientation", void 0);
//# sourceMappingURL=stepper.js.map